const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Iron", "Osmium"],
        answer: "Oxygen"
    }
]

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    resetOptions();
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<h3>${currentQuestion.question}</h3>`;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.innerText = option;
        button.addEventListener("click", () => checkAnswer(button, option));
        questionContainer.appendChild(button);
    });

    nextButton.style.display="none";
    resultContainer.innerHTML ="";
}

function checkAnswer(button, selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if(selectedAnswer === currentQuestion.answer) {
        button.classList.add("correct");
        score++;
    }
    else {
        button.classList.add("wrong");
        Array.from(document.getElementsByClassName("option")).forEach(optionButton =>{
            if(optionButton.innerText === currentQuestion.answer) {
                optionButton.classList.add("correct");
            }
        })
    }
    disableOptions();
    nextButton.style.display = "block"
}

function disableOptions() {
    Array.from(document.getElementsByClassName("option")).forEach(button => {
        button.disable = true;
    })
}

function resetOptions() {
    questionContainer.innerHTML ="";
}

function showResult() {
    questionContainer.innerHTML= "";
    resultContainer.innerHTML = `<h3>Your score: ${score} out of ${questions.length}</h3>`;
    nextButton.style.display = "none";
    restartButton.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.style.display = "none";
    loadQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
loadQuestion();