// ---------------------------------------------------------------------------------------------------------------------------------------
// Store our API endpoint as url ---------------------------------------------------------------------------------------------------------
// Earthquake Data:
var earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Tectonic Plate Data
var tectonicplates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// DataPromise to get geoJSON Data from Urls
Promise.all([d3.json(earthquakes_url), d3.json(tectonicplates_url)]).then(function([earthquake_data, tectonicplates_data]){
  createFeatures(earthquake_data, tectonicplates_data);
});
// ---------------------------------------------------------------------------------------------------------------------------------------
// Function to create Features (Markers and Bounderies) ----------------------------------------------------------------------------------
function createFeatures(earthquake, tectonicplates) {

  // Markers Function
  const marker_point = (feature, border) => L.circleMarker(border, {color:'#00000070',weight:1,fillColor:getColor(feature.geometry.coordinates[2]),fillOpacity:0.7,radius:feature.properties.mag**1.4});

  // Popup Function
  function marker_popup(feature, box) {
      box.bindPopup(
          `<div class="map-popup"><a href="${feature.properties.url}">${feature.properties.place}</a></div><br>
          <div class="map-popup-warning"> To obtain further details, please click on the location name.</div>
          <div class="map-popup-exp">
            <span>Time: </span> ${new Intl.DateTimeFormat().format(new Date(feature.properties.time))} <br>
            <span>Location: </span> ${feature.geometry.coordinates[0]} , ${feature.geometry.coordinates[1]} <br>
            <span>Depth: </span> ${feature.geometry.coordinates[2]} km <br>
            <span>Magnitude: </span> ${feature.properties.mag}
          </div>`)};

  // Create geoJSON layer for earthquake data
  var earthquake_gJsonLayer = L.geoJSON(earthquake.features, {
      onEachFeature: marker_popup,
      pointToLayer: marker_point
  });

  // Create geoJSON layer for tectonic plates
  var tectonicplates_gJsonLayer = L.geoJSON(tectonicplates.features, {style: {color: '#f10808',weight: 1}
  });
  // Create map with geoJSON layers & timeline object
  createMap(earthquake_gJsonLayer, tectonicplates_gJsonLayer);
};
// ---------------------------------------------------------------------------------------------------------------------------------------
// Map Structure Function ----------------------------------------------------------------------------------------------------------------
function createMap(earthquakes, tectonicplates) {

  // Create the General Layers.
  // Street Map
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
  // Topographic Map
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  })
  // Google Street Map
  var google_streets=L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']})
  // Google Satalite Map
  var google_hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20,subdomains:['mt0','mt1','mt2','mt3']});
  // Stamen Collection Map Layers.
  var stamen_toner= L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://stamen.com/">Stamen</a>', maxZoom: 20})
  var stamen_terrain= L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://stamen.com/">Stamen</a>', maxZoom: 18})
  var stamen_watercolor= L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://stamen.com/">Stamen</a>',maxZoom: 16})

  // Base Maps Object to Hold Maps Layers
  var baseMaps = {
    "Street Map"        : street,
    "Topographic Map"   : topo,
    "Google Streets"    : google_streets,
    "Google Hybrid"     : google_hybrid,
    "Stamen Toner"      : stamen_toner,
    "Stamen Terrain"    : stamen_terrain,
    "Stamen Watercolor" : stamen_watercolor
  };

  // Create an Overlay Object to Hold overlay.
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicplates
  };

  // Create Map
  var myMap = L.map("map", {
    center: [
      0, 0
    ],
    zoom: 3,
    layers: [street, earthquakes] // Street Map and Earthquakes in Load 
  });

  // Layer Control.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true,
    position: 'topright'
  }).addTo(myMap);

  // Create the legend control
  var legend = L.control({ position: 'topright' });
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'legend');
    var length = [-10, 10, 30, 50, 70, 90];
    div.innerHTML = '<p>Depth</p>' + length.map(function(element, i) {
      return '<span style="background:' + getColor(element + 1) + '">&nbsp&nbsp&nbsp&nbsp</span> ' + element + (length[i + 1] ? ' &ndash; ' + length[i + 1] + '<br>' : '+');
    }).join('');
    return div;
  }

  // Create the easy button
  var legendButton = L.easyButton({
    position: 'topright',
    states: [{
      stateName: 'show-legend',
      icon: '<img class="button-keys" src="https://upload.wikimedia.org/wikipedia/commons/1/11/Key.svg" height="30px">',
      title: 'Show legend',
      onClick: function(control) {
        legend.addTo(myMap);
        control.state('hide-legend');
      }
    }, {
      stateName: 'hide-legend',
      icon: '<img class="button-keys" src="https://upload.wikimedia.org/wikipedia/commons/1/11/Key.svg" height="30px">',
      title: 'Hide legend',
      onClick: function(control) {
        myMap.removeControl(legend);
        control.state('show-legend');
      }
    }]
  });

  // Add the easy button to the map
  legendButton.addTo(myMap)
  // Add an id to the button element
  var buttonElement = legendButton._container.firstChild;
  buttonElement.id = "legend-button";
};
//Depths colors
function getColor(depth) {
  const colorlist = ['#ff5f65', '#fca35d', '#fdb72a', '#f7db11', '#dcf400', '#a3f600']
  return depth > 90 ? colorlist[0] :
         depth > 70 ? colorlist[1] :
         depth > 50 ? colorlist[2] :
         depth > 30 ? colorlist[3] :
         depth > 10 ? colorlist[4] :
         colorlist[5];
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

