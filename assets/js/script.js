// Declare a variable to store the searched city
let city = "";
// Variable declaration
let searchCity = document.getElementById("search-city");
let searchButton = document.getElementById("search-button");
let clearButton = document.getElementById("clear-history");
let currentCity = document.getElementById("current-city");
let currentTemperature = document.getElementById("temperature");
let currentHumidity = document.getElementById("humidity");
let currentWSpeed = document.getElementById("wind-speed");
let sCity = [];

// Searches the city to see if it exists in the entries from the storage
function find(c) {
  for (var i = 0; i < sCity.length; i++) {
    if (c.toUpperCase() === sCity[i]) {
      return -1;
    }
  }
  return 1;
}

// Set up the API key
let APIKey = "c32a31c6a7ffcbea5bdd726183442f5b";

// Display the current and future weather to the user after grabbing the city from the input text box.
function displayWeather(event) {
  event.preventDefault();
  if (searchCity.value.trim() !== "") {
    city = searchCity.value.trim();
    currentWeather(city);
  }
}

// Here we create the fetch call
function currentWeather(city) {
  // Here we build the URL so we can get data from the server side
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(function (response) {
      // Parse the response to display the current weather including the City name, the Date, and the weather icon.
      console.log(response);
      // Data object from server-side API for icon property.
      const weathericon = response.weather[0].icon;
      const iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
      // The date format method is taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      const date = new Date(response.dt * 1000).toLocaleDateString();
      // Parse the response for the name of the city and concatenate the date and icon.
      currentCity.innerHTML = response.name + " (" + date + ")" + "<img src=" + iconurl + ">";
      // Parse the response to display the current temperature.
      // Convert the temp to Fahrenheit
      const tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
      currentTemperature.innerHTML = tempF + "&#8457;";
      // Display the Humidity
      currentHumidity.innerHTML = response.main.humidity + "%";
      // Display Wind speed and convert to MPH
      const ws = response.wind.speed;
      const windsmph = (ws * 2.237).toFixed(1);
      currentWSpeed.innerHTML = windsmph + "MPH";

      forecast(response.id);
      if (response.cod == 200) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        console.log(sCity);
        if (sCity == null) {
          sCity = [];
          sCity.push(city.toUpperCase());
          localStorage.setItem("cityname", JSON.stringify(sCity));
          addToList(city);
        } else {
          if (find(city) > 0) {
            sCity.push(city.toUpperCase());
            localStorage.setItem("cityname", JSON.stringify(sCity));
            addToList(city);
          }
        }
      }
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

searchButton.addEventListener("click", displayWeather);  













































// var ApiKey = ("c32a31c6a7ffcbea5bdd726183442f5b");

// var cityInput = document.getElementById("city-input");
// var searchButton = document.getElementById("search-button");
// var clearButton = document.getElementById("clear-button");
// var LocalStorageList = document.getElementById("local-storage-list");

// var currentCity = document.getElementById("current-city");
// var currentTemperature = document.getElementById("temperature");
// var currentWind = document.getElementById("wind");
// var currentHumidity = document.getElementById("humidity");


// // Add an event listener to the search button
// searchButton.addEventListener("click", function () {
//     var cityName = cityInput.value;
//     // var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + ApiKey;
//     var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}&units=metric`;
//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             var currentCity = data.name;
//             var currentTemperature = data.main.temp;
//             var currentWind = data.wind.speed;
//             var currentHumidity = data.main.humidity;

//             document.getElementById('current-city').textContent = currentCity;
//             document.getElementById('temperature').textContent = currentTemperature;
//             document.getElementById('wind').textContent = currentWind;
//             document.getElementById('humidity').textContent = currentHumidity;

//             // Local storage
//             var searchHistory = localStorage.getItem('searchHistory');
//             var search = searchHistory ? JSON.parse(searchHistory) : [];
//             search.push(currentCity);
//             localStorage.setItem('searchHistory', JSON.stringify(search));

//             // Update the HTML with the saved searches
//             var LocalStorageList = document.getElementById('local-storage-list');
//             LocalStorageList.innerHTML = ''; 

//             search.forEach(function (search) {
//                 var listItem = document.createElement('li');
//                 listItem.textContent = search;
//                 LocalStorageList.appendChild(listItem);
//             });

//             // Clear search list from local storage
//             function clearLocalStorage() {
//                 localStorage.removeItem('searchHistory');
//                 location.reload(); 
//               }
              
//               // Add an event listener to the clear button
//               var clearButton = document.getElementById("clear-button");
//               clearButton.addEventListener('click', clearLocalStorage);
    
//     })
// })








// var weatherInfo = document.createElement("li");
// weatherList.innerHTML = "";
// weatherInfo.innerHTML = 
// currentCity + 
// "<br>" +
// currentTemperature +
// "<br>" +
// currentWind +
// "<br>" +
// currentHumidity;

// weatherList.appendChild(weatherInfo);

















// var city = "London"
// //var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;
// var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`

// fetch(queryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })