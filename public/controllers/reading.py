from flask import Blueprint, render_template, request, session, redirect, url_for
import requests

api_key = "ai71-api-e3acee4e-b0c9-43e5-959c-dee723676fe9"
api_url = "https://api.ai71.ai/v1/chat/completions"

reading_bp = Blueprint('reading', __name__)

def generate_content(topic, module_type):
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
 
    if module_type not in ["basic", "intermediate", "advanced"]:
        return None, None
    
    system_messages = {
        "basic": "Write a simple and short reading passage suitable for beginners in English as an IELTS practice.",
        "intermediate": "Write a moderately complex reading passage suitable for intermediate learners, along with intermediate level questions and multiple-choice options.",
        "advanced": "Write a complex reading passage suitable for advanced learners, along with advanced level questions and multiple-choice options."
    }

    payload = {
        "model": "tiiuae/falcon-180B-chat",
        "messages": [
            {"role": "system", "content": f"Here’s a comprehensive system guideline for generating {system_messages[module_type]}"},
            {"role": "user", "content": f"Write a reading passage providing as an IELTS practice about the topic: {topic}."}
        ],
        "max_tokens": 600
    }
    
    try:
        # Generate passage
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        passage = data["choices"][0]["message"]["content"]

        # Generate questions based on the passage
        questions_payload = {
            "model": "tiiuae/falcon-180B-chat",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Generate multiple-choice questions and options based on the following passage: {passage}"}
            ],
            "max_tokens": 600
        }

        questions_response = requests.post(api_url, headers=headers, json=questions_payload)
        questions_response.raise_for_status()
        questions_data = questions_response.json()
        questions = questions_data["choices"][0]["message"]["content"]

        questions_list = []
        questions_blocks = questions.split("\n\n")
        correct_answers = {}
        for block in questions_blocks:
            if block.strip():
                q_and_options = block.split("\n")
                question = q_and_options[0].strip()
                options = [opt.strip() for opt in q_and_options[1:]]
                correct_answer = options[0] 
                questions_list.append({"question": question, "options": options})
                correct_answers[question] = correct_answer

        session['correct_answers'] = correct_answers

        return passage, questions_list

    except requests.RequestException as e:
        print("An error occurred:", e)
        return None, None

@reading_bp.route('/basic', methods=['GET'])
def basic():
    return render_template('basic.html')

@reading_bp.route('/intermediate', methods=['GET'])
def intermediate():
    return render_template('intermediate_reading.html')

@reading_bp.route('/advanced', methods=['GET'])
def advanced():
    return render_template('advanced_reading.html')

@reading_bp.route('/generate_passage/<module_type>', methods=['POST'])
def generate_passage(module_type):
    if module_type not in ["basic", "intermediate", "advanced"]:
        return "Invalid module type.", 400
    
    topic = request.form['topic']
    passage, questions = generate_content(topic, module_type)

    if passage and questions:
        return render_template(f'{module_type}.html', passage=passage, questions=questions)
    else:
        return "An error occurred while generating content.", 500

@reading_bp.route('/submit_answers', methods=['POST'])
def submit_answers():
    user_answers = {key: request.form.get(key) for key in request.form.keys() if key.startswith('question_')}
    correct_answers = session.get('correct_answers', {})
    
    score = sum(1 for question, answer in user_answers.items() if correct_answers.get(question) == answer)
    
    return f"You scored {score} out of {len(correct_answers)}."
