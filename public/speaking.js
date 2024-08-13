document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Recording setup for Task 1
    setupRecording(
        'Task 1',
        'startRecordingTask1',
        'stopRecordingTask1',
        'audioPlaybackTask1',
        'recordingStatusTask1',
        'timeTask1',
        'progressTask1'
    );

    // Recording setup for Task 2
    setupRecording(
        'Task 2',
        'startRecordingTask2',
        'stopRecordingTask2',
        'audioPlaybackTask2',
        'recordingStatusTask2',
        'timeTask2',
        'progressTask2'
    );

    // Function to setup recording for a task
    function setupRecording(taskName, startBtnId, stopBtnId, audioId, statusId, timeId, progressId) {
        const startRecordingButton = document.getElementById(startBtnId);
        const stopRecordingButton = document.getElementById(stopBtnId);
        const audioPlayback = document.getElementById(audioId);
        const recordingStatus = document.getElementById(statusId);
        const timerDisplay = document.getElementById(timeId);
        const progressBar = document.getElementById(progressId);

        let mediaRecorder;
        let audioChunks = [];
        let recordingInterval;
        let recordingTime = 0;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.ondataavailable = function(event) {
                        audioChunks.push(event.data);
                    };

                    mediaRecorder.onstop = function() {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                        audioChunks = [];
                        const audioUrl = URL.createObjectURL(audioBlob);
                        audioPlayback.src = audioUrl;
                        clearInterval(recordingInterval);
                        timerDisplay.textContent = '0'; // Reset timer display
                        progressBar.style.width = '0%'; // Reset progress bar
                    };

                    startRecordingButton.addEventListener('click', function() {
                        if (mediaRecorder.state === 'inactive') {
                            mediaRecorder.start();
                            recordingStatus.textContent = `${taskName} Recording...`;
                            startRecordingButton.disabled = true;
                            stopRecordingButton.disabled = false;

                            // Start the timer
                            recordingTime = 0;
                            recordingInterval = setInterval(() => {
                                recordingTime++;
                                timerDisplay.textContent = recordingTime;
                                progressBar.style.width = `${(recordingTime / 120) * 100}%`; // Assuming max time is 120 seconds
                            }, 1000);
                        }
                    });

                    stopRecordingButton.addEventListener('click', function() {
                        if (mediaRecorder.state === 'recording') {
                            mediaRecorder.stop();
                            recordingStatus.textContent = `${taskName} Recording stopped.`;
                            startRecordingButton.disabled = false;
                            stopRecordingButton.disabled = true;
                        }
                    });
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                    recordingStatus.textContent = 'Microphone access denied. Please check your browser settings.';
                });
        } else {
            recordingStatus.textContent = 'Audio recording not supported in this browser.';
        }
    }

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