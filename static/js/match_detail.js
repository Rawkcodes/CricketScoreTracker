// JavaScript for the match detail page

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the match detail page
    const matchDetailPage = document.querySelector('.match-detail-page');
    if (!matchDetailPage) return;
    
    // Create run rate chart if the element exists
    const runRateChartElement = document.getElementById('runRateChart');
    if (runRateChartElement) {
        createRunRateChart(runRateChartElement);
    }
    
    // Create wickets timeline chart if the element exists
    const wicketsTimelineElement = document.getElementById('wicketsTimeline');
    if (wicketsTimelineElement) {
        createWicketsTimeline(wicketsTimelineElement);
    }
    
    // Create partnership chart if the element exists
    const partnershipChartElement = document.getElementById('partnershipChart');
    if (partnershipChartElement) {
        createPartnershipChart(partnershipChartElement);
    }
    
    // Setup tabs functionality
    const tabButtons = document.querySelectorAll('.match-tab-button');
    const tabContents = document.querySelectorAll('.match-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('show', 'active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetId = this.getAttribute('data-bs-target');
            document.querySelector(targetId).classList.add('show', 'active');
        });
    });
    
    // Setup commentary filter
    const commentaryFilter = document.getElementById('commentaryFilter');
    if (commentaryFilter) {
        commentaryFilter.addEventListener('change', function() {
            const filterValue = this.value;
            const commentaryItems = document.querySelectorAll('.commentary-item');
            
            commentaryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});

// Create run rate chart
function createRunRateChart(chartElement) {
    // Get data from the element's data attributes
    const overs = JSON.parse(chartElement.dataset.overs || '[]');
    const team1RunRate = JSON.parse(chartElement.dataset.team1RunRate || '[]');
    const team2RunRate = JSON.parse(chartElement.dataset.team2RunRate || '[]');
    const team1Name = chartElement.dataset.team1Name || 'Team 1';
    const team2Name = chartElement.dataset.team2Name || 'Team 2';
    
    // Create chart
    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: overs,
            datasets: [
                {
                    label: team1Name + ' Run Rate',
                    data: team1RunRate,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: team2Name + ' Run Rate',
                    data: team2RunRate,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
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
                        text: 'Run Rate'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Overs'
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

// Create wickets timeline chart
function createWicketsTimeline(chartElement) {
    // Get data from the element's data attributes
    const team1Wickets = JSON.parse(chartElement.dataset.team1Wickets || '[]');
    const team2Wickets = JSON.parse(chartElement.dataset.team2Wickets || '[]');
    const team1Name = chartElement.dataset.team1Name || 'Team 1';
    const team2Name = chartElement.dataset.team2Name || 'Team 2';
    
    // Prepare data for scatter chart
    const team1Data = team1Wickets.map(w => ({ x: w.over, y: w.score }));
    const team2Data = team2Wickets.map(w => ({ x: w.over, y: w.score }));
    
    // Create chart
    new Chart(chartElement, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: team1Name + ' Wickets',
                    data: team1Data,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: team2Name + ' Wickets',
                    data: team2Data,
                    backgroundColor: 'rgba(54, 162, 235, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Score'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Overs'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const datasetIndex = context.datasetIndex;
                            const index = context.dataIndex;
                            const wicketsData = datasetIndex === 0 ? team1Wickets : team2Wickets;
                            const wicket = wicketsData[index];
                            return `${wicket.batsman} (${wicket.score}/${wicket.wicketNumber}) - ${wicket.over} overs`;
                        }
                    }
                }
            }
        }
    });
}

// Create partnership chart
function createPartnershipChart(chartElement) {
    // Get data from the element's data attributes
    const partnerships = JSON.parse(chartElement.dataset.partnerships || '[]');
    
    // Prepare data for chart
    const labels = partnerships.map(p => `${p.batsman1} & ${p.batsman2}`);
    const data = partnerships.map(p => p.runs);
    const backgroundColors = partnerships.map((p, i) => {
        const colors = [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
        ];
        return colors[i % colors.length];
    });
    
    // Create chart
    new Chart(chartElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Partnership Runs',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(c => c.replace('0.7', '1')),
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
                        text: 'Runs'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const partnership = partnerships[index];
                            return `${partnership.batsman1}: ${partnership.batsman1Runs} runs\n${partnership.batsman2}: ${partnership.batsman2Runs} runs`;
                        }
                    }
                }
            }
        }
    });
}
