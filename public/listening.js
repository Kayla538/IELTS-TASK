document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessage = document.getElementById('feedbackMessage');

    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = 'Pause Audio';
        } else {
            audioPlayer.pause();
            playButton.textContent = 'Play Audio';
        }
    });

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