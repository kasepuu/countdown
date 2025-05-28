class EmoticonPicker {
    static emoticonMap = {
        default: '⏰',
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
        work: '💼',
        meeting: '👥',
        deadline: '📅',
        concert: '🎵',
        game: '🎮',
        movie: '🎬',
        dinner: '🍽️',
        shopping: '🛍️',
        travel: '🧳',
        sports: '⚽',
        health: '💪',
        study: '📚',
        sleep: '😴',
        coffee: '☕',
        food: '🍔',
        drink: '🍺',
        music: '🎵',
        art: '🎨',
        book: '📖',
        gift: '🎁',
        money: '💰',
        heart: '❤️',
        star: '⭐',
        moon: '🌙',
        sun: '☀️',
        cloud: '☁️',
        rain: '🌧️',
        snow: '❄️',
        fire: '🔥',
        water: '💧',
        earth: '🌍',
        air: '💨'
    };

    static init() {
        this.createEmoticonPicker();
    }

    static createEmoticonPicker() {
        const titleInput = document.getElementById('countdownTitle');
        const container = document.createElement('div');
        container.className = 'emoticon-picker-container';
        
        const button = document.createElement('button');
        button.className = 'emoticon-picker-btn';
        button.innerHTML = '😊';
        button.title = 'Choose an emoticon';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'emoticon-dropdown';
        
        // Create grid of emoticons
        Object.entries(this.emoticonMap).forEach(([key, emoticon]) => {
            const item = document.createElement('div');
            item.className = 'emoticon-item';
            item.innerHTML = emoticon;
            item.title = key;
            item.onclick = () => {
                const currentValue = titleInput.value;
                const words = currentValue.split(' ');
                const filteredWords = words.filter(word => !Object.values(this.emoticonMap).includes(word));
                titleInput.value = `${emoticon} ${filteredWords.join(' ')}`.trim();
                dropdown.classList.remove('show');
            };
            dropdown.appendChild(item);
        });

        button.onclick = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        };

        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });

        container.appendChild(button);
        container.appendChild(dropdown);
        
        titleInput.parentNode.insertBefore(container, titleInput.nextSibling);
    }

    static getEmoticon(title) {
        const lowerTitle = title.toLowerCase();
        for (const [key, emoticon] of Object.entries(this.emoticonMap)) {
            if (lowerTitle.includes(key)) {
                return emoticon;
            }
        }
        return '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    EmoticonPicker.init();
}); 