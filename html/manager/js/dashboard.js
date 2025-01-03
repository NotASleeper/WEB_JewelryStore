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
    updateChart(new Date());

    //Lấy dữ liệu
    (getRevenueDetail = async () => {
        const date = new Date();
        let revenue = await getWeeklyRevenue(date);
        const thisWeek = Object.values(revenue).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        revenue = await getWeeklyRevenue(getLastWeekDate(date));
        const lastWeek = Object.values(revenue).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        document.getElementById('total').innerText = parseFloat(thisWeek).toLocaleString() + "VND";

        if (thisWeek > lastWeek) {
            const percent = ((thisWeek / lastWeek) - 1) * 100;
            document.getElementById('arrow').className = "fa-solid fa-arrow-up";
            document.getElementById('arrow').style = "color: #149D52";
            document.getElementById('percent').innerText = percent.toFixed(2) + "%";
            document.getElementById('percent').style = "color: #149D52";
        } else if (thisWeek < lastWeek) {
            const percent = ((lastWeek / thisWeek) - 1) * 100;
            document.getElementById('arrow').className = "fa-solid fa-arrow-down";
            document.getElementById('arrow').style = "color: #EB2F06";
            document.getElementById('percent').innerText = percent.toFixed(2) + "%";
            document.getElementById('percent').style = "color: #EB2F06";
        } else {
            document.getElementById('titelText').innerText = "";
        }

        const monday = getMonday(date);
        let day = monday.getDate();
        let month = monday.toLocaleString('default', { month: 'short' });
        let year = monday.getFullYear();
        document.getElementById('date').innerText = "From " + `${day} ${month} ${year}`;
    })()
});


const ctx = document.getElementById('myChart').getContext('2d');
async function updateChart(date) {
    const thisWeekRevenue = await getWeeklyRevenue(date);
    const lastWeekRevenue = await getWeeklyRevenue(getLastWeekDate(date));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['01', '02', '03', '04', '05', '06', '07'],
            datasets: [{
                label: 'This week',
                data: thisWeekRevenue,
                backgroundColor: '#2196F3',
                borderRadius: 2,
                barPercentage: 0.5
            }, {
                label: 'Last week',
                data: lastWeekRevenue,
                backgroundColor: '#E0E0E0',
                borderRadius: 2,
                barPercentage: 0.5
            }]
        },
        options: {
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
            layout: {
                padding: {
                    left: 100,
                    right: 100,
                    top: 20,
                    bottom: 20
                }
            },
            scales: {
                x: {
                    barPercentage: 0.1,
                    categoryPercentage: 0.1,
                    min: 0,
                    max: 6,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false
                }
            }
        }
    });
}

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

async function getWeeklyRevenue(date) {
    const response = await fetch(`http://localhost:5501/api/v1/revenues/weekly/${date}`);
    const data = await response.json();
    const revenue = Object.values(data)

    return revenue;
}

function getMonday(date) {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(currentDate.setDate(diff));
    return monday;
}

function getLastWeekDate(date) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 7);
    return currentDate.toISOString().split('T')[0];
}