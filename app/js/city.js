var baseUrl = "http://localhost:5000";
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
//var city_name = 'Los Angeles';
var res = city_name.split(" ");
var photoCityName = res.join("");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

var todayDate = mm + '/' + dd + '/' + yyyy;

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

function getCityWeather(data) {
  return fetch(baseUrl + "/get-city-weather", {
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
      return generateWeather(response);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

function getCityPollution(data) {
  return fetch(baseUrl + "/get-city-pollution", {
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
      return generatePollution(response);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

function getHot(data) {
  return fetch(baseUrl + "/get-hottest", {
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
      return generateHottest(response);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

function getCold(data) {
  return fetch(baseUrl + "/get-coldest", {
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
      return generateColdest(response);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

function getDry(data) {
  return fetch(baseUrl + "/get-dry", {
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
      return generateDry(response);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

function getWind(data) {
  return fetch(baseUrl + "/get-wind", {
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
      return generateWind(response);
    })
    .catch(function(error) {
      console.log("Request failure: ", error);
    });
}

function generateHottest(results) {
  $('#hot-date').text(results.result.hot_date);
  $('#hot-val').text(results.result.hot_val);
}

function generateColdest(results) {
  $('#cold-date').text(results.result.cold_date);
  $('#cold-val').text(results.result.cold_val);
}

function generateDry(results) {
  $('#dry-date').text(results.result.dry_date);
  $('#dry-val').text(results.result.dry_val);
}

function generateWind(results) {
  $('#wind-date').text(results.result.wind_date);
  $('#wind-val').text(results.result.wind_val);
}

function generateWeather(results) {
  console.log(results);

  $('#history-title').text('This Day in History - ' + city_name + ': ' + todayDate );

  $('#13-temp').text(results.result.temp_13);
  $('#14-temp').text(results.result.temp_14);
  $('#15-temp').text(results.result.temp_15);

  $('#13-humi').text(results.result.humi_13);
  $('#14-humi').text(results.result.humi_14);
  $('#15-humi').text(results.result.humi_15);

  $('#13-pres').text(results.result.pres_13);
  $('#14-pres').text(results.result.pres_14);
  $('#15-pres').text(results.result.pres_15);

  $('#13-spe').text(results.result.spe_13);
  $('#14-spe').text(results.result.spe_14);
  $('#15-spe').text(results.result.spe_15);

  $('#13-direc').text(getDirection(results.result.direc_13));
  $('#14-direc').text(getDirection(results.result.direc_14));
  $('#15-direc').text(getDirection(results.result.direc_15));

}

function generatePollution(results) {
  console.log(results);

  $('#co_mean13').text(results.result.co_avg_13);
  $('#co_max13').text(results.result.co_max_13);
  $('#co_aqi13').text(results.result.co_aqi_13);
  $('#no2_mean13').text(results.result.no2_avg_13);
  $('#no2_max13').text(results.result.no2_max_13);
  $('#no2_aqi13').text(results.result.no2_aqi_13);
  $('#o3_mean13').text(results.result.o3_avg_13);
  $('#o3_max13').text(results.result.o3_max_13);
  $('#o3_aqi13').text(results.result.o3_aqi_13);
  $('#so2_mean13').text(results.result.so2_avg_13);
  $('#so2_max13').text(results.result.so2_max_13);
  $('#so2_aqi13').text(results.result.so2_aqi_13);

  $('#co_mean14').text(results.result.co_avg_14);
  $('#co_max14').text(results.result.co_max_14);
  $('#co_aqi14').text(results.result.co_aqi_14);
  $('#no2_mean14').text(results.result.no2_avg_14);
  $('#no2_max14').text(results.result.no2_max_14);
  $('#no2_aqi14').text(results.result.no2_aqi_14);
  $('#o3_mean14').text(results.result.o3_avg_14);
  $('#o3_max14').text(results.result.o3_max_14);
  $('#o3_aqi14').text(results.result.o3_aqi_14);
  $('#so2_mean14').text(results.result.so2_avg_14);
  $('#so2_max14').text(results.result.so2_max_14);
  $('#so2_aqi14').text(results.result.so2_aqi_14);

  $('#co_mean15').text(results.result.co_avg_15);
  $('#co_max15').text(results.result.co_max_15);
  $('#co_aqi15').text(results.result.co_aqi_15);
  $('#no2_mean15').text(results.result.no2_avg_15);
  $('#no2_max15').text(results.result.no2_max_15);
  $('#no2_aqi15').text(results.result.no2_aqi_15);
  $('#o3_mean15').text(results.result.o3_avg_15);
  $('#o3_max15').text(results.result.o3_max_15);
  $('#o3_aqi15').text(results.result.o3_aqi_15);
  $('#so2_mean15').text(results.result.so2_avg_15);
  $('#so2_max15').text(results.result.so2_max_15);
  $('#so2_aqi15').text(results.result.so2_aqi_15);

}

function getDirection(angle) {

  var directions = 16;
        
    var degree = 360 / directions;
    angle = angle + degree/2;
        
    if (angle >= 0 * degree && angle < 1 * degree)
      return "N";
    if (angle >= 1 * degree && angle < 2 * degree)
      return "NNE";
    if (angle >= 2 * degree && angle < 3 * degree)
      return "NE";
    if (angle >= 3 * degree && angle < 4 * degree)
      return "E";
    if (angle >= 4 * degree && angle < 5 * degree)
      return "ESE";
    if (angle >= 5 * degree && angle < 6 * degree)
      return "SE";
    if (angle >= 6 * degree && angle < 7 * degree)
      return "SSE";
    if (angle >= 7 * degree && angle < 8 * degree)
      return "S";
    if (angle >= 8 * degree && angle < 9 * degree)
      return "SSW";
    if (angle >= 9 * degree && angle < 10 * degree)
      return "SW";
    if (angle >= 10 * degree && angle < 11 * degree)
      return "WSW";
    if (angle >= 11 * degree && angle < 12 * degree)
      return "W";
    if (angle >= 12 * degree && angle < 13 * degree)
      return "WNW";
    if (angle >= 13 * degree && angle < 14 * degree)
      return "NW";
    if (angle >= 14 * degree && angle < 15 * degree)
      return "NNW";
    if (angle >= 15 * degree && angle < 16 * degree)
      return "N";

    //Should never happen: 
    return "ERROR";

}

function h1() {

  console.log(typeof(get_start_date) === 'string');

  getCityWeather({
    "city_name": city_name
  }).then(result => {
    console.log(result);
  });

  getCityPollution({
    "city_name": city_name
  }).then(result => {
    console.log(result);
  });

  getHot({
    "city_name": city_name
  }).then(result => {
    console.log(result);
  });

  getCold({
    "city_name": city_name
  }).then(result => {
    console.log(result)
  });

  getDry({
    "city_name": city_name
  }).then(result => {  
    console.log(result)
  });

  getWind({
    "city_name": city_name
  }).then(result => {
    console.log(result)
  });

  
}

h1();