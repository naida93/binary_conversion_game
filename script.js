// Constants
const slotsContainer = document.getElementById('binary-slots');
const decimalNumberEl = document.getElementById('decimal-number');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const feedbackEl = document.getElementById('feedback');
const checkAnswerBtn = document.getElementById('check-answer');
const nextTaskBtn = document.getElementById('next-task');

let binarySlots = [0, 0, 0, 0];
let decimalNumber = 0;
let score = 0;
let timeLimit = 20;
let timer;
let feedbackTimeout;

// Initialize Game
function initGame() {
  resetBinarySlots();
  generateDecimalNumber();
  updateScore();
  startTimer();
}

// Create binary slots
function createBinarySlots() {
  slotsContainer.innerHTML = '';
  binarySlots.forEach((slot, index) => {
    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');
    slotEl.textContent = slot;
    slotEl.addEventListener('click', () => toggleSlot(index, slotEl));
    slotsContainer.appendChild(slotEl);
  });
}

// Toggle a binary slot
function toggleSlot(index, slotEl) {
  binarySlots[index] = binarySlots[index] === 0 ? 1 : 0;
  slotEl.textContent = binarySlots[index];
  slotEl.classList.toggle('active', binarySlots[index] === 1);
}

// Reset binary slots
function resetBinarySlots() {
  binarySlots = [0, 0, 0, 0];
  createBinarySlots();
}

// Generate a random decimal number
function generateDecimalNumber() {
  decimalNumber = Math.floor(Math.random() * 16); // 0 to 15
  decimalNumberEl.textContent = decimalNumber;
}

// Update score display
function updateScore() {
  scoreEl.textContent = score;
}

// Start the timer
function startTimer() {
  clearInterval(timer);
  let timeLeft = timeLimit;
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft -= 1;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showFeedback('Time’s up!', false);
    }
  }, 1000);
}

// Check the player's answer
function checkAnswer() {
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

// Move to the next task
function nextTask() {
  resetBinarySlots();
  generateDecimalNumber();
  startTimer();
}

// Show feedback message
function showFeedback(message, isCorrect) {
  clearTimeout(feedbackTimeout);
  feedbackEl.textContent = message;
  feedbackEl.classList.toggle('correct', isCorrect);
  feedbackTimeout = setTimeout(() => {
    feedbackEl.textContent = '';
  }, 3000);
}

// Event Listeners
checkAnswerBtn.addEventListener('click', checkAnswer);
nextTaskBtn.addEventListener('click', nextTask);

// Start the game
initGame();
