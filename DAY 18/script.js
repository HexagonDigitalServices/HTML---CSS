window.onload = function () {
    document.getElementById('result').value = '0';
}

function clearDisplay() {
    document.getElementById('result').value = '0';
}

function deleteLast() {
    const display = document.getElementById('result');
    display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0';
}

function appendNumber(number) {
    const display = document.getElementById('result');
    display.value = display.value === '0' ? number : display.value + number;
}

function appendOperator(operator) {
    const display = document.getElementById('result');
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) return;
    display.value += operator;
}

function calculateResult() {
    const display = document.getElementById('result');
    try {
        display.value = eval(display.value) || '0';
    } catch {
        display.value = 'Error';
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (/\d/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '.') {
        appendNumber('.')
    }
})