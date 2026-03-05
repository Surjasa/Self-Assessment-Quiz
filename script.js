const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which language is used for we development?",
        options: ["Python", "JavaScript", "C#", "Java"],
        answer: "JavaScript"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Which courtry is known as the Land of Rising Sun?",
        options: ["China", "Japan", "South Korea", "Bangladesh"],
        answer: "Japan"
    }
];

let currentQuestion = 0;
let score = 0;
let timeleft = 30;
let timerInterval;
const timerEl = document.getElementById('time');
const questionEl = document.querySelector('.question');
const optionEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const scoreEl = document.querySelector('#score');
const restartBtn = document.querySelector('#restart-btn');

 // Function to load question
 function loadQuestion() {
    if(currentQuestion >= quizData.length) {

        endQuiz();
        return;
    }
    clearInterval(timerInterval);
    timerEl.textContent = timeleft;
    startTimer();
    const currentQuiz =
    quizData[currentQuestion];
    questionEl.textContent =
    currentQuiz.question;
    optionEl.innerHTML = '';
    resultEl.style.display = 'none'; // Hide the result
    restartBtn.style.display = 'none'; // Hide the retake button
     //Clear previous options
    currentQuiz.options.forEach(option => {
        const button =
        document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => 
            checkAnswer(option);
        optionEl.appendChild(button);
    });

 }
// Check the answer
    function checkAnswer(selectedOption) {
        if (selectedOption === 
            quizData[currentQuestion].answer) {
                score++;
            }
        currentQuestion++;
        loadQuestion();
    }
    // Start the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeleft--;
            timerEl.textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }
    // End the quiz and show the results
    function endQuiz() {
        clearInterval(timerInterval);
        questionEl.style.display = 'none';
        optionEl.style.display = 'none';
        resultEl.style.display = 'block';
        scoreEl.textContent = score;
        restartBtn.style.display = 'block';
    }

    // Restart the quiz
    restartBtn.addEventListener('click', () => {
        // Reset variables
        currentQuestion = 0;
        score = 0;
        timeleft = 30;
        timerEl.textContent = timeleft;

        // Reset the display
        questionEl.style.display = 'block';
        optionEl.style.display = 'flex'; 
        // Ensure options are diplayeed correctly
        resultEl.style.display = 'none';
        restartBtn.style.display = 'none';

        // Load the first question
        loadQuestion();   

    });
    // Initialize the quiz with the first question
    loadQuestion();
