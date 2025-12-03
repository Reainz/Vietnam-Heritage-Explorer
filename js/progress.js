// Progress tracking functionality for Vietnam Heritage Explorer

// Heritage sites data organized by region
const heritageSitesByRegion = {
    north: [
        {
            id: 'halong',
            name: 'Ha Long Bay',
            category: 'UNESCO Site',
            image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop',
            mascot: { id: 'dragon', name: 'Ha Long Dragon', image: '🐉' }
        },
        {
            id: 'temple',
            name: 'Temple of Literature',
            category: 'Cultural Site',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            mascot: { id: 'scholar', name: 'Confucian Scholar', image: '👨‍🎓' }
        },
        {
            id: 'one-pillar',
            name: 'One Pillar Pagoda',
            category: 'Temple',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            mascot: { id: 'lotus', name: 'Sacred Lotus', image: '🪷' }
        }
    ],
    south: [
        {
            id: 'hoian',
            name: 'Hoi An Ancient Town',
            category: 'Historic Town',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            mascot: { id: 'lantern', name: 'Hoi An Lantern', image: '🏮' }
        },
        {
            id: 'imperial-city',
            name: 'Imperial City of Hue',
            category: 'UNESCO Site',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            mascot: { id: 'emperor', name: 'Royal Phoenix', image: '🦅' }
        },
        {
            id: 'my-son',
            name: 'My Son Sanctuary',
            category: 'UNESCO Site',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            mascot: { id: 'cham', name: 'Cham Guardian', image: '🗿' }
        },
        {
            id: 'war-museum',
            name: 'War Remnants Museum',
            category: 'Museum',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            mascot: { id: 'peace', name: 'Peace Dove', image: '🕊️' }
        },
        {
            id: 'cao-dai-temple',
            name: 'Cao Dai Temple',
            category: 'Temple',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            mascot: { id: 'eye', name: 'Divine Eye', image: '👁️' }
        }
    ]
};

// Initialize progress tracking when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProgressData();
    
    // Check for rewards after loading progress
    setTimeout(() => {
        if (window.rewardsSystem) {
            window.rewardsSystem.checkAndGrantRewards();
        }
    }, 1000);
});

// Load all progress data
function loadProgressData() {
    updateOverallProgress();
    updateProgressStats();
    loadAchievements();
    loadRegionalProgress();
    loadRecommendations();
}

// Update overall progress circle
function updateOverallProgress() {
    const visitedPlaces = getVisitedPlaces();
    const totalSites = getAllSites().length;
    const progressPercentage = Math.round((visitedPlaces.length / totalSites) * 100);
    
    // Update progress circle
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressPercentage');
    
    if (progressCircle && progressText) {
        const circumference = 2 * Math.PI * 52; // radius = 52
        const offset = circumference - (progressPercentage / 100) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `${progressPercentage}%`;
    }
}

// Update progress statistics
function updateProgressStats() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const tickets = getTickets();
    
    // Calculate explorer points
    const explorerPoints = (visitedPlaces.length * 10) + (mascots.length * 5) + (tickets.length * 2);
    
    // Update stats
    document.getElementById('visitedCount').textContent = visitedPlaces.length;
    document.getElementById('mascotCount').textContent = mascots.length;
    document.getElementById('ticketCount').textContent = tickets.length;
    document.getElementById('explorerPoints').textContent = explorerPoints;
}

// Load achievements and milestones
function loadAchievements() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const tickets = getTickets();
    const achievementsContainer = document.getElementById('achievementsContainer');
    
    const achievements = [];
    
    // Define achievement criteria
    const achievementCriteria = [
        { id: 'first-visit', name: 'First Steps', description: 'Visit your first heritage site', icon: '🎯', threshold: 1, current: visitedPlaces.length, type: 'visits' },
        { id: 'explorer', name: 'Cultural Explorer', description: 'Visit 3 heritage sites', icon: '🗺️', threshold: 3, current: visitedPlaces.length, type: 'visits' },
        { id: 'heritage-master', name: 'Heritage Master', description: 'Visit 5 heritage sites', icon: '🏛️', threshold: 5, current: visitedPlaces.length, type: 'visits' },
        { id: 'completionist', name: 'Completionist', description: 'Visit all heritage sites', icon: '👑', threshold: getAllSites().length, current: visitedPlaces.length, type: 'visits' },
        { id: 'collector', name: 'Mascot Collector', description: 'Collect 3 mascots', icon: '🎁', threshold: 3, current: mascots.length, type: 'mascots' },
        { id: 'supporter', name: 'Heritage Supporter', description: 'Purchase 2 tickets', icon: '🎫', threshold: 2, current: tickets.length, type: 'tickets' }
    ];
    
    let achievementsHTML = '';
    
    achievementCriteria.forEach(achievement => {
        const isCompleted = achievement.current >= achievement.threshold;
        const progressPercentage = Math.min((achievement.current / achievement.threshold) * 100, 100);
        
        achievementsHTML += `
            <div class="milestone-progress">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="d-flex align-items-center">
                        <span class="me-2" style="font-size: 1.5rem;">${achievement.icon}</span>
                        <div>
                            <h6 class="mb-0 fw-bold">${achievement.name}</h6>
                            <small class="text-muted">${achievement.description}</small>
                        </div>
                    </div>
                    <div class="text-end">
                        ${isCompleted ? 
                            '<span class="badge bg-success"><i class="fas fa-check me-1"></i>Completed</span>' :
                            `<span class="badge bg-secondary">${achievement.current}/${achievement.threshold}</span>`
                        }
                    </div>
                </div>
                <div class="progress" style="height: 6px;">
                    <div class="progress-bar ${isCompleted ? 'bg-success' : 'bg-primary'}" 
                         style="width: ${progressPercentage}%"></div>
                </div>
            </div>
        `;
    });
    
    if (achievementsHTML === '') {
        achievementsHTML = `
            <div class="text-center p-4">
                <i class="fas fa-trophy fa-3x text-muted mb-3"></i>
                <h5>No achievements yet</h5>
                <p class="text-muted">Start exploring heritage sites to unlock achievements!</p>
                <a href="map.html" class="btn btn-primary">
                    <i class="fas fa-map me-2"></i>
                    Explore Sites
                </a>
            </div>
        `;
    }
    
    achievementsContainer.innerHTML = achievementsHTML;
}

// Load regional progress
function loadRegionalProgress() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    
    // Northern Vietnam
    loadRegionProgress('north', heritageSitesByRegion.north, visitedPlaces, mascots, 'northernSites', 'northProgress', 'northProgressBar');
    
    // Southern Vietnam (including Central)
    loadRegionProgress('south', heritageSitesByRegion.south, visitedPlaces, mascots, 'southernSites', 'southProgress', 'southProgressBar');
}

// Load progress for a specific region
function loadRegionProgress(regionId, sites, visitedPlaces, mascots, containerId, progressId, progressBarId) {
    const container = document.getElementById(containerId);
    const progressElement = document.getElementById(progressId);
    const progressBar = document.getElementById(progressBarId);
    
    const visitedInRegion = sites.filter(site => visitedPlaces.includes(site.id));
    const progressPercentage = Math.round((visitedInRegion.length / sites.length) * 100);
    
    // Update progress indicators
    if (progressElement) progressElement.textContent = `${visitedInRegion.length}/${sites.length}`;
    if (progressBar) progressBar.style.width = `${progressPercentage}%`;
    
    // Generate site checklist
    const sitesHTML = sites.map(site => {
        const isVisited = visitedPlaces.includes(site.id);
        const hasMascot = mascots.some(m => m.id === site.mascot.id);
        
        return `
            <div class="site-item ${isVisited ? 'visited' : 'unvisited'}">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            ${isVisited ? 
                                '<i class="fas fa-check-circle text-success fa-lg"></i>' : 
                                '<i class="far fa-circle text-muted fa-lg"></i>'
                            }
                        </div>
                        <div>
                            <h6 class="mb-0 fw-bold">${site.name}</h6>
                            <small class="text-muted">${site.category}</small>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        ${hasMascot ? 
                            `<span class="me-2" title="Mascot collected">${site.mascot.image}</span>` : 
                            `<span class="me-2 opacity-50" title="Mascot not collected">${site.mascot.image}</span>`
                        }
                        <a href="site-details.html?id=${site.id}" class="btn btn-outline-primary btn-sm">
                            ${isVisited ? 'Revisit' : 'Explore'}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    if (container) container.innerHTML = sitesHTML;
}

// Load recommendations
function loadRecommendations() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const tickets = getTickets();
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    
    const allSites = getAllSites();
    const unvisitedSites = allSites.filter(site => !visitedPlaces.includes(site.id));
    
    let recommendationsHTML = '';
    
    if (visitedPlaces.length === 0) {
        // First-time user recommendations
        recommendationsHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="d-flex align-items-center mb-3">
                        <i class="fas fa-star text-warning fa-2x me-3"></i>
                        <div>
                            <h6 class="mb-0">Start Your Journey</h6>
                            <small class="text-muted">Visit your first heritage site to begin collecting mascots!</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex align-items-center mb-3">
                        <i class="fas fa-map text-primary fa-2x me-3"></i>
                        <div>
                            <h6 class="mb-0">Explore the Map</h6>
                            <small class="text-muted">Use the interactive map to discover sites near you.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-3">
                <a href="map.html" class="btn btn-primary btn-lg">
                    <i class="fas fa-compass me-2"></i>
                    Start Exploring
                </a>
            </div>
        `;
    } else if (unvisitedSites.length > 0) {
        // Show next recommended sites
        const nextSites = unvisitedSites.slice(0, 3);
        
        recommendationsHTML = `
            <div class="mb-3">
                <h6 class="fw-bold">
                    <i class="fas fa-compass me-2 text-primary"></i>
                    Recommended Next Destinations
                </h6>
            </div>
            <div class="row">
                ${nextSites.map(site => `
                    <div class="col-md-4 mb-3">
                        <div class="card border-0 shadow-sm h-100">
                            <img src="${site.image}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="${site.name}">
                            <div class="card-body">
                                <h6 class="card-title fw-bold">${site.name}</h6>
                                <p class="card-text small text-muted">${site.category}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="small">${site.mascot.image} ${site.mascot.name}</span>
                                    <a href="site-details.html?id=${site.id}" class="btn btn-primary btn-sm">Explore</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        // All sites visited
        recommendationsHTML = `
            <div class="text-center">
                <i class="fas fa-crown text-warning fa-4x mb-3"></i>
                <h4 class="fw-bold">Congratulations!</h4>
                <p class="text-muted">You've explored all available heritage sites! You're a true Vietnam Heritage Explorer.</p>
                <div class="mt-3">
                    <a href="wallet.html" class="btn btn-warning me-2">
                        <i class="fas fa-trophy me-2"></i>
                        View Your Collection
                    </a>
                    <button class="btn btn-outline-primary" onclick="shareProgress()">
                        <i class="fas fa-share me-2"></i>
                        Share Achievement
                    </button>
                </div>
            </div>
        `;
    }
    
    if (recommendationsContainer) {
        recommendationsContainer.innerHTML = recommendationsHTML;
    }
}

// Get all sites
function getAllSites() {
    return [...heritageSitesByRegion.north, ...heritageSitesByRegion.south];
}

// Share progress
function shareProgress() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const totalSites = getAllSites().length;
    const progressPercentage = Math.round((visitedPlaces.length / totalSites) * 100);
    
    const shareText = `I've explored ${visitedPlaces.length}/${totalSites} heritage sites (${progressPercentage}%) and collected ${mascots.length} mascots on Vietnam Heritage Explorer! 🏛️✨`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Heritage Exploration Progress',
            text: shareText,
            url: window.location.origin
        });
    } else {
        navigator.clipboard.writeText(`${shareText} ${window.location.origin}`).then(() => {
            showNotification('Progress shared to clipboard!', 'success');
        });
    }
}