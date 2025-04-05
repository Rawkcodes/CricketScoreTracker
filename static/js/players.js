// JavaScript for the player pages

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the players page
    const playersPage = document.querySelector('.players-page');
    if (!playersPage) return;
    
    // Setup player filter
    const playerFilter = document.getElementById('playerFilter');
    if (playerFilter) {
        playerFilter.addEventListener('input', function() {
            const filterValue = this.value.toLowerCase();
            const playerCards = document.querySelectorAll('.player-card');
            
            playerCards.forEach(card => {
                const playerName = card.dataset.playerName.toLowerCase();
                const playerCountry = card.dataset.playerCountry.toLowerCase();
                if (playerName.includes(filterValue) || playerCountry.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Player batting stats chart if the element exists
    const playerBattingChartElement = document.getElementById('playerBattingChart');
    if (playerBattingChartElement) {
        createPlayerBattingChart(playerBattingChartElement);
    }
    
    // Player bowling stats chart if the element exists
    const playerBowlingChartElement = document.getElementById('playerBowlingChart');
    if (playerBowlingChartElement) {
        createPlayerBowlingChart(playerBowlingChartElement);
    }
    
    // Player career progression chart if the element exists
    const playerCareerChartElement = document.getElementById('playerCareerChart');
    if (playerCareerChartElement) {
        createPlayerCareerChart(playerCareerChartElement);
    }
});

// Create player batting stats chart
function createPlayerBattingChart(chartElement) {
    // Get data from the element's data attributes
    const labels = JSON.parse(chartElement.dataset.labels || '[]');
    const runs = JSON.parse(chartElement.dataset.runs || '[]');
    const averages = JSON.parse(chartElement.dataset.averages || '[]');
    
    // Create chart
    new Chart(chartElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Runs',
                    data: runs,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    yAxisID: 'y-axis-1'
                },
                {
                    label: 'Average',
                    data: averages,
                    type: 'line',
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderWidth: 2,
                    pointRadius: 4,
                    yAxisID: 'y-axis-2'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                'y-axis-1': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Runs'
                    }
                },
                'y-axis-2': {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Create player bowling stats chart
function createPlayerBowlingChart(chartElement) {
    // Get data from the element's data attributes
    const labels = JSON.parse(chartElement.dataset.labels || '[]');
    const wickets = JSON.parse(chartElement.dataset.wickets || '[]');
    const economy = JSON.parse(chartElement.dataset.economy || '[]');
    
    // Create chart
    new Chart(chartElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Wickets',
                    data: wickets,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    yAxisID: 'y-axis-1'
                },
                {
                    label: 'Economy',
                    data: economy,
                    type: 'line',
                    fill: false,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.7)',
                    borderWidth: 2,
                    pointRadius: 4,
                    yAxisID: 'y-axis-2'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                'y-axis-1': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Wickets'
                    }
                },
                'y-axis-2': {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Economy'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Create player career progression chart
function createPlayerCareerChart(chartElement) {
    // Get data from the element's data attributes
    const years = JSON.parse(chartElement.dataset.years || '[]');
    const runs = JSON.parse(chartElement.dataset.runs || '[]');
    const wickets = JSON.parse(chartElement.dataset.wickets || '[]');
    const matches = JSON.parse(chartElement.dataset.matches || '[]');
    
    // Create chart
    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Cumulative Runs',
                    data: runs,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1,
                    yAxisID: 'y-axis-1'
                },
                {
                    label: 'Cumulative Wickets',
                    data: wickets,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1,
                    yAxisID: 'y-axis-2'
                },
                {
                    label: 'Matches Played',
                    data: matches,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1,
                    yAxisID: 'y-axis-3'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                'y-axis-1': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Runs'
                    }
                },
                'y-axis-2': {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Wickets'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                'y-axis-3': {
                    type: 'linear',
                    display: false,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}
