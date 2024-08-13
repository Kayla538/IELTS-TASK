document.addEventListener('DOMContentLoaded', function() {
    const essayText = document.getElementById('essayText');
    const wordCountDisplay = document.getElementById('wordCount');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const submitEssayButton = document.getElementById('submitEssay');
    const saveDraftButton = document.getElementById('saveDraft');
    const taskSelector = document.getElementById('taskSelector');
    const taskPrompt = document.getElementById('taskPrompt');

    // Task prompts
    const taskPrompts = {
        "1": "Some people believe that the best way to increase road safety is to increase the minimum legal age for driving cars or riding motorbikes. To what extent do you agree or disagree?",
        "2": "Technology is becoming increasingly prevalent in the classroom. Discuss the advantages and disadvantages of this trend."
    };

    // Update task prompt based on selection
    taskSelector.addEventListener('change', function() {
        const selectedTask = taskSelector.value;
        taskPrompt.innerHTML = `<h3>Task Prompt</h3><blockquote><p>${taskPrompts[selectedTask]}</p></blockquote>`;
    });

    // Update word count as the user types
    essayText.addEventListener('input', function() {
        const wordCount = essayText.value.trim().split(/\s+/).filter(word => word.length > 0).length;
        wordCountDisplay.textContent = `Word Count: ${wordCount}`;
        if (wordCount < 150) {
            wordCountDisplay.style.color = 'red';
        } else if (wordCount > 300) {
            wordCountDisplay.style.color = 'red';
        } else {
            wordCountDisplay.style.color = 'green';
        }
    });

    // Handle essay submission
    submitEssayButton.addEventListener('click', function() {
        const wordCount = essayText.value.trim().split(/\s+/).filter(word => word.length > 0).length;
        if (wordCount < 150) {
            feedbackMessage.textContent = 'Your essay is too short. Please write at least 150 words.';
            feedbackMessage.style.color = 'red';
        } else if (wordCount > 300) {
            feedbackMessage.textContent = 'Your essay is too long. Please limit your essay to 300 words.';
            feedbackMessage.style.color = 'red';
        } else {
            feedbackMessage.textContent = 'Essay submitted successfully!';
            feedbackMessage.style.color = 'green';
            // Here you can add functionality to actually submit the essay, e.g., send it to a server
        }
        feedbackMessage.classList.remove('hidden');
    });

    // Save draft to local storage
    saveDraftButton.addEventListener('click', function() {
        localStorage.setItem('essayDraft', essayText.value);
        feedbackMessage.textContent = 'Draft saved successfully!';
        feedbackMessage.style.color = 'green';
        feedbackMessage.classList.remove('hidden');
    });

    // Load draft from local storage on page load
    const savedDraft = localStorage.getItem('essayDraft');
    if (savedDraft) {
        essayText.value = savedDraft;
        const wordCount = savedDraft.trim().split(/\s+/).filter(word => word.length > 0).length;
        wordCountDisplay.textContent = `Word Count: ${wordCount}`;
    }
});