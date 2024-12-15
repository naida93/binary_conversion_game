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


// Handling progressive reveal
    document.getElementById('intro-arrow-1').addEventListener('click', () => {
        document.getElementById('intro-part-2').style.display = 'block';
        document.getElementById('intro-arrow-2').style.display = 'block';
    });

    document.getElementById('intro-arrow-2').addEventListener('click', () => {
        document.getElementById('intro-part-3').style.display = 'block';
        document.getElementById('intro-arrow-3').style.display = 'block';
    });

    document.getElementById('intro-arrow-3').addEventListener('click', () => {
        document.getElementById('intro-part-4').style.display = 'block';
    });


function startGame() {
    decimalValueEl.textContent = decimalNumber;
    renderFloors();
    renderBinaryInput('slot-container', 4, true);
    // renderBinaryInput('part-4-slot-container', 3, false);

    updateElevatorPosition();
    updateScore();
}


function generateRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateRandomNumberForSection(sectionId, range) {
    const { min, max } = range;
    const randomNumber = generateRandomNumberInRange(min, max);
    const placeholder = document.querySelector(`#${sectionId}  #${sectionId}-placeholder`);

    if (placeholder) {
        placeholder.innerText = randomNumber;  // Replace the inner text of the placeholder span
        return randomNumber;  // Return the generated number
    } else {
        console.error(`Placeholder not found in section: ${sectionId}`);
    }
}


function checkUserInput(userNumber, targetNumber, feedbackElement) {
    if (userNumber === targetNumber) {
        feedbackElement.textContent = 'Correct! Well done!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer was ${targetNumber}. Try again!`;
        feedbackElement.style.color = 'red';
    }
}


function initPart1() {
    const part1Target = generateRandomNumberForSection('part-1-prompt', { min: 1, max: 999 });

    const checkButton = document.getElementById('part-1-check-answer');
    const feedbackElement = document.getElementById('part-1-feedback');
    const digitPickers = document.querySelectorAll('#part-1-dropdowns .digit-picker');
    const multipliers = [100, 10, 1];

    // Event listener for the 'Check Answer' button
    checkButton.onclick = () => {
        const userDigits = Array.from(digitPickers).map(picker => parseInt(picker.value));
        const userNumber = userDigits.reduce((sum, digit, index) => sum + digit * multipliers[index], 0);
        checkUserInput(userNumber, part1Target, feedbackElement);
    };
}


function initPart2() {
    const part2Target = generateRandomNumberForSection('part-2-prompt', { min: 1, max: 63 });

    const checkButton = document.getElementById('part-2-check-answer');
    const feedbackElement = document.getElementById('part-2-feedback');
    const digitPickers = document.querySelectorAll('#part-2-dropdowns .digit-picker');

    // Event listener for the 'Check Answer' button
    checkButton.onclick = () => {
        const userDigits = Array.from(digitPickers).map(picker => parseInt(picker.value));
        const userNumber = userDigits.reduce((sum, digit) => sum + digit, 0);
        checkUserInput(userNumber, part2Target, feedbackElement);
    };
}


function initPart3() {

}


function initPart4() {
    const part4Target = generateRandomNumberForSection('part-4-prompt', { min: 1, max: 15 });
    const checkButton = document.getElementById('part-4-check-answer');
    const feedbackElement = document.getElementById('part-4-feedback');

    let playerBinarySlots = Array(4).fill(0); // To track user input

    renderBinaryInput('part-4-slot-container', 4, {
        showDigits: false,
        slotLabels: ['2^3', '2^2', '2^1', '2^0'],
        onSlotClick: (index, value, allSlots) => {
            playerBinarySlots = allSlots; // Update binary slots as user toggles them
        }
    });

    // Event listener for the 'Check Answer' button
    checkButton.onclick = () => {
        const playerBinary = playerBinarySlots.join('');
        const playerDecimal = parseInt(playerBinary, 2);

        checkUserInput(playerDecimal, part4Target, feedbackElement);
    };
}


function initGame() {
    initPart1();
    initPart2();
    initPart3();
    initPart4();
}


document.addEventListener('DOMContentLoaded', () => {
    initGame();
});


function renderFloors() {
    floorsEl.innerHTML = '';
    for (let i = 15; i >= 0; i--) {
        const floorDiv = document.createElement('div');
        floorDiv.classList.add('floor');
        floorDiv.textContent = `Floor ${i}`;
        floorsEl.appendChild(floorDiv);
    }
}

/*function renderBinaryInput(containerId, numberOfSlots, showDigits = true) {
    const slotContainer = document.getElementById(containerId);
    slotContainer.innerHTML = '';

    const binarySlots = Array(numberOfSlots).fill(0);

    binarySlots.forEach((slot, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('slot');
        if (slot === 1) {
            slotDiv.classList.add('active');
        } else {
            slotDiv.classList.add('inactive');
        }

        if (showDigits) {
            slotDiv.textContent = slot;
        } else {
            slotDiv.textContent = '';
        }

        slotDiv.onclick = () => {
            binarySlots[index] = 1 - binarySlots[index];

            if (binarySlots[index] === 1) {
                slotDiv.classList.remove('inactive');
                slotDiv.classList.add('active');
            } else {
                slotDiv.classList.remove('active');
                slotDiv.classList.add('inactive');
            }

            if (showDigits) {
                slotDiv.textContent = binarySlots[index];
            }

            if (containerId === 'additional-slot-container') {
                const stateDisplay = document.getElementById('state-display');
                stateDisplay.textContent = binarySlots[index] === 1 ? 'Ein' : 'Aus';
            }
        };

        slotContainer.appendChild(slotDiv);
    });
}*/


function renderBinaryInput(containerId, numberOfSlots, options = {}) {
    const {
        showDigits = true,
        slotLabels = [], // Optional array of labels for each slot
        onSlotClick = () => {}, // Callback function for slot click events
        stateDisplayId = null, // Optional ID for displaying state text
        stateDisplayLabels = { 1: 'Active', 0: 'Inactive' } // Custom state labels
    } = options;

    const slotContainer = document.getElementById(containerId);
    slotContainer.innerHTML = '';

    const binarySlots = Array(numberOfSlots).fill(0);

    // Helper function to create and configure individual slot
    const createSlot = (slotValue, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('slot', slotValue === 1 ? 'active' : 'inactive');

        // Add labels or digits to the slot
        if (slotLabels[index]) {
            slotDiv.textContent = slotLabels[index];
        } else if (showDigits) {
            slotDiv.textContent = slotValue;
        }

        // Slot click event handler
        slotDiv.onclick = () => {
            binarySlots[index] = 1 - binarySlots[index];
            updateSlotAppearance(slotDiv, binarySlots[index], showDigits, slotLabels[index]);

            // Update optional state display
            if (stateDisplayId) {
                const stateDisplay = document.getElementById(stateDisplayId);
                stateDisplay.textContent = stateDisplayLabels[binarySlots[index]];
            }

            // Trigger custom onSlotClick callback
            onSlotClick(index, binarySlots[index], binarySlots);
        };

        return slotDiv;
    };

    // Helper function to update the appearance of a slot
    const updateSlotAppearance = (slotDiv, slotValue, showDigits, label) => {
        slotDiv.classList.toggle('active', slotValue === 1);
        slotDiv.classList.toggle('inactive', slotValue === 0);
        slotDiv.textContent = label || (showDigits ? slotValue : '');
    };

    // Render each slot
    binarySlots.forEach((slot, index) => {
        const slotDiv = createSlot(slot, index);
        slotContainer.appendChild(slotDiv);
    });
}



function updateElevatorPosition() {
    const totalFloors = 16;
    const floorHeight = 100 / totalFloors;
    elevatorEl.style.bottom = `${decimalNumber * floorHeight}%`;
}

function showFeedback(message, isCorrect) {
    feedbackEl.textContent = message;
    feedbackEl.classList.toggle('correct', isCorrect);
    feedbackEl.classList.toggle('incorrect', !isCorrect);
}

function updateScore() {
    scoreEl.textContent = `${score}`;
}

checkAnswerButton.onclick = function () {
    const slotContainer = document.getElementById('slot-container');
    const slotDivs = slotContainer.querySelectorAll('.slot');

    const playerBinary = Array.from(slotDivs)
        .map((slotDiv) => slotDiv.textContent)
        .join('');

    if (playerBinary === targetBinary) {
        score += 1;
        decimalNumber = (decimalNumber + 1) % 16;
        targetBinary = decimalNumber.toString(2).padStart(4, '0');
        updateElevatorPosition();
        showFeedback('Richtig! Der Aufzug hat sich bewegt!', true);
    } else {
        showFeedback('Falsch! Versuch es noch einmal.', false);
    }
    updateScore();
};

nextButton.onclick = function () {
    decimalNumber = Math.floor(Math.random() * 16);
    targetBinary = decimalNumber.toString(2).padStart(4, '0');
    binarySlots = [0, 0, 0, 0];
    startGame();
    updateElevatorPosition();
};

startGame();
