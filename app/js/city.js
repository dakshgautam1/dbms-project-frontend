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
var start_date = "2014/1/1";
var end_date = "2017/1/1";

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

  Highcharts.theme = {
    colors: [
      "#2b908f",
      "#90ee7e",
      "#f45b5b",
      "#7798BF",
      "#aaeeee",
      "#ff0066",
      "#eeaaee",
      "#55BF3B",
      "#DF5353",
      "#7798BF",
      "#aaeeee"
    ],
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [[0, "#2a2a2b"], [1, "#3e3e40"]]
      },
      style: {
        fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: "#606063"
    },
    title: {
      style: {
        color: "#E0E0E3",
        textTransform: "uppercase",
        fontSize: "20px"
      }
    },
    subtitle: {
      style: {
        color: "#E0E0E3",
        textTransform: "uppercase"
      }
    },
    xAxis: {
      gridLineColor: "#707073",
      labels: {
        style: {
          color: "#E0E0E3"
        }
      },
      lineColor: "#707073",
      minorGridLineColor: "#505053",
      tickColor: "#707073",
      title: {
        style: {
          color: "#A0A0A3"
        }
      }
    },
    yAxis: {
      gridLineColor: "#707073",
      labels: {
        style: {
          color: "#E0E0E3"
        }
      },
      lineColor: "#707073",
      minorGridLineColor: "#505053",
      tickColor: "#707073",
      tickWidth: 1,
      title: {
        style: {
          color: "#A0A0A3"
        }
      }
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      style: {
        color: "#F0F0F0"
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: "#B0B0B3"
        },
        marker: {
          lineColor: "#333"
        }
      },
      boxplot: {
        fillColor: "#505053"
      },
      candlestick: {
        lineColor: "white"
      },
      errorbar: {
        color: "white"
      }
    },
    legend: {
      itemStyle: {
        color: "#E0E0E3"
      },
      itemHoverStyle: {
        color: "#FFF"
      },
      itemHiddenStyle: {
        color: "#606063"
      }
    },
    credits: {
      style: {
        color: "#666"
      }
    },
    labels: {
      style: {
        color: "#707073"
      }
    },

    drilldown: {
      activeAxisLabelStyle: {
        color: "#F0F0F3"
      },
      activeDataLabelStyle: {
        color: "#F0F0F3"
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: "#DDDDDD",
        theme: {
          fill: "#505053"
        }
      }
    },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: "#505053",
        stroke: "#000000",
        style: {
          color: "#CCC"
        },
        states: {
          hover: {
            fill: "#707073",
            stroke: "#000000",
            style: {
              color: "white"
            }
          },
          select: {
            fill: "#000003",
            stroke: "#000000",
            style: {
              color: "white"
            }
          }
        }
      },
      inputBoxBorderColor: "#505053",
      inputStyle: {
        backgroundColor: "#333",
        color: "silver"
      },
      labelStyle: {
        color: "silver"
      }
    },

    navigator: {
      handles: {
        backgroundColor: "#666",
        borderColor: "#AAA"
      },
      outlineColor: "#CCC",
      maskFill: "rgba(255,255,255,0.1)",
      series: {
        color: "#7798BF",
        lineColor: "#A6C7ED"
      },
      xAxis: {
        gridLineColor: "#505053"
      }
    },

    scrollbar: {
      barBackgroundColor: "#808083",
      barBorderColor: "#808083",
      buttonArrowColor: "#CCC",
      buttonBackgroundColor: "#606063",
      buttonBorderColor: "#606063",
      rifleColor: "#FFF",
      trackBackgroundColor: "#404043",
      trackBorderColor: "#404043"
    },

    // special colors for some of the
    legendBackgroundColor: "rgba(0, 0, 0, 0.5)",
    background2: "#505053",
    dataLabelsColor: "#B0B0B3",
    textColor: "#C0C0C0",
    contrastTextColor: "#F0F0F3",
    maskColor: "rgba(255,255,255,0.3)"
  };

  // Apply the theme
  Highcharts.setOptions(Highcharts.theme);

  var highChart1 = Highcharts.chart("graph-ctn", {
    title: {
      text: "Solar Employment Growth by Sector, 2010-2016"
    },

    subtitle: {
      text: "Source: thesolarfoundation.com"
    },

    yAxis: {
      title: {
        text: "Number of Employees"
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [
      {
        name: "Installation",
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: "Manufacturing",
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: "Sales & Distribution",
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: "Project Development",
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      },
      {
        name: "Other",
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  });

  var highChart2 = Highcharts.chart("graph-ctn1", {
    title: {
      text: "Solar Employment Growth by Sector, 2010-2016"
    },

    subtitle: {
      text: "Source: thesolarfoundation.com"
    },

    yAxis: {
      title: {
        text: "Number of Employees"
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: [
      {
        name: "Installation",
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: "Manufacturing",
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      },
      {
        name: "Sales & Distribution",
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      },
      {
        name: "Project Development",
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      },
      {
        name: "Other",
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  });


  return {
    "chart1": highChart1,
    "chart2": highChart2
  }
}

function h1() {
  getPollutants({
    name: "New York"
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

document.getElementById("year-min").value = start_date;
document.getElementById("year-max").value = end_date;
