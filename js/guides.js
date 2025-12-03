// Tour Guides functionality for Vietnam Heritage Explorer

// Static tour guide data for MVP
const tourGuides = [
    {
        id: 'guide-001',
        name: 'Nguyen Minh Duc',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        reviewCount: 127,
        location: 'hanoi',
        locationName: 'Hanoi',
        specialties: ['history', 'culture'],
        languages: ['vietnamese', 'english', 'french'],
        experience: 8,
        toursCompleted: 340,
        description: 'Passionate historian specializing in ancient Vietnamese culture and French colonial heritage. I love sharing the hidden stories behind Hanoi\'s historic sites.',
        pricePerHour: 600000,
        availability: 'Available',
        certifications: ['Licensed Tour Guide', 'Cultural Heritage Specialist'],
        featured: true
    },
    {
        id: 'guide-002',
        name: 'Tran Thi Mai',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        reviewCount: 89,
        location: 'hochiminh',
        locationName: 'Ho Chi Minh City',
        specialties: ['food', 'culture'],
        languages: ['vietnamese', 'english', 'japanese'],
        experience: 6,
        toursCompleted: 245,
        description: 'Food enthusiast and cultural expert. I\'ll take you on a culinary journey through Saigon\'s street food scene while sharing local traditions.',
        pricePerHour: 550000,
        availability: 'Available',
        certifications: ['Licensed Tour Guide', 'Food Safety Certified']
    },
    {
        id: 'guide-003',
        name: 'Le Van Hoang',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 4.7,
        reviewCount: 156,
        location: 'halong',
        locationName: 'Ha Long Bay',
        specialties: ['nature', 'photography'],
        languages: ['vietnamese', 'english', 'korean'],
        experience: 10,
        toursCompleted: 420,
        description: 'Nature photographer and maritime heritage expert. I know the best spots in Ha Long Bay for both stunning photos and cultural insights.',
        pricePerHour: 750000,
        availability: 'Busy until next week',
        certifications: ['Licensed Tour Guide', 'Marine Heritage Specialist', 'Photography Instructor']
    },
    {
        id: 'guide-004',
        name: 'Pham Thi Lan',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 4.9,
        reviewCount: 203,
        location: 'hue',
        locationName: 'Hue',
        specialties: ['history', 'culture'],
        languages: ['vietnamese', 'english', 'chinese'],
        experience: 12,
        toursCompleted: 580,
        description: 'Imperial history specialist with deep knowledge of the Nguyen Dynasty. I bring the royal heritage of Hue to life with authentic stories.',
        pricePerHour: 700000,
        availability: 'Available',
        certifications: ['Licensed Tour Guide', 'Imperial Heritage Expert', 'UNESCO Site Specialist'],
        featured: true
    },
    {
        id: 'guide-005',
        name: 'Vo Thanh Son',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        rating: 4.6,
        reviewCount: 74,
        location: 'danang',
        locationName: 'Da Nang',
        specialties: ['culture', 'nature'],
        languages: ['vietnamese', 'english'],
        experience: 5,
        toursCompleted: 180,
        description: 'Young and energetic guide specializing in Central Vietnam\'s cultural sites and natural wonders. Perfect for adventure seekers!',
        pricePerHour: 500000,
        availability: 'Available',
        certifications: ['Licensed Tour Guide', 'Adventure Tourism Certified']
    },
    {
        id: 'guide-006',
        name: 'Bui Thi Hong',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        rating: 4.8,
        reviewCount: 112,
        location: 'hochiminh',
        locationName: 'Ho Chi Minh City',
        specialties: ['history', 'photography'],
        languages: ['vietnamese', 'english', 'french', 'german'],
        experience: 9,
        toursCompleted: 320,
        description: 'War history specialist and photography enthusiast. I provide deep insights into Vietnam\'s modern history while capturing memorable moments.',
        pricePerHour: 650000,
        availability: 'Available',
        certifications: ['Licensed Tour Guide', 'War History Specialist', 'Professional Photographer']
    },
    {
        id: 'guide-007',
        name: 'Dang Van Minh',
        avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
        rating: 4.5,
        reviewCount: 67,
        location: 'hanoi',
        locationName: 'Hanoi',
        specialties: ['food', 'culture'],
        languages: ['vietnamese', 'english', 'japanese'],
        experience: 4,
        toursCompleted: 150,
        description: 'Street food expert and cultural storyteller. I\'ll show you the authentic flavors of Hanoi while sharing local customs and traditions.',
        pricePerHour: 450000,
        availability: 'Available',
        certifications: ['Licensed Tour Guide', 'Culinary Tourism Specialist']
    },
    {
        id: 'guide-008',
        name: 'Hoang Thi Yen',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        rating: 4.7,
        reviewCount: 95,
        location: 'hue',
        locationName: 'Hue',
        specialties: ['culture', 'food'],
        languages: ['vietnamese', 'english', 'korean'],
        experience: 7,
        toursCompleted: 280,
        description: 'Royal cuisine expert and cultural ambassador. I specialize in Hue\'s imperial culinary traditions and palace culture.',
        pricePerHour: 600000,
        availability: 'Available',
        certifications: ['Licensed Tour Guide', 'Royal Cuisine Specialist']
    }
];

let filteredGuides = [...tourGuides];
let selectedGuide = null;

// Initialize guides page when loaded
document.addEventListener('DOMContentLoaded', function() {
    loadGuides();
    initializeFilters();
    updateStats();
});

// Load and display guides
function loadGuides() {
    const guidesGrid = document.getElementById('guidesGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredGuides.length === 0) {
        guidesGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    const guidesHTML = filteredGuides.map(guide => `
        <div class="col-lg-6 col-xl-4 mb-5">
            <div class="guide-card ${guide.featured ? 'featured-guide' : ''} h-100">
                ${guide.featured ? '<div class="featured-badge"><i class="fas fa-star me-1"></i>Featured</div>' : ''}
                
                <div class="d-flex align-items-start mb-3">
                    <img src="${guide.avatar}" alt="${guide.name}" class="guide-avatar me-3">
                    <div class="flex-grow-1">
                        <h5 class="fw-bold mb-1">${guide.name}</h5>
                        <div class="guide-rating mb-1">
                            ${generateStars(guide.rating)}
                            <span class="ms-2 text-muted">${guide.rating} (${guide.reviewCount} reviews)</span>
                        </div>
                        <div class="text-muted">
                            <i class="fas fa-map-marker-alt me-1"></i>
                            ${guide.locationName}
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold text-success">${formatVND(guide.pricePerHour)}/hour</div>
                        <small class="text-muted">${guide.availability}</small>
                    </div>
                </div>
                
                <div class="flex-grow-1">
                    <p class="text-muted mb-3" style="height: 4.5rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${guide.description}</p>
                    
                    <div class="guide-specialties mb-3">
                        ${guide.specialties.map(specialty => 
                            `<span class="guide-specialty">${formatSpecialty(specialty)}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="guide-stats">
                        <div class="row text-center">
                            <div class="col-4">
                                <div class="fw-bold text-primary">${guide.experience}</div>
                                <small class="text-muted">Years Exp.</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold text-primary">${guide.toursCompleted}</div>
                                <small class="text-muted">Tours</small>
                            </div>
                            <div class="col-4">
                                <div class="fw-bold text-primary">${guide.languages.length}</div>
                                <small class="text-muted">Languages</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="guide-languages mb-3">
                        <small class="text-muted">Languages: </small>
                        ${guide.languages.map(lang => `<span class="badge bg-light text-dark me-1">${formatLanguage(lang)}</span>`).join('')}
                    </div>
                </div>
                
                <div class="d-flex gap-2 mt-auto">
                    <button class="btn btn-outline-primary flex-grow-1" onclick="viewGuideProfile('${guide.id}')">
                        <i class="fas fa-user me-2"></i>
                        View Profile
                    </button>
                    <button class="connect-btn flex-grow-1" onclick="connectWithGuide('${guide.id}')">
                        <i class="fas fa-handshake me-2"></i>
                        Connect
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    guidesGrid.innerHTML = guidesHTML;
}

// Initialize filter functionality
function initializeFilters() {
    const filters = ['locationFilter', 'specialtyFilter', 'languageFilter', 'ratingFilter'];
    
    filters.forEach(filterId => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
            filterElement.addEventListener('change', applyFilters);
        }
    });
}

// Apply filters to guides list
function applyFilters() {
    const locationFilter = document.getElementById('locationFilter').value;
    const specialtyFilter = document.getElementById('specialtyFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;
    
    filteredGuides = tourGuides.filter(guide => {
        // Location filter
        if (locationFilter !== 'all' && guide.location !== locationFilter) {
            return false;
        }
        
        // Specialty filter
        if (specialtyFilter !== 'all' && !guide.specialties.includes(specialtyFilter)) {
            return false;
        }
        
        // Language filter
        if (languageFilter !== 'all' && !guide.languages.includes(languageFilter)) {
            return false;
        }
        
        // Rating filter
        if (ratingFilter !== 'all') {
            const minRating = parseInt(ratingFilter);
            if (guide.rating < minRating) {
                return false;
            }
        }
        
        return true;
    });
    
    loadGuides();
}

// Clear all filters
function clearFilters() {
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('specialtyFilter').value = 'all';
    document.getElementById('languageFilter').value = 'all';
    document.getElementById('ratingFilter').value = 'all';
    
    filteredGuides = [...tourGuides];
    loadGuides();
}

// Update statistics
function updateStats() {
    document.getElementById('totalGuides').textContent = tourGuides.length;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Format specialty names
function formatSpecialty(specialty) {
    const specialtyNames = {
        'history': 'Historical Sites',
        'culture': 'Cultural Heritage',
        'food': 'Food & Cuisine',
        'nature': 'Nature & Landscapes',
        'photography': 'Photography Tours'
    };
    return specialtyNames[specialty] || specialty;
}

// Format language names
function formatLanguage(language) {
    const languageNames = {
        'vietnamese': 'Vietnamese',
        'english': 'English',
        'french': 'French',
        'japanese': 'Japanese',
        'korean': 'Korean',
        'chinese': 'Chinese',
        'german': 'German'
    };
    return languageNames[language] || language;
}

// View guide profile (detailed modal)
function viewGuideProfile(guideId) {
    const guide = tourGuides.find(g => g.id === guideId);
    if (!guide) return;
    
    // For MVP, we'll show a simple alert with guide details
    // In a full app, this would open a detailed profile modal
    const profileInfo = `
Guide Profile: ${guide.name}

📍 Location: ${guide.locationName}
⭐ Rating: ${guide.rating}/5 (${guide.reviewCount} reviews)
💼 Experience: ${guide.experience} years
🎯 Tours Completed: ${guide.toursCompleted}
💰 Rate: $${guide.pricePerHour}/hour

Specialties: ${guide.specialties.map(s => formatSpecialty(s)).join(', ')}
Languages: ${guide.languages.map(l => formatLanguage(l)).join(', ')}

Certifications:
${guide.certifications.map(cert => `• ${cert}`).join('\n')}

About: ${guide.description}
    `;
    
    alert(profileInfo);
}

// Connect with guide
function connectWithGuide(guideId) {
    const guide = tourGuides.find(g => g.id === guideId);
    if (!guide) return;
    
    selectedGuide = guide;
    
    const modal = new bootstrap.Modal(document.getElementById('connectModal'));
    const modalBody = document.getElementById('connectModalBody');
    
    modalBody.innerHTML = `
        <div class="text-center mb-4">
            <img src="${guide.avatar}" alt="${guide.name}" class="guide-avatar mb-3">
            <h4 class="fw-bold">${guide.name}</h4>
            <div class="guide-rating mb-2">
                ${generateStars(guide.rating)}
                <span class="ms-2 text-muted">${guide.rating}/5</span>
            </div>
            <p class="text-muted">${guide.locationName} • ${formatVND(guide.pricePerHour)}/hour</p>
        </div>
        
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="bg-light p-3 rounded text-center">
                    <i class="fas fa-clock text-primary fa-lg mb-2"></i>
                    <div class="fw-bold">${guide.experience} Years</div>
                    <small class="text-muted">Experience</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="bg-light p-3 rounded text-center">
                    <i class="fas fa-users text-success fa-lg mb-2"></i>
                    <div class="fw-bold">${guide.toursCompleted}</div>
                    <small class="text-muted">Tours Completed</small>
                </div>
            </div>
        </div>
        
        <div class="mb-3">
            <h6 class="fw-bold">Specialties:</h6>
            <div>
                ${guide.specialties.map(specialty => 
                    `<span class="guide-specialty">${formatSpecialty(specialty)}</span>`
                ).join('')}
            </div>
        </div>
        
        <div class="mb-3">
            <h6 class="fw-bold">Languages:</h6>
            <div>
                ${guide.languages.map(lang => `<span class="badge bg-primary me-1">${formatLanguage(lang)}</span>`).join('')}
            </div>
        </div>
        
        <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            <strong>Next Steps:</strong> Click "Contact Guide" to get their contact information and discuss your tour requirements.
        </div>
    `;
    
    modal.show();
}

// Confirm connection with guide
function confirmConnection() {
    if (!selectedGuide) return;
    
    // Simulate successful connection
    const contactInfo = `
🎉 Connection Successful!

You can now contact ${selectedGuide.name}:

📧 Email: ${selectedGuide.name.toLowerCase().replace(' ', '.')}@vietnamguides.com
📱 Phone: +84 ${Math.floor(Math.random() * 900000000 + 100000000)}
💬 WhatsApp: Available
📍 Meeting Point: ${selectedGuide.locationName} Tourist Information Center

💡 Tip: Mention "Vietnam Heritage Explorer" for a 10% discount on your first tour!

The guide will respond within 2-4 hours. Have a great cultural adventure! 🏛️
    `;
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('connectModal'));
    modal.hide();
    
    // Show success message
    setTimeout(() => {
        alert(contactInfo);
        
        // Track connection for rewards (if rewards system is available)
        if (window.rewardsSystem) {
            // Add a small delay then check for rewards
            setTimeout(() => {
                window.rewardsSystem.checkAndGrantRewards();
            }, 1000);
        }
        
        showNotification(`Connected with ${selectedGuide.name}! Check your email for contact details.`, 'success');
    }, 500);
    
    // Store connection in localStorage for tracking
    const connections = getGuideConnections();
    connections.push({
        guideId: selectedGuide.id,
        guideName: selectedGuide.name,
        connectedAt: new Date().toISOString()
    });
    localStorage.setItem('guideConnections', JSON.stringify(connections));
}

// Get guide connections from localStorage
function getGuideConnections() {
    const connections = localStorage.getItem('guideConnections');
    return connections ? JSON.parse(connections) : [];
}

// Format VND currency
function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Get recommended guides for a specific location
function getRecommendedGuides(location, limit = 3) {
    return tourGuides
        .filter(guide => guide.location === location || guide.featured)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}