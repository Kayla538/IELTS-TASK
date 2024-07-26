// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// Progress tracking (placeholder)
function updateProgress(progress) {
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// Daily goal setting (placeholder)
function setDailyGoal(goal) {
    const dailyGoalElement = document.querySelector('.daily-goal');
    if (dailyGoalElement) {
        dailyGoalElement.textContent = `Daily Goal: ${goal} minutes`;
    }
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateProgress(30); // Example: 30% progress
    setDailyGoal(30); // Example: 30 minutes daily goal
});