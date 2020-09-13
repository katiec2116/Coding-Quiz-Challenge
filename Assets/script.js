var questions = [
    {
        title: "Example Question 1:",
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        answer: "Choice 1"
    },
    {
        title: "Example Question 2:",
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        answer: "Choice 2"
    },
    {
        title: "Example Question 1:",
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        answer: "Choice 3"
    },
    {
        title: "Example Question 2:",
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        answer: "Choice 4"
    }
];

var shuffleQ
let currentQ = 0

// timer function
function startTimer() {
    var timeLeft = 60;
    var timerText = document.getElementById("timer");
    var timeInterval = setInterval(function () {
        timerText.textContent = "Time remaining: " + timeLeft;
        timeLeft--;

        if (timeLeft === 0) {
            timerText.textContent = "";
            // gameOver();
            clearInterval(timeInterval);
        }

    }, 1000);

}
// starts quiz, button disappears on click, calls startTimer and calls showQuestions
var startButton = document.getElementById("start")
startButton.addEventListener("click", function () {
    startTimer();
    startButton.style.display = "none";
    newQuestion();
    //   showQuestions();
});


function newQuestion() {
    currentQues = questions[currentQ];
    currentQ++
    showQuestions(currentQues);
}

// creating an element to display question
function showQuestions(question) {
    var myQ = document.createElement("h2");
    var questDiv = document.getElementById("buttonDiv");
    myQ.class = "question";
    questDiv.appendChild(myQ);
    myQ.innerText = question.title;

    answerButton(question.choices);


    // create answer button for each option

    function answerButton(choices) {
        for (var c = 0; c < choices.length; c++) {
            const answer = document.createElement("button");
            answer.classList.add('answer-btn');
            answer.innerText = choices[c]
            questDiv.appendChild(answer);
            console.log(answer)
            

        }
    }
}