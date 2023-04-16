window.addEventListener("DOMContentLoaded", function(){
  const searchHistory = document.getElementById('searchHistory'); //unsure what this is for
  const description = document.getElementById('description'); //unsure what this is for
  
  //https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  // Retrieve elements from the DOM and create variables

  const searchInput = document.getElementById('searchInput');
  const submitBTN = document.getElementById('searchButton')
  const currentCityName = document.getElementById('currentCity');
  const currentTemperature = document.getElementById('currentTemp');
  const currentDate = document.getElementById('currentDate');
  const currentHumidity = document.getElementById('currentHumidity');
  const currentWind = document.getElementById('currentWind');
  const weatherImg = document.getElementById('weatherImg');
      
      submitBTN.addEventListener("click", function(){
          var searchedCity = searchInput.value
          //console.log(searchedCity)
          var weatherData = getWeatherDataCurrent(searchedCity)

          weatherData.then(data => {
              console.log(data)
              currentCityName.innerText = data.name
              currentTemperature.innerText = `${data.main.temp} °C`
              currentDate.innerText = Date(data.dt)
              currentHumidity.innerText = data.main.humidity
              currentWind.innerText = `${data.wind.speed} Km/s`
              weatherImg.src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
          });
          
      })
});

async function getWeatherDataCurrent(city){
  const apiKey = '8730129a02fdec31293217d5a8a9c63a';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  var request = await fetch(apiUrl);
  var data = await request.json();

  return data

}


function updateCards() {
  const day1 = document.getElementById('day1');
  const day2 = document.getElementById('day2');
  const day3 = document.getElementById('day3');
  const day4 = document.getElementById('day4');
  const day5 = document.getElementById('day5');

  submitBTN.addEventListener("click", function() {
    var searchedCity = searchInput.value;
    //console.log(searchedCity)
    var weatherData = getWeatherDataCurrent(searchedCity);
  });
}
