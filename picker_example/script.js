// Open the picker when the button is clicked
document.querySelectorAll('.open-picker').forEach(function(button) {
    button.addEventListener('click', function() {
        const positionId = button.getAttribute('data-position');
        openNumberPicker(positionId);
    });
});

// Function to open the number picker
function openNumberPicker(positionId) {
    const popup = document.getElementById('picker-popup');
    const pickerContainer = document.getElementById('number-picker');

    // Clear the previous buttons
    pickerContainer.innerHTML = '';

    // Generate buttons 0-9
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', function() {
            updateDigit(positionId, i);
            closeNumberPicker();
        });
        pickerContainer.appendChild(button);
    }

    // Show the popup
    popup.style.display = 'block';
}

// Update the digit in the selected position
function updateDigit(positionId, value) {
    const digitElement = document.getElementById(`digit-${positionId}`);
    digitElement.textContent = value;
}

// Close the picker popup
document.getElementById('close-picker').addEventListener('click', function() {
    closeNumberPicker();
});

function closeNumberPicker() {
    const popup = document.getElementById('picker-popup');
    popup.style.display = 'none';
}
