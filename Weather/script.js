let cityInput = document.querySelector(".city-input");
let searchBtn = document.querySelector(".search-btn");
let tempImg = document.querySelector(".temp-info img")
let temp = document.querySelector(".temperature span");
let weather = document.querySelector(".temperature div");
let locationPlace = document.querySelector(".location p");
let humidityLvl = document.querySelector(".humidity-lvl");
let windSpeed = document.querySelector(".wind-speed");
let date = document.querySelector(".date");
let img = document.querySelector(".container img");
let error = document.querySelector(".container h1");
let errorMsg = document.querySelector(".container h3");
let defaultScreen = document.querySelector(".default");

cityInput.addEventListener("keydown", (event) => {
  let cityName = cityInput.value.trim();
  if (event.key === "Enter" && cityName !== "") {
    console.log(cityName);
    getWeather(cityName);
    cityInput.value = "";
    locationPlace.innerHTML = cityName;  
  }
});

searchBtn.addEventListener("click", () => {
  let cityName = cityInput.value.trim();
  if(cityName !== ""){
    cityInput.value = "";
    getWeather(cityName);
    locationPlace.innerHTML = cityName;
  }
});

async function getWeather(city) {
  const apiKey = "a2ae651863ede24faef840f4287bc406";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  let data = await response.json();

  console.log(data);
  if (data.cod == 404) {
    img.src = "not-found.png";
    error.innerHTML = "Not Found";
    errorMsg.innerHTML = "City is not found, Try valid city";
    defaultScreen.style.display = "block"
  }else if (data.weather[0].id <= 232) {
    tempImg.src = "thunderstorm.svg";
    temp.innerHTML = data.main.temp;
    weather.innerHTML = "Thunderstorm";
  }
  else if (data.weather[0].id <= 321) {
    tempImg.src = "drizzle.svg";
    temp.innerHTML = data.main.temp;
    weather.innerHTML = "Drizzle"
  }else if (data.weather[0].id <= 531) {
    tempImg.src = "rain.svg";
    temp.innerHTML = data.main.temp;
    weather.innerHTML = "Rain"
  }
  else if (data.weather[0].id <= 622) {
    tempImg.src = "snow.svg";
    temp.innerHTML = data.main.temp;
    weather.innerHTML = "Snow"
  }
  else if (data.weather[0].id <= 781) {
    tempImg.src = "atmosphere.svg";
    temp.innerHTML = data.main.temp;
    weather.innerHTML = "Haze"
  }
  else if (data.weather[0].id <= 800) {
    tempImg.src = "clear.svg";
    temp.innerHTML = data.main.temp;
    weather.innerHTML = "Clear"
  }else{
    tempImg.src = "clouds.svg";
    temp.innerHTML = data.main.temp;
    weather.innerHTML = "Clouds"
  }
  if (data.cod != 404) {
    humidityLvl.innerHTML = data.main.humidity;
    windSpeed.innerHTML = data.wind.speed;
    defaultScreen.style.display = "none";
  }
}
function getStrictFormattedDate() {
  const now = new Date();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  return `${weekday}, ${day} ${month}`;
}
date.innerHTML = getStrictFormattedDate();