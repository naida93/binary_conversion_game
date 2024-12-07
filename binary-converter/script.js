let binarySlots = [0, 0, 0, 0];
let decimalNumber = Math.floor(Math.random() * 16);
let targetBinary = decimalNumber.toString(2).padStart(4, '0');
let score = 0;
let timeLimit = 20;
let timer;
let feedbackTimeout;
let gameOver = false;


const decimalValueEl = document.getElementById('decimal-value');
const timerBar = document.getElementById('timer-bar');
const checkButton = document.getElementById('check-answer-button');
const nextButton = document.getElementById('next-task-button');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score-value');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');


function startGame() {
    decimalValueEl.textContent = decimalNumber;
    renderBinarySlots();
    updateScore();
    startTimer();
}


function renderBinarySlots() {
    const slotContainer = document.getElementById('slot-container');
    slotContainer.innerHTML = ''; // Clear previous slots
    binarySlots.forEach((slot, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('slot');
        if (slot === 1) slotDiv.classList.add('active');
        slotDiv.textContent = slot;
        slotDiv.onclick = () => toggleBinarySlot(index);
        slotContainer.appendChild(slotDiv);
    });
}


function toggleBinarySlot(index) {
    if (gameOver) return;
    binarySlots[index] = binarySlots[index] === 0 ? 1 : 0;
    renderBinarySlots();
}


function startTimer() {
    clearInterval(timer);
    let timeLeft = timeLimit;
    timerBar.value = 100;

    timer = setInterval(() => {
        timeLeft -= 1;
        timerBar.value = (timeLeft / timeLimit) * 100;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showFeedback("Time's up!", false);
            gameOver = true;
            showGameOverScreen();
        }
    }, 1000);
}


function checkAnswer() {
    if (gameOver) return;

    const playerBinary = binarySlots.join('');
    const targetBinary = decimalNumber.toString(2).padStart(4, '0');

    if (playerBinary === targetBinary) {
        score += 1;
        showFeedback('Correct!', true);
    } else {
        score -= 1;
        showFeedback('Incorrect. Try again!', false);
    }

    updateScore();
}


function showFeedback(message, isCorrect) {
    clearTimeout(feedbackTimeout);
    feedbackEl.textContent = message;
    feedbackEl.classList.add(isCorrect ? 'correct' : 'incorrect');
    feedbackEl.classList.add('show');

    feedbackTimeout = setTimeout(() => {
        feedbackEl.classList.remove('show');
    }, 2000);
}


function updateScore() {
    scoreEl.textContent = score;
}
function showGameOverScreen() {
    finalScoreEl.textContent = score;
    gameOverScreen.classList.add('show');
}


function restartGame() {
    gameOver = false;
    binarySlots = [0, 0, 0, 0];
    decimalNumber = Math.floor(Math.random() * 16);
    targetBinary = decimalNumber.toString(2).padStart(4, '0');
    startGame();
    gameOverScreen.classList.remove('show');
    startTimer();
}


nextButton.onclick = function () {
    if (gameOver) return;
    decimalNumber = Math.floor(Math.random() * 16);
    targetBinary = decimalNumber.toString(2).padStart(4, '0');
    binarySlots = [0, 0, 0, 0];
    startGame();
};

checkButton.onclick = checkAnswer;

startGame();
