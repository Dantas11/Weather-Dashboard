
var ApiKey = ("c32a31c6a7ffcbea5bdd726183442f5b");

var cityInput = document.getElementById("city-input");
var searchButton = document.getElementById("search-button");
var clearButton = document.getElementById("clear-button");
var LocalStorageList = document.getElementById("local-storage-list");

var currentCity = document.getElementById("current-city");
var currentTemperature = document.getElementById("temperature");
var currentWind = document.getElementById("wind");
var currentHumidity = document.getElementById("humidity");


// Add an event listener to the search button
searchButton.addEventListener("click", function () {
    var cityName = cityInput.value;
    // var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + ApiKey;
    var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}&units=metric`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentCity = data.name;
            var currentTemperature = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumidity = data.main.humidity;

            document.getElementById('current-city').textContent = currentCity;
            document.getElementById('temperature').textContent = currentTemperature;
            document.getElementById('wind').textContent = currentWind;
            document.getElementById('humidity').textContent = currentHumidity;

            // Local storage
            var searchHistory = localStorage.getItem('searchHistory');
            var search = searchHistory ? JSON.parse(searchHistory) : [];
            search.push(currentCity);
            localStorage.setItem('searchHistory', JSON.stringify(search));

            // Update the HTML with the saved searches
            var LocalStorageList = document.getElementById('local-storage-list');
            LocalStorageList.innerHTML = ''; 

            search.forEach(function (search) {
                var listItem = document.createElement('li');
                listItem.textContent = search;
                LocalStorageList.appendChild(listItem);
            });

            // Clear search list from local storage
            function clearLocalStorage() {
                localStorage.removeItem('searchHistory');
                location.reload(); 
              }
              
              // Add an event listener to the clear button
              var clearButton = document.getElementById("clear-button");
              clearButton.addEventListener('click', clearLocalStorage);
    
    })
})








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