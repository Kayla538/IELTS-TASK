from ai71 import AI71
from flask import Blueprint, render_template, request

writing_bp = Blueprint('writing', __name__)

AI71_API_KEY = "ai71-api-e3acee4e-b0c9-43e5-959c-dee723676fe9"
client = AI71(AI71_API_KEY)

from ai71 import AI71

AI71_API_KEY = "ai71-api-e3acee4e-b0c9-43e5-959c-dee723676fe9"
client = AI71(AI71_API_KEY)

def generate_topic_or_questions():
    
    response = client.chat.completions.create(
        model="tiiuae/falcon-180B-chat",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Give me a writing topic."},
        ],
    )
    topic= response.choices[0].message.content.strip()
    return topic


def get_feedback(response):
    feedback_response = client.chat.completions.create(
        model="tiiuae/falcon-180B-chat",
        messages=[
            {"role": "system", "content": "You are a writing tutor."},
            {"role": "user", "content": f"Provide feedback on the following writing: {response}"}
        ]
    )
    feedback_writing= feedback_response.choices[0].message.content.strip()
    return feedback_writing
 



@writing_bp.route('/topic', methods=['GET'])
def topic_selection():
    topic = generate_topic_or_questions()
    return render_template('topic_selection.html', topic=topic)

@writing_bp.route('/write', methods=['GET'])
def write():
    return render_template('writing.html')

@writing_bp.route('/submit', methods=['POST'])
def submit_response():
    response = request.form['response']
    feedback = get_feedback(response)
    return render_template('result_feedback.html', response=response, feedback=feedback)
