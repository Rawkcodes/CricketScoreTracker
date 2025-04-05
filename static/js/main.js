// Main JavaScript file for Cricket Score App

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Add smooth scrolling to all in-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Setup mobile navigation
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            document.body.classList.toggle('nav-open');
        });
    }

    // Check if we need to refresh match data (this would be for real-time matches if implemented)
    function checkForMatchUpdates() {
        const liveMatchElements = document.querySelectorAll('.match-live');
        if (liveMatchElements.length > 0) {
            // In a real app, this would fetch updated data
            // For this static app, we'll just simulate updating display times
            updateMatchTimes();
        }
    }

    // Update match times (e.g., "5 mins ago" -> "6 mins ago")
    function updateMatchTimes() {
        const timeElements = document.querySelectorAll('.match-time');
        timeElements.forEach(el => {
            if (el.dataset.timestamp) {
                const timestamp = parseInt(el.dataset.timestamp);
                const now = Date.now();
                const diffInMinutes = Math.floor((now - timestamp) / 60000);
                
                if (diffInMinutes < 60) {
                    el.textContent = `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
                } else if (diffInMinutes < 1440) {
                    const hours = Math.floor(diffInMinutes / 60);
                    el.textContent = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
                } else {
                    const days = Math.floor(diffInMinutes / 1440);
                    el.textContent = `${days} day${days !== 1 ? 's' : ''} ago`;
                }
            }
        });
    }

    // Initially set match times
    updateMatchTimes();

    // Check for updates every minute (only updates display times in this static app)
    setInterval(checkForMatchUpdates, 60000);

    // Handle search form
    const searchForm = document.querySelector('#searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="q"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.classList.add('is-invalid');
            } else {
                searchInput.classList.remove('is-invalid');
            }
        });
    }

    // Tournament switcher
    const tournamentSelect = document.getElementById('tournamentSelect');
    if (tournamentSelect) {
        tournamentSelect.addEventListener('change', function() {
            const selectedTournament = this.value;
            
            // Show all matches if "all" is selected
            if (selectedTournament === 'all') {
                document.querySelectorAll('.match-card').forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filter matches by tournament
            document.querySelectorAll('.match-card').forEach(card => {
                if (card.dataset.tournament === selectedTournament) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
