var baseUrl = "http://localhost:5000"

var textArray = [
  "Compare humidity and temperature in San Francisco ?",
  "What do you know about pressure and wind speed for New York ?",
  "Can you tell me about the Wind Speed in Chicago in the month of July ?",
  "Plot a graph between Portland's humidity and pressure ?"
];
var index = 0;
setInterval(function(){        
$("#sub-head-q").animate({
opacity:0
},function()
{
   if(textArray.length > index) {
   $(this).text(textArray[index]).animate({opacity:1})
   index++; 
   }
   else
   index = 0;
});
},3000);

$("#intro").css(
  "background-image",
  "url(images/earth.jpg)"
);

const artyom = new Artyom();


artyom.ArtyomVoicesIdentifiers["en-GB"] = ["Google UK English Female", "Google UK English Male", "en-GB", "en_GB"];

function testWitAi(text, fn) {
  $.ajax({
    url: 'https://api.wit.ai/message',
    data: {
      'q': text,
      'access_token': 'Y2LUQJBQ27OSWXTKX4EGIUDEOHVDZDDV'
    },
    dataType: 'jsonp',
    method: 'GET',
    success: function (response) {
      console.log("success!", response);
      fn(response)
    }
  });
}


function createMap(queryResult) {
  
  console.log(queryResult);

  fetch(baseUrl + "/get-search-results", {
    body: JSON.stringify(queryResult),
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer', 
  })
  .then(response => response.json())
    .then(response => {
      console.log(response);
      console.log("*********")
      artyom.say("Scroll Down to see the results");
      generateMap(response);
    })
    .catch(function (error) {
      console.log('Request failure: ', error);
    }); 
    

}

var settings = {
  lang: "en-GB",
  continuous: true,
  listen: true, // Start recognizing
  onResult: function (text) {
    // text = the recognized text
    console.log(text);
    if (text !== '') {
      $('textarea#speak-text-box').val(text);

    }

  },
  onStart: function () {
    artyom.say('Say something !')
  },
  onEnd: function () {
    artyom.say("Got it!")
  }
};

var UserDictation = artyom.newDictation(settings);

function startRecognition() {
  UserDictation.start();
}

function stopRecognition() {
  UserDictation.stop();

}


function searchText() {

  var searchText = $('textarea#speak-text-box').val();
  artyom.say("Searching through the database !",{
    onStart:function(){
      console.log("The text has been started.");
  },
  onEnd:function(){
      console.log("The text has been finished.");
      searchText = searchText.trim();
      testWitAi(searchText, createMap)
      console.log("This is the serach text", searchText)
    
  }
  })

}


function generateMap(results) {
  console.log('in high charts', results);

  var graphType = results.graphtype;

  if (graphType === 1) {
    var data = results.result.data;
    var unit = results.result.unit;

    var title = results.result.title;
    var seriesTitle = results.result.seriesTitle;
    
    var xAxisName = results.result.xAxisName;
    var yAxisName = results.result.yAxisName;
    
    Highcharts.chart('search-graph-container', {
      chart: {
        type: 'spline'
      },
      title: {
        text: title
      },
      subtitle: {
        text: 'Search So Far.'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
        month: '%Y-%m',
      },
        title: {
          text: xAxisName
        }
      },
      yAxis: {
        title: {
          text: yAxisName
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b %Y}: {point.y:.2f} ' + unit
      },
    
      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },
    
      colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    
      series: [{
        name: title,
        data: data
      }]
    });
  } else if (graphType === 2) {
    console.log('yo')
var unit = results.result.unit;

var title = results.result.title;
var seriesTitle = results.result.seriesTitle;

var xAxisName = results.result.xAxisName;
var yAxisName = results.result.yAxisName;

var data1 = results.result.data1;
var data2 = results.result.data2;
var name1 = results.result.name1;
var name2 = results.result.name2;

Highcharts.chart('search-graph-container', {
  chart: {
    type: 'spline'
  },
  title: {
    text: title
  },
  subtitle: {
    text: 'Search So Far.'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
    month: '%Y-%m',
    },
    title: {
      text: xAxisName
    }
  },
  yAxis: {
    title: {
      text: yAxisName
    },
    min: 0
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b %Y}: {point.y:.2f} ' + unit
  },

  plotOptions: {
    spline: {
      marker: {
        enabled: true
      }
    }
  },

  colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

  // Define the data points. All series have a dummy year
  // of 1970/71 in order to be compared on the same x axis. Note
  // that in JavaScript, months start at 0 for January, 1 for February etc.
  series:[{
    name: name1,
    data: data1
  }, {
    name: name2,
    data: data2
  }]
});
  } else if (graphType === 3) {

var title = results.result.title;
var xAxisName = results.result.xAxisName;
var yAxisName = results.result.yAxisName;
var data1 = results.result.data1;
var data2 = results.result.data2;
var name1 = results.result.name1;
var name2 = results.result.name2;

console.log(data1)
Highcharts.chart('search-graph-container', {
  chart: {
    type: 'spline'
  },
  title: {
    text: title
  },
  subtitle: {
    text: 'Search So Far.'
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
    month: '%Y-%m',
    },
    title: {
      text: xAxisName
    }
  },
  yAxis: {
    title: {
      text: yAxisName
    },
    min: 0
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b %Y}: {point.y:.2f} '
  },

  plotOptions: {
    spline: {
      marker: {
        enabled: true
      }
    }
  },

  colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

  // Define the data points. All series have a dummy year
  // of 1970/71 in order to be compared on the same x axis. Note
  // that in JavaScript, months start at 0 for January, 1 for February etc.
  series:[{
    name: name1,
    data: data1
  }, {
    name: name2,
    data: data2
  }]
});

  }
  

  
  
}