class HitsCounter {
    static init() {
        const hitsCounter = document.getElementById('hits-counter');
        
        const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname === '' ||
                          window.location.protocol === 'file:' ||
                          window.location.hostname.includes('.local') ||
                          window.location.hostname.includes('.test');
        
        if (!isLocalhost) {
            const counterLink = document.createElement('a');
            counterLink.href = 'https://hits.sh/joelsoft.eu/countdown/';
            counterLink.target = '_blank'; // Open in new tab
            
            const counterImg = document.createElement('img');
            counterImg.alt = 'Hits';
            counterImg.src = 'https://hits.sh/joelsoft.eu/countdown.svg?style=for-the-badge&label=visits&color=111&labelColor=20';
            
            counterLink.appendChild(counterImg);
            hitsCounter.appendChild(counterLink);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    HitsCounter.init();
}); 