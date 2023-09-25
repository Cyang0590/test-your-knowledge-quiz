


const Answerslist = [
  {
    question: 'What does CSS stand for?',
    answers: ['Casual Style Sheets', 'Casual Sheets Sheets', 'Cascading Style Sheets', 'Cascading Style Shots'],
    correct: 'Cascading Style Sheets',
  },

  {
    question: 'What is the name of the data type that take the values true or false?',
    answers: ['Boolean', 'String', 'Number', 'Java'],
    correct: 'Boolean',
  },

  {
    question: 'Is JavaScript and Java the same?',
    answers: ['Yes', 'No', 'Maybe', 'None of Above'],
    correct: 'No',

  },

  {
    question: 'What is the command use to stop the loop?',
    answers: ['stop', 'pause', 'break', 'hold'],
    correct: 'break',

  }
];





var QuestionsEl = document.getElementById('QuesText');
var AnswerEl = document.getElementById('answerlist')
var strtBtnEl = document.getElementById('startbtn');
var scoreBtnEl = document.getElementById('scorebtns')
var clockcountdown = document.getElementById('time');
var checkanswer = document.getElementById('output')
var scoreslist = document.querySelector("ul");
var header = document.querySelector("header");
var correctanswer = false;
var questNum = 0;
var button = 0;

var userStorage = []
if (localStorage.getItem("UserScore")) {
  userStorage = JSON.parse(localStorage.getItem("UserScore"));
};
var score = 0;
var questioncount = 0;
var secondsLeft = 65;
var timerInterval;


function top5() {
  clearInterval(timerInterval);
  EndQues()
  header.textContent = "";
  QuestionsEl.textContent = "Top 5 Scores";
  clockcountdown.setAttribute("style", "display:none");
  

  strtBtnEl.setAttribute("style", "display:none");
  scoreBtnEl.style.textAlign = "center"
  scoreBtnEl.textContent = "Return";

  var ListScore = [""];

  for (i = 0; i < 5; i++) {
    
    ListScore[i] = document.createElement("li");
    console.log(userStorage);
    ListScore[i].textContent = userStorage[i]
    scoreslist.appendChild(ListScore[i]);
  }

  scoreBtnEl.removeEventListener("click", top5);
  

  scoreBtnEl.addEventListener("click", mainPage);

}
//  creating a function for the main pagee
function mainPage() {

  window.location.href = "./index.html"
};
scoreBtnEl.addEventListener("click", top5);


function timerupdate() {
  // Sets interval in variable
   timerInterval = setInterval(function () {
    secondsLeft--;
    clockcountdown.textContent = "Time: " + secondsLeft;

    if (secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to generate a message
      sendMessage();
    }

  }, 1000);
};

function sendMessage() {

  if (confirm('Gameover!" + " Would you like to view your score?')) {
   
    return top5();
  } else {
    return mainPage();
  }
};

function QuizStart() {
  // questioncount = 0;
  // score = 0;
  LoadQuestions();
}

function LoadQuestions() {
  // checkanswer.innerHTML = '';

  CurrentQues = Answerslist[questioncount];
  questNum = questioncount + 1;

  QuestionsEl.innerHTML = questNum + ". " + CurrentQues.question;

  CurrentQues.answers.forEach(answer => {
    button = document.createElement("button");
    button.innerHTML = answer;
    button.classList.add("choiceBtn");
    AnswerEl.appendChild(button);
    button.addEventListener('click', countClicks);
    button.addEventListener('click', NxtQuest);
  });
  console.log(CurrentQues)

 
};

function EndQues() {

  let options = document.querySelectorAll('.choiceBtn');

  for (let i = 0; i < options.length; i++) {
    options[i].style.display = "none";
  }
  scoreBtnEl.style.display = 'flex';

}


function NxtQuest() {

  if (questioncount == Answerslist.length - 1) {
    return savescore()

  } else {

    questioncount++

    CurrentQues = Answerslist[questioncount];
    questNum = questioncount + 1;

    QuestionsEl.innerHTML = questNum + ". " + CurrentQues.question;

    let options = document.querySelectorAll('.choiceBtn');
    for (let i = 0; i < options.length; i++) {
      options[i].innerHTML = CurrentQues.answers[i];

      
    }
  };


};



function countClicks() {

  console.log(questioncount)
  console.log(Answerslist.length)
  if (questioncount == Answerslist.length) {
    // if (questioncount == Answerslist.length - 1) {
    return top5()
    top5()
  } else {
    console.log(this.textContent)
    console.log(Answerslist[questioncount].correct)
    correctanswer = Answerslist[questioncount].correct
    if (this.textContent == Answerslist[questioncount].correct) {
      score = score + 1;
      checkanswer.innerHTML = 'Correct';
    } else {
      secondsLeft -= 25
      checkanswer.innerHTML = 'Incorrect';
    }
  }
};


// create event thats starts once the button is click
strtBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  QuestionsEl.innerHTML = Answerslist[questNum];

  timerupdate();
  QuizStart();
  strtBtnEl.style.display = "none";
  AnswerEl.style.display = "flex";
  scoreBtnEl.style.display = 'none';

});


function savescore() {

  let initial = prompt('Enter your Initial');
  console.log(initial, ' ', score);

  
  // var newScore = { score: score, initial: initial };
  // userStorage.push(newScore);
  // console.log(userStorage);
  // window.localStorage.setItem("userScore", JSON.stringify(userStorage));
  
  // var lastScore = JSON.parse(localStorage.getItem('userScore'));
  
  if (initial !== "" || initial !== null) {
    return top5();
  } else {
    return mainPage;
  }


};


console.log(userStorage);



