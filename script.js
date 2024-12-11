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


// JavaScript to handle progressive reveal
    document.getElementById('arrow-1').addEventListener('click', () => {
      // Show part-2 and arrow-2
      document.getElementById('part-2').style.display = 'block';
      document.getElementById('arrow-2').style.display = 'block';
    });

    document.getElementById('arrow-2').addEventListener('click', () => {
      // Show part-3 and arrow-3
      document.getElementById('part-3').style.display = 'block';
      document.getElementById('arrow-3').style.display = 'block';
    });

    document.getElementById('arrow-3').addEventListener('click', () => {
      // Show part-4
      document.getElementById('part-4').style.display = 'block';
    });


function startGame() {
    decimalValueEl.textContent = decimalNumber;
    renderFloors();
    /*renderBinaryInput(); */
    renderBinaryInput('slot-container', 4, true);
    renderBinaryInput('additional-slot-container', 1, false);
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


/*function renderBinaryInput() {
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
}*/

function renderBinaryInput(containerId, numberOfSlots, showDigits = true) {
    const slotContainer = document.getElementById(containerId);
    slotContainer.innerHTML = ''; // Clear previous slots

    // Create an array to hold the state of each binary slot
    const binarySlots = Array(numberOfSlots).fill(0); // Default all slots to 0 (inactive)

    binarySlots.forEach((slot, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('slot');

        // Apply active or inactive class based on initial state
        if (slot === 1) {
            slotDiv.classList.add('active');
        } else {
            slotDiv.classList.add('inactive');
        }

        // Conditionally set the text content based on showDigits
        if (showDigits) {
            slotDiv.textContent = slot;
        } else {
            slotDiv.textContent = ''; // Hide the digits if showDigits is false
        }

        // Add onclick event to toggle the binary slot state
        slotDiv.onclick = () => {
            binarySlots[index] = 1 - binarySlots[index]; // Toggle between 0 and 1

            // Update class based on the state
            if (binarySlots[index] === 1) {
                slotDiv.classList.remove('inactive');
                slotDiv.classList.add('active');
            } else {
                slotDiv.classList.remove('active');
                slotDiv.classList.add('inactive');
            }

            // Update text content only if showDigits is true
            if (showDigits) {
                slotDiv.textContent = binarySlots[index];
            }

            // Dynamically update the state display for #additional-slot-container
            if (containerId === 'additional-slot-container') {
                const stateDisplay = document.getElementById('state-display');
                stateDisplay.textContent = binarySlots[index] === 1 ? 'Ein' : 'Aus';
            }
        };

        // Append the slot to the container
        slotContainer.appendChild(slotDiv);
    });
}




function updateElevatorPosition() {
    const totalFloors = 16;  
    const floorHeight = 100 / totalFloors;
    elevatorEl.style.bottom = `${decimalNumber * floorHeight}%`;
}

function toggleBinarySlot(index) {
    binarySlots[index] = binarySlots[index] === 0 ? 1 : 0;
    renderBinaryInput(); 
}

/*checkAnswerButton.onclick = function () {
    const playerBinary = binarySlots.join('');
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
};*/

checkAnswerButton.onclick = function () {
    // Select only the binary slots in the #slot-container
    const slotContainer = document.getElementById('slot-container');
    const slotDivs = slotContainer.querySelectorAll('.slot');

    // Read the player's binary input
    const playerBinary = Array.from(slotDivs)
        .map((slotDiv) => slotDiv.textContent)
        .join('');

    // Check if the player's binary matches the target
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


function showFeedback(message, isCorrect) {
    feedbackEl.textContent = message;
    feedbackEl.classList.toggle('correct', isCorrect);
    feedbackEl.classList.toggle('incorrect', !isCorrect);
}

function updateScore() {
    scoreEl.textContent = `${score}`;
}

nextButton.onclick = function () {
    decimalNumber = Math.floor(Math.random() * 16); 
    targetBinary = decimalNumber.toString(2).padStart(4, '0');
    binarySlots = [0, 0, 0, 0]; 
    startGame(); 
    updateElevatorPosition();
};

startGame();
