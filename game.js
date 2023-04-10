const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
      question: "When did the most recent full scale invasion of Ukraine start?",
      choice1: "July 31, 2022",
      choice2: "September 4, 2022",
      choice3: "December 18, 2022",
      choice4: "February 24 2022",
      answer: 4
    },

    {
      question: "Which southern Ukrainian city was assaulted, on 26 February 2022 by 12 tanks and 120 Russian soldiers but was successfully defended?",
      choice1: "Kharkiv",
      choice2: 'Mykolaiv',
      choice3: "Kiev",
      choice4: "Odessa",
      answer: 2
    },

    {
      question: "What language was primarily spoken by the Ukrainian Defenders during the battle of Mykolaiv?",
      choice1: "Russian",
      choice2: "Ukrainian",
      choice3: "English",
      choice4: "German",
      answer: 1
    },

    {
      question: "Which southern Ukrainian city was captured by Russian forces on March 2, 2022?",
      choice1: "Kherson",
      choice2: "Mykolaiv",
      choice3: "Kiev",
      choice4: "Odessa",
      answer: 2
    },

    {
      question: "When did the Russians abandon and retreat from the city of Kherson?",
      choice1: "March 2, 2022",
      choice2: "May 10, 2022",
      choice3: "November 9, 2022",
      choice4: "March 17, 2023",
      answer: 3
    },
    
    {
      question: "Where will Putin be tried for war crimes?",
      choice1: "The Hague",
      choice2: "Moscow",
      choice3: "New York",
      choice4: "London",
      answer: 1
    },

  ]

