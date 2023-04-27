const body = document.body;
const cityElement = document.querySelector(".city");
const iconElement = document.querySelector(".icon");
const descriptionElement = document.querySelector(".description");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");

const weather = {
  apiKey: "f08ef52774610be8ad67a880ef43b4c9",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  addBackground: function (className) {
    removeAllBackgrounds();
    body.classList.add(className);
  },

  decideBackground: function (description) {
    description = description.toLowerCase();

    if (description.includes("rain")) {
      this.addBackground("rain-background");
    } else if (description.includes("clouds")) {
      this.addBackground("clouds-background");
    } else if (description.includes("snow")) {
      this.addBackground("snow-background");
    } else if (description.includes("thunderstorm")) {
      this.addBackground("thunder-background");
    } else {
      this.addBackground("base-background");
    }
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    cityElement.innerText = "Weather in " + name;
    iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    descriptionElement.innerText = description;
    tempElement.innerText = temp.toFixed(1) + "°C";
    humidityElement.innerText = "Humidity: " + humidity + "%";
    windElement.innerText = "Wind speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");
    this.decideBackground(description);
  },

  search: function () {
    this.fetchWeather(searchBar.value);
  },
};

searchButton.addEventListener("click", function () {
  weather.search();
});

searchBar.addEventListener("keyup", function (e) {
  if (e.key == "Enter") weather.search();
});

weather.fetchWeather("Bucharest");

const removeAllBackgrounds = function () {
  body.classList.remove(
    "rain-background",
    "clouds-background",
    "snow-background",
    "thunder-background",
    "base-background"
  );
};
