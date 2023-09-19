var Answerslist = [
    {   q: 'What does CSS stand for?',
        a: [
          { text: "Casual Style Sheets", correct: false},  
          { text: "Casual Sheets Sheets", correct: false},  
          { text: "Cascading Style Sheets", correct: true},  
          { text: "Cascading Style Shots", correct: false},  
        ]
    },

    {   q: 'What is the name of the data type that take the values true or false?',
        a: [
            { text: "Boolean", correct: true},  
            { text: "String", correct: false},  
            { text: "Number", correct: true},  
            { text: "Java", correct: false},  
          ]  
    },

    {   q:  'Is JavaScript and Java the same?',
        a: [
            { text: "Yes", correct: false},  
            { text: "No", correct: false},  
            { text: "Maybe", correct: true},  
            { text: "None of Above", correct: false},  
          ]
    },

    {   q: 'What is the command use to stop the loop?',
        a: [ 
            { text: "stop", correct: false},  
            { text: "pause", correct: false},  
            { text: "break", correct: true},  
            { text: "hold", correct: false},  
          ]
    }
];
var QuestionsEl = document.getElementById('QuesText');
var AnswerEl = document.getElementById('answerlist')
var strtBtnEl = document.getElementById('startbtn');
var scoreBtnEl = document.getElementById('scorebtns')
var clockcountdown = document.getElementById('time');
var scores = document.querySelector("ul");
var header = document.querySelector("header");
var scoreStorage = JSON.parse(localStorage.getItem("topscores"));
var userStorage = JSON.parse(localStorage.getItem("UserScore"));
var score = 0;
var questioncount = 0;
var secondsLeft = 65;


if (scoreStorage === null) {
  userStorage = ["1", "2", "3", "4", "5"];
  scoreStorage = ["1", "2", "3", "4", "5"];
}

function top5() {
  header.textContent = "";
  QuestionsEl.textContent = "Top 5 high scores";
  strtBtnEl.setAttribute("style", "display:none");
  scoreBtnEl.textContent = "Return";
  var ListScore = [""];

// for lopps for the user score value
  for (i=0; i<5; i++) {
    ListScore[1] = document.createElement("li");
    ListScore[1].textContent = userStorage[i] + " -----" + scoreStorage[i];
    scores.appendChild(ListScore[i]);
  }

  scoreBtnEl.removeEventListener("click", top5);
  scoreBtnEl.addEventListener("click", mainPage);
}
//  creating a function for the main pagee
function mainPage() {
  scores.header.textContent="Welcome to the coding Quiz!";
  QuestionsEl.textContent="Welcomd! Let the Quiz begin!";
  strtBtnEl.setAttribute("style", "display:row");
  scoreBtnEl.textContent="View Score";
  scoreBtnEl.removeEventListener("click", mainPage);
  scoreBtnEl.addEventListener("click", top5);
}
scoreBtnEl.addEventListener("click", top5);




function timerupdate() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      clockcountdown.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to generate a message
        sendMessage();
      }
  
    }, 1000);
  };
   
  function sendMessage() {
    clockcountdown.textContent = "Gameover!" +  " Would you like to view your score?";
  }
  
  function QuizStart() {
    questioncount = 0;
    score = 0;
    LoadQuestions();
  }

  function LoadQuestions() {
    var CurrentQues = Answerslist[questioncount];
    var questNum = questioncount + 1;
    QuestionsEl.innerHTML = questNum+ ". " + CurrentQues.q

    CurrentQues.a.forEach(answer => {
      var button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("choiceBtn");
      AnswerEl.appendChild(button);
    });
  }

// create event thats starts once the button is click
strtBtnEl.addEventListener("click", function() {
    
    timerupdate()
    // LoadQuestions()
    QuizStart()
    AnswerEl.style.display = "flex";
  

});






