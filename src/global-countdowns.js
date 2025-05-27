class GlobalCountdowns {
    static async init() {
        try {
            const response = await fetch('https://kasepuu.github.io/countdown/global-countdowns.json');
            const globalCountdowns = await response.json();
            
            if (globalCountdowns.countdowns) {
                const savedCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
                const existingGlobalTitles = new Set(savedCountdowns.filter(c => c.isGlobal).map(c => c.title));
                
                globalCountdowns.countdowns.forEach(countdown => {
                    if (!existingGlobalTitles.has(countdown.title)) {
                        const targetDate = new Date(countdown.targetDate);
                        const newCountdown = new Countdown(countdown.title, targetDate);
                        newCountdown.id = `global-${newCountdown.id}`;
                        CountdownManager.addCountdown(newCountdown);
                    }
                });
            }
        } catch (error) {
            console.error('Error loading global countdowns:', error);
        }
    }

    static saveOrder() {
        const countdownsList = document.getElementById('countdownsList');
        const allCountdowns = [...countdownsList.querySelectorAll('.countdown-item')];
        
        const order = allCountdowns.map(item => {
            const title = item.querySelector('.countdown-title').textContent.trim();
            return title;
        });

        console.log('Saving order:', order);
        
        localStorage.setItem('globalCountdownsOrder', JSON.stringify(order));
        
        if (typeof CountdownManager !== 'undefined') {
            CountdownManager.updateCountdownsOrder();
        }
    }
}

// Add event listener for drag and drop
document.addEventListener('DOMContentLoaded', () => {
    CountdownManager.init();
    GlobalCountdowns.init();
    
    // Add drag and drop event listeners for global countdowns
    const countdownsList = document.getElementById('countdownsList');
    
    // Add dragend event listener to ensure order is saved after drag completes
    countdownsList.addEventListener('dragend', () => {
        GlobalCountdowns.saveOrder();
    });
    
    countdownsList.addEventListener('drop', () => {
        GlobalCountdowns.saveOrder();
    });
}); 