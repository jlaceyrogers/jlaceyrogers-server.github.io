const apiKey = '8730129a02fdec31293217d5a8a9c63a';
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// Retrieve elements from the DOM and create variables

const searchInput = document.getElementById('searchInput');
const searchHistory = document.getElementById('searchHistory');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const submitBTN = document.getElementById('searchButton')

var getWeatherData;

var lat = ("latitude");
var lon = ("longitude");


window.addEventListener("DOMContentLoaded", function(){
        
        submitBTN.addEventListener("click", function(){
            var searchedCity = searchInput.value
            //console.log(searchedCity)
            getWeatherData(searchedCity)
        })

        cityName.value = getWeatherData.city.name;

});

function getWeatherData(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            getWeatherData = data;
            console.log(getWeatherData);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
        
}

