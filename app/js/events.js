var baseUrl = "http://localhost:5000"
var region_name = ""
var picked_date_s = ""
var picked_date_e = ""
var qRes = [];

$("#intro").css(
  "background-image",
  "url(images/wildfire.jpg)"
);

// Set single-day-averages to hidden initially
$("#pol-table").hide();
$("#first-chart").hide();

function getEvents(data) {
  // alert(region_name);
  fetch(baseUrl + "/get_events", {
    body: JSON.stringify(data),
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

      generateMap(response);
    })
    .catch(function (error) {
      console.log('Request failure: ', error);
    }); 
    

}

function generateMap(results) {

  console.log(results);
  var data1 = results.result.data1;
  var data2 = results.result.data2;
  var data3 = results.result.data3;
  var data4 = results.result.data4;
  var events = results.result.events;
  var title = results.result.title;
  console.log(results.result);



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

  Highcharts.chart('graph-ctn', {
  chart: {
    type: 'spline',
    height: 500,
    width: 900,
  },
  title: {
    text: title
  },
  subtitle: {
    text: (picked_date_s + " to " + picked_date_e)
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
    month: '%Y-%m'
    
    },
    title: {
      text: "Date"
    },
      plotLines: events,
    // plotLines: [{
    //     color: '#FF0000', // Red
    //     width: 2,
    //     value: 1398211200000
    // }]

  },
  yAxis: {
    title: {
      text: "Units"
    },
   

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
    name: "NO2",
    data: data1
  },
  {
    name: "O3",
    data: data2
  },{
    name: "SO2",
    data: data3
  },{
    name: "CO",
    data: data4
  },
  {
    color: '#F44336',
    name: '5000+ Acres',
    dashStyle: 'solid',
    marker: {
        enabled: false
    }
},{
  color: '#E91E63',
  name: '1000 - 4999 Acres',
  dashStyle: 'solid',
  marker: {
      enabled: false
  }
},{
  color: '#9C27B0',
  name: '300 - 999 Acres',
  dashStyle: 'solid',
  marker: {
      enabled: false
  }
}
],
legend: {
  width: 600,
}
});
}

function fetchOnClick() {

  // City(s) 
  let city_name = $("#input-city").val();
  $("#return-title").text("Metrics for: " + city_name);

  // Date(s)
  var date1 = $("#date-min").val();
  var date2 = $("#date-max").val();

  if (date2 != "") {
    $("#return-dates").text(date1 + " to " + date2);
  } else {
    $("#return-dates").text(date1);
  }

  // If user enters range of data, display graph
  if(dateRange) { 

    getDataFromFrontEnd(city_name);
    // SELECT for range of dates
    $("#pol-table").hide();
    $("#first-chart").show("swing");
  } else {

    // SELECT name, mean_value, max_value, max_hour, aqi
    // FROM is_polluted_by, pollutant
    // WHERE i_p_b.symbol=p.symbol AND po_date=po_date AND po_date=dat1

    $("#first-chart").hide();
    $("#pol-table").show("swing");
  }
}

function formatDateAdd(date) {
    var d = new Date(date),
        month = '' + (d.getMonth()+2),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (day > '28') {
    	day = '28';
    }
    if (month == '13') {
    	month = '1';
    	year = year+1;
    }

    return [year, month, day].join('-');
}

function formatDateSub(date) {
    var d = new Date(date),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (day > '28') {
    	day = '28';
    }
    if (month == '0') {
    	month = '11';
    	year = year-1;
    }
    if (month == '00') {
    	month = '12';
    	year = year-1;
    }

    return [year, month, day].join('-');
}


function set_date(d) {
	// var new_date = new Date(d, "yy/mm/dd");
	var new_date = new Date(d);
	
	picked_date_s = formatDateSub(new_date);
	console.log(picked_date_s)
	picked_date_e = formatDateAdd(new_date);
	console.log(picked_date_e)
	// picked_date_e = new_date.getDate() + 30;

	// // picked_date_s.setDate(new_date.getDate() - 30);
	// // picked_date_e.setDate(new_date.getDate() + 30);

	// console.log(picked_date_s)
	// console.log(picked_date_e)
}

function set_region(r){
	region_name = r;
	// alert(r);
}

function get_region() {
	return region_name;
}

function toggleRange() {
  // If range, make single
  if ($( "#date-min-text" ).text() == "Begin Date") {
    $( "#date-min-text" ).text("Date");
    $( "#date-max" ).attr("required","false");
  } 
  else if ($( "#date-min-text" ).text() == "Date") {
    $( "#date-min-text" ).text("Begin Date");
    $( "#date-max" ).attr("required","true");
  }

  dateRange = !dateRange;
  $( "#date-max-text" ).toggle("fast");
  $( "#date-max" ).toggle("fast");
  $( "#date-max" ).val("");
}

function add_days(d) {
	alert(d);
	// console.log("d is " + d)
	// var new_date = new Date(d);
	// // new_date = d;
	// new_date.setDate(new_date.getDate()+30)
	return d;
}

function h1() {
	// alert(picked_date);
	getEvents({
		'r_name': region_name,
		// 's_date': "'2012-10-02'",
		// 'e_date': "'2016-03-20'"
		's_date': picked_date_s.toString(),
		'e_date': picked_date_e.toString()

		//  var result = new Date(date);
  // result.setDate(result.getDate() + days);
  })
  
  var qArray = [`select region_name from (select region_name, count(*) as count from manika.occurs_in where o_date>='01-JAN-13' and o_date<='31-DEC-13' group by region_name) 
where count = (select max(count) from (select region_name, count(*) as count from manika.occurs_in where o_date>='01-JAN-13' and o_date<='31-DEC-13' group by region_name) )`,`select event_type from (select event_type, count(*) as count from manika.occurs_in, manika.event where region_name ='Mid West' and o_date>='01-JAN-13' and o_date<='31-DEC-13' group by event_type) where count = (select max(count) from (select event_type, count(*) as count from manika.occurs_in, manika.event where region_name ='Mid West' and o_date>='01-JAN-13' and o_date<='31-DEC-13' group by event_type))`,`select YearWithF from (select YearWithF, count(*) from (select EXTRACT(YEAR FROM o_date) as YearWithF from manika.event, manika.occurs_in where event.event_id = event_id and event_type = 'F') group by YearWithF) where YearWithF = (select max(YearWithF) from (select YearWithF, count(*) from (select EXTRACT(YEAR FROM o_date) as YearWithF from manika.event, manika.occurs_in where event_id = occurs_in.event_id and event_type = 'F') group by YearWithF))`];

  qRes[0] = 'Mountain';
  qRes[1] = 'E';
  qRes[2] = 2015;

  $('#q1').text(qRes[0]);
  $('#q2').text(qRes[1]);
  $('#q3').text(qRes[2]);



}