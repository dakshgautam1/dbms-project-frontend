var baseUrl = "http://localhost:5000/";
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var city_name = getUrlParameter("city_id");
var res = city_name.split(" ");
var photoCityName = res.join("");

console.log(photoCityName);
$("#intro").css(
  "background-image",
  "url(images/cityImages/" + photoCityName + ".jpg)"
);
$("#services").css(
  "background-image",
  "url(images/cityImages/" + photoCityName + ".jpg)"
);


$("#page-head-city-name").text(city_name);

var baseUrl = "http://localhost:5000";

function getPollutants(data) {
  return fetch(baseUrl + "/test1", {
    body: JSON.stringify(data),
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer"
  })
    .then(response => response.json())
    .then(response => {
      return generateMap(response);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

function generateMap(results) {
  console.log(results);

  Highcharts.createElement(
    "link",
    {
      href: "https://fonts.googleapis.com/css?family=Unica+One",
      rel: "stylesheet",
      type: "text/css"
    },
    null,
    document.getElementsByTagName("head")[0]
  );

  // Highcharts.theme = {
  //   colors: [
  //     "#2b908f",
  //     "#90ee7e",
  //     "#f45b5b",
  //     "#7798BF",
  //     "#aaeeee",
  //     "#ff0066",
  //     "#eeaaee",
  //     "#55BF3B",
  //     "#DF5353",
  //     "#7798BF",
  //     "#aaeeee"
  //   ],
  //   chart: {
  //     backgroundColor: {
  //       linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
  //       stops: [[0, "#2a2a2b"], [1, "#3e3e40"]]
  //     },
  //     style: {
  //       fontFamily: "'Unica One', sans-serif"
  //     },
  //     plotBorderColor: "#606063"
  //   },
  //   title: {
  //     style: {
  //       color: "#E0E0E3",
  //       textTransform: "uppercase",
  //       fontSize: "20px"
  //     }
  //   },
  //   subtitle: {
  //     style: {
  //       color: "#E0E0E3",
  //       textTransform: "uppercase"
  //     }
  //   },
  //   xAxis: {
  //     gridLineColor: "#707073",
  //     labels: {
  //       style: {
  //         color: "#E0E0E3"
  //       }
  //     },
  //     lineColor: "#707073",
  //     minorGridLineColor: "#505053",
  //     tickColor: "#707073",
  //     title: {
  //       style: {
  //         color: "#A0A0A3"
  //       }
  //     }
  //   },
  //   yAxis: {
  //     gridLineColor: "#707073",
  //     labels: {
  //       style: {
  //         color: "#E0E0E3"
  //       }
  //     },
  //     lineColor: "#707073",
  //     minorGridLineColor: "#505053",
  //     tickColor: "#707073",
  //     tickWidth: 1,
  //     title: {
  //       style: {
  //         color: "#A0A0A3"
  //       }
  //     }
  //   },
  //   tooltip: {
  //     backgroundColor: "rgba(0, 0, 0, 0.85)",
  //     style: {
  //       color: "#F0F0F0"
  //     }
  //   },
  //   plotOptions: {
  //     series: {
  //       dataLabels: {
  //         color: "#B0B0B3"
  //       },
  //       marker: {
  //         lineColor: "#333"
  //       }
  //     },
  //     boxplot: {
  //       fillColor: "#505053"
  //     },
  //     candlestick: {
  //       lineColor: "white"
  //     },
  //     errorbar: {
  //       color: "white"
  //     }
  //   },
  //   legend: {
  //     itemStyle: {
  //       color: "#E0E0E3"
  //     },
  //     itemHoverStyle: {
  //       color: "#FFF"
  //     },
  //     itemHiddenStyle: {
  //       color: "#606063"
  //     }
  //   },
  //   credits: {
  //     style: {
  //       color: "#666"
  //     }
  //   },
  //   labels: {
  //     style: {
  //       color: "#707073"
  //     }
  //   },

  //   drilldown: {
  //     activeAxisLabelStyle: {
  //       color: "#F0F0F3"
  //     },
  //     activeDataLabelStyle: {
  //       color: "#F0F0F3"
  //     }
  //   },

  //   navigation: {
  //     buttonOptions: {
  //       symbolStroke: "#DDDDDD",
  //       theme: {
  //         fill: "#505053"
  //       }
  //     }
  //   },

  //   // scroll charts
  //   rangeSelector: {
  //     buttonTheme: {
  //       fill: "#505053",
  //       stroke: "#000000",
  //       style: {
  //         color: "#CCC"
  //       },
  //       states: {
  //         hover: {
  //           fill: "#707073",
  //           stroke: "#000000",
  //           style: {
  //             color: "white"
  //           }
  //         },
  //         select: {
  //           fill: "#000003",
  //           stroke: "#000000",
  //           style: {
  //             color: "white"
  //           }
  //         }
  //       }
  //     },
  //     inputBoxBorderColor: "#505053",
  //     inputStyle: {
  //       backgroundColor: "#333",
  //       color: "silver"
  //     },
  //     labelStyle: {
  //       color: "silver"
  //     }
  //   },

  //   navigator: {
  //     handles: {
  //       backgroundColor: "#666",
  //       borderColor: "#AAA"
  //     },
  //     outlineColor: "#CCC",
  //     maskFill: "rgba(255,255,255,0.1)",
  //     series: {
  //       color: "#7798BF",
  //       lineColor: "#A6C7ED"
  //     },
  //     xAxis: {
  //       gridLineColor: "#505053"
  //     }
  //   },

  //   scrollbar: {
  //     barBackgroundColor: "#808083",
  //     barBorderColor: "#808083",
  //     buttonArrowColor: "#CCC",
  //     buttonBackgroundColor: "#606063",
  //     buttonBorderColor: "#606063",
  //     rifleColor: "#FFF",
  //     trackBackgroundColor: "#404043",
  //     trackBorderColor: "#404043"
  //   },

  //   // special colors for some of the
  //   legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
  //   background2: "#505053",
  //   dataLabelsColor: "#B0B0B3",
  //   textColor: "#C0C0C0",
  //   contrastTextColor: "#F0F0F3",
  //   maskColor: "rgba(255,255,255,0.3)"
  // };

  // // Apply the theme
  // Highcharts.setOptions(Highcharts.theme);

var title = results.result.title;
var xAxisName = results.result.xAxisName;
var yAxisName = results.result.yAxisName;
var data1 = results.result.data1;
var data2 = results.result.data2;
var data3 = results.result.data3;
var data4 = results.result.data4;
var data5 = results.result.data5;
var data6 = results.result.data6;
var data7 = results.result.data7;
var data8 = results.result.data8;
var data9 = results.result.data9;
var data10 = results.result.data10;
var data11 = results.result.data11;
var data12 = results.result.data12;
var data13 = results.result.data13;
var data14 = results.result.data14;
var data15 = results.result.data15;
var data16 = results.result.data16;


var name1 = results.result.name1;
var name2 = results.result.name2;
var name3 = results.result.name3;
var name4 = results.result.name4;

  var highChart1 = Highcharts.chart('graph-ctn', {
    chart: {
      type: 'spline'
    },
    title: {
      text: title
    },
    subtitle: {
      text: 'Mean Value'
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
      data: data5
    },
    {
      name: name3,
      data: data9
    },
    {
      name: name4,
      data: data13
    }]
  });
  var highChart2 = Highcharts.chart('graph-ctn-a', {
    chart: {
      type: 'spline'
    },
    title: {
      text: title
    },
    subtitle: {
      text: 'Max Hour'
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
      data: data2
    }, {
      name: name2,
      data: data6
    },
    {
      name: name3,
      data: data10
    },
    {
      name: name4,
      data: data14
    }]
  });
  var highChart3 = Highcharts.chart('graph-ctn-c', {
    chart: {
      type: 'spline'
    },
    title: {
      text: title
    },
    subtitle: {
      text: 'Max Hour'
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
      data: data4
    }, {
      name: name2,
      data: data8
    },
    {
      name: name3,
      data: data12
    },
    {
      name: name4,
      data: data16
    }]
  });
  var highChart4 = Highcharts.chart('graph-ctn-b', {
    chart: {
      type: 'spline'
    },
    title: {
      text: title
    },
    subtitle: {
      text: 'AQI'
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
      data: data3
    }, {
      name: name2,
      data: data7
    },
    {
      name: name3,
      data: data11
    },
    {
      name: name4,
      data: data15
    }]
  });


  return {
    "chart1": highChart1,
    "chart2": highChart2,
    "chart3": highChart3,
    "chart4": highChart4
  }
}

function h1() {
  var get_start_date = document.getElementById("year-min").value;
  var get_end_date = document.getElementById("year-max").value;
  console.log(typeof(get_start_date) === 'string')
  getPollutants({
    "city_name": city_name,
    "start_date": get_start_date || "02/28/2013",
    "end_date": get_end_date || "02/28/2017"
  }).then(result => {
    console.log(result)
  });
}

h1();

$( function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
} );

document.getElementById("year-min").value = '02/28/2013';
document.getElementById("year-max").value = '02/28/2017';
