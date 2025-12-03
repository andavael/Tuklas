// ========================================
// HOME PAGE DESTINATIONS SECTION
// ========================================

// DESTINATIONS DATA
const homeDestinations = {
    popular: [
        {
            id: 1,
            title: 'Chocolate Hills',
            location: 'Bohol, Philippines',
            category: 'Mountains',
            rating: 5.0,
            image: 'assets/images/chocolate-hills.jpg',
            description: 'Over 1,200 cone-shaped hills that turn chocolate brown during dry season'
        },
        {
            id: 2,
            title: 'Taal Volcano',
            location: 'Batangas, Philippines',
            category: 'Mountains',
            rating: 4.8,
            image: 'assets/images/taal-volcano.jpg',
            description: 'An active volcano within a lake on an island'
        },
        {
            id: 5,
            title: 'El Nido',
            location: 'Palawan, Philippines',
            category: 'Beaches',
            rating: 5.0,
            image: 'assets/images/elnido.jpg',
            description: 'Stunning limestone cliffs and crystal-clear lagoons'
        },
        {
            id: 7,
            title: 'Siargao Island',
            location: 'Surigao del Norte, Philippines',
            category: 'Beaches',
            rating: 4.9,
            image: 'assets/images/siargao.jpg',
            description: 'Surfing capital with pristine beaches and laid-back vibes'
        },
        {
            id: 13,
            title: 'Manila',
            location: 'Metro Manila, Philippines',
            category: 'Cities',
            rating: 4.5,
            image: 'assets/images/manila.jpg',
            description: 'The bustling capital with rich history and modern attractions'
        }
    ],
    beaches: [
        {
            id: 5,
            title: 'El Nido',
            location: 'Palawan, Philippines',
            category: 'Beaches',
            rating: 5.0,
            image: 'assets/images/elnido.jpg',
            description: 'Stunning limestone cliffs and crystal-clear lagoons'
        },
        {
            id: 7,
            title: 'Siargao Island',
            location: 'Surigao del Norte, Philippines',
            category: 'Beaches',
            rating: 4.9,
            image: 'assets/images/siargao.jpg',
            description: 'Surfing capital with pristine beaches and laid-back vibes'
        },
        {
            id: 8,
            title: 'Boracay',
            location: 'Aklan, Philippines',
            category: 'Beaches',
            rating: 4.7,
            image: 'assets/images/boracay.jpg',
            description: 'White sand beaches and vibrant nightlife'
        },
        {
            id: 16,
            title: 'Coron Island',
            location: 'Palawan, Philippines',
            category: 'Beaches',
            rating: 4.9,
            image: 'assets/images/coron.jpg',
            description: 'Crystal-clear lakes and world-class diving spots'
        }
    ],
    mountains: [
        {
            id: 1,
            title: 'Chocolate Hills',
            location: 'Bohol, Philippines',
            category: 'Mountains',
            rating: 5.0,
            image: 'assets/images/chocolate-hills.jpg',
            description: 'Over 1,200 cone-shaped hills that turn chocolate brown during dry season'
        },
        {
            id: 2,
            title: 'Taal Volcano',
            location: 'Batangas, Philippines',
            category: 'Mountains',
            rating: 4.8,
            image: 'assets/images/taal-volcano.jpg',
            description: 'An active volcano within a lake on an island'
        },
        {
            id: 4,
            title: 'Mount Apo',
            location: 'Davao, Philippines',
            category: 'Mountains',
            rating: 5.0,
            image: 'assets/images/mount-apo.jpg',
            description: 'The highest peak in the Philippines at 2,954 meters'
        },
        {
            id: 6,
            title: 'Mayon Volcano',
            location: 'Albay, Philippines',
            category: 'Mountains',
            rating: 4.9,
            image: 'assets/images/mayon.jpg',
            description: 'Famous for its sea of clouds and stunning sunrise views'
        }
    ],
    cities: [
        {
            id: 13,
            title: 'Manila',
            location: 'Metro Manila, Philippines',
            category: 'Cities',
            rating: 4.5,
            image: 'assets/images/manila.jpg',
            description: 'The bustling capital with rich history and modern attractions'
        },
        {
            id: 14,
            title: 'Cebu City',
            location: 'Cebu, Philippines',
            category: 'Cities',
            rating: 4.6,
            image: 'assets/images/cebu.jpg',
            description: 'Historic city with beautiful beaches nearby'
        },
        {
            id: 15,
            title: 'Batangas City',
            location: 'Batangas, Philippines',
            category: 'Cities',
            rating: 4.5,
            image: 'assets/images/batangas.jpg',
            description: 'Gateway to Mount Apo and Philippine Eagle Center'
        },
        {
            id: 17,
            title: 'Baguio City',
            location: 'Benguet, Philippines',
            category: 'Cities',
            rating: 4.7,
            image: 'assets/images/baguio.jpg',
            description: 'Summer capital with cool climate and pine trees'
        }
    ]
};

// STATE MANAGEMENT
let destCurrentCategory = 'popular';
let destSavedDestinations = [];
let destCurrentScrollPosition = 0;

// SVG ICONS
const destIcons = {
    bookmark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
    </svg>`,
    location: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>`,
    star: '★',
    flag: '🏷️'
};

// DOM ELEMENTS
const destCardsTrack = document.getElementById('dest-cards-track');
const destTabButtons = document.querySelectorAll('.destinations-section .tab-btn');
const destCarouselPrev = document.querySelector('.carousel-prev-dest');
const destCarouselNext = document.querySelector('.carousel-next-dest');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadDestSavedDestinations();
    renderDestCards(destCurrentCategory);
    initializeDestEventListeners();
    updateDestCarouselControls();
    setupSmoothScroll();
    setupActiveNavigation();
    updateFeaturedCard();
});

// RENDER DESTINATION CARDS WITH CLONES FOR INFINITE LOOP
function renderDestCards(category) {
    const filteredDestinations = homeDestinations[category] || [];
    
    destCardsTrack.innerHTML = '';
    
    if (filteredDestinations.length === 0) {
        destCardsTrack.innerHTML = `
            <div style="text-align: center; padding: 3rem; width: 100%; color: #666;">
                <h3>No destinations found in this category.</h3>
                <p>Check back soon for more amazing places!</p>
            </div>
        `;
        return;
    }
    
    // Create original cards
    filteredDestinations.forEach((destination, index) => {
        const card = createDestCard(destination, index, false);
        destCardsTrack.appendChild(card);
    });
    
    // Clone cards for infinite loop effect
    filteredDestinations.forEach((destination, index) => {
        const card = createDestCard(destination, index, true);
        destCardsTrack.appendChild(card);
    });
    
    destCurrentScrollPosition = 0;
    destCardsTrack.style.transition = 'transform 0.4s ease';
    destCardsTrack.style.transform = `translateX(0)`;
    updateDestCarouselControls();
    updateFeaturedCard();
}

// CREATE INDIVIDUAL CARD WITH NEW DESIGN
function createDestCard(destination, index, isClone) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    if (isClone) {
        card.classList.add('clone');
        card.dataset.clone = 'true';
    }
    card.dataset.id = destination.id;
    card.dataset.index = index;
    
    const isSaved = destSavedDestinations.includes(destination.id);
    
    // Generate stars based on rating
    const starsHTML = generateStars(destination.rating);
    
    card.innerHTML = `
        <div class="dest-card-image-wrapper">
            <img 
                src="${destination.image}" 
                alt="${destination.title}" 
                class="dest-card-image" 
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >
            <div class="dest-card-image-placeholder" style="display: none;">
                ${destination.title}
            </div>
            
            <button class="dest-save-btn ${isSaved ? 'saved' : ''}" data-id="${destination.id}" 
                    aria-label="${isSaved ? 'Remove from saved' : 'Save destination'}">
                ${destIcons.bookmark}
            </button>
        </div>
        <div class="dest-card-content">
            <h3 class="dest-card-title">${destination.title}</h3>
            <div class="dest-card-location">
                ${destIcons.location}
                <span>${destination.location}</span>
            </div>
            <div class="dest-card-info-row">
                <div class="dest-card-rating">
                    <div class="dest-stars">
                        ${starsHTML}
                    </div>
                    <span class="dest-rating-number">${destination.rating}</span>
                </div>
                <div class="dest-card-category">
                    ${destIcons.flag} ${destination.category}
                </div>
            </div>
            <button class="dest-see-more-btn" data-id="${destination.id}">
                See More…
            </button>
        </div>
    `;
    
    return card;
}

// GENERATE STAR RATING (5 stars total - filled and empty)
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    let starsHTML = '';
    
    // Add filled stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += `<span class="dest-star">${destIcons.star}</span>`;
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += `<span class="dest-star empty">${destIcons.star}</span>`;
    }
    
    return starsHTML;
}

// EVENT LISTENERS
function initializeDestEventListeners() {
    // Tab filtering
    if (destTabButtons) {
        destTabButtons.forEach(button => {
            button.addEventListener('click', handleDestTabClick);
        });
    }
    
    // Carousel controls
    if (destCarouselPrev && destCarouselNext) {
        destCarouselPrev.addEventListener('click', () => slideDestCarousel('prev'));
        destCarouselNext.addEventListener('click', () => slideDestCarousel('next'));
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Event delegation for dynamic elements
    if (destCardsTrack) {
        destCardsTrack.addEventListener('click', handleDestCardClick);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && mobileMenuToggle && 
            !navMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        updateDestCarouselControls();
        updateFeaturedCard();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleDestKeyboardNavigation);
    
    // Touch swipe
    setupDestTouchSwipe();
    
    // Update featured card on scroll
    if (destCardsTrack && destCardsTrack.parentElement) {
        destCardsTrack.parentElement.addEventListener('scroll', updateFeaturedCard);
    }
}

// TAB CLICK HANDLER
function handleDestTabClick(e) {
    const button = e.currentTarget;
    const category = button.dataset.category;
    
    destTabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    
    destCurrentCategory = category;
    renderDestCards(category);
}

// CAROUSEL SLIDING WITH INFINITE LOOP
function slideDestCarousel(direction) {
    const cardWidth = 380 + 32; // card width + gap (32px = 2rem gap)
    const originalCards = destCardsTrack.querySelectorAll('.destination-card:not(.clone)');
    const totalOriginalCards = originalCards.length;
    
    if (totalOriginalCards === 0) return;
    
    if (direction === 'next') {
        destCurrentScrollPosition += cardWidth;
        destCardsTrack.style.transition = 'transform 0.4s ease';
        destCardsTrack.style.transform = `translateX(-${destCurrentScrollPosition}px)`;
        
        // If we've scrolled to or past the first clone, reset to the beginning
        if (destCurrentScrollPosition >= totalOriginalCards * cardWidth) {
            setTimeout(() => {
                destCurrentScrollPosition = 0;
                destCardsTrack.style.transition = 'none';
                destCardsTrack.style.transform = `translateX(0px)`;
                
                // Re-enable transition
                setTimeout(() => {
                    destCardsTrack.style.transition = 'transform 0.4s ease';
                }, 50);
            }, 400);
        }
    } else {
        // Previous button
        if (destCurrentScrollPosition <= 0) {
            // Jump to the end instantly (showing last card)
            destCurrentScrollPosition = (totalOriginalCards - 1) * cardWidth;
            destCardsTrack.style.transition = 'none';
            destCardsTrack.style.transform = `translateX(-${destCurrentScrollPosition}px)`;
            
            // Re-enable transition
            setTimeout(() => {
                destCardsTrack.style.transition = 'transform 0.4s ease';
            }, 50);
        } else {
            destCurrentScrollPosition -= cardWidth;
            destCardsTrack.style.transition = 'transform 0.4s ease';
            destCardsTrack.style.transform = `translateX(-${destCurrentScrollPosition}px)`;
        }
    }
    
    updateDestCarouselControls();
    
    // Update featured card after animation
    setTimeout(updateFeaturedCard, 450);
}

// UPDATE CAROUSEL CONTROLS STATE - NEVER DISABLE FOR INFINITE LOOP
function updateDestCarouselControls() {
    if (!destCarouselPrev || !destCarouselNext || !destCardsTrack) return;
    
    // For infinite loop, controls are always enabled
    destCarouselPrev.disabled = false;
    destCarouselNext.disabled = false;
}

// UPDATE FEATURED CARD (CENTER CARD GETS SPECIAL STYLING)
function updateFeaturedCard() {
    if (!destCardsTrack) return;
    
    const cards = destCardsTrack.querySelectorAll('.destination-card');
    const wrapper = destCardsTrack.parentElement;
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperCenter = wrapperRect.left + (wrapperRect.width / 2);
    
    let closestCard = null;
    let closestDistance = Infinity;
    
    cards.forEach(card => {
        card.classList.remove('featured');
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(wrapperCenter - cardCenter);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });
    
    // Only add featured class on desktop/tablet
    if (closestCard && window.innerWidth > 767) {
        closestCard.classList.add('featured');
    }
}

// HANDLE CARD CLICKS
function handleDestCardClick(e) {
    // Handle Save button
    if (e.target.closest('.dest-save-btn')) {
        e.stopPropagation();
        const saveBtn = e.target.closest('.dest-save-btn');
        const destinationId = parseInt(saveBtn.dataset.id);
        toggleDestSave(destinationId, saveBtn);
        return;
    }
    
    // Handle See More button
    if (e.target.closest('.dest-see-more-btn')) {
        e.stopPropagation();
        const seeMoreBtn = e.target.closest('.dest-see-more-btn');
        const destinationId = parseInt(seeMoreBtn.dataset.id);
        handleDestSeeMore(destinationId);
        return;
    }
}

// TOGGLE SAVE FUNCTIONALITY
function toggleDestSave(destinationId, button) {
    const index = destSavedDestinations.indexOf(destinationId);
    
    if (index > -1) {
        destSavedDestinations.splice(index, 1);
        button.classList.remove('saved');
        button.setAttribute('aria-label', 'Save destination');
    } else {
        destSavedDestinations.push(destinationId);
        button.classList.add('saved');
        button.setAttribute('aria-label', 'Remove from saved');
    }
    
    localStorage.setItem('destSavedDestinations', JSON.stringify(destSavedDestinations));
    
    // Animation feedback
    button.style.transform = 'scale(1.3)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// HANDLE SEE MORE
function handleDestSeeMore(destinationId) {
    // Navigate to full destinations page
    window.location.href = `destination.html?id=${destinationId}`;
}

// MOBILE MENU TOGGLE
function toggleMobileMenu() {
    if (!navMenu || !mobileMenuToggle) return;
    
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
}

// LOAD SAVED DESTINATIONS FROM LOCALSTORAGE
function loadDestSavedDestinations() {
    const saved = localStorage.getItem('destSavedDestinations');
    if (saved) {
        try {
            destSavedDestinations = JSON.parse(saved);
        } catch (e) {
            destSavedDestinations = [];
        }
    }
}

// TOUCH SWIPE SUPPORT FOR MOBILE
function setupDestTouchSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (destCardsTrack) {
        destCardsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        destCardsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleDestSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
}

function handleDestSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && window.innerWidth > 767) {
            slideDestCarousel('next');
        } else if (diff < 0 && window.innerWidth > 767) {
            slideDestCarousel('prev');
        }
    }
}

// KEYBOARD NAVIGATION
function handleDestKeyboardNavigation(e) {
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA') {
        return;
    }
    
    // Only handle if destinations section is in view and not on mobile
    if (window.innerWidth <= 767) return;
    
    const destSection = document.getElementById('destinations');
    if (!destSection) return;
    
    const rect = destSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            slideDestCarousel('prev');
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            slideDestCarousel('next');
        }
    }
}

// SMOOTH SCROLL SETUP
function setupSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ACTIVE NAVIGATION ON SCROLL
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === 'hero' && href === '#hero')) {
                link.classList.add('active');
            }
        });
    });
}