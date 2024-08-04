document.addEventListener('DOMContentLoaded', function () {
    const newPasswordInput = document.getElementById('new_password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const passwordStrengthDisplay = document.getElementById('password-strength');

    newPasswordInput.addEventListener('input', updatePasswordStrength);
    confirmPasswordInput.addEventListener('input', checkPasswordsMatch);

    function updatePasswordStrength() {
        const password = newPasswordInput.value;
        let strength = calculatePasswordStrength(password);
        displayPasswordStrength(strength);
    }

    function checkPasswordsMatch() {
        if (newPasswordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match");
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    }

    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[\W]/.test(password)) strength++;
        return strength;
    }

    function displayPasswordStrength(strength) {
        const strengths = [
            { color: 'red', text: 'Weak' },
            { color: 'orange', text: 'Fair' },
            { color: 'yellow', text: 'Good' },
            { color: 'blue', text: 'Strong' },
            { color: 'green', text: 'Very Strong' }
        ];

        passwordStrengthDisplay.style.color = strengths[strength - 1].color;
        passwordStrengthDisplay.textContent = strengths[strength - 1].text;
    }
});
