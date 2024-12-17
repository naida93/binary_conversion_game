export class NumberPicker {
    constructor(container, options) {
        if (!container) {
            console.error('NumberPicker Error: Container element not found.');
            return;
        }

        this.container = container;
        this.min = options.min || 0;
        this.max = options.max || 9;
        this.value = this.min;

        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="number-picker">
                <button id="picker-up">&#9650;</button>
                <div id="picker-value">${this.value}</div>
                <button id="picker-down">&#9660;</button>
            </div>
        `;

        const upButton = this.container.querySelector('#picker-up');
        const downButton = this.container.querySelector('#picker-down');
        const valueDisplay = this.container.querySelector('#picker-value');

        if (upButton && downButton) {
            upButton.addEventListener('click', () => this.increment(valueDisplay));
            downButton.addEventListener('click', () => this.decrement(valueDisplay));
        } else {
            console.error('NumberPicker Error: Buttons not found in the container.');
        }
    }

    increment(valueDisplay) {
        if (this.value < this.max) {
            this.value++;
            valueDisplay.textContent = this.value;
        }
    }

    decrement(valueDisplay) {
        if (this.value > this.min) {
            this.value--;
            valueDisplay.textContent = this.value;
        }
    }

    getValue() {
        return this.value;
    }
}
