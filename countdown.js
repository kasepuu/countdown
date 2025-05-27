class Countdown {
    constructor(title, targetDate, id = null) {
        this.title = title;
        this.targetDate = new Date(targetDate);
        this.element = null;
        this.interval = null;
        this.id = id || Math.random().toString(36).substr(2, 9);
    }

    createElement() {
        const countdownItem = document.createElement('div');
        countdownItem.className = 'countdown-item';
        countdownItem.draggable = true;
        countdownItem.dataset.countdownId = this.id;
        
        countdownItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', this.id);
            countdownItem.classList.add('dragging');
        });
        
        countdownItem.addEventListener('dragend', () => {
            countdownItem.classList.remove('dragging');
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.onclick = () => this.delete();

        const titleElement = document.createElement('div');
        titleElement.className = 'countdown-title';
        const emoticon = EmoticonPicker.getEmoticon(this.title);
        titleElement.innerHTML = `${emoticon} ${this.title}`;

        const countdownDiv = document.createElement('div');
        countdownDiv.className = 'countdown';
        
        const timeBlocks = ['days', 'hours', 'minutes', 'seconds'].map(unit => {
            const block = document.createElement('div');
            block.className = 'time-block';
            block.innerHTML = `
                <span id="${this.id}-${unit}">00</span>
                <span class="label">${unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
            `;
            return block;
        });

        countdownDiv.append(...timeBlocks);
        countdownItem.append(deleteBtn, titleElement, countdownDiv);
        this.element = countdownItem;
        return countdownItem;
    }

    getEmoticon() {
        const emoticonMap = {
            birthday: '🎂',
            wedding: '💒',
            vacation: '✈️',
            holiday: '🎄',
            exam: '📚',
            party: '🎉',
            graduation: '🎓',
            newyear: '🎆',
            christmas: '🎅',
            halloween: '🎃',
            easter: '🐰',
            valentine: '❤️',
            default: '⏰'
        };

        const lowerTitle = this.title.toLowerCase();
        for (const [key, emoticon] of Object.entries(emoticonMap)) {
            if (lowerTitle.includes(key)) {
                return emoticon;
            }
        }
        return emoticonMap.default;
    }

    static async getCurrentTime() {
        try {
            const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Tallinn');
            const data = await response.json();
            return new Date(data.datetime);
        } catch (error) {
            console.error('Error fetching current time:', error);
            return new Date();
        }
    }

    async updateCountdown() {
        const now = await Countdown.getCurrentTime();
        const timeLeft = this.targetDate - now;

        const days = Math.floor(Math.abs(timeLeft) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((Math.abs(timeLeft) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((Math.abs(timeLeft) % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((Math.abs(timeLeft) % (1000 * 60)) / 1000);

        const countdownElement = this.element.querySelector('.countdown');
        
        if (timeLeft <= 0) {
            this.element.classList.add('completed');
            countdownElement.innerHTML = `
                <div class="time-block"><span>-${days}</span><span class="label">Days</span></div>
                <div class="time-block"><span>-${hours}</span><span class="label">Hours</span></div>
                <div class="time-block"><span>-${minutes}</span><span class="label">Minutes</span></div>
                <div class="time-block"><span>-${seconds}</span><span class="label">Seconds</span></div>
            `;
        } else {
            this.element.classList.remove('completed');
            countdownElement.innerHTML = `
                <div class="time-block"><span>${days}</span><span class="label">Days</span></div>
                <div class="time-block"><span>${hours}</span><span class="label">Hours</span></div>
                <div class="time-block"><span>${minutes}</span><span class="label">Minutes</span></div>
                <div class="time-block"><span>${seconds}</span><span class="label">Seconds</span></div>
            `;
        }
    }

    start() {
        this.updateCountdown();
        
        this.interval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    delete() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.element) {
            this.element.remove();
        }
        CountdownManager.removeCountdown(this);
    }
}

class CountdownManager {
    static countdowns = [];

    static init() {
        if (this.countdowns.length === 0) {
            this.loadCountdowns();
        }
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    static loadCountdowns() {
        const savedCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
        const countdownsList = document.getElementById('countdownsList');
        
        // Clear existing countdowns
        this.countdowns = [];
        
        // Load countdowns in saved order
        savedCountdowns.forEach(({ title, date, id }) => {
            const countdown = new Countdown(title, date, id);
            this.countdowns.push(countdown);
            countdownsList.appendChild(countdown.createElement());
            countdown.start();
        });
    }

    static setupEventListeners() {
        const addCountdownButton = document.getElementById('addCountdown');
        addCountdownButton.addEventListener('click', () => this.handleAddCountdown());
    }

    static handleAddCountdown() {
        const titleInput = document.getElementById('countdownTitle');
        const dateInput = document.getElementById('targetDate');
        const hoursSelect = document.getElementById('hours');
        const minutesSelect = document.getElementById('minutes');

        const title = titleInput.value.trim();
        const date = dateInput.value;
        const time = `${hoursSelect.value}:${minutesSelect.value}`;

        if (title && date && time) {
            const dateTime = `${date}T${time}`;
            const countdown = new Countdown(title, dateTime);
            this.addCountdown(countdown);
            this.resetInputs();
        }
    }

    static addCountdown(countdown) {
        const countdownsList = document.getElementById('countdownsList');
        countdownsList.appendChild(countdown.createElement());
        countdown.start();
        this.countdowns.push(countdown);
        this.saveCountdowns();
    }

    static removeCountdown(countdown) {
        this.countdowns = this.countdowns.filter(c => c !== countdown);
        this.saveCountdowns();
    }

    static resetInputs() {
        const titleInput = document.getElementById('countdownTitle');
        const dateInput = document.getElementById('targetDate');
        const hoursSelect = document.getElementById('hours');
        const minutesSelect = document.getElementById('minutes');

        titleInput.value = '';
        
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        dateInput.value = `${year}-${month}-${day}`;
        hoursSelect.value = hours;
        minutesSelect.value = minutes;
    }

    static setupDragAndDrop() {
        const countdownsList = document.getElementById('countdownsList');
        
        countdownsList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            const siblings = [...countdownsList.querySelectorAll('.countdown-item:not(.dragging)')];
            
            const nextSibling = siblings.find(sibling => {
                const box = sibling.getBoundingClientRect();
                const offset = e.clientY - box.top - box.height / 2;
                return offset < 0;
            });
            
            countdownsList.insertBefore(draggingItem, nextSibling);
        });
        
        countdownsList.addEventListener('drop', (e) => {
            e.preventDefault();
            this.updateCountdownsOrder();
            if (typeof GlobalCountdowns !== 'undefined') {
                GlobalCountdowns.saveOrder();
            }
        });
    }

    static updateCountdownsOrder() {
        const countdownsList = document.getElementById('countdownsList');
        const newOrder = [...countdownsList.querySelectorAll('.countdown-item')].map(item => {
            const id = item.dataset.countdownId;
            return this.countdowns.find(c => c.id === id);
        }).filter(Boolean);
        
        this.countdowns = newOrder;
        this.saveCountdowns();
    }

    static saveCountdowns() {
        const countdownsData = this.countdowns.map(c => ({
            title: c.title,
            date: c.targetDate.toISOString(),
            id: c.id
        }));
        localStorage.setItem('countdowns', JSON.stringify(countdownsData));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    CountdownManager.init();
}); 