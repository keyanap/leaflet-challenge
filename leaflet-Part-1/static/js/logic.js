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

// Fetch data and add earthquakes to map
d3.json(geoData).then(function(data) {
    // Console log data
    console.log('Data: ', data);
    // Style feature
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
    }

    // Create function to determine colors for earthquake by depth
    function chooseColor(depth) {
        if (depth > 90) return "orangered";
        else if (depth > 70) return "orange";
        else if (depth > 50) return "yellow";
        else if (depth > 30) return "greenyellow";
        else if (depth > 10) return "green";
        else return "lightgreen";
    }

    // Create function to determine size for earthquake by mag size
    function chooseRadius(mag) {
        if (mag === 0) {
            return 1;
        }
        return mag * 4;
    }
    
    // Create a geoJSON layer with retrived data
    L.geoJson(data, {
        // Add earthquakes
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: style,
        // popup  data on each feature
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
        }
    }).addTo(myMap);
