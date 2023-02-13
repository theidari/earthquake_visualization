<p align="center">
    <img src="https://github.com/theidari/earthquake_visualization/blob/main/asset/readme_header.png" width="900">
<p>
<p align="justify">
The <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">United States Geological Survey</a>, or USGS for short, 
is responsible for providing scientific data about natural hazards, 
the health of our ecosystems and environment, and the impacts of climate and land-use change. 
Their scientists develop new methods and tools to supply timely, relevant, and useful 
information about the Earth and its processes.<br>
The USGS is interested in building a new set of tools that will allow them to visualize their 
earthquake data. They collect a massive amount of data from all over the world each day, but 
they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing 
a way to visualize USGS data that will allow them to better educate the public and other government 
organizations (and hopefully secure more funding) on issues facing our planet.
<p>

The instructions for this activity are broken into two parts:

Part 1: Create the Earthquake Visualization

Part 2: Gather and Plot More Data

```JSON
{
"type":"FeatureCollection",
"metadata":{
		"generated":1676303741000,"url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
		"title":"USGS All Earthquakes, Past Week",
		"status":200,
		"api":"1.10.3",
		"count":1940
    },
"features":[
		{
		"type":"Feature",
		"properties":{
                "mag":0.77,
                "place":"8km NW of The Geysers, CA",
                "time":1676303465640,
                "updated":1676303558697,
                "tz":null,
                "url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc73845786",
                "detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73845786.geojson",
                "felt":null,
                "cdi":null,
                "mmi":null,
                "alert":null,
                "status":"automatic",
                "tsunami":0,
                "sig":9,
                "net":"nc",
                "code":"73845786",
                "ids":",nc73845786,",
                "sources":",nc,",
							"types":",nearby-cities,origin,phase-data,",
							"nst":10,
							"dmin":0.01262,
							"rms":0.02,
							"gap":86,
							"magType":"md",
							"type":"earthquake",
							"title":"M 0.8 - 8km NW of The Geysers, CA"
				},
				"geometry":{
							"type":"Point",
							"coordinates":[
											-122.8181686,
											38.8343315,
											2.09
											]
				},
				"id":"nc73845786"
			},
            
``` 
