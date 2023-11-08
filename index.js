const questions = [
    {
        question: "Which HTML tag is used for creating a hyperlink?",
        answers: [
            { text: "<a>", correct:"true"},
            { text: "<link>", correct:"false"},
            { text: "<href>", correct:"false"},
            { text: "<url>", correct:"false"},
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Display Object Model", correct:"false"},
            { text: "Document Object Model", correct:"true"},
            { text: "Data Object Model", correct:"false"},
            { text: "Document Order Model", correct:"false"},
        ]
    },
    {
        question: "What does the 'let' keyword do in JavaScript?",
        answers: [
            { text: "Declares a variable", correct:"true"},
            { text: "Defines a constant", correct:"false"},
            { text: "Loops through an array", correct:"false"},
            { text: "Creates a function", correct:"false"},
        ]
    },
    {
        question: "Which CSS property is used for controlling the text size?",
        answers: [
            { text: "text-size", correct:"false"},
            { text: "font-style", correct:"false"},
            { text: "text-style", correct:"false"},
            { text: "font-size", correct:"true"},
        ]
    },
    {
        question: "Which event is fired when an HTML form is submitted?",
        answers: [
            { text: "onclick", correct:"false"},
            { text: "onchange", correct:"false"},
            { text: "onsubmit", correct:"true"},
            { text: "onload", correct:"false"},
        ]
    },
    {
        question: "What is the purpose of the 'for' loop in JavaScript?",
        answers: [
            { text: "Iterate over elements in an array", correct:"true"},
            { text: "Define a function", correct:"false"},
            { text: "Create a new HTML element", correct:"false"},
            { text: "Change the page's background color", correct:"false"},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheet", correct:"true"},
            { text: "Creative Style Sheet", correct:"false"},
            { text: "Computer Style Sheet", correct:"false"},
            { text: "Colorful Style Sheet", correct:"false"},
        ]
    },
    {
        question: "Which HTML element is used to define the structure of an HTML document?",
        answers: [
            { text: "<head>", correct:"false"},
            { text: "<structure>", correct:"false"},
            { text: "<body>", correct:"false"},
            { text: "<html>", correct:"true"},
        ]
    },
    {
        question: "How do you define a function in JavaScript?",
        answers: [
            { text: "def myFunction():", correct:"false"},
            { text: "function = myFunction() { }", correct:"false"},
            { text: "function myFunction() { }", correct:"true"},
            { text: "myFunction: function() { }", correct:"false"},
        ]
    },
    {
        question: "What does 'API' stand for in web development?",
        answers: [
            { text: "Advanced Program Integration", correct:"false"},
            { text: "Application Programming Interface", correct:"true"},
            { text: "All Program Interaction", correct:"false"},
            { text: "Application Process Interface", correct:"false"},
        ]
    },

    
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Got ${score} Out Of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();