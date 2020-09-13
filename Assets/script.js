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
        answer:"dfg 1"
    },
    {
        title: "Example Question 4:",
        choices: ["sfg 1", "ggg 2", "gnbs 3", "sfgng 4"],
        answer: "sfg 1"
    }
];

let currentIndex = 0

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

    // make start button disappear
    startButton.style.display = "none";
    newQuestion();
});

    function newQuestion() {
        currentQues = questions[currentIndex];
        console.log(currentQues);
        console.log(currentIndex);
        showQuestions(currentQues);
    }

    // creating div and header to display question
    function showQuestions(question) {
        var myQ = document.createElement("h2");
        var questDiv = document.getElementById("buttonDiv");
        myQ.classList.add("question");
        questDiv.appendChild(myQ);
        myQ.innerText = question.title;

        // call function to display answer buttons
        answerButton(question.choices);


        // create answer button for each option
        function answerButton(choices) {
            for (var c = 0; c < choices.length; c++) {
                var choice = document.createElement("button");
                choice.classList.add("answer-btn");
                choice.innerText = choices[c]
                questDiv.appendChild(choice);


                // compare if answer choice is right and add class accordingly
                var correct = question.answer
                if (choice.textContent === correct) {
                    choice.classList.add("correct-answer");

                }
                else {
                    choice.classList.add("wrong-answer");
                }
                console.log(choice);
            }

        }
        // reset screen to load new question and answers when correct button clicked
        var correctClick = document.querySelector(".correct-answer");

        console.log(correctClick);
        correctClick.addEventListener("click", function () {
            function reset() {
                currentIndex++
                document.getElementById('buttonDiv').innerHTML = ''
                
                }
            reset();
            newQuestion();
        });


        // reset screen to load new question and answers and ding time when wrong answer clicked
        var wrongClick = document.querySelectorAll(".wrong-answer");

        console.log(wrongClick);
        wrongClick.addEventListener("click", function () {
            function reset() {
                currentIndex++
                document.getElementById('buttonDiv').innerHTML = '';
                }
            reset();
            newQuestion();
        });
    }

