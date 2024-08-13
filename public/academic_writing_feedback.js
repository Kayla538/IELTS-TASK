document.addEventListener('DOMContentLoaded', function() {
    const feedbackData = {
        wordCount: 'Your essay has 350 words. It meets the expected word count.',
        grammar: 'The grammar is mostly accurate with only a few minor errors.',
        vocabulary: 'Good use of vocabulary, with a range of advanced words.',
        coherence: 'The essay is well-structured and ideas flow logically.',
        context: 'The context is well-maintained throughout the essay.'
    };

    // Populate the feedback sections with data
    document.getElementById('wordCount').innerText = feedbackData.wordCount;
    document.getElementById('grammar').innerText = feedbackData.grammar;
    document.getElementById('vocabulary').innerText = feedbackData.vocabulary;
    document.getElementById('coherence').innerText = feedbackData.coherence;
    document.getElementById('context').innerText = feedbackData.context;
});
