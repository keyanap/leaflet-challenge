// Define url for data 
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Fetch data
d3.json(url).then(function(data) {
    // Console log data
    console.log('Data: ', data);

});