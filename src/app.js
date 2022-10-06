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
function showForecast() {
  let forecastElem = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2"> 
      <div class="forecast-day">${day}</div>
      <img
                    src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
                    alt="cloudy"
                  
                    width="42"
                  />
      <div class="forecast-temp">
        <span class="forecast-temp-min"> 9°</span>
        <span class="forecast-temp-max">19°</span>
        </div>            
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElem.innerHTML = forecastHTML;
}

//let currentDate = `${day}, ${now.getHours()}:${minutes}`;

//date.innerHTML = currentDate;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  // console.log(startCondition1);
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
  showForecast();
}

axios.get(apiUrl).then(startCity);
let buttonSearch = document.querySelector("#search");
buttonSearch.addEventListener("click", showCity);

function currentPosition(position) {
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
