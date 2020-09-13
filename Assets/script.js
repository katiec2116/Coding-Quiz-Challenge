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

// timer function
  function startTimer() {
    var timeLeft = 60;
    var timerText = document.getElementById("timer");
    var timeInterval = setInterval(function() {
      timerText.textContent = "Time remaining: "+ timeLeft;
      timeLeft--;
  
      if (timeLeft === 0) {
        timerText.textContent = "";
        gameOver();
        clearInterval(timeInterval);
      }
  
    }, 1000);


  }

  var startButton = document.getElementById("start")
  startButton.addEventListener("click", function(){
      startTimer();
      startButton.style.display = "none";
      showQuestions();
    //   showQuestions();
  });


  function showQuestions(){
      
  }