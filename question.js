function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};




function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1 >Result</h1><br><h2>Total number of questions: 5</h2>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>"+"<br>"+"you can now close the window.";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
let timeout;


var timeleft = 20;
var Timer = setInterval(function () {
    if (timeleft <= 0) {
        clearInterval(Timer);
        document.getElementById("countdown").innerHTML = "Finished";
        showScores();
    } 
    else if (quiz.isEnded()) {
        clearInterval(Timer);
        document.getElementById("countdown").innerHTML = "Finished";
        showScores();
    }
     else {
        document.getElementById("countdown").innerHTML =  timeleft ;
    }
    timeleft -= 1;
}, 1000);




var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML", "CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Which of the following methods can be used to display data in some form using Javascript ?", ["document.write", "console.log", "window.alert", "All"], "All")
];


var quiz = new Quiz(questions);


populate();