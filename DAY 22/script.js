const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF00";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.fill(1);
});

document.getElementById('generate-btn').addEventListener('click', generatePassword);
document.getElementById('copy-btn').addEventListener('click', copyPassword);
document.getElementById('length').addEventListener('input', function () {
    document.getElementById('length-value').textContent = this.value;
    adjustMinLength();
});

document.querySelectorAll('.checkboxes input').forEach(checkbox => {
    checkbox.addEventListener('change', adjustMinLength);
});

function adjustMinLength() {
    const checkboxes = document.querySelectorAll('.checkboxes input:checked');
    const lengthInput = document.getElementById('length');
    const minLength = checkboxes.length > 0 ? checkboxes.length : 1;
    lengthInput.min = minLength;
    if (lengthInput.value < minLength) {
        lengthInput.value = minLength;
        document.getElementById('length-value').textContent = minLength;
    }
}

function generatePassword() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterPool = '';
    if (useUppercase) characterPool += upperCaseChars;
    if (useLowercase) characterPool += lowerCaseChars;
    if (useNumbers) characterPool += numberChars;
    if (useSymbols) characterPool += symbolChars;

    if (characterPool === '') {
        alert('Please select at least one character type');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }

    document.getElementById('password-output').value = password;
    checkStrength(password);
}

function checkStrength(password) {
    const output = document.getElementById('password-output');
    const strengthText = document.getElementById('strength-text');
    const copyBtn = document.getElementById('copy-btn');

    if (password.length > 11) {
        output.className = 'strong';
        strengthText.textContent = 'Strong';
        strengthText.className = 'strong';
        copyBtn.className = 'strong-btn';
        copyBtn.textContent = 'Copy Strong Password';
    } else if (password.length > 6) {
        output.className = 'moderate';
        strengthText.textContent = 'Moderate';
        strengthText.className = 'moderate';
        copyBtn.className = 'moderate-btn';
        copyBtn.textContent = 'Copy Moderate Password';
    } else {
        output.className = 'weak';
        strengthText.textContent = 'Weak';
        strengthText.className = 'weak';
        copyBtn.className = 'weak-btn';
        copyBtn.textContent = 'Copy Weak Password';
    }
}

function copyPassword() {
    const passwordOutput = document.getElementById('password-output');
    if (passwordOutput.value) {
        passwordOutput.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    } else {
        alert('Nothing to copy!');
    }
}