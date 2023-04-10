const apiKey = '8730129a02fdec31293217d5a8a9c63a';

// Retrieve elements from the DOM and create variables
const searchInput = document.getElementById('searchInput');
const searchHistory = document.getElementById('searchHistory');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
var lat = ("latitude");
var lon = ("longitude");






// Create a function to retrieve the weather data from the API
const getWeather = (city) => {
    const url = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={8730129a02fdec31293217d5a8a9c63a}`;
    
    // select the search button element and attach a click event listener
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        // get the city name from the input field
        const city = document.getElementById('searchInput').value;

        // replace the latitude, longitude, and API key placeholders in the URL with actual values
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={8730129a02fdec31293217d5a8a9c63a}`;

    });
};

    // this function will be called when the search button is clicked