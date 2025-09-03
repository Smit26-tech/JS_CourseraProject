// scripts.js

const destinations = [
  {
    id: 1,
    name: 'Paris',
    continent: 'Europe',
    type: 'City',
    description: 'The city of lights and love.',
    img: 'assets/paris.jpg',
    video: 'assets/paris.mp4',
  },
  {
    id: 2,
    name: 'Bali',
    continent: 'Asia',
    type: 'Beach',
    description: 'Tropical paradise with stunning beaches.',
    img: 'assets/bali.jpg',
    video: 'assets/bali.mp4',
  },
  {
    id: 3,
    name: 'New York',
    continent: 'America',
    type: 'City',
    description: 'The city that never sleeps.',
    img: 'assets/nyc.jpg',
    video: 'assets/nyc.mp4',
  },
  {
    id: 4,
    name: 'Machu Picchu',
    continent: 'America',
    type: 'Mountain',
    description: 'Historic Incan citadel.',
    img: 'assets/machu.jpg',
    video: 'assets/machu.mp4',
  },
  {
    id: 5,
    name: 'Cape Town',
    continent: 'Africa',
    type: 'Adventure',
    description: 'Adventure capital of South Africa.',
    img: 'assets/capetown.jpg',
    video: 'assets/capetown.mp4',
  },
];

// Home page: form submit handler
function initHomePage() {
  const form = document.getElementById('searchForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const continent = document.getElementById('continent').value;
    const type = document.getElementById('type').value;

    const params = new URLSearchParams();
    if (continent) params.append('continent', continent);
    if (type) params.append('type', type);

    window.location.href = 'destinations.html?' + params.toString();
  });
}

// Destinations page: display filtered destinations
function initDestinationsPage() {
  const container = document.getElementById('destinationsList');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const filterContinent = params.get('continent');
  const filterType = params.get('type');

  const filtered = destinations.filter((dest) => {
    return (
      (!filterContinent || dest.continent === filterContinent) &&
      (!filterType || dest.type === filterType)
    );
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p>No destinations match your criteria.</p>';
  } else {
    container.innerHTML = ''; // Clear any existing
    filtered.forEach((dest) => {
      const div = document.createElement('div');
      div.className = 'destination-card';
      div.innerHTML = `
        <img src="${dest.img}" alt="${dest.name}" />
        <h3>${dest.name}</h3>
        <p>${dest.description}</p>
        <a href="details.html?id=${dest.id}">See Details</a>
      `;
      container.appendChild(div);
    });
  }
}

// Details page: display destination info
function initDetailsPage() {
  const container = document.getElementById('destinationDetails');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    container.innerHTML = '<p>Destination not found.</p>';
  } else {
    container.innerHTML = `
      <h2>${dest.name}</h2>
      <img src="${dest.img}" alt="${dest.name}" />
      <p><strong>Continent:</strong> ${dest.continent}</p>
      <p><strong>Type:</strong> ${dest.type}</p>
      <p>${dest.description}</p>
      <video width="400" controls>
        <source src="${dest.video}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <br />
      <a href="destinations.html">Back to Destinations</a>
    `;
  }
}

// On DOM ready, detect page and init
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('searchForm')) {
    initHomePage();
  }
  if (document.getElementById('destinationsList')) {
    initDestinationsPage();
  }
  if (document.getElementById('destinationDetails')) {
    initDetailsPage();
  }
});