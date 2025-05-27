class TimePicker {
    static init() {
        this.populateTimeSelects();
        this.setCurrentTime();
    }

    static populateTimeSelects() {
        const hoursSelect = document.getElementById('hours');
        const minutesSelect = document.getElementById('minutes');

        for (let i = 0; i < 24; i++) {
            const option = document.createElement('option');
            option.value = i.toString().padStart(2, '0');
            option.textContent = i.toString().padStart(2, '0');
            hoursSelect.appendChild(option);
        }

        for (let i = 0; i < 60; i++) {
            const option = document.createElement('option');
            option.value = i.toString().padStart(2, '0');
            option.textContent = i.toString().padStart(2, '0');
            minutesSelect.appendChild(option);
        }
    }

    static setCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        document.getElementById('hours').value = hours;
        document.getElementById('minutes').value = minutes;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    TimePicker.init();
});