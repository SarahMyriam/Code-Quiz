 // variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var questionTitle =document.getElementById("question-title")
var currentQuestionIndex = 0;
var localstorage = document.getElementById("highscores");
var scoreCount= 0;
var timer;
var highscores;

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  document.getElementById("start-screen").style.display = "none";
  // un-hide questions section
  document.getElementById("questions").style.display = "block"

  // start timer
 timer = setInterval(function() {
    clockTick()
  }, 1000);
 
  // show starting time

  getQuestion();
  
}

function getQuestion() {
  // get current question object from array
  questions[currentQuestionIndex];

  // update title with current question
  var questionTitle = document.getElementById ("question-title");
  questionTitle.innerText = questions [currentQuestionIndex].title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  for (var i = 0; i<questions[currentQuestionIndex].choices.length;i++){

    // create new button for each choice
    var choicesButton = document.createElement("button");
   
    // attach click event listener to each choice
    choicesButton.innerText = questions[currentQuestionIndex].choices[i]
    choicesButton.addEventListener("click" , questionClick);
    // display on the page
    choicesEl.appendChild(choicesButton);
  }
   
}

function questionClick() {
  // check if userinnerText)
  console.log(this.innerText)
  if (this.innerText != questions[currentQuestionIndex].answer){

    // penalize time
    if (time >=20){
      time -= 20;
    }
    if (time <=20){
      time =0
    }

     // display new time on page
     timerEl.textContent = time;

     // play "wrong" sound effect
     sfxRight.play();
     feedbackEl.textContent = "false";
  }  //else
     else {
     // play "right" sound effect
     sfxRight.play();
     feedbackEl.textContent = "true";
     scoreCount++;
  }
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class" , "feedback");
  setTimeout(function()
  {
    feedbackEl.setAttribute("class" , "feedback hide");
  } , 1000) ;

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex >= questions.length){
   console.log()
   quizEnd();
  } 
  else {
    getQuestion();
  }
} 


function quizEnd() {
  // stop timer
  console.log("end-quiz");
  clearInterval(timer);

  // show end screen
 var myEndScreen = document.getElementById("end-screen");
 
  // show final score
  document.getElementById("final-score").innerHTML = scoreCount;



  // hide questions section
  $("#end-screen").removeClass("hide");
  document.getElementById("questions").style.display = "none";
  console.log(scoreCount);
  
}

function clockTick() {
  // check if user ran out of time
  if (time <= 0){
    quizEnd ();
  }
  else{
        
    // update time
    time--;
    timerEl.textContent = time;
  }
}

function saveHighscore(){
  // get value of input box
  var initials = $("initials").val();
   // get saved scores from localstorage, or if not any, set to empty array
   highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  console.log(highscores);
  console.log(highscores);

  // make sure value wasn't empty
  if(initials !== ""){
   highscores.push(scoreCount);

   // format new score object for current user
   // save to localstorage

   highscores = window.localStorage.setItem("highscores", JSON.stringify(highscores));

   // redirect to next page
   window.localStorage.href ="highscores.html";

  }

}


function checkForEnter(event) {
  // check if event key is enter
  if (event.key === "enter"){
    // saveHighscore
     saveHighscore();
  }
    
}
// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;