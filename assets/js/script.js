let city = "";
const searchCity = document.getElementById("search-city");
const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-history");
const currentCity = document.getElementById("current-city");
const currentTemperature = document.getElementById("temperature");
const currentHumidity = document.getElementById("humidity");
const currentWSpeed = document.getElementById("wind-speed");
let sCity = [];

const find = (c) => {
  return sCity.some(city => city.toUpperCase() === c.toUpperCase()) ? -1 : 1;
};

const APIKey = "c32a31c6a7ffcbea5bdd726183442f5b";

const displayWeather = (event) => {
  event.preventDefault();
  if (searchCity.value.trim() !== "") {
    city = searchCity.value.trim();
    currentWeather(city);
  }
};

const currentWeather = (city) => {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}`;
  fetch(queryURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(response => {
      const weathericon = response.weather[0].icon;
      const iconurl = `https://openweathermap.org/img/wn/${weathericon}@2x.png`;
      const date = new Date(response.dt * 1000).toLocaleDateString();

      currentCity.innerHTML = `${response.name} (${date}) <img src=${iconurl}>`;
      const tempC = (response.main.temp - 273.15).toFixed(2);
      currentTemperature.innerHTML = `${tempC}&#8451;`;  // Display temperature in Celsius
      currentHumidity.innerHTML = `${response.main.humidity}%`;
      const windskmh = (response.wind.speed * 3.6).toFixed(1);
      currentWSpeed.innerHTML = `${windskmh}KMH`;  // Display wind speed in KMH

      forecast(response.id);

      if (response.cod == 200) {
        sCity = JSON.parse(localStorage.getItem("cityname")) || [];
        if (find(city) > 0) {
          sCity.push(city.toUpperCase());
          localStorage.setItem("cityname", JSON.stringify(sCity));
          addToList(city);
        }
      }
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
};

const forecast = (cityid) => {
  const queryforcastURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityid}&appid=${APIKey}`;
  fetch(queryforcastURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(response => {
      for (let i = 0; i < 5; i++) {
        const date = new Date(response.list[((i + 1) * 8) - 1].dt * 1000).toLocaleDateString();
        const iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;
        const tempC = (response.list[((i + 1) * 8) - 1].main.temp - 273.15).toFixed(2);
        const humidity = response.list[((i + 1) * 8) - 1].main.humidity;
        const windSpeed = (response.list[((i + 1) * 8) - 1].wind.speed * 3.6).toFixed(1);

        document.getElementById(`fDate${i}`).innerHTML = date;
        document.getElementById(`fImg${i}`).innerHTML = `<img src=${iconurl}>`;
        document.getElementById(`fTemp${i}`).innerHTML = `${tempC}&#8451;`;  // Display temperature in Celsius
        document.getElementById(`fHumidity${i}`).innerHTML = `${humidity}%`;
        document.getElementById(`fWind${i}`).innerHTML = `${windSpeed}KMH`;  // Display wind speed in KMH
      }
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
};

const addToList = (c) => {
  const listEl = document.createElement("li");
  listEl.innerHTML = c.toUpperCase();
  listEl.classList.add("list-group-item");
  listEl.setAttribute("data-value", c.toUpperCase());
  document.querySelector(".list-group").appendChild(listEl);
};

const invokePastSearch = (event) => {
  if (event.target.matches("li")) {
    city = event.target.textContent.trim();
    currentWeather(city);
  }
};

document.querySelector(".list-group").addEventListener("click", invokePastSearch);

const clearHistory = (event) => {
  event.preventDefault();
  sCity = [];
  localStorage.removeItem("cityname");
  document.querySelector(".list-group").innerHTML = "";
};

clearButton.addEventListener("click", clearHistory);

window.addEventListener("load", () => {
  sCity = JSON.parse(localStorage.getItem("cityname")) || [];
  sCity.forEach(city => {
    addToList(city);
  });
});






// Code written without arrow functions and using string concatenation. Tempetaure displaied in Fahrenheit and Wind in MPH.

// Declare variables
// let city = "";
// let sCity = [];

// const searchCity = document.getElementById("search-city");
// const searchButton = document.getElementById("search-button");
// const clearButton = document.getElementById("clear-history");
// const currentCity = document.getElementById("current-city");
// const currentTemperature = document.getElementById("temperature");
// const currentHumidity = document.getElementById("humidity");
// const currentWSpeed = document.getElementById("wind-speed");

// // API key
// const APIKey = "c32a31c6a7ffcbea5bdd726183442f5b";

// // Functions

// // Check if the city is already in the search history
// function findCityIndex(c) {
//   return sCity.findIndex(function(city) {
//     return city.toUpperCase() === c.toUpperCase();
//   });
// }

// // Display current weather
// function displayWeather(event) {
//   event.preventDefault();
//   const inputCity = searchCity.value.trim();
//   if (inputCity !== "") {
//     city = inputCity;
//     fetchCurrentWeather(city);
//   }
// }

// // Fetch current weather data
// function fetchCurrentWeather(city) {
//   const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
//   fetch(queryURL)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       if (data.cod === 200) {
//         displayCurrentWeather(data);
//         saveCityToLocalStorage(city);
//       } else {
//         alert("City not found!");
//       }
//     })
//     .catch(function(error) {
//       console.error("Error fetching current weather:", error);
//     });
// }

// // Display current weather data
// function displayCurrentWeather(data) {
//   const weathericon = data.weather[0].icon;
//   const iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
//   const date = new Date(data.dt * 1000).toLocaleDateString();
//   const tempF = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2);
//   const windsmph = (data.wind.speed * 2.237).toFixed(1);

//   currentCity.innerHTML = data.name + " (" + date + ") <img src='" + iconurl + "'>";
//   currentTemperature.innerHTML = tempF + " &#8457;";
//   currentHumidity.innerHTML = data.main.humidity + "%";
//   currentWSpeed.innerHTML = windsmph + " MPH";

//   forecast(data.id);
// }

// // Save city to local storage
// function saveCityToLocalStorage(city) {
//   if (findCityIndex(city) === -1) {
//     sCity.push(city.toUpperCase());
//     localStorage.setItem("cityname", JSON.stringify(sCity));
//     addToList(city);
//   }
// }

// // Fetch 5-day forecast
// function forecast(cityid) {
//   const queryforcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;
//   fetch(queryforcastURL)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       for (let i = 0; i < 5; i++) {
//         const date = new Date(data.list[((i + 1) * 8) - 1].dt * 1000).toLocaleDateString();
//         const iconcode = data.list[((i + 1) * 8) - 1].weather[0].icon;
//         const iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
//         const tempF = (((data.list[((i + 1) * 8) - 1].main.temp - 273.5) * 1.8) + 32).toFixed(2);
//         const humidity = data.list[((i + 1) * 8) - 1].main.humidity;
//         const windSpeed = data.list[((i + 1) * 8) - 1].wind.speed;

//         document.getElementById("fDate" + i).innerHTML = date;
//         document.getElementById("fImg" + i).innerHTML = "<img src='" + iconurl + "'>";
//         document.getElementById("fTemp" + i).innerHTML = tempF + " &#8457;";
//         document.getElementById("fHumidity" + i).innerHTML = humidity + "%";
//         document.getElementById("fWind" + i).innerHTML = windSpeed + " MPH";
//       }
//     })
//     .catch(function(error) {
//       console.error("Error fetching forecast:", error);
//     });
// }

// // Add city to search history
// function addToList(city) {
//   const listEl = document.createElement("li");
//   listEl.innerHTML = city.toUpperCase();
//   listEl.classList.add("list-group-item");
//   listEl.setAttribute("data-value", city.toUpperCase());
//   document.querySelector(".list-group").appendChild(listEl);
// }

// // Load search history from local storage
// function loadSearchHistory() {
//   sCity = JSON.parse(localStorage.getItem("cityname")) || [];
//   sCity.forEach(function(city) {
//     addToList(city);
//   });
// }

// // Event listeners
// searchButton.addEventListener("click", displayWeather);
// document.querySelector(".list-group").addEventListener("click", invokePastSearch);
// clearButton.addEventListener("click", clearHistory);
// window.addEventListener("load", loadSearchHistory);

// // Event handler for past search
// function invokePastSearch(event) {
//   const liEl = event.target;
//   if (liEl.matches("li")) {
//     city = liEl.textContent.trim();
//     fetchCurrentWeather(city);
//   }
// }

// // Clear search history
// function clearHistory(event) {
//   event.preventDefault();
//   sCity = [];
//   localStorage.removeItem("cityname");
//   document.querySelector(".list-group").innerHTML = "";
// }
































































