import { NumberPicker } from './number-picker.js';

let binarySlots = [0, 0, 0, 0];
let decimalNumber = Math.floor(Math.random() * 16); 
let targetBinary = decimalNumber.toString(2).padStart(4, '0');
let score = 0;
let introDecimal = null;
let introBinary = null;

const decimalValueEl = document.getElementById('decimal-value');
const elevatorEl = document.getElementById('elevator');
const floorsEl = document.getElementById('floors');
const binaryInputEl = document.getElementById('binary-input');
const feedbackEl = document.getElementById('game-feedback');
const scoreEl = document.getElementById('score-value');
const nextButton = document.getElementById('next-task-button');
const checkAnswerButton = document.getElementById('check-answer-button');
const container = document.getElementById('pickers-container');


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
        document.getElementById('repeat-button').style.display = 'block';
    });


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('repeat-button').addEventListener('click', () => {
        console.log('Repeat button clicked');
        initGame();
    });
});


    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('number-picker-container-1');

        const defaultPickerContainer = document.createElement('div');
        defaultPickerContainer.classList.add('picker-wrapper');
        container.appendChild(defaultPickerContainer);

        new NumberPicker(defaultPickerContainer, { min: 0, max: 9 });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('number-picker-container-2');

        const defaultPickerContainer = document.createElement('div');
        defaultPickerContainer.classList.add('picker-wrapper');
        container.appendChild(defaultPickerContainer);

        new NumberPicker(defaultPickerContainer, { min: 0, max: 9 });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('number-picker-container-3');

        const defaultPickerContainer = document.createElement('div');
        defaultPickerContainer.classList.add('picker-wrapper');
        container.appendChild(defaultPickerContainer);

        new NumberPicker(defaultPickerContainer, { min: 0, max: 9 });
    });


function startGame() {
    decimalValueEl.textContent = decimalNumber;
    renderFloors();
    renderBinaryInput('slot-container', 4, true);
    updateElevatorPosition();
    updateScore();
}


function generateRandomNumberInRange(min, max) {
    introDecimal = Math.floor(Math.random() * (max - min + 1)) + min;
    introBinary = introDecimal.toString(2).padStart(4, '0');
    console.log(`Generated number: ${introDecimal}, Binary: ${introBinary}`);

    return introDecimal
}


function checkUserInput(userNumber, targetNumber, feedbackElement) {
    const inputToTargetDifference = targetNumber - userNumber;
    if (userNumber === targetNumber) {
        feedbackElement.textContent = 'Correct! Well done!';
        feedbackElement.style.color = 'green';
    } else {

        feedbackElement.textContent = `Incorrect. The correct answer was ${targetNumber}. Try again!`;
        feedbackElement.style.color = 'red';
    }
}


function provideInstantFeedback(userInputCallback, targetValue, feedbackElement) {
    const userInput = userInputCallback(); // Get user input using a callback function
    if (userInput === targetValue) {
        feedbackElement.textContent = "Exakt!";
        feedbackElement.style.color = "green";
    } else if (userInput > targetValue) {
        feedbackElement.textContent = `Du hast ${userInput} eingegeben, der Zielwert ist aber kleiner.`;
        feedbackElement.style.color = "red";
    } else {
        feedbackElement.textContent = `Du hast ${userInput} eingegeben, der Zielwert ist aber größer.`;
        feedbackElement.style.color = "red";
    }
}


function initPart1() {
    const part1Prompt = document.querySelector('#part-1-prompt-placeholder');
    part1Prompt.textContent = introDecimal;
    const feedbackElement = document.getElementById('part-1-feedback');
    const multipliers = [100, 10, 1];
    const pickerContainerIds = [
        'number-picker-container-1',
        'number-picker-container-2',
        'number-picker-container-3'
    ];

    function getUserInput() {
        const userDigits = numberPickers.map((picker) => picker.getValue());
        return userDigits.reduce(
            (sum, digit, index) => sum + digit * multipliers[index],
            0
        );
    }

    const numberPickers = []; // Store picker instances
    pickerContainerIds.forEach((id, index) => {
        const container = document.getElementById(id);
        container.innerHTML = ''; // Clear any existing content
        const picker = new NumberPicker(container, { min: 0, max: 9 });
        numberPickers.push(picker);

        picker.onValueChange = () => {
            provideInstantFeedback(getUserInput, introDecimal, feedbackElement);
            console.log(`User input changed!`);
        }
    });

    /*const checkButton = document.getElementById('part-1-check-answer');
    checkButton.onclick = () => {
        const userNumber = getUserInput();
        console.log(`User input: ${userNumber}`);
        checkUserInput(userNumber, introDecimal, feedbackElement);
    };*/
}


function initPart2() {
    const part2Prompt = document.querySelector('#part-2-prompt #part-2-prompt-placeholder');
    part2Prompt.textContent = introDecimal;

    const draggableItems = document.querySelectorAll(".draggable-item");
    const dropZones = document.querySelectorAll(".drop-zone");
    const checkButton = document.getElementById('part-2-check-answer');
    const feedbackElement = document.getElementById('part-2-feedback');

    // DRAG START: Set data being transferred
    draggableItems.forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", item.dataset.value);
            setTimeout(() => item.classList.add("hidden"), 0);
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("hidden"); // Make draggable item visible again
        });
    });

    function getUserInput() {
        let userSum = 0;
        dropZones.forEach((zone) => {
            const droppedItem = zone.querySelector(".draggable-item");
            if (droppedItem) {
                userSum += parseInt(droppedItem.dataset.value, 10); // Add value of the dropped item
            }
        });
        return userSum;
    }

    // DRAG OVER: Allow dropping
    dropZones.forEach((zone) => {
        zone.addEventListener("dragover", (e) => e.preventDefault());

        // DROP: Handle dropped items
        zone.addEventListener("drop", (e) => {
            e.preventDefault();

            const value = e.dataTransfer.getData("text/plain");

            // Return any existing item in this zone back to the draggable options container
            const existingItem = zone.querySelector(".draggable-item");
            if (existingItem) {
                document.getElementById("draggable-options").appendChild(existingItem);
            }

            // Append dragged item to the drop zone
            const draggedItem = document.querySelector(`.draggable-item[data-value='${value}']`);
            if (draggedItem) {
                zone.innerHTML = ""; // Clear previous content
                zone.appendChild(draggedItem);
            }

            provideInstantFeedback(getUserInput, introDecimal, feedbackElement);
        });
    });

    /*checkButton.addEventListener("click", () => {
        let userSum = 0;

        dropZones.forEach((zone) => {
            const droppedItem = zone.querySelector(".draggable-item");
            if (droppedItem) {
                userSum += parseInt(droppedItem.dataset.value, 10); // Add value of the dropped item
            }
        });

        console.log(`User total input: ${userSum}`)
        checkUserInput(userSum, introDecimal, feedbackElement);
    });*/
}



function initPart3() {


}


function initPart4() {
    const part4Prompt = document.querySelector('#part-4-prompt #part-4-prompt-placeholder');
    part4Prompt.textContent = introDecimal;

    const checkButton = document.getElementById('part-4-check-answer');
    const feedbackElement = document.getElementById('part-4-feedback');

    let playerBinarySlots = Array(4).fill(0); // To track user input

    const slots = Math.ceil(Math.log2(introDecimal + 1));
    const slotLabels = Array.from({ length: slots }, (_, index) => `2^${slots - index - 1}`);

    renderBinaryInput('part-4-slot-container', slots, {
        showDigits: false,
        slotLabels: slotLabels,
        onSlotClick: (index, value, allSlots) => {
            playerBinarySlots = allSlots; // Update binary slots as user toggles them

            function getUserInput() {
                const playerBinary = playerBinarySlots.join('');
                return parseInt(playerBinary, 2);
            }

            provideInstantFeedback(getUserInput, introDecimal, feedbackElement);
        }
    });

    /*/ Event listener for the 'Check Answer' button
    checkButton.onclick = () => {
        const playerBinary = playerBinarySlots.join('');
        const playerDecimal = parseInt(playerBinary, 2);

        checkUserInput(playerDecimal, introDecimal, feedbackElement);
    };*/
}


function initGame() {
    generateRandomNumberInRange(1, 256);
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
