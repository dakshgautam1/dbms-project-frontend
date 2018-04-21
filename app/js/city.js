var baseUrl = "http://localhost:5000/"

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : sParameterName[1];
    }
  }
};

var city_name = getUrlParameter('city_id')
var start_date = '1-1-2014'
var end_date = '1-1-2017'

// $('#intro').css('background-image','url(images/' + city_name +'.jpg)');

function makeApiCallToGetCityData(city_name, start_date, end_date, url) {

  data = {
    cityName: city_name,
    startDate: start_date,
    endDate: end_date
  }
  
  fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json())
    .then(response => console.log(response))
    .catch(function (error) {
      console.log('Request failure: ', error);
    }); // parses response to JSON
}

makeApiCallToGetCityData(city_name, start_date, end_date, baseUrl + "get-city-description");
