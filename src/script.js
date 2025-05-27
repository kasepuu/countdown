document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('targetDate').value = `${year}-${month}-${day}`;

    const countdowns = JSON.parse(localStorage.getItem('countdowns') || '[]');
    countdowns.forEach(countdown => {
        const newCountdown = new Countdown(
            countdown.title,
            new Date(countdown.targetDate)
        );
        newCountdown.render();
    });

    document.getElementById('addCountdown').addEventListener('click', () => {
        const title = document.getElementById('countdownTitle').value.trim();
        const date = document.getElementById('targetDate').value;
        const hours = document.getElementById('hours').value;
        const minutes = document.getElementById('minutes').value;

        if (!title || !date) {
            alert('Please enter a title and date');
            return;
        }

        const targetDate = new Date(`${date}T${hours}:${minutes}`);
        const newCountdown = new Countdown(title, targetDate);
        newCountdown.render();

        const countdowns = JSON.parse(localStorage.getItem('countdowns') || '[]');
        countdowns.push({
            title,
            targetDate: targetDate.toISOString()
        });
        localStorage.setItem('countdowns', JSON.stringify(countdowns));

        document.getElementById('countdownTitle').value = '';
        document.getElementById('targetDate').value = `${year}-${month}-${day}`;
        document.getElementById('hours').value = '00';
        document.getElementById('minutes').value = '00';
    });
}); 