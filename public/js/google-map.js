  // Set map center to Caldwell Junction
  var map = L.map('map').setView([6.3783, -10.8014], 15); // Adjust zoom for closer view

  // Load map tiles from OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add a marker
  L.marker([6.3783, -10.8014]).addTo(map)
    .bindPopup('Our Location: Caldwell Junction, Duala')
    .openPopup();