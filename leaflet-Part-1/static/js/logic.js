// Create map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load GeoJSON data
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch data with d3
d3.json(geoData).then(function(data) {
    // Console log data
    console.log('Data: ', data);
    // Create function to set color based on depth
    function markerColor(depth) {
        if (depth > 90) {
            return "red";
        } else if (depth > 70) {
            return "orangered";
        } else if (depth > 50) {
            return "orange";
        } else if (depth > 30) {
            return "gold";
        } else if (depth > 10) {
            return "yellow";
        } else {
            return "lightgreen";
        }
    }
    // Create function to set radius based on magnitude
    function markerSize(magnitude) {
        return magnitude * 5;
    }
    // Create function to set style
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: markerColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: markerSize(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    // Add geojson layer
    L.geoJson(data, {
        // Create circle markers
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // Set style
        style: mapStyle,
        // Create popup describing earthquake for each feature
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
        }
    }).addTo(myMap);

    // Create legend
    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let depth = [-10, 10, 30, 50, 70, 90];
        let colors = ["lightgreen", "yellow", "gold", "orange", "orangered", "red"];
        div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
        for (let i = 0; i < depth.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + depth[i] + (depth[i + 1] ? "&ndash;" + depth[i + 1] + "<br>" : "+");
        }
        return div;
    };
    legend.addTo(myMap);
});
