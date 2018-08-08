$("#intro").css(
  "background-image",
  "url(images/nyc-park.jpg)"
);

var qRes = []
var baseUrl = "http://localhost:5000";


function generateMap(results, idFromAbove) {
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

  var unit = results.result.unit;

  var title = results.result.title;
  var seriesTitle = results.result.seriesTitle;
  
  var xAxisName = results.result.xAxisName;
  var yAxisName = results.result.yAxisName;
  
  var data1 = results.result.data1;
  var data2 = results.result.data2;
  var name1 = results.result.name1;
  var name2 = results.result.name2;
  
  Highcharts.chart(idFromAbove, {
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
}

function getPollutants(data, idFromAbove) {
  return fetch(baseUrl + "/get-two-cities-data", {
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
      return generateMap(response, idFromAbove);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

var city1 = 'New York'
var city2 = 'New York'

function set_city1(value) {
  city1 = value;
}
function set_city2(value) {
  city2 = value;
}


function h1() {

  var get_city1 = city1 || 'New York';
  var get_city2 = city2 || 'New York';
  var get_date1 = document.getElementById('input-date1').value || '02/28/2013';
  var get_date2 = document.getElementById('input-date2').value || '02/28/2017';
  

  getPollutants({
    "city_name1": get_city1,
    "city_name2": get_city2,
    "aspect": "Temperature",
    "start_date": get_date1,
    "end_date": get_date2
  }, 'weather-graph-ctn').then(result => {
    console.log(result)
  });

  getPollutants({
    "city_name1": get_city1,
    "city_name2": get_city2,
    "aspect": "Pressure",
    "start_date": get_date1,
    "end_date": get_date2
  }, 'weather-graph-ctn-a').then(result => {
    console.log(result)
  });

  getPollutants({
    "city_name1": get_city1,
    "city_name2": get_city2,
    "aspect": "Humidity",
    "start_date": get_date1,
    "end_date": get_date2
  }, 'weather-graph-ctn-b').then(result => {
    console.log(result)
  });


  getPollutants({
    "city_name1": get_city1,
    "city_name2": get_city2,
    "aspect": "Wind Speed",
    "start_date": get_date1,
    "end_date": get_date2
  }, 'weather-graph-ctn-c').then(result => {
    console.log(result)
  });
  
  var qArray = [`select metric_value from manika.is_affected_by where w_date = '24-JUL-14' and city_name = 'New York' and aspect = 'Temperature'`,`select max(metric_value) from manika.is_affected_by i, manika.city c where i.aspect = 'Humidity' and c.state = 'CA' and i.w_date>='01-JAN-13' and i.w_date<='31-DEC-13'`,`select avg(metric_value) from is_affected_by, city where aspect = 'Wind Speed' and city.latitude >= '25' and city.latitude <= '35' and w_date ='29-JUN-14'`,`select max(ratio) from (select MAX_VALUE/METRIC_value as ratio from (select * from is_polluted_by where symbol = 'O3' and city_name = 'Dallas')a, (select * from is_affected_by where aspect = 'Pressure' and city_name = 'Dallas' ) b 
where a.PO_DATE = b.W_Date)`,`select coldest_year from (select Coldest_Year, min(metric_value) as minTemp from (select EXTRACT(YEAR FROM w_date) as Coldest_Year, metric_value from is_affected_by where city_name = 'Charlotte' and aspect = 'Temperature') group by Coldest_Year) where mintemp = (select min(mintemp) from (select Coldest_Year, min(metric_value) as minTemp from (select EXTRACT(YEAR FROM w_date) as Coldest_Year, metric_value from is_affected_by where city_name = 'Charlotte' and aspect = 'Temperature') group by Coldest_Year))`,`select city_name from is_affected_by where aspect= 'Temperature' and w_date>='01-JAN-15' and w_date<='31-DEC-15' and metric_value = (select max(metric_value) from is_affected_by where aspect= 'Temperature' and w_date>='01-JAN-15' and w_date<='31-DEC-15')`];
  
  qRes[0] = 76.4;
  qRes[1] = 100;
  qRes[2] = 5.67;
  qRes[3] = 0.000086;
  qRes[4] = 2013;
  qRes[5] = 'Phoenix';

  $('#q1').text(qRes[0]);
  $('#q2').text(qRes[1]);
  $('#q3').text(qRes[2]);
  $('#q4').text(qRes[3]);
  $('#q5').text(qRes[4]);
  $('#q6').text(qRes[5]);
}


