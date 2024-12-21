// Sample quiz data
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Mars"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Jane Austen", "Mark Twain"],
    correct: "Harper Lee"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: "Pacific"
  }
];

// Function to load questions
function loadQuestions() {
  const container = document.getElementById("questions-container");

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTitle = document.createElement("p");
    questionTitle.textContent = q.question;

    // Create options
    q.options.forEach((option, i) => {
      const label = document.createElement("label");
      label.textContent = option;
      
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = option;

      // Check if there's a saved progress
      const savedAnswer = sessionStorage.getItem(`question-${index}`);
      if (savedAnswer === option) {
        input.checked = true;
      }

      label.prepend(input);
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    container.appendChild(questionDiv);
  });
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  let score = 0;
  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
    const answer = selectedOption ? selectedOption.value : null;

    // Save the progress in session storage
    sessionStorage.setItem(`question-${index}`, answer);

    // Check if the answer is correct
    if (answer === q.correct) {
      score++;
    }
  });

  // Save score to localStorage
  localStorage.setItem("score", score);

  // Display the result
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Your score is ${score} out of 5.`;

  // Disable the submit button after submission
  document.querySelector("button").disabled = true;
}

// Load saved score from local storage (if available)
function loadPreviousScore() {
  const storedScore = localStorage.getItem("score");
  if (storedScore) {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your last score was ${storedScore} out of 5.`;
  }
}

// Initial loading of questions and previous score
window.onload = () => {
  loadQuestions();
  loadPreviousScore();

  // Event listener for form submission
  document.getElementById("quiz-form").addEventListener("submit", handleSubmit);
};

