
const ApiKey = ("c32a31c6a7ffcbea5bdd726183442f5b");

const searchButton = document.getElementById("search-button");
const placeInput = document.getElementById("place-input");

searchButton.addEventListener("click", function () {
    var placeName = placeInput.value;
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + placeName + "&appid=" + ApiKey;
    // var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    })
})
























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