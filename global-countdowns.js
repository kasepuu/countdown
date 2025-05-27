class GlobalCountdowns {
    static async init() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/kasepuu/countdown/main/global-countdowns.json');
            const globalCountdowns = await response.json();
            
            globalCountdowns.forEach(countdown => {
                const targetDate = new Date(countdown.targetDate);
                if (targetDate > new Date()) {
                    const newCountdown = new Countdown(countdown.title, targetDate);
                    newCountdown.render();
                }
            });
        } catch (error) {
            console.error('Error loading global countdowns:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    GlobalCountdowns.init();
}); 