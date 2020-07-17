let button = document.querySelector("#button");
let searchBox = document.querySelector("#search-box");
let city = document.querySelector(".city");
let feelsLike = document.querySelector(".feels-like");
let temperature = document.querySelector(".temp");
let weatherDescription = document.querySelector(".weather");
let windSpeed = document.querySelector(".wind");
let icons = document.querySelector(".icons");
searchBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("button").click();
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchBox.value +
        "&units=metric&appid=4d6bdb6aba895a9ca3db4b8734af690f"
    )
      .then((response) => response.json())
      .then((data) => {
        const locationName = data.name;
        const temperatureData = data.main.temp;
        const feelsLikeData = data.main.feels_like;
        const weatherDescData = data.weather[0].main;
        const windData = data.wind.speed * 3.6;
        const weatherIcon = data.weather[0].icon;
        const humidex = data.main.humidity;
        const cloudCoverage = data.clouds.all;
        city.innerHTML = locationName + ", " + data.sys.country;
        temperature.innerHTML = Math.round(temperatureData) + "°C";
        feelsLike.innerHTML = "Feels like: " + Math.round(feelsLikeData) + "°C";
        weatherDescription.innerHTML = weatherDescData;
        windSpeed.innerHTML = "Wind: " + Math.round(windData) + "  km/h";
        icons.innerHTML = `<img src="${weatherIcon}.png"/>`;
        console.log(data);

        document.getElementById("weather-container").style.visibility =
          "visible";
        document.getElementById("background").style.overflow = "auto";

        document.getElementById("weather-container").onclick = function () {
          humidity(), clouds(), sunSetRise(), infoDots(), infoDots2();
        };

        function humidity() {
          if (
            feelsLike.innerHTML ===
            "Feels like: " + Math.round(feelsLikeData) + "°C"
          ) {
            feelsLike.innerHTML = `Humidex: ${humidex}%`;
          } else {
            feelsLike.innerHTML =
              "Feels like: " + Math.round(feelsLikeData) + "°C";
          }
        }

        function clouds() {
          if (weatherDescription.innerHTML === weatherDescData) {
            weatherDescription.innerHTML = `<div class="weather" style="font-size: 30px";>Cloud Coverage: ${cloudCoverage}%</div>`;
          } else {
            weatherDescription.innerHTML = weatherDescData;
          }
        }

        function sunSetRise() {
          if (
            windSpeed.innerHTML ===
            "Wind: " + Math.round(windData) + "  km/h"
          ) {
            windSpeed.innerHTML = `<div class="wind" style="font-size: 20px;">
          Sunrise: ${formattedTime}AM | Sunset: ${formattedTime2} PM</div>`;
          } else {
            windSpeed.textContent = "Wind: " + Math.round(windData) + "  km/h";
          }
        }

        function infoDots() {
          if (weatherDescription.innerHTML === weatherDescData) {
            document.getElementById("dot1").style.backgroundColor = "black";
          } else {
            document.getElementById("dot1").style.backgroundColor =
              "rgb(211, 211, 211)";
          }
        }

        function infoDots2() {
          if (weatherDescription.innerHTML === weatherDescData) {
            document.getElementById("dot2").style.backgroundColor =
              "rgb(211, 211, 211)";
          } else {
            document.getElementById("dot2").style.backgroundColor = "black";
          }
        }

        //converting unix to local sunrise time//
        const unixTime = data.sys.sunrise;
        const date = new Date(unixTime * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const formattedTime = hours + ":" + minutes.substr(-2);

        const unixTime2 = data.sys.sunset;
        const date2 = new Date(unixTime2 * 1000);
        const hours2 = date2.getHours() - 12;
        const minutes2 = "0" + date2.getMinutes();
        const formattedTime2 = hours2 + ":" + minutes2.substr(-2);
      });
  }
});
