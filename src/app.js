let apiKey = "ed11d1043f1c6f1f2bbba5333d9da6cd";
let city = "Kyiv";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function showForecast(response) {
  //console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElem = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      tempCMax = forecastDay.temp.max;
      //console.log(tempCMax);
      tempCMin = forecastDay.temp.min;
      //console.log(tempCMin);
      forecastHTML =
        forecastHTML +
        `<div class="col-2"> 
      <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
      <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="cloudy"
                  
                    width="42"
                  />
      <div class="forecast-temp">
        <span class="forecast-temp-min"> <span id="tempMin">${Math.round(
          tempCMin
        )}</span>°</span>
        <span class="forecast-temp-max"><span id="tempMax">${Math.round(
          tempCMax
        )}</span>°</span>
        </div>            
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElem.innerHTML = forecastHTML;
}

function forecastCoordKyiv(coordinates) {
  //console.log(coordinates);
  let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  // console.log(apiUrl);
}
function forecastCoord(coordinates) {
  //console.log(coordinates);
  let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  //console.log(apiUrl);
}
function forecastCoordCurr(coordinates) {
  //console.log(coordinates);
  let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  //console.log(apiUrl);
}

//let currentDate = `${day}, ${now.getHours()}:${minutes}`;

//date.innerHTML = currentDate;

//console.log(apiUrl);
function showTemp(response) {
  let tempElement = document.querySelector("#startTemp");
  let conditionNow1 = response.data.weather[0].main;
  let conditionNow2 = response.data.weather[0].description;
  let startCondition1 = document.querySelector("#condition1");
  let startCondition2 = document.querySelector("#condition2");
  let windStart = response.data.wind.speed;
  let speed = document.querySelector("#wind");
  let humStart = response.data.main.humidity;
  let hum = document.querySelector("#humidity");
  let icon = document.querySelector("#icon");
  //console.log(response);
  let dateStart = document.querySelector("#date");
  tempC = response.data.main.temp;
  tempElement.innerHTML = Math.round(tempC);
  startCondition1.innerHTML = `${conditionNow1}`;
  startCondition2.innerHTML = `${conditionNow2}`;
  speed.innerHTML = `${windStart} `;
  hum.innerHTML = `${humStart}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
  dateStart.innerHTML = formatDate(response.data.dt * 1000);
  //console.log(formatDate(response.data.dt * 1000));
  //console.log(response.data.coord);
  forecastCoord(response.data.coord);
}
function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#inputCity");
  let city = document.querySelector("#cityStart");
  if (newCity.value) {
    city.innerHTML = newCity.value;
  }

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function formatDate(timestemp) {
  let now = new Date(timestemp);
  let day = days[now.getDay()];
  let minutes = `${now.getMinutes()}`.padStart(2, 0);
  return `${day}, ${now.getHours()}:${minutes}`;
}
//function search(city) {
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//axios.get(apiUrl).then(displayTemperature);
//}
function startCity(response) {
  let cityStart = document.querySelector("#cityStart");

  //console.log(response);
  let tempElement = document.querySelector("#startTemp");
  let conditionNow1 = response.data.weather[0].main;
  let conditionNow2 = response.data.weather[0].description;
  let startCondition1 = document.querySelector("#condition1");
  let startCondition2 = document.querySelector("#condition2");
  let windStart = response.data.wind.speed;
  let speed = document.querySelector("#wind");
  let humStart = response.data.main.humidity;
  let hum = document.querySelector("#humidity");
  let icon = document.querySelector("#icon");
  let dateStart = document.querySelector("#date");
  tempC = response.data.main.temp;
  //let conditionNow2 = conditionNow.toLowerCase();
  cityStart.innerHTML = `${city}`;
  tempElement.innerHTML = Math.round(tempC);
  startCondition1.innerHTML = `${conditionNow1}`;
  startCondition2.innerHTML = `${conditionNow2}`;
  speed.innerHTML = `${windStart} `;
  hum.innerHTML = `${humStart}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
  dateStart.innerHTML = formatDate(response.data.dt * 1000);
  forecastCoordKyiv(response.data.coord);
  //showForecast();
}
function startLink() {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(startCity);
}

let buttonSearch = document.querySelector("#search");
buttonSearch.addEventListener("click", showCity);

function currentPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  //console.log("currentPosition");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url2).then(function (response) {
    let geoCity = response.data.name;
    //console.log(url2);
    //console.log(response);
    let tempElement = document.querySelector("#startTemp");
    let conditionNow1 = response.data.weather[0].main;
    let conditionNow2 = response.data.weather[0].description;
    let startCondition1 = document.querySelector("#condition1");
    let startCondition2 = document.querySelector("#condition2");
    let windStart = response.data.wind.speed;
    let speed = document.querySelector("#wind");
    let humStart = response.data.main.humidity;
    let hum = document.querySelector("#humidity");
    let icon = document.querySelector("#icon");
    let dateStart = document.querySelector("#date");

    tempC = response.data.main.temp;

    cityStart.innerHTML = `${response.data.name} <i class="fa-solid fa-location-dot"></i>`;
    tempElement.innerHTML = Math.round(tempC);
    startCondition1.innerHTML = `${conditionNow1}`;
    startCondition2.innerHTML = `${conditionNow2}`;
    speed.innerHTML = `${windStart} `;
    hum.innerHTML = `${humStart}`;
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", `${response.data.weather[0].description}`);
    dateStart.innerHTML = formatDate(response.data.dt * 1000);
    forecastCoordCurr(response.data.coord);
  });
}
function geoLoc() {
  //console.log("geoLoc");
  navigator.geolocation.getCurrentPosition(currentPosition);
}
function start(event) {
  event.preventDefault();
  //console.log("start");
  geoLoc();
}

let buttonCurrent = document.querySelector("#current");
//console.log(buttonCurrent);
buttonCurrent.addEventListener("click", start);

function showFahrenTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#startTemp");
  celLink.classList.remove("active");
  fahrenlink.classList.add("active");
  let tempF = (tempC * 9) / 5 + 32;
  //let tempFMin = (tempCMin * 9) / 5 + 32;
  //let tempFMax = (tempCMax * 9) / 5 + 32;
  temp.innerHTML = Math.round(tempF);
}
function showCelTemp(event) {
  event.preventDefault();
  celLink.classList.add("active");
  fahrenlink.classList.remove("active");
  let temp = document.querySelector("#startTemp");
  temp.innerHTML = Math.round(tempC);
}
let tempC = null;

let fahrenlink = document.querySelector("#fahren-link");
fahrenlink.addEventListener("click", showFahrenTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);
startLink();
