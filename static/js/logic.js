let myMap = L.map("map", {
    center: [39.8283,-98.5795],
    zoom : 5
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data) {console.log(data)

    for (let i=0; i<data.features.length; i++) {
        
        let lat = data.features[i].geometry.coordinates[1];
        let lng = data.features[i].geometry.coordinates[0];
        let depth = data.features[i].geometry.coordinates[2];
        let mag = data.features[i].properties.mag;
        let place = data.features[i].properties.place;
        let color = ""

        if (depth > 90) {
            color = "#ff5f65";
        }
        else if (depth > 70) {
            color = "#fca35d";
        }
        else if (depth > 50) {
            color = "#5db72a";
        }
        else if (depth > 30) {
            color = "#57db11";
        }
        else if (depth > 10) {
            color = "#dcf400";
        }
        else {color = "#a3f600";
        }

        L.circle([lat,lng], {
            radius : mag*10000,
            color : "black",
            weight : 0.75,
            fillColor : color,
            fillOpacity : 1
        }).bindPopup(`<h3>${place}</h3> <hr> <p>Magnitude: ${mag}</p><p>Depth: ${depth} kilometres</p>`).addTo(myMap);
    };



    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
    
        let div = L.DomUtil.create("div", "legend");
            
            let depth_categories = [-10,10,30,50,70,90]

        for (let i=0; i<depth_categories.length; i++) {
            div.innerHTML += 
                '<i></i>' +
                depth_categories[i] + "-" + depth_categories[i+1] + "<br>";
        };

    return div;
    };

    legend.addTo(myMap);


    
});