console.log(window);

var localUrl = "http://localhost:5000/test"

function testApi() {
fetch(localUrl)
.then(function(data) {
  return data.json()
}).then(function(result) {
      result.result.forEach((value) => {
        $("<li>" + value.cityName + " - " + value.state +"</li>").appendTo("#album-list")
      })
})
.catch(function() {
    // This is where you run code if the server returns any errors
});
}


function testWitAi() {
  $.ajax({
    url: 'https://api.wit.ai/message',
    data: {
      'q': 'What is the temperature in Ocala ?',
      'access_token' : 'Y2LUQJBQ27OSWXTKX4EGIUDEOHVDZDDV'
    },
    dataType: 'jsonp',
    method: 'GET',
    success: function(response) {
        console.log("success!", response);
    }
  });
}


// Initiate the char
function populateCityMap() {

fetch('http://localhost:5000/get-cities')
.then(function(data) {
  console.log(data)
  return data.json()
}).then(function(result) {

  let newResult = result.result.map(city => {
    return {
      name: city.cityName,
      lat: city.latitude,
      lon: city.longitude,
      ownUrl: `http://localhost:3001/city.html?city_id=${city.cityName}`   
    }
  })

  console.log(newResult)
  Highcharts.mapChart('map-container', {

    chart: {
      map: 'countries/us/us-all'
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
              window.open(this.ownUrl, '_self')
            }
          }
        }

      }
    },
  
    mapNavigation: {
      enabled: true
    },
  
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}'
    },
  
    series: [{
      // Use the gb-all map with no data as a basemap
      name: 'Basemap',
      borderColor: '#A0A0A0',
      nullColor: '#f28f43',
      showInLegend: false
    }, {
      name: 'Separators',
      type: 'mapline',
      nullColor: '#707070',
      showInLegend: false,
      enableMouseTracking: false
    }, {
      // Specify points using lat/lon
      type: 'mappoint',
      name: 'Cities',
      color: Highcharts.getOptions().colors[1],
      data: newResult
    }]
  });
})
.catch(function() {
    // This is where you run code if the server returns any errors
});

}

//testApi();
//testWitAi();
populateCityMap();
