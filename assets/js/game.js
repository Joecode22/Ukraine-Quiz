// grab the elements from the DOM
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const timerText = document.getElementById('timer');

let currentQuestion = {}; //object to hold the current question
let acceptingAnswers = true; //boolean to check if we are accepting answers
let score = 0; //initialize the score to zero
let questionCounter = 0; //initialize the question counter to zero
let availableQuestions = []; //initialize the available questions array

//questions array
let questions = [
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

//constants
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;
let TIMER_DURATION = 50;

//function to start the game
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  startTimer();
  getNewQuestion();
}

//function to get a new question
function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //add the score to the local storage
    localStorage.setItem("mostRecentScore", score);
    //go to the high scores page
    return window.location.assign("/highScores.html");
  }

  questionCounter++; 
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length); 
  currentQuestion = availableQuestions[questionIndex]; 
  question.innerText = currentQuestion.question; 

  //loop through the choices
  choices.forEach((choice) => {
    const number = choice.dataset["number"]; 
    choice.innerText = currentQuestion["choice" + number]; 
  });
  availableQuestions.splice(questionIndex, 1); 
}

//Choice Click Event Handler
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      TIMER_DURATION -= 10;
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      acceptingAnswers = true;
      getNewQuestion();
    }, 1000);
  });
});

//Score Increment Function
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

//Timer Function
function startTimer() {
  setInterval(function () {
    if (TIMER_DURATION >=0) {
      timerText.innerHTML = TIMER_DURATION--;
    } else {
      return window.location.assign("/highScores.html");
    }
  }, 1000);
}

startGame();
