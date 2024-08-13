from public import create_app
from flask import render_template

app = create_app()

@app.route('/feedback')
def feedback():
    # Example data to be passed to the template
    feedback_data = {
        'feedback_task2_word_count': 'Word count is within the expected range.',
        'feedback_task2_grammar': 'Grammar is generally correct with minor errors.',
        'feedback_task2_vocabulary': 'Vocabulary usage is varied and appropriate.',
        'feedback_task2_coherence': 'Coherence is maintained throughout the text.',
        'feedback_task2_context': 'Context is well-established and clear.'
    }
    return render_template('academic_writing_feedback.html', **feedback_data)

if __name__ == '__main__':
    app.run(debug=True)
