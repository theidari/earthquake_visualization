// ---------------------------------------------------------------------------------------------------------------------------------------
// Import files --------------------------------------------------------------------------------------------------------------------------
import * as base_layer from "./base_layer.js"; // // import map base layers:
import * as url from "./urls.js"; // import earthquake and tectonic plates urls
// ---------------------------------------------------------------------------------------------------------------------------------------
// Map Structure Function ----------------------------------------------------------------------------------------------------------------
function createMap(earthquakes, tectonicplates) {

  // Create the base layers.
  
  var baseMaps = {
    "Street Map"        : base_layer.street,
    "Topographic Map"   : base_layer.topo,
    "Google Streets"    : base_layer.google_streets,
    "Google Hybrid"     : base_layer.google_hybrid,
    "Stamen Toner"      : base_layer.stamen_toner,
    "Stamen Terrain"    : base_layer.stamen_terrain,
    "Stamen Watercolor" : base_layer.stamen_watercolor,
    "Stamen Burningmap" : base_layer.stamen_burningmap
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    "Earthquakes": earthquakes,
    // "Fault Lines": tectonicplates
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
  
  function getColor(magnitude) {
    const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
    const index = Math.floor(Math.max(0, Math.min(5, magnitude)) - 1);
    return colors[index];
  }

  //add legend on Bottom Right Corner
  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    //Dom Utility that puts legend into DIV & Info Legend
    var div = L.DomUtil.create('div', 'info legend'),
      //Magnitude Grades, stops at 5 magnitude
      grades = [0, 1, 2, 3, 4, 5];

    //Legend Label Earthquake <break> Magnitude  
    div.innerHTML += 'Eathquake<br>Magnitude<br><hr>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };
  //Adds Legend to myMap
  legend.addTo(myMap);
};
// ---------------------------------------------------------------------------------------------------------------------------------------


// Perform a GET request to the query URL/
d3.json(url.all_day_url).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  // to calculate the color and radius.
});

// --------------------------------------------------------------------------------------------------------------------
function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<span class="map-popup">${feature.properties.place}</span><hr><p>${new Date(feature.properties.time)}</p>`);
  }
  
  // This function determines the color of the marker based on the magnitude of the earthquake.
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

// --------------------------------------------------------------------------------------------------------------------
