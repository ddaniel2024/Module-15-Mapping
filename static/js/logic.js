let myMap = L.map("map", {
    center: [39.8283,-98.5795],
    zoom : 5
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data) {console.log(data)

    function getColor(value) {

        if (value >= 90) {
            return "#ff5f65";
        }
        else if (value >= 70) {
            return "#fca35d";
        }
        else if (value >= 50) {
            return "#fdb72a";
        }
        else if (value >= 30) {
            return "#f7db11";
        }
        else if (value >= 10) {
            return "#dcf400";
        }
        else {return "#a3f600";
        }
    };



    for (let i=0; i<data.features.length; i++) {
        
        let lat = data.features[i].geometry.coordinates[1];
        let lng = data.features[i].geometry.coordinates[0];
        let depth = data.features[i].geometry.coordinates[2];
        let mag = data.features[i].properties.mag;
        let place = data.features[i].properties.place;

        L.circle([lat,lng], {
            radius : mag*10000,
            color : "black",
            weight : 0.75,
            fillColor : getColor(depth),
            fillOpacity : 1
        }).bindPopup(`<h3>${place}</h3> <hr> <p>Magnitude: ${mag}</p><p>Depth: ${depth} kilometres</p>`).addTo(myMap);
    };



    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
    
        let div = L.DomUtil.create("div", "legend");
            
            let depth_categories = [-10,10,30,50,70,90]

        for (let i=0; i<depth_categories.length; i++) {

            div.innerHTML += 
                "<i style=background:"+ getColor(depth_categories[i]) +"></i>" +
                depth_categories[i] + 
                (depth_categories[i+1] ? "-" + depth_categories[i+1] + "<br>" : "+");
        };

    return div;
    };

    legend.addTo(myMap);


    
});