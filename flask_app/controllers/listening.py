import requests
import os
from flask import Blueprint, render_template, request
from gtts import gTTS
from ai71 import AI71

listening_bp = Blueprint('listening', __name__, url_prefix='/listening')

@listening_bp.route('/', methods=['GET'])
def listening_page():
    return render_template('listening.html')

@listening_bp.route('/', methods=['POST'])
def process_listening():
    topic = request.form['topic']
    passage, questions = generate_listening_passage_and_questions(topic)
    audio_url = generate_audio(passage)
    return render_template('listening_result.html', audio_url=audio_url, questions=questions)

def generate_listening_passage_and_questions(topic):
    api_url = "https://api.ai71.ai/v1/chat/completions"
    api_key = "ai71-api-e3acee4e-b0c9-43e5-959c-dee723676fe9"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "tiiuae/falcon-180B-chat",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Write a short conversation between Kaylove and Ali for IELTS listening preparation about the topic: {topic}."}
        ],
        "max_tokens": 150
    }

    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        passage = data["choices"][0]["message"]["content"]

        print("Generated Passage:")
        print(passage)

        
        questions_payload = {
            "model": "tiiuae/falcon-180B-chat",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Generate three questions to ask the user about the following conversation: {passage} between Kaylove and Ali"}
            ],
            "max_tokens": 50
        }

        questions_response = requests.post(api_url, headers=headers, json=questions_payload)
        questions_response.raise_for_status()
        questions_data = questions_response.json()
        questions = [choice["message"]["content"] for choice in questions_data["choices"]]

      
        print("Generated Questions:")
        print(questions)

        return passage, questions

    except requests.RequestException as e:
       
        print("An error occurred:", e)
        return None, None

def generate_audio(passage_text):
    audio_dir = os.path.join('flask_app', 'static', 'audio')
    if not os.path.exists(audio_dir):
        os.makedirs(audio_dir)

    audio_file = os.path.join(audio_dir, 'output.mp3')
    tts = gTTS(passage_text, lang='en', slow=False)
    tts.save(audio_file)

    if os.path.exists(audio_file):
        print(f"Audio file created successfully: {audio_file}")
        return 'audio/output.mp3'
    else:
        print("Error: Audio file was not created.")
        return None
