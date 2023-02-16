// Store our API endpoint as queryUrl ----------------------------------------------------------------------------------------------------
// Earthquake Data:
var all_month_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
var all_week_url  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var all_day_url   = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
// Tectonicplates Data:
var plat_url      = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_plates.json"
var boundary_url  = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json"
var orgens_url    = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_orogens.json"
var steps_url     = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_steps.json"
// ---------------------------------------------------------------------------------------------------------------------------------------

// export variable -----------------------------------------------------------------------------------------------------------------------
export {all_day_url}