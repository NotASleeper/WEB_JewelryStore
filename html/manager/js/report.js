function redirectToNewPage(newPage) {
    window.location.href = newPage;
}

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const leftContainer = document.querySelector('.left-Container');

    // Toggle menu khi click button
    menuToggle.addEventListener('click', () => {
        leftContainer.classList.toggle('show');
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (event) => {
        if (!leftContainer.contains(event.target) && !menuToggle.contains(event.target)) {
            leftContainer.classList.remove('show');
        }
    });
});
const ctxLine = document.getElementById('myLineChart').getContext('2d');
new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['01', '02', '03', '04', '05', '06', '07'],
        datasets: [{
            label: 'This week',
            data: [80, 70, 85, 90, 75, 65, 88],
            borderColor: '#1279C3',
            backgroundColor: '#1279C3',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#1279C3'
        }, {
            label: 'Last week',
            data: [65, 68, 60, 65, 70, 75, 62],
            borderColor: '#E0E0E0',
            backgroundColor: '#E0E0E0',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#E0E0E0'
        }]
    }, options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    padding: 10
                }
            },
            y: {
                display: false,
                beginAtZero: true
            }
        },
        elements: {
            line: {
                borderWidth: 2
            }
        }
    }
});