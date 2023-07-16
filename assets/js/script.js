// Declare a variable to store the searched city
let city = "";

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
      // Parse the response to display the current temperature and convert the temp to Fahrenheit.
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

// Here we display the 5-day forecast for the current city.
function forecast(cityid) {
    const dayover = false;
    const queryforcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;
    fetch(queryforcastURL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then(function (response) {
        for (i = 0; i < 5; i++) {
          const date = new Date(response.list[((i + 1) * 8) - 1].dt * 1000).toLocaleDateString();
          const iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
          const iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
          const tempK = response.list[((i + 1) * 8) - 1].main.temp;
          const tempF = (((tempK - 273.5) * 1.8) + 32).toFixed(2);
          const humidity = response.list[((i + 1) * 8) - 1].main.humidity;
          const windSpeed = response.list[((i + 1) * 8) - 1].wind.speed;
  
          document.getElementById("fDate" + i).innerHTML = date;
          document.getElementById("fImg" + i).innerHTML = "<img src=" + iconurl + ">";
          document.getElementById("fTemp" + i).innerHTML = tempF + "&#8457;";
          document.getElementById("fHumidity" + i).innerHTML = humidity + "%";
          document.getElementById("fWind" + i).innerHTML = windSpeed + "MPH";
        }
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
}

// Dynamically add the passed city to the search history
function addToList(c) {
    const listEl = document.createElement("li");
    listEl.innerHTML = c.toUpperCase();
    listEl.classList.add("list-group-item");
    listEl.setAttribute("data-value", c.toUpperCase());
    document.querySelector(".list-group").appendChild(listEl);
}
  
// Display the past search again when the list group item is clicked in search history
function invokePastSearch(event) {
    const liEl = event.target;
    if (event.target.matches("li")) {
      city = liEl.textContent.trim();
      currentWeather(city);
    }
}

// Add event listener to the list group
document.querySelector(".list-group").addEventListener("click", invokePastSearch);

// Clear the search history from local storage and the saved list
function clearHistory(event) {
  event.preventDefault();
  sCity = [];
  localStorage.removeItem("cityname");
  document.querySelector(".list-group").innerHTML = "";
}

// Event listener for clear button click
clearButton.addEventListener("click", clearHistory);
  
// Load the saved list from local storage when the page loads
window.addEventListener("load", function () {
    sCity = JSON.parse(localStorage.getItem("cityname"));
    if (sCity !== null) {
      sCity.forEach(function (city) {
        addToList(city);
        })
    }
})
































































