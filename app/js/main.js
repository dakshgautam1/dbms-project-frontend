console.log(window);

var localUrl = "http://localhost:5000/test"

function testApi() {
fetch(localUrl)
.then(function(data) {
  return data.json()
}).then(function(result) {
      console.log(result)
      result.result.forEach((value) => {
        console.log(value);
        $("<li>" + value.cityName + " - " + value.state +"</li>").appendTo("#album-list")
      })
})
.catch(function() {
    // This is where you run code if the server returns any errors
});
}

testApi();
