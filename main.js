window.addEventListener("DOMContentLoaded", function(){
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
  const ForecastListHistory = document.getElementById('searchHistory');
  const ForecastCards = this.document.querySelectorAll(".card")
      
      submitBTN.addEventListener("click", function(){ //for regular searches when user decides to use the search bar
          var searchedCity = searchInput.value
          //console.log(searchedCity)
          var weatherDataCurrent = getWeatherDataCurrent(searchedCity) //Variable that stores currentDay Data 
          var weatherDataForecast = getWeatherDataForecast(searchedCity) //Variable that store Forecast Data

          //console.log(weatherDataForecast)
          
          //The then() method of a Promise object takes up to two arguments: callback functions for the fulfilled and rejected cases of the Promise . It immediately returns an equivalent Promise object

          weatherDataCurrent.then(data => {
              //console.log(data)
              currentCityName.innerText = data.name
              currentTemperature.innerText = `${data.main.temp} °C`
              currentDate.innerText = Date(data.dt)
              currentHumidity.innerText = data.main.humidity
              currentWind.innerText = `${data.wind.speed} Km/s`
              weatherImg.src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
          });

          const li = document.createElement('button');
          li.innerText = searchedCity;
          ForecastListHistory.appendChild(li);

          for(let i = 0; i < 5 ; i++){ //used to increment thorugh each forecastcard and then update the information of each card
            const card = ForecastCards[i];
            
            // Update the card with data from weatherDataForecast
            weatherDataForecast.then(data => {
              const weather = data.list[i].weather[0];
              const temp = data.list[i].main.temp;
              const wind = data.list[i].wind.speed;
              const humidity = data.list[i].main.humidity;
              const date = new Date(data.list[i].dt * 1000);
              const dateString = date.toLocaleDateString();
              const icon = `http://openweathermap.org/img/wn/${weather.icon}.png`;
              
              card.querySelector('.date').textContent = dateString;
              card.querySelector('.icon').setAttribute('src', icon);
              card.querySelector('.temperature').textContent = `${temp}°C`;
              card.querySelector('.wind').textContent = wind
              card.querySelector('.humidity').textContent = humidity
              
            });
          }


      })

      ForecastListHistory.addEventListener("click", function(event){ //for searches where the user decides to press the button of a city they previosuly searched
          // Get the city name from the clicked button's inner text
          var searchedCity = event.target.innerText;
          // Fetch the weather data for the selected city
          var weatherDataCurrent = getWeatherDataCurrent(searchedCity); 
          var weatherDataForecast = getWeatherDataForecast(searchedCity);
      
          //console.log(weatherDataForecast);
      
          weatherDataCurrent.then(data => {
              currentCityName.innerText = data.name;
              currentTemperature.innerText = `${data.main.temp} °C`;
              currentDate.innerText = Date(data.dt);
              currentHumidity.innerText = data.main.humidity;
              currentWind.innerText = `${data.wind.speed} Km/s`;
              weatherImg.src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
          });

          for(let i = 0; i < 5 ; i++){ //used to increment thorugh each forecastcard and then update the information of each card
          const card = ForecastCards[i];
        
        // Update the card with data from weatherDataForecast
        weatherDataForecast.then(data => {
          const weather = data.list[i].weather[0];
          const temp = data.list[i].main.temp;
          const wind = data.list[i].wind.speed;
          const humidity = data.list[i].main.humidity;
          const date = new Date(data.list[i].dt * 1000);
          const dateString = date.toLocaleDateString();
          const icon = `http://openweathermap.org/img/wn/${weather.icon}.png`;
          
          card.querySelector('.date').textContent = dateString;
          card.querySelector('.icon').setAttribute('src', icon);
          card.querySelector('.temperature').textContent = `${temp}°C`;
          card.querySelector('.wind').textContent = wind
          card.querySelector('.humidity').textContent = humidity
          
        });
      }

      });
});

async function getWeatherDataCurrent(city) {
  const apiKey = '8730129a02fdec31293217d5a8a9c63a';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    var request = await fetch(apiUrl);
    if (!request.ok) {
      throw new Error('Network response was not ok');
    }
    var data = await request.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


async function getWeatherDataForecast(city) {
  const apiKey = '8730129a02fdec31293217d5a8a9c63a';
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    var request = await fetch(apiUrl);
    if (!request.ok) {
      throw new Error('Network response was not ok');
    }
    var data = await request.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}  

