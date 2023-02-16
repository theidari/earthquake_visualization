import { all_day_url } from './urls.js';

// Perform a GET request to the query URL
d3.json(all_day_url).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<span class="map-popup">${feature.properties.place}</span><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  })

  var google_streets=L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  })

  var google_hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

  // stamen layers.
  var stamen_toner= L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://stamen.com/">Stamen</a>',
    maxZoom: 20
  })

  var stamen_terrain= L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://stamen.com/">Stamen</a>',
    maxZoom: 18
  })

  var stamen_watercolor= L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://stamen.com/">Stamen</a>',
    maxZoom: 16
  })

  var stamen_burningmap=L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    attribution: 'Map data &copy; <a href="https://stamen.com/">Stamen</a>',
    maxZoom: 16
  })

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Google Streets":google_streets,
    "Google Hybrid":google_hybrid,
    "Stamen Toner":stamen_toner,
    "Stamen Terrain":stamen_terrain,
    "Stamen Watercolor":stamen_watercolor,
    "Stamen Burningmap":stamen_burningmap
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      0, 0
    ],
    zoom: 3,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true,
    position: 'topright'
  }).addTo(myMap);
}