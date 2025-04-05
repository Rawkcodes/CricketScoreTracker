// JavaScript for the search functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the search page
    const searchPage = document.querySelector('.search-page');
    if (!searchPage) return;
    
    // Get the search query from URL
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q') || '';
    
    // Update search input with the current query
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = query;
    }
    
    // Setup tab functionality
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchResults = document.querySelectorAll('.search-results-section');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and hide all result sections
            searchTabs.forEach(t => t.classList.remove('active'));
            searchResults.forEach(r => r.classList.remove('active', 'show'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding results section
            const targetId = this.getAttribute('data-target');
            document.querySelector(targetId).classList.add('active', 'show');
            
            // Update count display
            updateResultsCount();
        });
    });
    
    // Function to update results count in tabs
    function updateResultsCount() {
        const matchesCount = document.querySelectorAll('.matches-results .search-result').length;
        const teamsCount = document.querySelectorAll('.teams-results .search-result').length;
        const playersCount = document.querySelectorAll('.players-results .search-result').length;
        
        document.querySelector('[data-target="#matchesResults"] .badge').textContent = matchesCount;
        document.querySelector('[data-target="#teamsResults"] .badge').textContent = teamsCount;
        document.querySelector('[data-target="#playersResults"] .badge').textContent = playersCount;
        
        // Update total count
        const totalCount = matchesCount + teamsCount + playersCount;
        document.querySelector('.search-count').textContent = totalCount;
    }
    
    // Initial count update
    updateResultsCount();
    
    // No results handling
    const resultSections = document.querySelectorAll('.search-results-section');
    resultSections.forEach(section => {
        const results = section.querySelectorAll('.search-result');
        const noResults = section.querySelector('.no-results');
        
        if (results.length === 0 && noResults) {
            noResults.style.display = 'block';
        }
    });
    
    // Handle live search if needed
    const liveSearchInput = document.getElementById('liveSearchInput');
    if (liveSearchInput) {
        liveSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Filter results based on input
            document.querySelectorAll('.search-result').forEach(result => {
                const resultText = result.textContent.toLowerCase();
                if (resultText.includes(searchTerm)) {
                    result.style.display = 'block';
                } else {
                    result.style.display = 'none';
                }
            });
            
            // Update counts after filtering
            updateResultsCount();
        });
    }
});
