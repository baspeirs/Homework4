var startQuiz = document.querySelector('#startBtn');
var scoreList = document.querySelector('#highScores')
var frontContent = document.getElementById('initialContent');
var time = document.querySelector('#counter');
var questionList = document.querySelector("#questionsBox");
var secondsLeft = 90; 
var questionIndex = 0;
var questionText = document.getElementById('question');
var answerText = document.querySelectorAll('.btn')
var scorePage = document.querySelector('#finalContent')
var initialsInput = document.querySelector('#initialsInput');
var submittedScore = document.querySelector('#submitScore');
var finalScore = document.querySelector('#finalScore');
var highScoreSet = {
    initials: highScoreSet,
    score: submittedScore
}
var lastUser = localStorage.getItem("highscore");
lastUser = JSON.parse(lastUser)
console.log(lastUser)
// create a function to be called when the page loads to generate a list of the high scores
function scoreListGenerate() {
    let listItem = document.createElement('li')
    listItem.textContent = "Initials: " + lastUser.initials + " score: " + lastUser.score;
    scoreList.appendChild(listItem)
    
}
scoreListGenerate();
//frontContent.appendChild(lastUser)
function endQuiz () {
    scorePage.classList.remove('hide');
    questionList.classList.add('hide');
    time.classList.add('hide');
    finalScore.textContent = score;
    submittedScore.addEventListener('click', function() {
        var highScoreSet = {
            initials: initialsInput.value,
            score: submittedScore.value
        }
        highScoreSet.initials = initialsInput.value
        highScoreSet.score = score
        let userScore = JSON.stringify(highScoreSet)
        localStorage.setItem('highscore', userScore)
        
        console.log(highScoreSet)
    })
    
}
   // an array of objects for each quesiton and their corrisponding answers + boolean values
var questions = [
    {question: "What is the purpose of a milkshake?",
    answers: [
        {text: "To bring the boys to the yard.", correct: true},
        {text: "To create a tasty alternative to ice cream.", correct: false},
        {text: "To give consumers a brain freeze.", correct: false},
        {text: "To be thick.", correct: false} 
    ]},
    
    {question: "How much wood would a wood chuck chuck, if a woodchuck could chuck wood?",
    answers: [
        {text: "Well, they don't chuck wood so it does not matter.", correct: false},
        {text: "I'd say a solid 40 hours a weeks worth of wood chucking", correct: false},
        {text: "17", correct: true},
        {text: "Do woodchucks even exist?", correct: false} 
    ]},

    {question: "Choose the correct starter Pok-e-mon",
    answers: [
        {text: "Squirtle.", correct: false},
        {text: "Charmander.", correct: true},
        {text: "Bulbasaur.", correct: false},
        {text: "they are all equal.", correct: false} 
    ]}
];
// create a variable with one parameter we will call question
var newDiv;

// function for setting and showing the next quesiton
// create an index number to increase through each iteration
var x = 0;

var score = 0;

function setQuestion() {
    if (x === questions.length) {
        endQuiz()
    }
    console.log(x)
    // create new div and append it to questionList
    newDiv = document.createElement('div');
    newDiv.classList.add('newQuestion');
    // create an empty array to store value
    let questionName = [];
    // grab the index of the questions array and put it on the page
    questionName.push(questions[x].question)
    questionText.innerHTML = questionName;
    // use a loop to add the asnwers to the buttons
    for (let i = 0; i < questions[x].answers.length; i++) {
        const button = document.createElement('button');
        button.classList.add('btn')
        if (questions[x].answers[i].correct === true) {
            button.dataset.correct = true
        }
        else {
            button.dataset.correct = false
        }
        
        button.innerText = questions[x].answers[i].text;
        newDiv.appendChild(button)
        questionList.appendChild(newDiv)}

    x = x + 1;
    
    questionList.addEventListener("click", selectAnswer)
};
    
function selectAnswer(event){
    newDiv.classList.add('hide');
    if (event.target.matches('Button')) {
        const selectedButton = event.target;
        console.log(selectedButton)
        
        if (selectedButton.dataset.correct === "true") {
           rightAnswer()
        }
        else {
           wrongAnswer()
        }
    }
        setQuestion();
};

function rightAnswer() {
    console.log("This one logged True")
    score = score + 1
}
function wrongAnswer() {
    console.log("This one logged False")
}


// function timeOut();

// create a start button quiz that does 2 things
    // 1) starts a timer (you've done this before, go back through previous excersizes)
    // 2) starts the quiz. we want it to hide the start button, and show the first question
startQuiz.addEventListener('click', function() { 
    // start the timer 
    var timerInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = secondsLeft + " seconds left.";
        
        if(secondsLeft === 0) {
        clearInterval(timerInterval);
        endQuiz()
        }
    
    }, 1000);
    console.log(secondsLeft)
    // hide the initialContent
    frontContent.classList.add('hide');
    // now call the function to start the questions
    questionList.classList.remove('hide');
    setQuestion();


})
    

// every time a question is answered we need to
    // 1) remove the current question and present another (until done)
    // 2) keep score (wrong answers reduce time)
// when questions run out, or time runs out, we need to 
    // 1) present the score
    // 2) leave a form to submit initials
    // 3) save the form to localStorage so it can be accessed later


    // take the first question from the array, this will be an object
    // grab the title of the question and put it on the page with JS
    // grab the answers of the question
        // loop through the answers
        // put the answers in individual buttons
        // have some data on the buttons indicating the value inside (data-ans......)
        // event listener for the buttons
            // when button clicked, grab the VALUE  of the button and 
                // if right, score go up
                // if wrong, score go down
            // after comparison and score calculation,
                // old question disappears, new question appears
                // increase the counter by 1 to cycle to the next question
                // repeat everything done above
            // when the counter reaches the last number of the array
                // dont show next question, show the final score page + submit for high scores.