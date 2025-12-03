// Wallet functionality for Vietnam Heritage Explorer

// Sample heritage sites data (for reference)
const heritageSites = [
    {
        id: 'halong',
        name: 'Ha Long Bay',
        category: 'UNESCO Site',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop',
        mascot: { id: 'dragon', name: 'Ha Long Dragon', image: '🐉' }
    },
    {
        id: 'hoian',
        name: 'Hoi An Ancient Town',
        category: 'Historic Town',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        mascot: { id: 'lantern', name: 'Hoi An Lantern', image: '🏮' }
    },
    {
        id: 'temple',
        name: 'Temple of Literature',
        category: 'Cultural Site',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        mascot: { id: 'scholar', name: 'Confucian Scholar', image: '👨‍🎓' }
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
        id: 'one-pillar',
        name: 'One Pillar Pagoda',
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        mascot: { id: 'lotus', name: 'Sacred Lotus', image: '🪷' }
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
];

// Initialize wallet when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadWalletData();
});

// Load all wallet data
function loadWalletData() {
    updateStats();
    loadMascots();
    loadTickets();
    loadVisitedSites();
    loadRewards();
}

// Update statistics
function updateStats() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const tickets = getTickets();
    
    // Update counters
    document.getElementById('visitedCount').textContent = visitedPlaces.length;
    document.getElementById('mascotCount').textContent = mascots.length;
    document.getElementById('ticketCount').textContent = tickets.length;
    
    // Calculate progress percentage
    const totalSites = heritageSites.length;
    const progressPercentage = Math.round((visitedPlaces.length / totalSites) * 100);
    document.getElementById('progressPercentage').textContent = `${progressPercentage}%`;
    
    // Calculate achievements (simple logic)
    let achievements = 0;
    if (visitedPlaces.length >= 1) achievements++;
    if (visitedPlaces.length >= 3) achievements++;
    if (visitedPlaces.length >= 5) achievements++;
    if (mascots.length >= 3) achievements++;
    if (tickets.length >= 2) achievements++;
    
    document.getElementById('achievementCount').textContent = achievements;
    
    // Calculate points (10 points per visit, 5 per mascot, 2 per ticket)
    const totalPoints = (visitedPlaces.length * 10) + (mascots.length * 5) + (tickets.length * 2);
    document.getElementById('totalPoints').textContent = totalPoints;
}

// Load mascots
function loadMascots() {
    const mascots = getMascots();
    const mascotsGrid = document.getElementById('mascotsGrid');
    
    if (mascots.length === 0) {
        mascotsGrid.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="fas fa-gift fa-4x mb-3"></i>
                    <h4>No Mascots Yet</h4>
                    <p>Visit heritage sites to collect unique mascots!</p>
                    <a href="map.html" class="btn btn-primary">
                        <i class="fas fa-map me-2"></i>
                        Explore Sites
                    </a>
                </div>
            </div>
        `;
        return;
    }
    
    const mascotsHTML = mascots.map(mascot => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="mascot-item">
                <div class="mascot-emoji">${mascot.image}</div>
                <h5 class="fw-bold">${mascot.name}</h5>
                <p class="text-muted small mb-2">Collected on</p>
                <p class="small">${formatDate(mascot.collectedAt)}</p>
                <div class="mt-3">
                    <span class="badge bg-success">
                        <i class="fas fa-check me-1"></i>
                        Collected
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    mascotsGrid.innerHTML = mascotsHTML;
}

// Load tickets
function loadTickets() {
    const tickets = getTickets();
    const ticketsList = document.getElementById('ticketsList');
    
    if (tickets.length === 0) {
        ticketsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-ticket-alt fa-4x mb-3"></i>
                <h4>No Tickets Yet</h4>
                <p>Purchase tickets to heritage sites to see them here!</p>
                <a href="map.html" class="btn btn-primary">
                    <i class="fas fa-map me-2"></i>
                    Browse Sites
                </a>
            </div>
        `;
        return;
    }
    
    // Sort tickets by purchase date (newest first)
    const sortedTickets = tickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    
    const ticketsHTML = sortedTickets.map(ticket => {
        const isExpired = ticket.validUntil && new Date(ticket.validUntil) < new Date();
        const statusClass = isExpired ? 'danger' : 'success';
        const statusText = isExpired ? 'Expired' : 'Active';
        
        return `
        <div class="ticket-item ${isExpired ? 'opacity-75' : ''}">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="fw-bold mb-0">${ticket.siteName}</h5>
                        <span class="badge bg-${statusClass}">
                            <i class="fas fa-${isExpired ? 'times' : 'check'} me-1"></i>
                            ${statusText}
                        </span>
                    </div>
                    <div class="mb-2">
                        <span class="badge bg-primary me-2">
                            <i class="fas fa-ticket-alt me-1"></i>
                            Digital Ticket
                        </span>
                        <span class="text-muted small">
                            Purchased: ${formatDate(ticket.purchaseDate)}
                        </span>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="text-primary fw-bold">
                                Paid: ${formatPrice(ticket.discountPrice || ticket.price)}
                            </div>
                            ${ticket.originalPrice && ticket.discountPrice ? `
                                <div class="small text-muted">
                                    <span class="text-decoration-line-through">${formatPrice(ticket.originalPrice)}</span>
                                    <span class="text-success ms-1">(${ticket.discount}% off)</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="col-sm-6">
                            ${ticket.validUntil ? `
                                <div class="small text-muted">
                                    Valid until: ${formatDate(ticket.validUntil)}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="qr-code text-center">
                        <i class="fas fa-qrcode fa-2x mb-2"></i>
                        <div class="small fw-bold">QR Code</div>
                        <div class="font-monospace small text-muted bg-white p-2 rounded border mt-2">${ticket.qrCode}</div>
                        <div class="mt-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="shareTicket('${ticket.id}')">
                                <i class="fas fa-share me-1"></i>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
    
    ticketsList.innerHTML = ticketsHTML;
}

// Load visited sites
function loadVisitedSites() {
    const visitedPlaces = getVisitedPlaces();
    const visitedSites = document.getElementById('visitedSites');
    
    if (visitedPlaces.length === 0) {
        visitedSites.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="fas fa-map-marker-alt fa-4x mb-3"></i>
                    <h4>No Sites Visited Yet</h4>
                    <p>Start exploring Vietnam's cultural heritage!</p>
                    <a href="map.html" class="btn btn-primary">
                        <i class="fas fa-map me-2"></i>
                        Explore Sites
                    </a>
                </div>
            </div>
        `;
        return;
    }
    
    // Get site details for visited places
    const visitedSiteDetails = visitedPlaces.map(placeId => {
        return heritageSites.find(site => site.id === placeId);
    }).filter(site => site !== undefined);
    
    const sitesHTML = visitedSiteDetails.map(site => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 border-0 shadow-sm">
                <div class="position-relative">
                    <img src="${site.image}" alt="${site.name}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-success">
                            <i class="fas fa-check me-1"></i>
                            Visited
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">${site.name}</h5>
                    <div class="mb-2">
                        <span class="badge bg-${getCategoryColor(site.category)}">${site.category}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="d-flex align-items-center">
                            <span class="me-2">${site.mascot.image}</span>
                            <small class="text-muted">${site.mascot.name}</small>
                        </div>
                        <a href="site-details.html?id=${site.id}" class="btn btn-outline-primary btn-sm">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    visitedSites.innerHTML = sitesHTML;
}

// Get category color for badges
function getCategoryColor(category) {
    const colors = {
        'UNESCO Site': 'warning',
        'Historic Town': 'success',
        'Cultural Site': 'info',
        'Temple': 'secondary',
        'Museum': 'primary'
    };
    return colors[category] || 'primary';
}

// Get tickets from localStorage
function getTickets() {
    const tickets = localStorage.getItem('tickets');
    return tickets ? JSON.parse(tickets) : [];
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format price
function formatPrice(price) {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Load rewards
function loadRewards() {
    const earnedRewards = getEarnedRewards();
    const rewardsList = document.getElementById('rewardsList');
    
    if (earnedRewards.length === 0) {
        rewardsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy fa-4x mb-3"></i>
                <h4>No Rewards Yet</h4>
                <p>Complete activities to earn rewards and badges!</p>
                <a href="map.html" class="btn btn-primary">
                    <i class="fas fa-map me-2"></i>
                    Start Exploring
                </a>
            </div>
        `;
        return;
    }
    
    // Sort rewards by earned date (newest first)
    const sortedRewards = earnedRewards.sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt));
    
    const rewardsHTML = sortedRewards.map(reward => `
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-2 text-center">
                        ${reward.reward.image ? 
                            `<div style="font-size: 3rem;">${reward.reward.image}</div>` :
                            `<i class="fas fa-trophy fa-3x text-warning"></i>`
                        }
                    </div>
                    <div class="col-md-7">
                        <h5 class="fw-bold mb-1">${reward.name}</h5>
                        <p class="text-muted mb-2">${reward.description}</p>
                        ${reward.reward.description ? `
                            <small class="text-info">
                                <i class="fas fa-info-circle me-1"></i>
                                ${reward.reward.description}
                            </small>
                        ` : ''}
                        <div class="mt-2">
                            <span class="badge bg-${getRewardTypeColor(reward.type)} me-2">
                                ${reward.type.toUpperCase()}
                            </span>
                            <small class="text-muted">
                                Earned on ${formatDate(reward.earnedAt)}
                            </small>
                        </div>
                    </div>
                    <div class="col-md-3 text-end">
                        <div class="bg-light p-3 rounded text-center">
                            <i class="fas fa-star text-warning fa-lg"></i>
                            <div class="fw-bold mt-1">+${reward.points}</div>
                            <small class="text-muted">Points</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    rewardsList.innerHTML = rewardsHTML;
}

// Get reward type color
function getRewardTypeColor(type) {
    const colors = {
        'badge': 'warning',
        'ticket': 'success',
        'mascot': 'info',
        'points': 'primary'
    };
    return colors[type] || 'secondary';
}

// Get earned rewards
function getEarnedRewards() {
    const rewards = localStorage.getItem('earnedRewards');
    return rewards ? JSON.parse(rewards) : [];
}

// Share ticket
function shareTicket(ticketId) {
    const tickets = getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (!ticket) return;
    
    const shareText = `I just got a ticket to ${ticket.siteName} through Vietnam Heritage Explorer! 🎫`;
    const shareUrl = `${window.location.origin}/site-details.html?id=${ticket.siteId}`;
    
    if (navigator.share) {
        navigator.share({
            title: `Ticket to ${ticket.siteName}`,
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            showNotification('Ticket link copied to clipboard!', 'success');
        });
    }
}