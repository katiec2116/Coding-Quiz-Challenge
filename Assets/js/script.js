// hook elements from page

// hook question container elements
var displayQuestionsEl = document.querySelector(".display-questions");
// hook timer element
var timerEl = document.querySelector(".timer");
// hook results element
var resultsEl = document.querySelector(".results");
// create h3 to show instructions test and questions
var mainDisplay = document.createElement("p");
// ceate button to start quix
var startBtn = document.createElement("button");
startBtn.classList.add("button");
var hs = document.createElement("button");
hs.classList.add("hsButtons");
var initialForm = document.createElement("form");
var form = document.createElement("input");
var sButton = document.createElement("input");
var goBack = document.createElement("button");


// declare globals
// one to store timer number
var timer = 75;
// one to store current index
var index = 0;
// element to show answer result
var resultDisplay = document.createElement("p");
var score = 0;
let highscores = [];



// FUNCTIONS
// call function to show opening page
onLoad();
init();


// add event listener to start quiz
startBtn.onclick = startQuiz;

// function that loads the contents when page first loads
function onLoad() {
    mainDisplay.textContent= "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    startBtn.textContent = "Start";
    displayQuestionsEl.append(mainDisplay, startBtn);
    hs.innerHTML = "Link to Highscores";
    document.getElementById("container").append(hs);

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
            gameOver();
        }
    }, 1000)
}

// finction that handles and dispalys the next question
function nextQuestion(){
    // declare a variable to store current q index. Assign to current q
    var currentQuestion = questions[index];
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
        choiceBtn.classList.add("answer-btn");
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
            if(index == questions.length){
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
            if(index == questions.length){
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

// reload to home page when go back button is clicked
goBack.addEventListener("click", function () {
    location.reload()
});

hs.addEventListener('click', function(){
    displayQuestionsEl.innerHTML="";
    document.getElementById("title").textContent = "Highscores";
    storeScores();
    showHighscores();
});


// on submit , clear out button div 
// add data to local storage
// display high scores list
sButton.addEventListener("click", function(event) {
    event.preventDefault();
    var scoresText = form.value.trim() + " - " + score;

    // Return from function early if submitted form is blank
    if (form.value === "") {
        return;
    }

    // Add new score to the array & clear the input
    highscores.push(scoresText);
    form.value = "";
    document.getElementById("title").textContent = "Highscores";
    displayQuestionsEl.style.display = "none";
    storeScores();
    showHighscores();
});


function init() {
    // Check if there are highscores in localStorage
    // Parse the value from localStorage and assign it to the highscores variable
    let storedScores = JSON.parse(localStorage.getItem("highscores"));
    // check if local storage is empty
    if( storedScores !== null){
      // reassign array to stored values
      highscores = storedScores;
    }
}

// store scores in local storage
function storeScores() {
    // stringify the highscore array and save it in localStorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
}


// display scores from local storage
function showHighscores() {
    // Clear element
    var home = document.createElement("button");
    var clear = document.createElement("button");
    clear.classList.add('hsButtons')
    home.classList.add("hsButtons")
    hs.style.display="none";
    home.textContent= "Go Back";
    clear.textContent = "Clear Highscores"

    var table = document.createElement("ol");
    resultsEl.appendChild(table);

  
    // Render a new li for each todo
    for (var i = 0; i < highscores.length; i++) {
      var score = highscores[i];
  
      var li = document.createElement("li");
      li.textContent = score;
      table.appendChild(li);
    }
    home.addEventListener("click", function () {
        location.reload();
    });

    clear.addEventListener("click", function(){
        localStorage.clear();
        table.textContent = "";
    });
    resultsEl.append(home, clear);
}

