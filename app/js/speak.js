var baseUrl = "http://localhost:5000"
const artyom = new Artyom();
// artyom.initialize({   lang: "en-GB", // GreatBritain english   continuous:
// true, // Listen forever   soundex: true,// Use the soundex algorithm to
// increase accuracy   debug: true, // Show messages in the console
// executionKeyword: "and do it now",   listen: true, // Start to listen
// commands !   onResult:function(text){     // text = the recognized text
// console.log(text);     $('textarea#speak-text-box').text(text); },
// onStart:function(){     console.log("Dictation started by the user"); },
// onEnd:function(){     alert("Dictation stopped by the user"); },   // If
// providen, you can only trigger a command if you say its name   // e.g to
// trigger Good Morning, you need to say "Jarvis Good Morning"   name: "Jarvis"
// }).then(() => {   console.log("Artyom has been succesfully initialized");
// }).catch((err) => {   console.error("Artyom couldn't be initialized: ", err);
// });

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

  var data = results.result.data;
  var title = results.result.title;
  var seriesTitle = results.result.seriesTitle;
  
  var xAxisName = results.result.xAxisName;
  var yAxisName = results.result.yAxisName;
  var unit = results.result.unit;
  
  console.log(results)

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

  
  Highcharts.chart('1search-graph-container', {
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
}