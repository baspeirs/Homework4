var parentList = document.querySelector('#questionSection')
var startQuiz = document.querySelector('#startBtn');
var time = document.querySelector('#counter');
var questionList = document.querySelector("#questionsBox");
var secondsLeft = 90; 
var questionIndex = 0;
var questionText = document.getElementById('question');
var answerText = document.querySelectorAll('.btn')
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
function setQuestion() {
    // create new div and append it to questionList
    newDiv = document.createElement('div');
    newDiv.classList.add('btn');
    // create an empty array to store value
    let questionName = [];
    // grab the index of the questions array and put it on the page
    questionName.push(questions[x].question)
    questionText.innerHTML = questionName;
    // use a loop to add the asnwers to the buttons
    for (let i = 0; i < questions[x].answers.length; i++) {
        const button = document.createElement('button');
        console.log(button)
        if (questions[x].answers[i].correct === true) {
            button.dataset.correct = true
        }
        console.log(button.dataset.correct)
        button.innerText = questions[x].answers[i].text;
        newDiv.appendChild(button)
        questionList.appendChild(newDiv)}

    x = x + 1;
    console.log(x)
    questionList.addEventListener("click", selectAnswer)

        
};
    
function selectAnswer(event){
    newDiv.classList.add('hide');
    event.target.matches('Button')
    const selectedButton = event.target;
    if (selectedButton === true) {
        rightAnswer()
    }
    else {
        wrongAnswer()
    }
    setQuestion();
};

function rightAnswer() {
    console.log("True")
}
function wrongAnswer() {
    console.log("False")
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
        //create a function for ending the quiz if timer runs out
        }
    
    }, 1000);
    console.log(secondsLeft)
    // hide the initialContent
    document.getElementById('initialContent').classList.add('hide');
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