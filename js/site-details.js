// Site Details functionality for Vietnam Heritage Explorer

// Sample heritage sites data (same as in map.js)
const heritageSites = [
    {
        id: 'halong',
        name: 'Ha Long Bay',
        description: 'A stunning natural wonder with emerald waters and towering limestone pillars, steeped in Vietnamese legends and maritime culture.',
        fullDescription: 'Ha Long Bay, located in northeastern Vietnam, is a UNESCO World Heritage Site renowned for its emerald waters and thousands of towering limestone islands topped with rainforests. The bay covers an area of around 1,553 square kilometers and includes over 1,600 islands and islets. According to local legend, the bay was created by a great dragon that lived in the mountains. When it ran toward the coast, its flailing tail gouged out valleys and crevasses, which filled with water when the dragon plunged into the sea.',
        price: 500000,
        discountPrice: 400000,
        category: 'UNESCO Site',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=400&fit=crop',
        location: { lat: 20.9101, lng: 107.1839 },
        address: 'Ha Long Bay, Quang Ninh Province, Vietnam',
        hours: '8:00 AM - 6:00 PM',
        phone: '+84 203 3844 749',
        website: 'https://halongbay.gov.vn',
        highlights: [
            'UNESCO World Heritage Site since 1994',
            'Over 1,600 limestone islands and islets',
            'Traditional junk boat cruises',
            'Sung Sot Cave (Surprise Cave)',
            'Floating fishing villages'
        ],
        mascot: { id: 'dragon', name: 'Ha Long Dragon', image: '🐉', description: 'The legendary dragon that created Ha Long Bay' }
    },
    {
        id: 'hoian',
        name: 'Hoi An Ancient Town',
        description: 'A beautifully preserved trading port with colorful lanterns, traditional architecture, and rich cultural heritage.',
        fullDescription: 'Hoi An Ancient Town is an exceptionally well-preserved example of a South-East Asian trading port dating from the 15th to the 19th century. Its buildings and street plan reflect the influences, both indigenous and foreign, that have combined to produce this unique heritage site. The town comprises over 1,000 timber frame buildings, with brick or wooden walls, including architectural monuments, commercial and domestic vernacular structures, and religious buildings.',
        price: 120000,
        discountPrice: 100000,
        category: 'Historic Town',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop',
        location: { lat: 15.8801, lng: 108.3380 },
        address: 'Hoi An Ancient Town, Quang Nam Province, Vietnam',
        hours: '24/7 (Old Quarter)',
        phone: '+84 235 3861 327',
        website: 'https://hoianworldheritage.org.vn',
        highlights: [
            'UNESCO World Heritage Site since 1999',
            'Japanese Covered Bridge',
            'Traditional lantern festivals',
            'Ancient merchant houses',
            'Tailor shops and local cuisine'
        ],
        mascot: { id: 'lantern', name: 'Hoi An Lantern', image: '🏮', description: 'Symbol of the colorful lantern festivals' }
    },
    {
        id: 'temple',
        name: 'Temple of Literature',
        description: 'Vietnam\'s first university, dedicated to Confucius and literature, showcasing traditional Vietnamese education and architecture.',
        fullDescription: 'The Temple of Literature is a Temple of Confucius in Hanoi, northern Vietnam. The temple hosts the Imperial Academy, Vietnam\'s first national university. The temple was built in 1070 at the time of Emperor Lý Thánh Tông. It is one of several temples in Vietnam which are dedicated to Confucius, sages and scholars. The temple is divided into five courtyards, each with its own significance and history.',
        price: 30000,
        discountPrice: 25000,
        category: 'Cultural Site',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop',
        location: { lat: 21.0285, lng: 105.8542 },
        address: '58 Quoc Tu Giam Street, Dong Da District, Hanoi, Vietnam',
        hours: '8:00 AM - 5:00 PM',
        phone: '+84 24 3845 2917',
        website: 'https://vanmieu.gov.vn',
        highlights: [
            'Vietnam\'s first university (1070)',
            'Dedicated to Confucius and education',
            'Beautiful traditional architecture',
            'Stone steles of doctoral graduates',
            'Peaceful courtyards and gardens'
        ],
        mascot: { id: 'scholar', name: 'Confucian Scholar', image: '👨‍🎓', description: 'Representing wisdom and learning' }
    },
    {
        id: 'imperial-city',
        name: 'Imperial City of Hue',
        description: 'The former imperial capital with magnificent palaces, temples, and royal tombs from the Nguyen Dynasty.',
        fullDescription: 'The Imperial City of Hue was the capital of Vietnam for nearly 150 years (1802-1945) under the Nguyen Dynasty. The complex comprises the Imperial Enclosure (Hoang Thanh), the Forbidden Purple City (Tu Cam Thanh) and the Capital City (Kinh Thanh). The Imperial City is a walled fortress and palace in the former imperial capital of Hue. It was constructed beginning in 1804 during the reign of Emperor Gia Long.',
        price: 200000,
        discountPrice: 160000,
        category: 'UNESCO Site',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop',
        location: { lat: 16.4637, lng: 107.5909 },
        address: 'Imperial City, Hue, Thua Thien Hue Province, Vietnam',
        hours: '6:30 AM - 5:30 PM',
        phone: '+84 234 3523 237',
        website: 'https://hueworldheritage.org.vn',
        highlights: [
            'UNESCO World Heritage Site since 1993',
            'Former imperial capital of Vietnam',
            'Nguyen Dynasty palaces and temples',
            'Royal tombs and mausoleums',
            'Traditional court music performances'
        ],
        mascot: { id: 'emperor', name: 'Royal Phoenix', image: '🦅', description: 'Symbol of imperial power and majesty' }
    },
    {
        id: 'my-son',
        name: 'My Son Sanctuary',
        description: 'Ancient Hindu temple complex built by the Cham civilization, showcasing unique architectural heritage.',
        fullDescription: 'My Son Sanctuary is a cluster of abandoned and partially ruined Hindu temples constructed between the 4th and 14th century by the Kings of Champa. The temples are dedicated to the worship of the god Shiva, known under the name Bhadreshvara. My Son is regarded as one of the foremost Hindu temple complexes in South East Asia and is the foremost heritage site of this type in Vietnam.',
        price: 150000,
        discountPrice: 120000,
        category: 'UNESCO Site',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop',
        location: { lat: 15.7649, lng: 108.1217 },
        address: 'My Son Sanctuary, Duy Xuyen District, Quang Nam Province, Vietnam',
        hours: '6:00 AM - 5:00 PM',
        phone: '+84 235 3731 309',
        website: 'https://mysonworldheritage.org.vn',
        highlights: [
            'UNESCO World Heritage Site since 1999',
            'Ancient Cham civilization temples',
            'Hindu architecture and sculptures',
            'Dedicated to the god Shiva',
            'Traditional Cham cultural performances'
        ],
        mascot: { id: 'cham', name: 'Cham Guardian', image: '🗿', description: 'Ancient guardian of Cham temples' }
    },
    {
        id: 'one-pillar',
        name: 'One Pillar Pagoda',
        description: 'Historic Buddhist temple built in 1049, representing a lotus blossom emerging from water.',
        fullDescription: 'The One Pillar Pagoda is a historic Buddhist temple in Hanoi, the capital of Vietnam. It was built in 1049 during the reign of Emperor Lý Thái Tông. According to court records, the emperor was childless and dreamed of the Goddess of Mercy, who handed him a baby son while seated on a lotus flower. When he woke up, he married a peasant girl he met, who bore him a son. The emperor constructed this temple in gratitude.',
        price: 0,
        discountPrice: 0,
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop',
        location: { lat: 21.0358, lng: 105.8342 },
        address: 'One Pillar Pagoda, Ba Dinh District, Hanoi, Vietnam',
        hours: '8:00 AM - 5:00 PM',
        phone: '+84 24 3845 5441',
        website: 'https://chuamotcot.gov.vn',
        highlights: [
            'Built in 1049 during Ly Dynasty',
            'Unique architectural design',
            'Symbol of lotus blossom',
            'Important Buddhist pilgrimage site',
            'Beautiful traditional gardens'
        ],
        mascot: { id: 'lotus', name: 'Sacred Lotus', image: '🪷', description: 'Symbol of purity and enlightenment' }
    },
    {
        id: 'war-museum',
        name: 'War Remnants Museum',
        description: 'Museum documenting the Vietnam War and its impact, featuring artifacts, photographs, and military equipment.',
        fullDescription: 'The War Remnants Museum is a war museum at 28 Vo Van Tan Street, in District 3, Ho Chi Minh City, Vietnam. It contains exhibits relating to the Vietnam War and the First Indochina War involving the French colonialists. The museum opened to the public in 1975. It is one of the most popular museums in Vietnam, with over one million visitors annually.',
        price: 40000,
        discountPrice: 30000,
        category: 'Museum',
        image: 'images/war-remanants-museum.png',
        location: { lat: 10.7797, lng: 106.6918 },
        address: '28 Vo Van Tan Street, District 3, Ho Chi Minh City, Vietnam',
        hours: '7:30 AM - 6:00 PM',
        phone: '+84 28 3930 5587',
        website: 'https://warremnantsmuseum.com',
        highlights: [
            'Comprehensive Vietnam War documentation',
            'Historical photographs and artifacts',
            'Military equipment displays',
            'Agent Orange effects exhibition',
            'Peace and reconciliation message'
        ],
        mascot: { id: 'peace', name: 'Peace Dove', image: '🕊️', description: 'Symbol of peace and remembrance' }
    },
    {
        id: 'cao-dai-temple',
        name: 'Cao Dai Temple',
        description: 'Holy See temple of Caodaism, a unique Vietnamese religion combining elements from major world religions.',
        fullDescription: 'The Cao Dai Temple in Tay Ninh is the Holy See of Caodaism, a Vietnamese religion that combines elements of Buddhism, Christianity, Taoism, and Confucianism. Founded in 1926, Caodaism is Vietnam\'s third-largest religion. The temple\'s architecture is unique, featuring a blend of Eastern and Western styles. The religion promotes the unity of all religions and the worship of one supreme being.',
        price: 0,
        discountPrice: 0,
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop',
        location: { lat: 11.3547, lng: 106.1045 },
        address: 'Cao Dai Temple, Hoa Thanh District, Tay Ninh Province, Vietnam',
        hours: '6:00 AM - 6:00 PM',
        phone: '+84 276 3822 376',
        website: 'https://caodai.org.vn',
        highlights: [
            'Holy See of Caodaism religion',
            'Unique architectural blend',
            'Daily prayer ceremonies',
            'Religious unity philosophy',
            'Colorful temple decorations'
        ],
        mascot: { id: 'eye', name: 'Divine Eye', image: '👁️', description: 'The all-seeing divine eye of Cao Dai' }
    }
];

let currentSite = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadSiteDetails();
});

// Load site details from URL parameter
function loadSiteDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const siteId = urlParams.get('id');

    if (!siteId) {
        showError('Site not found. Please select a site from the map.');
        return;
    }

    currentSite = heritageSites.find(site => site.id === siteId);

    if (!currentSite) {
        showError('Site details not available.');
        return;
    }

    displaySiteDetails(currentSite);
}

// Display site details
function displaySiteDetails(site) {
    const visitedPlaces = getVisitedPlaces();
    const isVisited = visitedPlaces.includes(site.id);
    const collectedMascots = getMascots();
    const hasMascot = collectedMascots.some(m => m.id === site.mascot.id);
    const tickets = getTickets();
    const hasTicket = tickets.some(ticket => ticket.siteId === site.id);

    const siteContent = document.getElementById('siteContent');

    siteContent.innerHTML = `
        <div class="row">
            <div class="col-12 position-relative">
                ${isVisited ? '<div class="visited-badge"><i class="fas fa-check me-2"></i>Visited</div>' : ''}
                <img src="${site.image}" alt="${site.name}" class="img-fluid hero-image w-100 mb-4">
            </div>
        </div>
        
        <div class="row">
            <div class="col-lg-8">
                <div class="info-card">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="badge bg-${getCategoryColor(site.category)} mb-2">${site.category}</span>
                            <h1 class="display-6 fw-bold text-primary">${site.name}</h1>
                        </div>
                        <button class="btn btn-outline-primary btn-lg" onclick="toggleFavorite(this)">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    
                    <p class="lead text-muted mb-4">${site.description}</p>
                    
                    <h5 class="fw-bold mb-3">About This Site</h5>
                    <p class="mb-4">${site.fullDescription}</p>
                    
                    <h5 class="fw-bold mb-3">Highlights</h5>
                    <ul class="list-unstyled">
                        ${site.highlights.map(highlight => `
                            <li class="mb-2">
                                <i class="fas fa-star text-warning me-2"></i>
                                ${highlight}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="info-card">
                    <h5 class="fw-bold mb-3">
                        <i class="fas fa-info-circle me-2 text-primary"></i>
                        Visitor Information
                    </h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <i class="fas fa-clock me-2 text-primary"></i>
                                    <strong>Hours:</strong> ${site.hours}
                                </li>
                                <li class="mb-2">
                                    <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                                    <strong>Address:</strong> ${site.address}
                                </li>
                                <li class="mb-2">
                                    <i class="fas fa-phone me-2 text-primary"></i>
                                    <strong>Phone:</strong> ${site.phone}
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <i class="fas fa-globe me-2 text-primary"></i>
                                    <strong>Website:</strong> 
                                    <a href="${site.website}" target="_blank" class="text-decoration-none">
                                        Visit Official Site
                                    </a>
                                </li>
                                <li class="mb-2">
                                    <i class="fas fa-ticket-alt me-2 text-primary"></i>
                                    <strong>Entry Fee:</strong> ${formatPrice(site.price)}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-4">
                <!-- Ticket Purchase Card -->
                <div class="ticket-card mb-4">
                    <h5 class="fw-bold mb-3">
                        <i class="fas fa-ticket-alt me-2"></i>
                        ${hasTicket ? 'Your Ticket' : 'Purchase Ticket'}
                    </h5>
                    <div class="text-center mb-3">
                        ${site.price > 0 ? `
                            <div class="price-original">${formatPrice(site.price)}</div>
                            <div class="price-discounted">${formatPrice(site.discountPrice)}</div>
                            <small class="opacity-75">${hasTicket ? 'Purchased with 20% discount!' : '20% discount for app users!'}</small>
                        ` : `
                            <div class="price-discounted">FREE ENTRY</div>
                            <small class="opacity-75">${hasTicket ? 'Free pass obtained!' : 'No ticket required'}</small>
                        `}
                    </div>
                    ${hasTicket ? `
                        <button class="btn btn-success btn-lg w-100 fw-bold" disabled>
                            <i class="fas fa-check me-2"></i>
                            Ticket Purchased
                        </button>
                        <div class="mt-2 text-center">
                            <a href="wallet.html" class="btn btn-outline-light btn-sm">
                                <i class="fas fa-wallet me-2"></i>
                                View in Wallet
                            </a>
                        </div>
                    ` : `
                        <button class="btn btn-warning btn-lg w-100 fw-bold" onclick="purchaseTicket()">
                            <i class="fas fa-shopping-cart me-2"></i>
                            ${site.price > 0 ? 'Buy Ticket' : 'Get Free Pass'}
                        </button>
                    `}
                </div>
                
                <!-- Mascot Collection Card -->
                <div class="mascot-card mb-4">
                    <div class="mascot-emoji">${site.mascot.image}</div>
                    <h5 class="fw-bold mb-2">${site.mascot.name}</h5>
                    <p class="mb-3 opacity-90">${site.mascot.description}</p>
                    
                    ${hasMascot ? `
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle me-2"></i>
                            Already collected!
                        </div>
                    ` : `
                        <button class="btn btn-light btn-lg fw-bold" onclick="collectMascot()">
                            <i class="fas fa-gift me-2"></i>
                            Collect Mascot
                        </button>
                        <small class="d-block mt-2 opacity-75">
                            Visit this site to unlock this mascot
                        </small>
                    `}
                </div>
                
                <!-- Progress Impact Card -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-body text-center">
                        <h6 class="fw-bold mb-3">
                            <i class="fas fa-chart-line me-2 text-primary"></i>
                            Your Progress Impact
                        </h6>
                        <div class="row">
                            <div class="col-4">
                                <div class="text-primary">
                                    <i class="fas fa-map-marker-alt fa-lg"></i>
                                    <div class="fw-bold mt-1">+1</div>
                                    <small class="text-muted">Site Visit</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="text-warning">
                                    <i class="fas fa-gift fa-lg"></i>
                                    <div class="fw-bold mt-1">+1</div>
                                    <small class="text-muted">Mascot</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="text-success">
                                    <i class="fas fa-star fa-lg"></i>
                                    <div class="fw-bold mt-1">+10</div>
                                    <small class="text-muted">Points</small>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <a href="progress.html" class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-chart-line me-2"></i>
                                View Full Progress
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Tour Guide Recommendations -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-success text-white">
                        <h6 class="mb-0">
                            <i class="fas fa-user-friends me-2"></i>
                            Recommended Local Guides
                        </h6>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-3">Connect with expert local guides for an authentic experience at ${site.name}.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <small class="text-muted">Available guides in this area</small>
                                <div class="fw-bold text-success">3-5 Expert Guides</div>
                            </div>
                            <a href="guides.html" class="btn btn-success">
                                <i class="fas fa-search me-2"></i>
                                Find Guides
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="action-buttons text-center">
                    <button class="btn btn-success btn-lg" onclick="markAsVisited()">
                        <i class="fas fa-map-marker-alt me-2"></i>
                        ${isVisited ? 'Visited' : 'Mark as Visited'}
                    </button>
                    <button class="btn btn-info btn-lg" onclick="shareSite()">
                        <i class="fas fa-share me-2"></i>
                        Share
                    </button>
                    <a href="map.html" class="btn btn-outline-primary btn-lg">
                        <i class="fas fa-map me-2"></i>
                        View on Map
                    </a>
                </div>
            </div>
        </div>
    `;
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

// Format price
function formatPrice(price) {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Purchase ticket
function purchaseTicket() {
    if (!currentSite) return;

    // Check if user already has a ticket for this site
    const existingTickets = getTickets();
    const hasTicket = existingTickets.some(ticket => ticket.siteId === currentSite.id);

    if (hasTicket) {
        showNotification('You already have a ticket for this site!', 'info');
        return;
    }

    // Show loading state
    const buyButton = document.querySelector('.ticket-card .btn-warning');
    const originalText = buyButton.innerHTML;
    buyButton.innerHTML = '<div class="loading me-2"></div>Processing...';
    buyButton.disabled = true;

    // Simulate processing delay
    setTimeout(() => {
        // Create ticket
        const newTicket = {
            id: `ticket-${currentSite.id}-${Date.now()}`,
            siteId: currentSite.id,
            siteName: currentSite.name,
            originalPrice: currentSite.price,
            discountPrice: currentSite.discountPrice,
            discount: Math.round(((currentSite.price - currentSite.discountPrice) / currentSite.price) * 100),
            purchaseDate: new Date().toISOString(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Valid for 30 days
            qrCode: generateQRCode(),
            status: 'active'
        };

        // Save ticket
        existingTickets.push(newTicket);
        localStorage.setItem('tickets', JSON.stringify(existingTickets));

        // Update button state
        buyButton.innerHTML = '<i class="fas fa-check me-2"></i>Purchased';
        buyButton.classList.remove('btn-warning');
        buyButton.classList.add('btn-success');

        // Show success modal with enhanced details
        showSuccessModal(
            'Ticket Purchased Successfully!',
            `
            <div class="text-center mb-4">
                <i class="fas fa-ticket-alt fa-4x text-success mb-3 ticket-reveal"></i>
                <h4 class="fw-bold animate-on-scroll">${currentSite.name}</h4>
                <div class="row mt-3">
                    <div class="col-6">
                        <div class="bg-light p-3 rounded">
                            <small class="text-muted">Original Price</small>
                            <div class="text-decoration-line-through">${formatPrice(currentSite.price)}</div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="bg-success text-white p-3 rounded">
                            <small>You Paid</small>
                            <div class="fw-bold">${formatPrice(currentSite.discountPrice)}</div>
                        </div>
                    </div>
                </div>
                <div class="alert alert-info mt-3">
                    <i class="fas fa-info-circle me-2"></i>
                    You saved ${formatPrice(currentSite.price - currentSite.discountPrice)} (${newTicket.discount}% discount)!
                </div>
                <div class="bg-light p-3 rounded mt-3">
                    <h6 class="fw-bold mb-2">Digital Ticket Details</h6>
                    <div class="row text-start">
                        <div class="col-6">
                            <small class="text-muted">Ticket ID:</small><br>
                            <code class="small">${newTicket.id.substring(0, 12)}...</code>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Valid Until:</small><br>
                            <small>${formatDate(newTicket.validUntil)}</small>
                        </div>
                    </div>
                    <div class="mt-2">
                        <small class="text-muted">QR Code:</small><br>
                        <div class="font-monospace small bg-white p-2 rounded border">${newTicket.qrCode}</div>
                    </div>
                </div>
            </div>
            `
        );

        // Add ticket purchase celebration
        if (window.animationUtils) {
            window.animationUtils.celebrateSuccess(document.body, '🎟️ Ticket purchased with savings!');
        }

        // Check for new rewards
        setTimeout(() => {
            if (window.rewardsSystem) {
                window.rewardsSystem.checkAndGrantRewards();
            }
        }, 1500);

        // Update page to reflect purchase
        setTimeout(() => {
            location.reload();
        }, 3000);

    }, 1500); // Simulate 1.5 second processing time
}

// Collect mascot
function collectMascot() {
    if (!currentSite) return;

    // Check if mascot already collected
    const collectedMascots = getMascots();
    const hasMascot = collectedMascots.some(m => m.id === currentSite.mascot.id);
    
    if (hasMascot) {
        showNotification('You already have this mascot!', 'info');
        return;
    }

    // Show loading state with animation
    const collectButton = document.querySelector('.mascot-card .btn-light');
    const originalText = collectButton.innerHTML;
    collectButton.innerHTML = '<div class="loading me-2"></div>Collecting...';
    collectButton.disabled = true;
    
    // Add collection animation to mascot card
    const mascotCard = document.querySelector('.mascot-card');
    mascotCard.style.transform = 'scale(1.05)';
    mascotCard.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.6)';

    // Simulate collection process
    setTimeout(() => {
        const success = addMascot(
            currentSite.mascot.id,
            currentSite.mascot.name,
            currentSite.mascot.image
        );

        if (success) {
            // Also mark as visited when collecting mascot
            addVisitedPlace(currentSite.id);
            
            // Calculate collection progress
            const totalMascots = heritageSites.length;
            const collectedCount = collectedMascots.length + 1; // +1 for the one just collected
            const progressPercentage = Math.round((collectedCount / totalMascots) * 100);
            
            // Check for collection milestones
            let milestoneReward = '';
            if (collectedCount === 1) {
                milestoneReward = '<div class="alert alert-warning mt-3"><i class="fas fa-star me-2"></i>First mascot collected! Welcome to the heritage explorer community!</div>';
            } else if (collectedCount === 3) {
                milestoneReward = '<div class="alert alert-warning mt-3"><i class="fas fa-trophy me-2"></i>3 mascots collected! You\'re becoming a heritage expert!</div>';
            } else if (collectedCount === 5) {
                milestoneReward = '<div class="alert alert-warning mt-3"><i class="fas fa-crown me-2"></i>5 mascots collected! Heritage Master status unlocked!</div>';
            } else if (collectedCount === totalMascots) {
                milestoneReward = '<div class="alert alert-success mt-3"><i class="fas fa-medal me-2"></i>🎉 CONGRATULATIONS! You\'ve collected all mascots! Ultimate Heritage Explorer!</div>';
            }

            showSuccessModal(
                '🎉 Mascot Collected!',
                `
                <div class="text-center mb-4">
                    <div class="mascot-collection-animation mb-3">
                        <div class="mascot-appear float-element" style="font-size: 5rem;">${currentSite.mascot.image}</div>
                    </div>
                    <h4 class="fw-bold text-primary animate-on-scroll">${currentSite.mascot.name}</h4>
                    <p class="text-muted mb-3 animate-slide-left">${currentSite.mascot.description}</p>
                    
                    <div class="row mb-3">
                        <div class="col-4">
                            <div class="bg-primary text-white p-3 rounded">
                                <h5 class="mb-0">${collectedCount}</h5>
                                <small>Collected</small>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="bg-info text-white p-3 rounded">
                                <h5 class="mb-0">${totalMascots - collectedCount}</h5>
                                <small>Remaining</small>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="bg-success text-white p-3 rounded">
                                <h5 class="mb-0">${progressPercentage}%</h5>
                                <small>Complete</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="progress mb-3" style="height: 10px;">
                        <div class="progress-bar bg-gradient-success" role="progressbar" 
                             style="width: ${progressPercentage}%" aria-valuenow="${progressPercentage}" 
                             aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        This site has been marked as visited and added to your journey!
                    </div>
                    
                    ${milestoneReward}
                    
                    <div class="mt-3">
                        <small class="text-muted">
                            <i class="fas fa-gift me-1"></i>
                            Mascot added to your collection • 
                            <i class="fas fa-star me-1"></i>
                            +10 Explorer Points earned
                        </small>
                    </div>
                </div>
                `
            );

            // Update button state
            collectButton.innerHTML = '<i class="fas fa-check me-2"></i>Collected!';
            collectButton.classList.remove('btn-light');
            collectButton.classList.add('btn-success');
            
            // Reset mascot card animation
            setTimeout(() => {
                mascotCard.style.transform = 'scale(1)';
                mascotCard.style.boxShadow = '';
            }, 500);

            // Add celebration effects
            if (window.animationUtils) {
                window.animationUtils.createLanternEffect();
                window.animationUtils.celebrateSuccess(document.body, `🎊 New mascot: ${currentSite.mascot.name}!`);
            }

            // Check for new rewards
            setTimeout(() => {
                if (window.rewardsSystem) {
                    window.rewardsSystem.checkAndGrantRewards();
                }
            }, 2000);

            // Refresh the page to update the UI
            setTimeout(() => {
                location.reload();
            }, 4000);
        } else {
            // Reset button if collection failed
            collectButton.innerHTML = originalText;
            collectButton.disabled = false;
            mascotCard.style.transform = 'scale(1)';
            mascotCard.style.boxShadow = '';
        }

    }, 1500); // Simulate 1.5 second collection time
}

// Mark as visited
function markAsVisited() {
    if (!currentSite) return;

    const visitedPlaces = getVisitedPlaces();
    if (visitedPlaces.includes(currentSite.id)) {
        showNotification('You have already visited this site!', 'info');
        return;
    }

    addVisitedPlace(currentSite.id);

    showSuccessModal(
        'Site Marked as Visited!',
        `
        <div class="mb-3">
            <i class="fas fa-map-marker-alt fa-3x text-success mb-3"></i>
            <h5>${currentSite.name}</h5>
            <p class="text-muted">Added to your journey progress</p>
        </div>
        `
    );

    // Check for new rewards
    setTimeout(() => {
        if (window.rewardsSystem) {
            window.rewardsSystem.checkAndGrantRewards();
        }
    }, 1000);

    // Refresh the page to update the UI
    setTimeout(() => {
        location.reload();
    }, 2000);
}

// Share site
function shareSite() {
    if (!currentSite) return;

    const shareText = `Check out ${currentSite.name} on Vietnam Heritage Explorer!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: currentSite.name,
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Get tickets from localStorage
function getTickets() {
    const tickets = localStorage.getItem('tickets');
    return tickets ? JSON.parse(tickets) : [];
}

// Generate QR code (simulated)
function generateQRCode() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Show success modal
function showSuccessModal(title, body) {
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    const modalTitle = document.querySelector('#successModal .modal-title');
    const modalBody = document.getElementById('successModalBody');

    modalTitle.innerHTML = `<i class="fas fa-check-circle me-2"></i>${title}`;
    modalBody.innerHTML = body;

    modal.show();
}

// Show error message
function showError(message) {
    const siteContent = document.getElementById('siteContent');
    siteContent.innerHTML = `
        <div class="text-center p-5">
            <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
            <h3>Oops!</h3>
            <p class="text-muted">${message}</p>
            <a href="map.html" class="btn btn-primary">
                <i class="fas fa-map me-2"></i>
                Browse Sites
            </a>
        </div>
    `;
}