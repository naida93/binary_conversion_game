let binarySlots = [0, 0, 0, 0];
let decimalNumber = Math.floor(Math.random() * 16); 
let targetBinary = decimalNumber.toString(2).padStart(4, '0');
let score = 0;


const decimalValueEl = document.getElementById('decimal-value');
const elevatorEl = document.getElementById('elevator');
const floorsEl = document.getElementById('floors');
const binaryInputEl = document.getElementById('binary-input');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score-value');
const nextButton = document.getElementById('next-task-button');
const checkAnswerButton = document.getElementById('check-answer-button');


function startGame() {
    decimalValueEl.textContent = decimalNumber;
    renderFloors();
    renderBinaryInput();
    updateElevatorPosition(); 
    updateScore();
}


function renderFloors() {
    floorsEl.innerHTML = ''; 
    for (let i = 15; i >= 0; i--) {
        const floorDiv = document.createElement('div');
        floorDiv.classList.add('floor');
        floorDiv.textContent = `Floor ${i}`;
        floorsEl.appendChild(floorDiv);
    }
}


function renderBinaryInput() {
    const slotContainer = document.getElementById('slot-container');
    slotContainer.innerHTML = ''; 

    binarySlots.forEach((slot, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('slot');
        if (slot === 1) {
            slotDiv.classList.add('active'); 
        } else {
            slotDiv.classList.add('inactive'); 
        }
        
        slotDiv.textContent = slot;
        
        slotDiv.onclick = () => toggleBinarySlot(index);

        slotContainer.appendChild(slotDiv);
    });
}

function updateElevatorPosition() {
    const totalFloors = 16;  
    const floorHeight = 100 / totalFloors; 

    // Move the elevator based on the current decimal number
    // The elevator's position is relative to the ground floor, and its position is calculated
    // based on the floor height and the current decimalNumber.
    elevatorEl.style.bottom = `${decimalNumber * floorHeight}%`; // Elevator position relative to the bottom of the shaft
}

function toggleBinarySlot(index) {
    binarySlots[index] = binarySlots[index] === 0 ? 1 : 0;
    renderBinaryInput(); 
}

checkAnswerButton.onclick = function () {
    const playerBinary = binarySlots.join('');
    if (playerBinary === targetBinary) {
        score += 1;
        decimalNumber = (decimalNumber + 1) % 16; 
        targetBinary = decimalNumber.toString(2).padStart(4, '0');
        updateElevatorPosition(); 
        showFeedback('Correct! Elevator moved!', true);
    } else {
        showFeedback('Incorrect! Try again.', false);
    }
    updateScore();
};

function showFeedback(message, isCorrect) {
    feedbackEl.textContent = message;
    feedbackEl.classList.toggle('correct', isCorrect);
    feedbackEl.classList.toggle('incorrect', !isCorrect);
}

function updateScore() {
    scoreEl.textContent = `Score: ${score}`;
}

nextButton.onclick = function () {
    decimalNumber = Math.floor(Math.random() * 16); 
    targetBinary = decimalNumber.toString(2).padStart(4, '0');
    binarySlots = [0, 0, 0, 0]; 
    startGame(); 
    updateElevatorPosition();
};

startGame();
