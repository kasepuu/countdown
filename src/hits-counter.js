class HitsCounter {
    static init() {
        const hitsCounter = document.getElementById('hits-counter');
        
        const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname === '' ||
                          window.location.protocol === 'file:' ||
                          window.location.hostname.includes('.local') ||
                          window.location.hostname.includes('.test');
        
        const counterButton = document.createElement('button');
        counterButton.className = 'hits-button';
        counterButton.title = 'Click to view hits counter';
        
        const counterImg = document.createElement('img');
        counterImg.alt = 'Hits';
        
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color')
            .trim()
            .replace('#', '');
        const secondaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary-color')
            .trim()
            .replace('#', '');
            
        const extraCount = isLocalhost ? 0 : 1;
        counterImg.src = `https://hits.sh/joelsoft.eu/countdown.svg?view=today-total&style=for-the-badge&label=visits&extraCount=${extraCount}&color=${primaryColor}&labelColor=${secondaryColor}`;
        
        counterButton.appendChild(counterImg);
        hitsCounter.appendChild(counterButton);

        counterButton.addEventListener('click', () => {
            if (confirm('Would you like to visit the hits counter page?')) {
                window.open('https://hits.sh/joelsoft.eu/countdown/', '_blank');
            }
        });

        document.addEventListener('themeChanged', () => {
            const newPrimaryColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color')
                .trim()
                .replace('#', '');
            const newSecondaryColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--secondary-color')
                .trim()
                .replace('#', '');
            counterImg.src = `https://hits.sh/joelsoft.eu/countdown.svg?view=today-total&style=for-the-badge&label=visits&extraCount=${extraCount}&color=${newPrimaryColor}&labelColor=${newSecondaryColor}`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    HitsCounter.init();
}); 