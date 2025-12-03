const destinations = [
    {
        title: 'KAWASAN FALLS',
        location: 'Cebu, Philippines',
        description: 'A stunning three-tiered waterfall cascading into turquoise pools, perfect for swimming and canyoneering adventures in the heart of Cebu\'s tropical jungle.',
        background: 'assets/images/kawasan.png',
        card: 'assets/images/kawasan-card.png'
    },
    {
        title: 'EL NIDO',
        location: 'Palawan, Philippines',
        description: 'A tropical paradise in the Philippines known for its stunning limestone cliffs, crystal-clear waters, and white sand beaches. It\'s famous for island-hopping tours that take visitors to hidden lagoons, secret beaches, and vibrant coral reefs.',
        background: 'assets/images/elnido.png',
        card: 'assets/images/elnido-card.png'
    },
    {
        title: 'SIARGAO ISLAND',
        location: 'Surigao del Norte, Philippines',
        description: 'The surfing capital of the Philippines, famous for Cloud 9 - one of the world\'s best surf breaks. This teardrop-shaped island offers pristine beaches, coconut palm forests, and a laid-back island vibe that attracts surfers and beach lovers from around the globe.',
        background: 'assets/images/siargao.png',
        card: 'assets/images/siargao-card.png'
    },
    {
        title: 'MAYON VOLCANO',
        location: 'Albay, Philippines',
        description: 'The Philippines\' perfectly shaped cone and a true natural wonder. Nestled in Albay, this iconic volcano offers breathtaking views, lush landscapes, and thrilling adventures for hikers and sightseers alike.',
        background: 'assets/images/mayon.png',
        card: 'assets/images/mayon-card.png'
    }
];

let currentIndex = 0;
let autoSlideInterval;

const heroSection = document.getElementById('hero');
const titleElement = document.getElementById('destination-title');
const locationElement = document.getElementById('destination-location');
const descriptionElement = document.getElementById('destination-description');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

function updateDestination(index) {
    const destination = destinations[index];
    
    heroSection.style.backgroundImage = `url('${destination.background}')`;
    titleElement.textContent = destination.title;
    locationElement.textContent = destination.location;
    descriptionElement.textContent = destination.description;
    
    updateCards(index);
}

function updateCards(currentIndex) {
    const cards = [];
    
    for (let i = 0; i < 3; i++) {
        const cardIndex = (currentIndex + i + 1) % destinations.length;
        const dest = destinations[cardIndex];
        
        cards.push(`
            <div class="destination-card" data-index="${cardIndex}">
                <img src="${dest.card}" alt="${dest.title}">
                <div class="card-overlay">
                    <span class="card-location">${dest.location}</span>
                    <h3 class="card-title">${dest.title}</h3>
                </div>
            </div>
        `);
    }
    
    cardsContainer.innerHTML = cards.join('');
    
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.getAttribute('data-index'));
            currentIndex = index;
            updateDestination(currentIndex);
            resetAutoSlide();
        });
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % destinations.length;
    updateDestination(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + destinations.length) % destinations.length;
    updateDestination(currentIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

const bookmarkBtn = document.querySelector('.btn-bookmark');
let isBookmarked = false;

bookmarkBtn.addEventListener('click', () => {
    isBookmarked = !isBookmarked;
    bookmarkBtn.style.background = isBookmarked ? 'var(--gold)' : 'var(--white)';
    bookmarkBtn.style.color = isBookmarked ? 'var(--white)' : 'var(--primary-green)';
});

updateDestination(currentIndex);
startAutoSlide();