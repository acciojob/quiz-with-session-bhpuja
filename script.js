// Questions Data
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    correct: 1
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "120°C", "80°C"],
    correct: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"],
    correct: 2
  },
  {
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: 2
  }
];

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const scoreDisplay = document.getElementById("score-display");

// Load saved progress from session storage
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Function to render the quiz
function renderQuiz() {
  quizContainer.innerHTML = ""; // Clear existing content

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question-${index}`;
      optionInput.value = optionIndex;

      // Restore selected option if progress exists
      if (savedProgress[`question-${index}`] == optionIndex) {
        optionInput.checked = true;
      }

      // Save progress to session storage on selection
      optionInput.addEventListener("change", () => {
        savedProgress[`question-${index}`] = optionIndex;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      optionLabel.appendChild(optionInput);
      optionLabel.append(` ${option}`);
      questionDiv.appendChild(optionLabel);
      questionDiv.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(questionDiv);
  });
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
    const selectedOption = savedProgress[`question-${index}`];
    if (selectedOption == q.correct) {
      score++;
    }
  });

  // Display the score
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save the score to local storage
  localStorage.setItem("score", score);
}

// Event listener for submit button
submitBtn.addEventListener("click", calculateScore);

// Initialize the quiz
renderQuiz();
