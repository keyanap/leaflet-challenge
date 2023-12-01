// Load GeoJSON data 
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create function to determine colors for earthquake by depth
function chooseColor(depth) {
    if (depth > 90) return "red";
    else if (depth > 70) return "orangered";
    else if (depth > 50) return "orange";
    else if (depth > 30) return "orangeyellow";
    else if (depth > 10) return "yellow";
    else return "lightgreen";
}

// Create function to determine size for earthquake by mag size
function chooseRadius(mag) {
    if (mag === 0) {
        return 1;
    }
    return mag * 4;
}

// Fetch data and add earthquakes to map
d3.json(geoData).then(function(data) {
    // Console log data
    console.log('Data: ', data);
    // Create a geoJSON layer with retrived data
    L.geoJson(data, {
        // Style feature for depth
        style: function(feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: "black",
                radius: chooseRadius(feature.properties.mag),
                stroke: true,
                weight: 0.5
            };
        },
    });
}).addTo(myMap);