// Vietnam Heritage Explorer - Main JavaScript

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Initialize application
function initializeApp() {
    updateVisitStatus();
    updateHeroStats();
    initializeHeartButtons();
    initializeSmoothScrolling();
    initializeAnimations();
    addResetButton();
}

// Add reset button for testing (only in development)
function addResetButton() {
    // Only add reset button if we're testing locally
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '' || window.location.hostname === 'vietnam-heritage-explorer.netlify.app') {
        const resetButton = document.createElement('button');
        resetButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
        resetButton.className = 'position-fixed rounded-circle border-0';
        resetButton.style.cssText = `
            bottom: 20px; 
            right: 20px; 
            z-index: 9999; 
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            font-size: 18px;
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.9;
            backdrop-filter: blur(10px);
        `;
        resetButton.title = '🔄 Reset all data (Dev mode)';

        // Add hover effects
        resetButton.onmouseenter = function () {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.1) rotate(180deg)';
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.6)';
            this.style.background = 'linear-gradient(135deg, #ff5252, #d32f2f)';
        };
        resetButton.onmouseleave = function () {
            this.style.opacity = '0.9';
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
            this.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
        };

        // Add click animation
        resetButton.onmousedown = function () {
            this.style.transform = 'scale(0.95) rotate(180deg)';
        };
        resetButton.onmouseup = function () {
            this.style.transform = 'scale(1.1) rotate(180deg)';
        };

        resetButton.onclick = function () {
            // Add spinning animation during confirmation
            this.style.animation = 'spin 1s linear infinite';

            if (confirm('🔄 Reset all data?\n\nThis will clear:\n• All tickets\n• Visited places\n• Collected mascots\n\nThis action cannot be undone.')) {
                localStorage.clear();
                showNotification('All data cleared! Page will reload...', 'success');
                setTimeout(() => location.reload(), 1500);
            } else {
                // Stop spinning if cancelled
                this.style.animation = 'none';
            }
        };

        // Add CSS animation for spinning
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(resetButton);
    }
}

// Update visit status from localStorage
function updateVisitStatus() {
    const visitedPlaces = getVisitedPlaces();
    const tickets = getTickets();
    const statusElement = document.getElementById('visit-status');
    const progressBar = document.getElementById('main-progress-bar');

    if (statusElement) {
        const visitCount = visitedPlaces.length;
        const ticketCount = tickets.length;
        const totalSites = 8; // Based on our heritage sites data
        const progressPercentage = Math.round((visitCount / totalSites) * 100);

        if (ticketCount > 0) {
            statusElement.textContent = `You have visited ${visitCount}/${totalSites} places and purchased ${ticketCount} ticket${ticketCount !== 1 ? 's' : ''} (${progressPercentage}% complete)`;
        } else {
            statusElement.textContent = `You have visited ${visitCount}/${totalSites} places (${progressPercentage}% complete)`;
        }

        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
    }
}

// Get tickets from localStorage
function getTickets() {
    const tickets = localStorage.getItem('tickets');
    return tickets ? JSON.parse(tickets) : [];
}

// Update hero stats with dynamic data
function updateHeroStats() {
    const visitedPlaces = getVisitedPlaces();
    const mascots = getMascots();
    const totalSites = 8; // Based on our heritage sites data

    // Update stats
    const totalSitesElement = document.getElementById('totalSites');
    const collectedMascotsElement = document.getElementById('collectedMascots');
    const visitProgressElement = document.getElementById('visitProgress');
    const mascotPreviewElement = document.getElementById('mascotPreview');

    if (totalSitesElement) totalSitesElement.textContent = totalSites;
    if (collectedMascotsElement) collectedMascotsElement.textContent = mascots.length;
    if (visitProgressElement) {
        const progressPercentage = Math.round((visitedPlaces.length / totalSites) * 100);
        visitProgressElement.textContent = `${progressPercentage}%`;
    }

    // Update mascot preview with rewards info
    if (mascotPreviewElement) {
        const earnedRewards = getEarnedRewards();
        
        if (mascots.length === 0 && earnedRewards.length === 0) {
            mascotPreviewElement.innerHTML = '<small class="text-white-50">Start collecting mascots and earning rewards!</small>';
        } else if (earnedRewards.length > 0) {
            const recentReward = earnedRewards[earnedRewards.length - 1];
            const mascotEmojis = mascots.slice(-2).map(m => m.image).join(' ');
            mascotPreviewElement.innerHTML = `
                <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2" style="font-size: 1.2rem;">${mascotEmojis}</span>
                    <span class="me-2" style="font-size: 1.2rem;">🏆</span>
                    <small class="text-white-50">Latest: ${recentReward.name}</small>
                </div>
            `;
        } else {
            const recentMascots = mascots.slice(-3); // Show last 3 collected
            const mascotEmojis = recentMascots.map(m => m.image).join(' ');
            mascotPreviewElement.innerHTML = `
                <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2" style="font-size: 1.2rem;">${mascotEmojis}</span>
                    <small class="text-white-50">Recent collections</small>
                </div>
            `;
        }
    }
}

// Get visited places from localStorage
function getVisitedPlaces() {
    const visited = localStorage.getItem('visitedPlaces');
    return visited ? JSON.parse(visited) : [];
}

// Get earned rewards
function getEarnedRewards() {
    const rewards = localStorage.getItem('earnedRewards');
    return rewards ? JSON.parse(rewards) : [];
}

// Add a place to visited list
function addVisitedPlace(placeId) {
    const visitedPlaces = getVisitedPlaces();
    if (!visitedPlaces.includes(placeId)) {
        visitedPlaces.push(placeId);
        localStorage.setItem('visitedPlaces', JSON.stringify(visitedPlaces));
        updateVisitStatus();
        showNotification('Place added to your journey!', 'success');
    }
}

// Initialize heart buttons for favorites
function initializeHeartButtons() {
    const heartButtons = document.querySelectorAll('.btn-outline-primary');

    heartButtons.forEach(button => {
        if (button.querySelector('.fa-heart')) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                toggleFavorite(this);
            });
        }
    });
}

// Toggle favorite status
function toggleFavorite(button) {
    const heartIcon = button.querySelector('.fa-heart');
    const isLiked = button.classList.contains('btn-primary');

    if (isLiked) {
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        showNotification('Removed from favorites', 'info');
    } else {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        showNotification('Added to favorites!', 'success');
    }
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation Management System
function initializeAnimations() {
    // Add class to indicate animations are supported
    document.body.classList.add('js-animations-supported');
    
    // Initialize all animation systems
    initializeScrollAnimations();
    initializePageTransitions();
    initializeStaggeredAnimations();
    initializeVietnameseAnimations();
    initializeNumberCounters();
    initializeMagicEffects();
}

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered delay for child elements
                const children = entry.target.querySelectorAll('.stagger-animation');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
        observer.observe(el);
    });
    
    // Also observe stagger containers
    document.querySelectorAll('.stagger-container').forEach(container => {
        observer.observe(container);
    });
    
    // Observe individual stagger elements as fallback
    document.querySelectorAll('.stagger-animation').forEach(el => {
        observer.observe(el);
    });
}

// Page transition animations
function initializePageTransitions() {
    // Add page transition class to main content
    document.body.classList.add('page-transition');
    
    // Trigger animation when page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });

    // Handle page navigation with smooth transitions
    document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href.includes('.html')) {
                e.preventDefault();
                document.body.classList.remove('loaded');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });
}

// Staggered animations for lists and grids
function initializeStaggeredAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-animation');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// Vietnamese cultural animations
function initializeVietnameseAnimations() {
    // Add cultural elements to feature icons
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.classList.add('feature-icon-enhanced');
    });

    // Add magic effects to buttons
    document.querySelectorAll('.btn-primary, .btn-warning, .btn-success').forEach(btn => {
        btn.classList.add('btn-magic');
    });

    // Add enhanced effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('card-enhanced');
    });

    // Add Vietnamese border to sections
    document.querySelectorAll('section').forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('vietnamese-border');
        }
    });
}

// Number counting animation
function initializeNumberCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.dataset.count);
                animateNumber(target, 0, finalNumber, 2000);
                countObserver.unobserve(target);
            }
        });
    });

    counters.forEach(counter => {
        countObserver.observe(counter);
    });
}

// Number animation helper
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutCubic(progress);
        const currentNumber = Math.floor(start + (range * easedProgress));
        
        element.textContent = currentNumber;
        element.classList.add('number-count');

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// Easing function for smooth number animation
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Magic hover effects
function initializeMagicEffects() {
    // Progress bars magic
    document.querySelectorAll('.progress').forEach(progress => {
        progress.classList.add('progress-magic');
    });

    // Heritage reveal effect for images
    document.querySelectorAll('.card-img-top').forEach(img => {
        img.parentElement.classList.add('heritage-reveal');
        
        img.addEventListener('load', () => {
            setTimeout(() => {
                img.parentElement.classList.add('reveal');
            }, 500);
        });
    });
}

// Mascot collection animation
function animateMascotCollection(mascotElement) {
    mascotElement.classList.add('mascot-appear');
    
    // Add celebration effect
    setTimeout(() => {
        mascotElement.classList.add('celebrate');
    }, 800);
    
    // Add floating effect
    setTimeout(() => {
        mascotElement.classList.add('float-element');
    }, 1200);
}

// Ticket reveal animation
function animateTicketReveal(ticketElement) {
    ticketElement.classList.add('ticket-reveal');
    
    // Add glow effect for Vietnamese cultural feel
    setTimeout(() => {
        ticketElement.classList.add('cultural-element');
    }, 600);
}

// Progress bar animation with Vietnamese flair
function animateProgress(progressBar, percentage) {
    progressBar.style.width = '0%';
    progressBar.classList.add('progress-magic');
    
    setTimeout(() => {
        progressBar.style.width = percentage + '%';
    }, 300);
}

// Success celebration animation
function celebrateSuccess(element, message) {
    element.classList.add('celebrate');
    
    // Create floating success message
    const successMessage = document.createElement('div');
    successMessage.textContent = message;
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        animation: scaleIn 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 2000);
}

// Vietnamese lantern effect for special occasions
function createLanternEffect() {
    const lantern = document.createElement('div');
    lantern.style.cssText = `
        position: fixed;
        top: -50px;
        right: 20px;
        width: 40px;
        height: 60px;
        background: linear-gradient(135deg, #ffc107, #fd7e14);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        z-index: 10000;
        animation: lanternFloat 3s ease-in-out infinite, lanternGlow 2s ease-in-out infinite;
        box-shadow: 0 0 20px rgba(255, 193, 7, 0.5);
    `;
    
    document.body.appendChild(lantern);
    
    setTimeout(() => {
        lantern.style.animation += ', fadeOut 1s ease-out forwards';
        setTimeout(() => {
            if (document.body.contains(lantern)) {
                document.body.removeChild(lantern);
            }
        }, 1000);
    }, 5000);
}

// Loading screen with Vietnamese elements
function showVietnameseLoader() {
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
        ">
            <div style="text-align: center;">
                <div class="vietnamese-loader" style="font-size: 3rem; margin-bottom: 1rem;">
                    🏮
                </div>
                <h3>Loading Heritage...</h3>
                <div class="progress" style="width: 200px; height: 4px; margin-top: 1rem;">
                    <div class="progress-bar progress-magic bg-warning" style="width: 0%; transition: width 2s ease-out;"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Animate progress bar
    setTimeout(() => {
        loader.querySelector('.progress-bar').style.width = '100%';
    }, 100);
    
    return loader;
}

// Enhanced notification with animations
function showAnimatedNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    const colors = {
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        error: 'var(--danger-color)',
        info: 'var(--info-color)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: -350px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-weight: 500;
        z-index: 10000;
        min-width: 300px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        transition: right 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border-left: 4px solid rgba(255,255,255,0.3);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="margin-right: 0.5rem; font-size: 1.2rem;">
                ${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.right = '20px';
    }, 100);
    
    // Slide out
    setTimeout(() => {
        notification.style.right = '-350px';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, duration);
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeAnimations();
    }, 100);
    
    // Fallback: Show stagger animations immediately if intersection observer doesn't work
    setTimeout(() => {
        const staggerElements = document.querySelectorAll('.stagger-animation');
        staggerElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 100);
        });
        
        // Also trigger other animations
        document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
            el.classList.add('animate');
        });
    }, 500);
});

// Override original showNotification with animated version
window.showNotification = showAnimatedNotification;

// Add animation utilities to window for global access
window.animationUtils = {
    animateMascotCollection,
    animateTicketReveal,
    animateProgress,
    celebrateSuccess,
    createLanternEffect,
    showVietnameseLoader,
    showAnimatedNotification
};

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Utility function to get mascots from localStorage
function getMascots() {
    const mascots = localStorage.getItem('collectedMascots');
    return mascots ? JSON.parse(mascots) : [];
}

// Add mascot to collection
function addMascot(mascotId, mascotName, mascotImage) {
    const mascots = getMascots();
    const existingMascot = mascots.find(m => m.id === mascotId);

    if (!existingMascot) {
        mascots.push({
            id: mascotId,
            name: mascotName,
            image: mascotImage,
            collectedAt: new Date().toISOString()
        });

        localStorage.setItem('collectedMascots', JSON.stringify(mascots));
        showNotification(`New mascot collected: ${mascotName}!`, 'success');
        return true;
    }

    return false;
}

// Initialize sample data if not exists
function initializeSampleData() {
    // Sample heritage sites data
    const sampleSites = [
        {
            id: 'halong',
            name: 'Ha Long Bay',
            description: 'A stunning natural wonder with emerald waters and towering limestone pillars.',
            price: 500000,
            category: 'UNESCO Site',
            image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop',
            location: { lat: 20.9101, lng: 107.1839 }
        },
        {
            id: 'hoian',
            name: 'Hoi An Ancient Town',
            description: 'A beautifully preserved trading port with colorful lanterns.',
            price: 120000,
            category: 'Historic Town',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            location: { lat: 15.8801, lng: 108.3380 }
        },
        {
            id: 'temple',
            name: 'Temple of Literature',
            description: 'Vietnam\'s first university, dedicated to Confucius and literature.',
            price: 30000,
            category: 'Cultural Site',
            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
            location: { lat: 21.0285, lng: 105.8542 }
        }
    ];

    // Store sample data if not exists
    if (!localStorage.getItem('heritageSites')) {
        localStorage.setItem('heritageSites', JSON.stringify(sampleSites));
    }
}

// Call initialize sample data
initializeSampleData();