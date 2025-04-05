// JavaScript for the teams pages

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the teams page
    const teamsPage = document.querySelector('.teams-page');
    if (!teamsPage) return;
    
    // Create team ranking chart if the element exists
    const teamRankingChartElement = document.getElementById('teamRankingChart');
    if (teamRankingChartElement) {
        createTeamRankingChart(teamRankingChartElement);
    }
    
    // Setup team filter
    const teamFilter = document.getElementById('teamFilter');
    if (teamFilter) {
        teamFilter.addEventListener('input', function() {
            const filterValue = this.value.toLowerCase();
            const teamCards = document.querySelectorAll('.team-card');
            
            teamCards.forEach(card => {
                const teamName = card.dataset.teamName.toLowerCase();
                if (teamName.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Team performance chart if the element exists
    const teamPerformanceChartElement = document.getElementById('teamPerformanceChart');
    if (teamPerformanceChartElement) {
        createTeamPerformanceChart(teamPerformanceChartElement);
    }
    
    // Team head to head chart if the element exists
    const teamHeadToHeadElement = document.getElementById('teamHeadToHeadChart');
    if (teamHeadToHeadElement) {
        createTeamHeadToHeadChart(teamHeadToHeadElement);
    }
});

// Create team ranking chart
function createTeamRankingChart(chartElement) {
    // Get data from the element's data attributes
    const teams = JSON.parse(chartElement.dataset.teams || '[]');
    const rankings = JSON.parse(chartElement.dataset.rankings || '[]');
    
    // Create chart
    new Chart(chartElement, {
        type: 'bar',
        data: {
            labels: teams,
            datasets: [
                {
                    label: 'Team Rankings',
                    data: rankings,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(201, 203, 207, 0.7)',
                        'rgba(255, 99, 132, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(201, 203, 207, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Ranking Points'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Create team performance chart
function createTeamPerformanceChart(chartElement) {
    // Get data from the element's data attributes
    const labels = JSON.parse(chartElement.dataset.labels || '[]');
    const wins = JSON.parse(chartElement.dataset.wins || '[]');
    const losses = JSON.parse(chartElement.dataset.losses || '[]');
    const draws = JSON.parse(chartElement.dataset.draws || '[]');
    
    // Create chart
    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Wins',
                    data: wins,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Losses',
                    data: losses,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Draws',
                    data: draws,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Matches'
                    },
                    stacked: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    });
}

// Create team head to head chart
function createTeamHeadToHeadChart(chartElement) {
    // Get data from the element's data attributes
    const opponents = JSON.parse(chartElement.dataset.opponents || '[]');
    const wins = JSON.parse(chartElement.dataset.wins || '[]');
    const losses = JSON.parse(chartElement.dataset.losses || '[]');
    
    // Create chart
    new Chart(chartElement, {
        type: 'bar',
        data: {
            labels: opponents,
            datasets: [
                {
                    label: 'Wins',
                    data: wins,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Losses',
                    data: losses,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Matches'
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
