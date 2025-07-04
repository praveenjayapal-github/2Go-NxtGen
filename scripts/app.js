document.addEventListener('DOMContentLoaded', () => {
  const homeBtn = document.getElementById('homeBtn');
  const mapBtn = document.getElementById('mapBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const themeToggle = document.getElementById('themeToggle');
  const darkModeSwitch = document.getElementById('darkModeSwitch');

  const views = document.querySelectorAll('.view');

  function showView(id) {
    views.forEach(v => v.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  homeBtn.addEventListener('click', () => showView('homeView'));
  mapBtn.addEventListener('click', () => showView('mapView'));
  settingsBtn.addEventListener('click', () => showView('settingsView'));

  // Dark mode
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeSwitch.checked = true;
  }

  themeToggle.addEventListener('click', () => {
    document.documentElement.toggleAttribute('data-theme', 'dark');
    const isDark = document.documentElement.hasAttribute('data-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    darkModeSwitch.checked = isDark;
  });

  darkModeSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });

  // Dummy data for departures
  const departures = [
    { line: '12', destination: 'Downtown', minutes: 3, delay: 2 },
    { line: '7', destination: 'Central Station', minutes: 8, delay: 0 },
    { line: '5', destination: 'Airport', minutes: 12, delay: 1 }
  ];

  const departuresList = document.getElementById('departuresList');
  departures.forEach(bus => {
    const card = document.createElement('div');
    card.className = 'card' + (bus.delay ? ' delayed' : '');
    card.innerHTML = `
      <h3>Line ${bus.line} - ${bus.destination}</h3>
      <p>Departs in ${bus.minutes} min ${bus.delay ? `<span class="delay">+${bus.delay} min delay</span>` : ''}</p>
    `;
    departuresList.appendChild(card);
  });

  // Dummy nearby stops
  const stops = [
    { name: 'Main Street', distance: 150, next: ['Line 5 in 4 min', 'Line 7 in 10 min'] },
    { name: 'Central Plaza', distance: 300, next: ['Line 12 in 2 min'] }
  ];

  const nearbyStops = document.getElementById('nearbyStops');
  stops.forEach(stop => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${stop.name}</h4>
      <p>${stop.distance} m away</p>
      <ul>${stop.next.map(n => `<li>${n}</li>`).join('')}</ul>
    `;
    nearbyStops.appendChild(card);
  });
});
