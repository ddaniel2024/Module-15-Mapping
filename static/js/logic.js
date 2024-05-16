let myMap = L.map("map", {
    center: [0,0],
    zoom : 2
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data) {console.log(data)

    for (let i=0; i<data.features.length; i++) {
       lat = data.features[i].geometry.coordinates[0];
       lng = data.features[i].geometry.coordinates[1]
       depth = data.features[i].geometry.coordinates[2];;
    }

});