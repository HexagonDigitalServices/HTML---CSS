// Initial values from localStorage or default
let age = parseInt(localStorage.getItem('age')) || 30;
let weight = parseInt(localStorage.getItem('weight')) || 78;
let height = parseInt(localStorage.getItem('height')) || 175;
let gender = localStorage.getItem('gender') || 'Male';

// Update displayed values on load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('age').innerText = age;
    document.getElementById('weight').innerText = weight;
    document.getElementById('height-value').innerText = height;
    document.getElementById('height').value = height;

    // Set gender button active based on stored value
    document.getElementById('male-btn').classList.toggle('active', gender === 'Male');
    document.getElementById('female-btn').classList.toggle('active', gender === 'Female');
});

// Increment function for age and weight
function increment(id) {
    if (id === 'age') age++;
    if (id === 'weight') weight++;
    document.getElementById(id).innerText = eval(id);
    localStorage.setItem(id, eval(id));
}

// Decrement function for age and weight
function decrement(id) {
    if (id === 'age' && age > 1) age--;
    if (id === 'weight' && weight > 1) weight--;
    document.getElementById(id).innerText = eval(id);
    localStorage.setItem(id, eval(id));
}

// Height update function
function updateHeight(value) {
    height = parseInt(value);
    document.getElementById('height-value').innerText = height;
    localStorage.setItem('height', height);
}

// Gender selection function
function selectGender(selectedGender) {
    gender = selectedGender;
    const maleBtn = document.getElementById("male-btn");
    const femaleBtn = document.getElementById("female-btn");

    maleBtn.classList.remove("active");
    femaleBtn.classList.remove("active");

    if (selectedGender === "Male") {
        maleBtn.classList.add("active");
    } else if (selectedGender === "Female") {
        femaleBtn.classList.add("active");
    }

    // Store the selected gender in localStorage
    localStorage.setItem('gender', selectedGender);
}

// BMI Calculation and navigation to results page
function calculateBMI() {
    let bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let status;
    let color;

    if (bmi < 18.5) {
        status = "Underweight";
        color = "#1e90ff"; // Dodger blue
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Normal weight";
        color = "#4caf50"; // Bright green
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Overweight";
        color = "#ff9800"; // Bright orange
    } else {
        status = "Obesity";
        color = "#f44336"; // Bright red
    }

    // Store results in localStorage
    localStorage.setItem('bmi', bmi);
    localStorage.setItem('status', status);
    localStorage.setItem('color', color);
    localStorage.setItem('gender', gender);

    // Navigate to results page
    window.location.href = 'results.html';
}

// Display results on the results page
function displayResults() {
    const bmi = localStorage.getItem('bmi');
    const status = localStorage.getItem('status');
    const color = localStorage.getItem('color');
    const gender = localStorage.getItem('gender');

    if (bmi && status) {
        document.getElementById('bmi-value').innerText = bmi;
        document.getElementById('bmi-status').innerText = status;
        document.getElementById('bmi-value').style.color = color;
    }
    
if (bmi && status) {
    document.getElementById('bmi-value').innerText = bmi;
    document.getElementById('bmi-status').innerText = `${status} (${gender})`;
}
}

// Go back to the main page
function goBack() {
    window.location.href = 'index.html';
}