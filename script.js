
// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: 2,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
    answer: 0,
  },
];

const questionsContainer = document.getElementById("questions-container");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");

// Load progress from session storage
const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render quiz questions
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  questionDiv.innerHTML = `
    <p>${index + 1}. ${q.question}</p>
    <div class="options">
      ${q.options
        .map(
          (option, i) => `
        <label>
          <input type="radio" name="question-${index}" value="${i}" ${
            progress[index] == i ? "checked" : ""
          }>
          ${option}
        </label>`
        )
        .join("")}
    </div>
  `;

  questionsContainer.appendChild(questionDiv);
});

// Save progress in session storage when an option is selected
questionsContainer.addEventListener("change", (e) => {
  const [_, questionIndex] = e.target.name.split("-");
  progress[questionIndex] = e.target.value;
  sessionStorage.setItem("progress", JSON.stringify(progress));
});

// Handle quiz submission
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] == q.answer) {
      score++;
    }
  });

  // Save score in local storage
  localStorage.setItem("score", score);

  // Display score
  resultContainer.textContent = `Your score is ${score} out of ${questions.length}`;
});
