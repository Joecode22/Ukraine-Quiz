// Grab the elements from the DOM
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');
var timerText = document.getElementById('timer');

// Initialize the necessary variables
var currentQuestion = {}; // Object to hold the current question
var acceptingAnswers = true; // Boolean to check if we are accepting answers
var score = 0; // Initialize the score to zero
var questionCounter = 0; // Initialize the question counter to zero
var availableQuestions = []; // Initialize the available questions array

// Questions array
var questions = [
  {
    question: "When did the most recent full scale invasion of Ukraine start?",
    choice1: "July 31, 2022",
    choice2: "September 4, 2022",
    choice3: "December 18, 2022",
    choice4: "February 24 2022",
    answer: 4,
  },

  {
    question:
      "Which southern Ukrainian city was assaulted, on 26 February 2022 by 12 tanks and 120 Russian soldiers but was successfully defended?",
    choice1: "Kharkiv",
    choice2: "Mykolaiv",
    choice3: "Kiev",
    choice4: "Odessa",
    answer: 2,
  },

  {
    question:
      "Which southern Ukrainian city was captured by Russian forces on March 2, 2022?",
    choice1: "Kherson",
    choice2: "Mykolaiv",
    choice3: "Kiev",
    choice4: "Odessa",
    answer: 1,
  },

  {
    question:
      "When did the Russians abandon and retreat from the city of Kherson?",
    choice1: "March 2, 2022",
    choice2: "May 10, 2022",
    choice3: "November 9, 2022",
    choice4: "March 17, 2023",
    answer: 3,
  },

  {
    question:
      "What is the name of the nuclear power plant that was captured by Russian forces on March 4, 2022?",
    choice1: "Chernobyl",
    choice2: "South Ukraine Nuclear Power Plant",
    choice3: "Nedobudovana Odes'ka Nuclear PowerPlant",
    choice4: "Zaporizhzhya Nuclear Power Plant",
    answer: 4,
  },
];

// Constants
var CORRECT_BONUS = 20;
var MAX_QUESTIONS = 5;
var TIMER_DURATION = 60;

// Function to start the game
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = questions.slice(); // Create a copy of the questions array
  startTimer();
  getNewQuestion();
}

// Function to get a new question
function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("high-scores.html");
  }

  questionCounter++; // Increment the question counter
  questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS;
  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(function(choice) {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
}

// Add a click event listener for each choice
choices.forEach(function(choice) {
  choice.onclick = function(e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset["number"];
    var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      TIMER_DURATION -= 10;
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(function() {
      selectedChoice.classList.remove(classToApply);
      acceptingAnswers = true;
      getNewQuestion();
    }, 1000);
  };
});

// Function to increment the score
function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

// Function to start the timer
function startTimer() {
  setInterval(function() {
    if (TIMER_DURATION >= 0) {
      timerText.innerHTML = TIMER_DURATION--;
    } else {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("high-scores.html");
    }
  }, 1000);
}

startGame();
