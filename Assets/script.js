var questions = [
    {
        title: "Example Question 1:",
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        answer: "Choice 1"
    },
    {
        title: "Example Question 2:",
        choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
        answer: "Choice A"
    },
    {
        title: "Example Question 3:",
        choices: ["dfg 1", "agg 2", "agr 3", "nhh 4"],
        answer: "dfg 1"
    },
    {
        title: "Example Question 4:",
        choices: ["sfg 1", "ggg 2", "gnbs 3", "sfgng 4"],
        answer: "sfg 1"
    },
    {
        title: "Example Question 5:",
        choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
        answer: "Choice A"
    },
    {
        title: "Example Question 6:",
        choices: ["dfg 1", "agg 2", "agr 3", "nhh 4"],
        answer: "dfg 1"
    },
    {
        title: "Example Question 7:",
        choices: ["sfg 1", "ggg 2", "gnbs 3", "sfgng 4"],
        answer: "sfg 1"
    }
    ,
    {
        title: "Example Question 8:",
        choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
        answer: "Choice A"
    },
    {
        title: "Example Question 9:",
        choices: ["dfg 1", "agg 2", "agr 3", "nhh 4"],
        answer: "dfg 1"
    },
    {
        title: "Example Question 10:",
        choices: ["sfg 1", "ggg 2", "gnbs 3", "sfgng 4"],
        answer: "sfg 1"
    }
];

let currentIndex = 0
var timeLeft = 60;
var content = document.getElementById("content");



function gameOver(){
    document.getElementById('buttonDiv').innerHTML = '';
    document.getElementById('header').innerHTML = 'All Done!';
    var myscore = document.createElement("p");
    if (timeLeft < 0){
        var score= 0
    }
    else{
        score = timeLeft;
    }
    myscore.innerHTML = "Your score is " + score  + "!";
    var initialForm= document.createElement("form");
    var form = document.createElement("input"); 
    var sButton = document.createElement("input"); 
    form.setAttribute("type", "text"); 
    form.setAttribute("name", "Name"); 
    form.setAttribute("placeholder", "Enter your name"); 
    sButton.setAttribute("type", "submit"); 
    sButton.setAttribute("value", "Submit");
    sButton.classList.add("endButton");
    sButton.style.margin = "10px";
    content.appendChild(myscore);
    content.appendChild(initialForm);
    initialForm.appendChild(form);
    initialForm.appendChild(sButton);
    var goBack = document.createElement("button");
    goBack.classList.add("endButton");
    goBack.innerHTML = "Go Back";
    content.appendChild(goBack);
    goBack.addEventListener("click", function () {
        location.reload();
    });

    // add ol and display high scores
}

// starts quiz, button disappears on click, calls startTimer and calls showQuestions
var startButton = document.getElementById("start")
startButton.addEventListener("click", function () {
    startTimer();

    // make start button disappear
    startButton.style.display = "none";
    newQuestion();
});

// timer function
function startTimer() {
    // var timeLeft = 60;
    var timerText = document.getElementById("timer");
    var timeInterval = setInterval(function () {
        timerText.textContent = "Time remaining: " + timeLeft;
        timeLeft--;

        if (timeLeft <= 0 || currentIndex === questions.length) {
            timerText.textContent = "";
            gameOver();
            clearInterval(timeInterval);
        }
    }, 1000);
}

// currentQues = questions[currentIndex];
function newQuestion() {
    currentQues = questions[currentIndex];
    showQuestions(currentQues);
}
// creating div and header to display question
var questDiv = document.getElementById("buttonDiv");
questDiv.classList.add("btn-group-vertical")

function showQuestions(question) {
    var myQ = document.createElement("h2");
    myQ.classList.add("question");
    questDiv.appendChild(myQ);
    myQ.innerText = question.title;
    // call function to display answer buttons
    answerButton(question.choices);

    // create answer button for each option
    function answerButton(numChoices) {
        for (var c = 0; c < numChoices.length; c++) {
            var choice = document.createElement("button");
            choice.classList.add("answer-btn");
            choice.innerText = numChoices[c]
            questDiv.appendChild(choice);

            // compare if answer choice is right and add class accordingly
            var correct = currentQues.answer;

            if (choice.textContent === correct) {
                choice.classList.add("correct-answer");
            }
            else {
                choice.classList.add("wrong-answer");
            }
        }
    }

    // reset screen to load new question and answers when correct button is clicked
    // and display correct!
    var correctClick = document.querySelector(".correct-answer");

    correctClick.addEventListener("click", function () {
        function reset() {
            currentIndex++
            document.getElementById('buttonDiv').innerHTML = ''
        }
        reset();
        newQuestion();
        var correctWord = document.createElement("h5");
        correctWord.classList.add("correctResult");
        correctWord.innerHTML="Correct!";
        correctWord.classList.add("result");
        questDiv.appendChild(correctWord);
    });

    // reset screen to load new question and answers when wrong button is clicked
    // and display wrong!
    var wrongClick = document.querySelectorAll(".wrong-answer").forEach(wrongClick => {
    wrongClick.addEventListener("click", function () {
        function reset() {
            currentIndex++
            document.getElementById('buttonDiv').innerHTML = '';
        }
        timeLeft = timeLeft - 10;
        reset();
        newQuestion();
        var wrongWord = document.createElement("h5");
        wrongWord.classList.add("wrongResult");
        wrongWord.innerHTML="Wrong!";
        wrongWord.classList.add("result");
        questDiv.appendChild(wrongWord);
    });
  })
}

