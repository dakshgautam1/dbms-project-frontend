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

const artyom = new Artyom();


var settings = {
  lang:"en-GB",
  continuous:true,
  listen:true, // Start recognizing
  debug:true,  // Don't stop never because i have https connection
  onResult:function(text){
      // text = the recognized text
      console.log(text);
  },
  onStart:function(){
      console.log("Dictation started by the user");
  },
  onEnd:function(){
      alert("Dictation stopped by the user");
  }
};

var UserDictation = artyom.newDictation(settings);

function startRecognition(){
UserDictation.start();
}

function stopRecognition(){
UserDictation.stop();
UserDictation.onResult();
}



// $.getJSON('https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/us-population-density.json', function (data) {

//   // Make codes uppercase to match the map data
//   $.each(data, function () {
//     this.code = this.code.toUpperCase();
//   });

//   // Instantiate the map
//   Highcharts.mapChart('container', {

//     chart: {
//       map: 'countries/us/us-all',
//       borderWidth: 1
//     },

//     title: {
//       text: 'US population density (/km²)'
//     },

//     exporting: {
//       sourceWidth: 600,
//       sourceHeight: 500
//     },

//     legend: {
//       layout: 'horizontal',
//       borderWidth: 0,
//       backgroundColor: 'rgba(255,255,255,0.85)',
//       floating: true,
//       verticalAlign: 'top',
//       y: 25
//     },

//     mapNavigation: {
//       enabled: true
//     },

//     colorAxis: {
//       min: 1,
//       type: 'logarithmic',
//       minColor: '#EEEEFF',
//       maxColor: '#000022',
//       stops: [
//         [0, '#EFEFFF'],
//         [0.67, '#4444FF'],
//         [1, '#000022']
//       ]
//     },

//     series: [{
//       animation: {
//         duration: 1000
//       },
//       data: data,
//       joinBy: ['postal-code', 'code'],
//       dataLabels: {
//         enabled: true,
//         color: '#FFFFFF',
//         format: '{point.code}'
//       },
//       name: 'Population density',
//       tooltip: {
//         pointFormat: '{point.code}: {point.value}/km²'
//       }
//     }]
//   });
// });


testApi();
testWitAi();
