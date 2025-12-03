// Map functionality for Vietnam Heritage Explorer

let map;
let markers = [];
let currentLocation = { lat: 21.0285, lng: 105.8542 }; // Default: Hanoi
let currentRadius = 50; // Default radius in km
let allSites = [];

// Location coordinates
const locations = {
    hanoi: { lat: 21.0285, lng: 105.8542, name: 'Hanoi' },
    hochiminh: { lat: 10.8231, lng: 106.6297, name: 'Ho Chi Minh City' },
    danang: { lat: 16.0544, lng: 108.2022, name: 'Da Nang' },
    hue: { lat: 16.4637, lng: 107.5909, name: 'Hue' },
    halong: { lat: 20.9101, lng: 107.1839, name: 'Ha Long' }
};

// Sample heritage sites data with more locations
const heritageSites = [
    {
        id: 'halong',
        name: 'Ha Long Bay',
        description: 'A stunning natural wonder with emerald waters and towering limestone pillars, steeped in Vietnamese legends and maritime culture.',
        price: 500000,
        category: 'UNESCO Site',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=250&fit=crop',
        location: { lat: 20.9101, lng: 107.1839 },
        hours: '8:00 AM - 6:00 PM',
        mascot: { id: 'dragon', name: 'Ha Long Dragon', image: '🐉' }
    },
    {
        id: 'hoian',
        name: 'Hoi An Ancient Town',
        description: 'A beautifully preserved trading port with colorful lanterns, traditional architecture, and rich cultural heritage.',
        price: 120000,
        category: 'Historic Town',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        location: { lat: 15.8801, lng: 108.3380 },
        hours: '24/7 (Old Quarter)',
        mascot: { id: 'lantern', name: 'Hoi An Lantern', image: '🏮' }
    },
    {
        id: 'temple',
        name: 'Temple of Literature',
        description: 'Vietnam\'s first university, dedicated to Confucius and literature, showcasing traditional Vietnamese education and architecture.',
        price: 30000,
        category: 'Cultural Site',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        location: { lat: 21.0285, lng: 105.8542 },
        hours: '8:00 AM - 5:00 PM',
        mascot: { id: 'scholar', name: 'Confucian Scholar', image: '👨‍🎓' }
    },
    {
        id: 'imperial-city',
        name: 'Imperial City of Hue',
        description: 'The former imperial capital with magnificent palaces, temples, and royal tombs from the Nguyen Dynasty.',
        price: 200000,
        category: 'UNESCO Site',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        location: { lat: 16.4637, lng: 107.5909 },
        hours: '6:30 AM - 5:30 PM',
        mascot: { id: 'emperor', name: 'Royal Phoenix', image: '🦅' }
    },
    {
        id: 'my-son',
        name: 'My Son Sanctuary',
        description: 'Ancient Hindu temple complex built by the Cham civilization, showcasing unique architectural heritage.',
        price: 150000,
        category: 'UNESCO Site',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        location: { lat: 15.7649, lng: 108.1217 },
        hours: '6:00 AM - 5:00 PM',
        mascot: { id: 'cham', name: 'Cham Guardian', image: '🗿' }
    },
    {
        id: 'one-pillar',
        name: 'One Pillar Pagoda',
        description: 'Historic Buddhist temple built in 1049, representing a lotus blossom emerging from water.',
        price: 0,
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        location: { lat: 21.0358, lng: 105.8342 },
        hours: '8:00 AM - 5:00 PM',
        mascot: { id: 'lotus', name: 'Sacred Lotus', image: '🪷' }
    },
    {
        id: 'war-museum',
        name: 'War Remnants Museum',
        description: 'Museum documenting the Vietnam War and its impact, featuring artifacts, photographs, and military equipment.',
        price: 40000,
        category: 'Museum',
        image: 'images/war-remanants-museum.png',
        location: { lat: 10.7797, lng: 106.6918 },
        hours: '7:30 AM - 6:00 PM',
        mascot: { id: 'peace', name: 'Peace Dove', image: '🕊️' }
    },
    {
        id: 'cao-dai-temple',
        name: 'Cao Dai Temple',
        description: 'Holy See temple of Caodaism, a unique Vietnamese religion combining elements from major world religions.',
        price: 0,
        category: 'Temple',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=250&fit=crop',
        location: { lat: 11.3547, lng: 106.1045 },
        hours: '6:00 AM - 6:00 PM',
        mascot: { id: 'eye', name: 'Divine Eye', image: '👁️' }
    }
];

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeControls();
    loadSites();
});

// Initialize the map
function initializeMap() {
    map = L.map('map').setView([currentLocation.lat, currentLocation.lng], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add center marker
    const centerMarker = L.marker([currentLocation.lat, currentLocation.lng], {
        icon: L.divIcon({
            className: 'center-marker',
            html: '<div style="background: #dc3545; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        })
    }).addTo(map);
    
    centerMarker.bindPopup('Search Center').openPopup();
}

// Initialize controls
function initializeControls() {
    const locationSelect = document.getElementById('locationSelect');
    const distanceRange = document.getElementById('distanceRange');
    const distanceValue = document.getElementById('distanceValue');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Location change handler
    locationSelect.addEventListener('change', function() {
        const selectedLocation = locations[this.value];
        if (selectedLocation) {
            currentLocation = selectedLocation;
            map.setView([selectedLocation.lat, selectedLocation.lng], 10);
            updateCenterMarker();
            filterAndDisplaySites();
        }
    });
    
    // Distance range handler
    distanceRange.addEventListener('input', function() {
        currentRadius = parseInt(this.value);
        distanceValue.textContent = currentRadius;
        filterAndDisplaySites();
    });
    
    // Category filter handler
    categoryFilter.addEventListener('change', function() {
        filterAndDisplaySites();
    });
}

// Update center marker
function updateCenterMarker() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker && layer.options.icon && layer.options.icon.options.className === 'center-marker') {
            map.removeLayer(layer);
        }
    });
    
    const centerMarker = L.marker([currentLocation.lat, currentLocation.lng], {
        icon: L.divIcon({
            className: 'center-marker',
            html: '<div style="background: #dc3545; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        })
    }).addTo(map);
    
    centerMarker.bindPopup(`Search Center: ${currentLocation.name || 'Selected Location'}`);
}

// Load and display sites
function loadSites() {
    allSites = heritageSites;
    filterAndDisplaySites();
}

// Filter and display sites based on current criteria
function filterAndDisplaySites() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    // Clear existing markers
    clearMarkers();
    
    // Filter sites by distance and category
    const filteredSites = allSites.filter(site => {
        const distance = calculateDistance(
            currentLocation.lat, currentLocation.lng,
            site.location.lat, site.location.lng
        );
        
        const withinRadius = distance <= currentRadius;
        const matchesCategory = categoryFilter === 'all' || site.category === categoryFilter;
        
        // Add distance to site object for display
        site.distance = Math.round(distance);
        
        return withinRadius && matchesCategory;
    });
    
    // Sort by distance
    filteredSites.sort((a, b) => a.distance - b.distance);
    
    // Display sites on map and in list
    displaySitesOnMap(filteredSites);
    displaySitesList(filteredSites);
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Clear existing markers
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Display sites on map
function displaySitesOnMap(sites) {
    sites.forEach(site => {
        const marker = L.marker([site.location.lat, site.location.lng], {
            icon: L.divIcon({
                className: 'site-marker',
                html: `<div style="background: #0d6efd; color: white; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">${site.mascot.image}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        }).addTo(map);
        
        // Check if user has ticket for this site
        const tickets = getTickets();
        const hasTicket = tickets.some(ticket => ticket.siteId === site.id && ticket.status === 'active');
        
        // Check if user has collected mascot for this site
        const mascots = getMascots();
        const hasMascot = mascots.some(mascot => mascot.id === site.mascot.id);
        
        marker.bindPopup(`
            <div class="text-center">
                <h6 class="fw-bold">${site.name}</h6>
                <p class="small text-muted mb-2">${site.description.substring(0, 100)}...</p>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-primary">${site.category}</span>
                    <span class="small text-muted">${site.distance} km away</span>
                </div>
                
                <div class="mb-2">
                    ${hasTicket ? `
                        <div class="alert alert-success alert-sm p-2 mb-1">
                            <i class="fas fa-ticket-alt me-1"></i>
                            <small>You have a ticket!</small>
                        </div>
                    ` : ''}
                    ${hasMascot ? `
                        <div class="alert alert-warning alert-sm p-2 mb-1">
                            <span class="me-1">${site.mascot.image}</span>
                            <small>Mascot collected!</small>
                        </div>
                    ` : `
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <span class="me-2" style="font-size: 1.2rem;">${site.mascot.image}</span>
                            <small class="text-muted">${site.mascot.name}</small>
                        </div>
                    `}
                </div>
                
                <div class="d-flex gap-1 flex-wrap">
                    <button class="btn btn-primary btn-sm" onclick="showSiteDetails('${site.id}')">
                        View Details
                    </button>
                    ${!hasTicket && site.price > 0 ? `
                        <button class="btn btn-warning btn-sm" onclick="window.location.href='site-details.html?id=${site.id}'">
                            Buy Ticket
                        </button>
                    ` : ''}
                    ${!hasMascot ? `
                        <button class="btn btn-success btn-sm" onclick="quickCollectMascot('${site.id}')">
                            <i class="fas fa-gift me-1"></i>
                            Collect
                        </button>
                    ` : ''}
                </div>
            </div>
        `);
        
        markers.push(marker);
    });
}

// Display sites in the list
function displaySitesList(sites) {
    const siteList = document.getElementById('siteList');
    const siteCount = document.getElementById('siteCount');
    
    siteCount.textContent = sites.length;
    
    if (sites.length === 0) {
        siteList.innerHTML = `
            <div class="text-center p-4">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <p class="text-muted">No heritage sites found in this area.</p>
                <p class="small text-muted">Try increasing the search radius or changing the location.</p>
            </div>
        `;
        return;
    }
    
    const sitesHTML = sites.map(site => {
        const tickets = getTickets();
        const hasTicket = tickets.some(ticket => ticket.siteId === site.id && ticket.status === 'active');
        const mascots = getMascots();
        const hasMascot = mascots.some(mascot => mascot.id === site.mascot.id);
        
        return `
        <div class="site-card p-3 border-bottom" onclick="selectSite('${site.id}')" data-site-id="${site.id}">
            <div class="d-flex">
                <img src="${site.image}" alt="${site.name}" 
                     class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;">
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                        <h6 class="fw-bold mb-0">${site.name}</h6>
                        <div class="d-flex gap-1">
                            ${hasTicket ? '<i class="fas fa-ticket-alt text-success" title="You have a ticket"></i>' : ''}
                            ${hasMascot ? `<span title="Mascot collected" style="font-size: 1.1rem;">${site.mascot.image}</span>` : ''}
                        </div>
                    </div>
                    <p class="small text-muted mb-2">${site.description.substring(0, 80)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="badge bg-${getCategoryColor(site.category)} me-2">${site.category}</span>
                            <span class="distance-badge">${site.distance} km</span>
                            ${!hasMascot ? `<span class="ms-2 small text-muted">${site.mascot.image} ${site.mascot.name}</span>` : ''}
                        </div>
                        <div class="text-end">
                            <div class="fw-bold ${hasTicket ? 'text-success' : 'text-primary'}">${formatPrice(site.price)}</div>
                            <small class="text-muted">${site.hours}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
    
    siteList.innerHTML = sitesHTML;
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

// Select site (highlight in list and map)
function selectSite(siteId) {
    // Remove previous selection
    document.querySelectorAll('.site-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    const selectedCard = document.querySelector(`[data-site-id="${siteId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Find and center map on selected site
    const site = allSites.find(s => s.id === siteId);
    if (site) {
        map.setView([site.location.lat, site.location.lng], 15);
        
        // Find and open popup for this marker
        markers.forEach(marker => {
            const markerLatLng = marker.getLatLng();
            if (Math.abs(markerLatLng.lat - site.location.lat) < 0.001 && 
                Math.abs(markerLatLng.lng - site.location.lng) < 0.001) {
                marker.openPopup();
            }
        });
    }
}

// Show site details in modal
function showSiteDetails(siteId) {
    const site = allSites.find(s => s.id === siteId);
    if (!site) return;
    
    const modal = new bootstrap.Modal(document.getElementById('siteModal'));
    const modalTitle = document.getElementById('siteModalTitle');
    const modalBody = document.getElementById('siteModalBody');
    const viewDetailsBtn = document.getElementById('viewDetailsBtn');
    
    modalTitle.textContent = site.name;
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${site.image}" alt="${site.name}" class="img-fluid rounded mb-3">
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <span class="badge bg-${getCategoryColor(site.category)} mb-2">${site.category}</span>
                    <h5 class="fw-bold">${site.name}</h5>
                    <p class="text-muted">${site.description}</p>
                </div>
                
                <div class="mb-3">
                    <h6 class="fw-bold">Details</h6>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-clock me-2 text-primary"></i> ${site.hours}</li>
                        <li><i class="fas fa-map-marker-alt me-2 text-primary"></i> ${site.distance} km away</li>
                        <li><i class="fas fa-ticket-alt me-2 text-primary"></i> ${formatPrice(site.price)}</li>
                    </ul>
                </div>
                
                <div class="mb-3">
                    <h6 class="fw-bold">Collectible Mascot</h6>
                    <div class="d-flex align-items-center">
                        <span class="fs-2 me-2">${site.mascot.image}</span>
                        <div>
                            <div class="fw-bold">${site.mascot.name}</div>
                            <small class="text-muted">Unlock by visiting this site</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    viewDetailsBtn.onclick = () => {
        window.location.href = `site-details.html?id=${site.id}`;
    };
    
    modal.show();
}

// Get tickets from localStorage
function getTickets() {
    const tickets = localStorage.getItem('tickets');
    return tickets ? JSON.parse(tickets) : [];
}

// Get mascots from localStorage
function getMascots() {
    const mascots = localStorage.getItem('collectedMascots');
    return mascots ? JSON.parse(mascots) : [];
}

// Get visited places from localStorage
function getVisitedPlaces() {
    const visited = localStorage.getItem('visitedPlaces');
    return visited ? JSON.parse(visited) : [];
}

// Quick collect mascot from map
function quickCollectMascot(siteId) {
    const site = allSites.find(s => s.id === siteId);
    if (!site) return;
    
    // Check if already collected
    const mascots = getMascots();
    const hasMascot = mascots.some(m => m.id === site.mascot.id);
    
    if (hasMascot) {
        alert('You already have this mascot!');
        return;
    }
    
    // Add mascot to collection
    const newMascot = {
        id: site.mascot.id,
        name: site.mascot.name,
        image: site.mascot.image,
        collectedAt: new Date().toISOString(),
        siteId: site.id,
        siteName: site.name
    };
    
    mascots.push(newMascot);
    localStorage.setItem('collectedMascots', JSON.stringify(mascots));
    
    // Also mark as visited
    const visitedPlaces = getVisitedPlaces();
    if (!visitedPlaces.includes(siteId)) {
        visitedPlaces.push(siteId);
        localStorage.setItem('visitedPlaces', JSON.stringify(visitedPlaces));
    }
    
    // Show success message
    alert(`🎉 ${site.mascot.name} collected!\n\nYou now have ${mascots.length} mascot${mascots.length !== 1 ? 's' : ''} in your collection!`);
    
    // Refresh the map to update markers
    filterAndDisplaySites();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Already handled above
    });
} else {
    // DOM is already loaded
    initializeMap();
    initializeControls();
    loadSites();
}