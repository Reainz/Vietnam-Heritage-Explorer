// Rewards system for Vietnam Heritage Explorer

// Reward types and criteria
const REWARD_TYPES = {
    MASCOT: 'mascot',
    TICKET: 'ticket',
    BADGE: 'badge',
    POINTS: 'points'
};

// Reward criteria definitions
const REWARD_CRITERIA = [
    {
        id: 'first-visit',
        name: 'Welcome Explorer',
        description: 'Visit your first heritage site',
        type: REWARD_TYPES.BADGE,
        condition: (stats) => stats.visitedPlaces >= 1,
        reward: {
            id: 'welcome-badge',
            name: 'Welcome Explorer Badge',
            image: '🎯',
            description: 'Congratulations on starting your heritage journey!'
        },
        points: 50
    },
    {
        id: 'first-mascot',
        name: 'Collector Initiate',
        description: 'Collect your first mascot',
        type: REWARD_TYPES.BADGE,
        condition: (stats) => stats.mascots >= 1,
        reward: {
            id: 'collector-badge',
            name: 'Collector Initiate Badge',
            image: '🎁',
            description: 'You\'ve started building your mascot collection!'
        },
        points: 30
    },
    {
        id: 'first-ticket',
        name: 'Heritage Supporter',
        description: 'Purchase your first ticket',
        type: REWARD_TYPES.BADGE,
        condition: (stats) => stats.tickets >= 1,
        reward: {
            id: 'supporter-badge',
            name: 'Heritage Supporter Badge',
            image: '🎫',
            description: 'Thank you for supporting Vietnam\'s cultural heritage!'
        },
        points: 25
    },
    {
        id: 'three-visits',
        name: 'Cultural Explorer',
        description: 'Visit 3 heritage sites',
        type: REWARD_TYPES.TICKET,
        condition: (stats) => stats.visitedPlaces >= 3,
        reward: {
            id: 'bonus-ticket-3',
            name: 'Explorer Bonus Ticket',
            description: 'Free ticket for being an active explorer!',
            value: 100000
        },
        points: 100
    },
    {
        id: 'five-visits',
        name: 'Heritage Master',
        description: 'Visit 5 heritage sites',
        type: REWARD_TYPES.BADGE,
        condition: (stats) => stats.visitedPlaces >= 5,
        reward: {
            id: 'master-badge',
            name: 'Heritage Master Badge',
            image: '🏛️',
            description: 'You\'ve become a true heritage expert!'
        },
        points: 200
    },
    {
        id: 'three-mascots',
        name: 'Mascot Collector',
        description: 'Collect 3 mascots',
        type: REWARD_TYPES.TICKET,
        condition: (stats) => stats.mascots >= 3,
        reward: {
            id: 'bonus-ticket-mascot',
            name: 'Collector Bonus Ticket',
            description: 'Free ticket for your dedication to collecting!',
            value: 150000
        },
        points: 150
    },
    {
        id: 'completionist',
        name: 'Ultimate Explorer',
        description: 'Visit all heritage sites',
        type: REWARD_TYPES.BADGE,
        condition: (stats) => stats.visitedPlaces >= 8, // Total sites available
        reward: {
            id: 'ultimate-badge',
            name: 'Ultimate Explorer Badge',
            image: '👑',
            description: 'You\'ve explored every heritage site! You are the ultimate Vietnam Heritage Explorer!'
        },
        points: 500
    },
    {
        id: 'daily-visitor',
        name: 'Daily Explorer',
        description: 'Visit sites on consecutive days',
        type: REWARD_TYPES.POINTS,
        condition: (stats) => stats.consecutiveDays >= 2,
        reward: {
            points: 75,
            description: 'Bonus points for daily exploration!'
        },
        points: 75
    },
    {
        id: 'guide-connector',
        name: 'Community Builder',
        description: 'Connect with your first tour guide',
        type: REWARD_TYPES.BADGE,
        condition: (stats) => stats.guideConnections >= 1,
        reward: {
            id: 'community-badge',
            name: 'Community Builder Badge',
            image: '🤝',
            description: 'You\'re building connections with local heritage experts!'
        },
        points: 40
    }
];

// Initialize rewards system
function initializeRewards() {
    // Check for new rewards when the page loads
    setTimeout(() => {
        checkAndGrantRewards();
    }, 1000); // Delay to ensure other systems are loaded
}

// Main function to check and grant rewards
function checkAndGrantRewards() {
    const currentStats = getUserStats();
    const earnedRewards = getEarnedRewards();
    const newRewards = [];

    // Check each reward criteria
    REWARD_CRITERIA.forEach(criteria => {
        // Skip if already earned
        if (earnedRewards.some(reward => reward.id === criteria.id)) {
            return;
        }

        // Check if criteria is met
        if (criteria.condition(currentStats)) {
            // Grant the reward
            const newReward = grantReward(criteria);
            if (newReward) {
                newRewards.push(newReward);
            }
        }
    });

    // Show rewards if any were granted
    if (newRewards.length > 0) {
        showRewardNotifications(newRewards);
    }
}

// Get current user statistics
function getUserStats() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const tickets = getTickets();
    const guideConnections = getGuideConnections();
    
    // Calculate consecutive days (simplified for MVP)
    const consecutiveDays = calculateConsecutiveDays();

    return {
        visitedPlaces: visitedPlaces.length,
        mascots: mascots.length,
        tickets: tickets.length,
        guideConnections: guideConnections.length,
        consecutiveDays: consecutiveDays,
        totalPoints: calculateTotalPoints()
    };
}

// Calculate consecutive days of activity
function calculateConsecutiveDays() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    
    if (visitedPlaces.length === 0 && mascots.length === 0) {
        return 0;
    }

    // For MVP, we'll use a simplified calculation
    // In a real app, this would track actual visit dates
    const today = new Date().toDateString();
    const lastActivity = localStorage.getItem('lastActivityDate');
    
    if (lastActivity === today) {
        return parseInt(localStorage.getItem('consecutiveDays') || '1');
    } else {
        // Reset or increment based on activity
        const consecutiveDays = visitedPlaces.length > 0 || mascots.length > 0 ? 1 : 0;
        localStorage.setItem('consecutiveDays', consecutiveDays.toString());
        localStorage.setItem('lastActivityDate', today);
        return consecutiveDays;
    }
}

// Calculate total points
function calculateTotalPoints() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const tickets = getTickets();
    const earnedRewards = getEarnedRewards();
    
    let totalPoints = 0;
    
    // Base points
    totalPoints += visitedPlaces.length * 10; // 10 points per visit
    totalPoints += mascots.length * 5; // 5 points per mascot
    totalPoints += tickets.length * 2; // 2 points per ticket
    
    // Reward points
    earnedRewards.forEach(reward => {
        totalPoints += reward.points || 0;
    });
    
    return totalPoints;
}

// Grant a reward
function grantReward(criteria) {
    const earnedRewards = getEarnedRewards();
    
    const newReward = {
        id: criteria.id,
        name: criteria.name,
        description: criteria.description,
        type: criteria.type,
        reward: criteria.reward,
        points: criteria.points,
        earnedAt: new Date().toISOString()
    };

    // Add specific reward to appropriate storage
    if (criteria.type === REWARD_TYPES.TICKET) {
        // Add bonus ticket
        const tickets = getTickets();
        const bonusTicket = {
            id: `reward-${criteria.reward.id}-${Date.now()}`,
            siteId: 'bonus',
            siteName: criteria.reward.name,
            originalPrice: criteria.reward.value,
            discountPrice: 0,
            discount: 100,
            purchaseDate: new Date().toISOString(),
            validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
            qrCode: generateQRCode(),
            status: 'active',
            isReward: true
        };
        tickets.push(bonusTicket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    // Save reward to earned rewards
    earnedRewards.push(newReward);
    localStorage.setItem('earnedRewards', JSON.stringify(earnedRewards));
    
    return newReward;
}

// Get earned rewards
function getEarnedRewards() {
    const rewards = localStorage.getItem('earnedRewards');
    return rewards ? JSON.parse(rewards) : [];
}

// Show reward notifications
function showRewardNotifications(rewards) {
    rewards.forEach((reward, index) => {
        setTimeout(() => {
            showRewardModal(reward);
        }, index * 2000); // Stagger notifications
    });
}

// Show individual reward modal
function showRewardModal(reward) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="rewardModal-${reward.id}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-gradient-warning text-white border-0">
                        <h5 class="modal-title fw-bold">
                            <i class="fas fa-trophy me-2"></i>
                            Reward Earned!
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center p-4">
                        <div class="reward-animation mb-4">
                            ${reward.reward.image ? 
                                `<div style="font-size: 4rem; animation: bounce 1s ease-in-out infinite;">${reward.reward.image}</div>` :
                                `<i class="fas fa-gift fa-4x text-warning mb-3"></i>`
                            }
                        </div>
                        <h4 class="fw-bold text-primary">${reward.name}</h4>
                        <p class="text-muted mb-3">${reward.description}</p>
                        
                        ${reward.reward.description ? `
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle me-2"></i>
                                ${reward.reward.description}
                            </div>
                        ` : ''}
                        
                        <div class="row mt-4">
                            <div class="col-6">
                                <div class="bg-light p-3 rounded">
                                    <i class="fas fa-star text-warning fa-lg"></i>
                                    <div class="fw-bold mt-1">+${reward.points}</div>
                                    <small class="text-muted">Points</small>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="bg-light p-3 rounded">
                                    <i class="fas fa-trophy text-success fa-lg"></i>
                                    <div class="fw-bold mt-1">${reward.type}</div>
                                    <small class="text-muted">Reward Type</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a href="wallet.html" class="btn btn-warning">
                            <i class="fas fa-wallet me-2"></i>
                            View Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById(`rewardModal-${reward.id}`));
    modal.show();
    
    // Remove modal from DOM after it's hidden
    document.getElementById(`rewardModal-${reward.id}`).addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
    
    // Play celebration sound (if available)
    playRewardSound();
}

// Play reward sound (optional)
function playRewardSound() {
    // For MVP, we'll just show a visual celebration
    // In a full app, you could play an actual sound file
    console.log('🎉 Reward earned! 🎉');
}

// Generate QR code for bonus tickets
function generateQRCode() {
    return 'REWARD-' + Math.random().toString(36).substring(2, 15).toUpperCase();
}

// Utility functions (these should already exist in other files)
function getVisitedPlaces() {
    const visited = localStorage.getItem('visitedPlaces');
    return visited ? JSON.parse(visited) : [];
}

function getMascots() {
    const mascots = localStorage.getItem('collectedMascots');
    return mascots ? JSON.parse(mascots) : [];
}

function getTickets() {
    const tickets = localStorage.getItem('tickets');
    return tickets ? JSON.parse(tickets) : [];
}

// Get guide connections from localStorage
function getGuideConnections() {
    const connections = localStorage.getItem('guideConnections');
    return connections ? JSON.parse(connections) : [];
}

// Export functions for use in other modules
window.rewardsSystem = {
    initializeRewards,
    checkAndGrantRewards,
    getUserStats,
    getEarnedRewards,
    REWARD_TYPES,
    REWARD_CRITERIA
};

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', function() {
    initializeRewards();
});