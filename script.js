// Sample quiz data
// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2, // Correct answer index
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1,
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: 1,
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Orca"],
        answer: 1,
    },
    {
        question: "Which gas do plants primarily use for photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1,
    },
];

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const scoreDisplay = document.getElementById("score-display");

// Load progress from session storage
const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render the quiz
function renderQuiz() {
    quizContainer.innerHTML = "";
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        q.options.forEach((option, optionIndex) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = optionIndex;

            // Persist the selected option
            if (progress[index] === optionIndex) {
                input.checked = true;
            }

            // Save progress to session storage
            input.addEventListener("change", () => {
                progress[index] = optionIndex;
                sessionStorage.setItem("progress", JSON.stringify(progress));
            });

            label.appendChild(input);
            label.append(option);
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

// Calculate score
function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        if (progress[index] === q.answer) {
            score++;
        }
    });
    return score;
}

// Handle submit
submitBtn.addEventListener("click", () => {
    const score = calculateScore();
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;

    // Save score to local storage
    localStorage.setItem("score", score);
});

// Render the quiz on page load
renderQuiz();
