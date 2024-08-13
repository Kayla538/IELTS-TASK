document.addEventListener('DOMContentLoaded', function() {
    const passageContainer = document.getElementById('passageContainer');
    const questionsContainer = document.getElementById('questionsContainer');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const scoreMessage = document.getElementById('scoreMessage');
    const submitAnswersButton = document.getElementById('submitAnswers');

    // Sample reading passage and questions
    const readingPassage = `
        <p>Climate change is a long-term alteration in Earth's climate and weather patterns. 
        It has been a significant concern for scientists and policymakers around the world. 
        The primary cause of recent climate change is the increase in greenhouse gases like carbon dioxide and methane, 
        which trap heat in the atmosphere and lead to global warming.</p>
    `;

    const questions = [
        { question: "What is the main cause of recent climate change?", type: "text", answer: "greenhouse gases" },
        { question: "Name two greenhouse gases mentioned in the passage.", type: "text", answer: ["carbon dioxide", "methane"] },
        { question: "What is the main topic of the passage?", type: "multiple-choice", options: ["Climate change", "Global warming", "Weather patterns"], answer: "Climate change" }
    ];

    // Load reading passage
    passageContainer.innerHTML = readingPassage;

    // Load questions
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        if (q.type === "text") {
            questionElement.innerHTML = `
                <p>Question ${index + 1}: ${q.question}</p>
                <input type="text" data-answer="${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}" placeholder="Type your answer here">
                <div id="feedback${index}" class="feedback-icon"></div>
            `;
        } else if (q.type === "multiple-choice") {
            let optionsHTML = q.options.map(option => `<label><input type="radio" name="question${index}" value="${option}"> ${option}</label>`).join('<br>');
            questionElement.innerHTML = `
                <p>Question ${index + 1}: ${q.question}</p>
                ${optionsHTML}
                <div id="feedback${index}" class="feedback-icon"></div>
            `;
        }
        questionsContainer.appendChild(questionElement);
    });

    // Handle answer submission
    submitAnswersButton.addEventListener('click', function() {
        let score = 0;

        questions.forEach((q, index) => {
            const feedbackIcon = document.getElementById(`feedback${index}`);
            if (q.type === "text") {
                const userAnswer = document.querySelector(`input[data-answer="${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}"]`).value.trim().toLowerCase();
                
                if (Array.isArray(q.answer)) {
                    // Split user input by commas and trim spaces
                    const userAnswers = userAnswer.split(',').map(ans => ans.trim());
                    const correctAnswers = q.answer.map(ans => ans.toLowerCase());

                    // Check if all correct answers are included in the user's input
                    if (correctAnswers.every(ans => userAnswers.includes(ans))) {
                        score++;
                        feedbackIcon.innerHTML = '✔️'; // Green checkmark
                        feedbackIcon.style.color = 'green';
                    } else {
                        feedbackIcon.innerHTML = '❌'; // Red X
                        feedbackIcon.style.color = 'red';
                    }
                } else {
                    if (userAnswer === q.answer.toLowerCase()) {
                        score++;
                        feedbackIcon.innerHTML = '✔️'; // Green checkmark
                        feedbackIcon.style.color = 'green';
                    } else {
                        feedbackIcon.innerHTML = '❌'; // Red X
                        feedbackIcon.style.color = 'red';
                    }
                }
            } else if (q.type === "multiple-choice") {
                const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                if (selectedOption && selectedOption.value === q.answer) {
                    score++;
                    feedbackIcon.innerHTML = '✔️'; // Green checkmark
                    feedbackIcon.style.color = 'green';
                } else {
                    feedbackIcon.innerHTML = '❌'; // Red X
                    feedbackIcon.style.color = 'red';
                }
            }
        });

        // Display score message
        if (score === questions.length) {
            scoreMessage.innerHTML = `You scored ${score} out of ${questions.length}. ✔️ Perfect score!`;
            scoreMessage.style.color = 'green';
        } else {
            scoreMessage.textContent = `You scored ${score} out of ${questions.length}.`;
            scoreMessage.style.color = 'black';
        }
        scoreMessage.classList.remove('hidden');
    });

    // Feedback form submission
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const feedbackText = document.getElementById('feedbackText').value;
        feedbackMessage.textContent = 'Thank you for your feedback!';
        feedbackMessage.classList.remove('hidden');
        feedbackForm.reset();

        setTimeout(() => {
            feedbackMessage.classList.add('hidden');
        }, 3000);
    });
});