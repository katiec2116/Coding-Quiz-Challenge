// hook elemeents from page
// hook question container elements
var displayQuestionsEl = document.querySelector(".display-questions");
// hook timer element
var timerEl = document.querySelector(".timer");
// hook results element
var resultsEl = document.querySelector(".results");
// create h3 to show instructions test and questions
var mainDisplay = document.createElement("h3");
// ceate button to start quix
var startBtn = document.createElement("button");
startBtn.classList.add("button", "float-center");

var hs = document.createElement("p");
var initialForm = document.createElement("form");
var form = document.createElement("input");
var sButton = document.createElement("input");
var goBack = document.createElement("button");


// declare globals
// one to store timer number
var timer = 60;
// one to store current index
var index = 0;
// element to show answer result
var resultDisplay = document.createElement("p");
var score = 0;
let highscores = [];



// FUNCTIONS

// call function to show opening page
onLoad();

// add event listener to start quiz
startBtn.onclick = startQuiz;

// function that loads the contents when page first loads
function onLoad() {
    mainDisplay.textContent= "press the button to start";
    startBtn.textContent = "Start";
    displayQuestionsEl.append(mainDisplay, startBtn);
    hs.setAttribute("class", "float-left");
    hs.innerHTML = "Link to Highscores";
    timerEl.prepend(hs);

}

// function that shows the question and starts the timer
function startQuiz(){
    // show timer function
    showTimer();
    nextQuestion();

}

// function that handles the timer
function showTimer(){
    // display timer to screen
    timerEl.textContent="Time remaining: " + timer;
    // create setInterval and store it to a variable
    var questionTimer = setInterval(function(){
        timer--
        // display timer to the screen
        timerEl.textContent="Time remaining: " + timer;
        // if timer gets to 0 clear interval
        if (timer <= 0){
            clearInterval(questionTimer)
        }
    }, 1000)
}

// finction that handles and dispalys the next question
function nextQuestion(){
    // declare a variable to store current q index. Assign to current q
    var currentQuestion = questions[index]
    // empty question container element;
    displayQuestionsEl.textContent = "";
    // add current question to container
    mainDisplay.textContent=currentQuestion.title;
    // append text to show
    displayQuestionsEl.append(mainDisplay);
    // create div element to wrap choices
    var choicesContainer = document.createElement("div");
    choicesContainer.classList.add("buttonDiv");
    // use a loop to -- Change to for Each
    for (choice in currentQuestion.choices) {
        // create button for choices
        var choiceBtn = document.createElement("button");
        choiceBtn.textContent = currentQuestion.choices[choice];
        // add click event listener to check for answer
        choiceBtn.onclick = checkAnswer;
        choicesContainer.append(choiceBtn);
    }
    displayQuestionsEl.append(choicesContainer);
}

// function to check the answer and display following question
function checkAnswer(event){
    // logic to check answer
        resultDisplay.setAttribute("class", "result")
        var responseText = event.target.textContent;
        if (responseText === questions[index].answer) {
            index++
    
            if(timer <= 0 || index == questions.length){
                gameOver();
            }
            else{
            nextQuestion();
            resultDisplay.innerHTML = "Correct!";
            displayQuestionsEl.appendChild(resultDisplay);
            }
        } 
    
        else {
            timer = timer-10;
            index++
            if(timer <= 0 || index == questions.length){
                gameOver()
            }
            else{
            nextQuestion();
            resultDisplay.innerHTML = "Wrong!";
            displayQuestionsEl.appendChild(resultDisplay);
            }
    
        }
    }
    // go to ending page when timer hits zero or no questions left
    function gameOver(){
        if (timer < 0) {
            score = 0
        }
        else {
            score = timer;
        }
        // create elements for form 
        timerEl.style.display = "none";
        resultDisplay.style.display="none";
        var bottomDiv = document.querySelector(".buttonDiv");
        bottomDiv.innerHTML= "";
        mainDisplay.textContent = "Your score is " + score+ "!";
        form.setAttribute("type", "text");
        form.setAttribute("name", "Name");
        form.setAttribute("placeholder", "Enter your name");
        sButton.setAttribute("type", "submit");
        sButton.setAttribute("value", "Submit");
        sButton.classList.add("endButton");
        sButton.style.margin = "10px";
        bottomDiv.appendChild(initialForm);
        initialForm.appendChild(form);
        initialForm.appendChild(sButton);
        goBack.classList.add("endButton");
        goBack.innerHTML = "Go Back";
        bottomDiv.appendChild(goBack);
    
    }

