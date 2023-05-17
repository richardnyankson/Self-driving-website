//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "How many different levels of self-driving systems exist?",
    options: ["3", "4", "5", "6"],
    correct: "6",
  },
  {
    id: "1",
    question: "What level of self-driving does Tesla's autopilot belong to?",
    options: ["Level 1", "Level 2", "Level 3", "Level 4"],
    correct: "Level 2",
  },
  {
    id: "2",
    question:
      "What percentage of cars on the road are expected to be autonomous by 2040?",
    options: ["55%", "75%", "90%", "100%"],
    correct: "75%",
  },
  {
    id: "3",
    question:
      "The adoption of autonomous vehicle technology could reduce the frequency of accidents by approximately how much?",
    options: ["0%", "15%", "45%", "90%"],
    correct: "90%",
  },
  {
    id: "4",
    question:
      "Which of these companies operates a commercial self-driving taxi service in Phoenix, Arizona? ",
    options: ["Tesla", "Uber", "Waymo", "Lyft"],
    correct: "Waymo",
  },
  {
    id: "5",
    question: "What is one of the ethical dilemmas faced by self-driving cars?",
    options: [
      "Choosing the fastest route",
      "Deciding the car's color",
      "Handling unexpected situations",
      "Making split-second decisions in potential accidents",
    ],
    correct: "Making split-second decisions in potential accidents",
  },
  {
    id: "6",
    question:
      "What role does public perception play in the development of self-driving cars?",
    options: [
      "It determines the speed of development",
      "It affects the legal and regulatory framework",
      "It determines the cost of self-driving cars",
      "It affects the technological limitations",
    ],
    correct: "It affects the legal and regulatory framework",
  },
  {
    id: "4",
    question:
      "What is the purpose of developing fail-safe systems in self-driving cars?",
    options: [
      "Enhancing the comfort of passengers",
      "Improving fuel efficiency",
      "Ensuring safety in unexpected situations",
      "Reducing travel time",
    ],
    correct: "Ensuring safety in unexpected situations",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
