let apiKey = "ed11d1043f1c6f1f2bbba5333d9da6cd";
let city = "Kyiv";
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let minutes = `${now.getMinutes()}`.padStart(2, 0);
let currentDate = `${day}, ${now.getHours()}:${minutes}`;
let date = document.querySelector("#date");
date.innerHTML = currentDate;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

function startCity(response) {
  let city = "Kyiv";
  let cityStart = document.querySelector("#cityStart");
  cityStart.innerHTML = `${city}`;
  console.log(response);
  let tempElement = document.querySelector("#startTemp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let conditionNow = response.data.weather[0].main;
  let startCondition1 = document.querySelector("#condition1");
  let startCondition2 = document.querySelector("#condition2");
  console.log(startCondition1);
  let conditionNow2 = conditionNow.toLowerCase();
  startCondition1.innerHTML = `${conditionNow}`;
  startCondition2.innerHTML = `${conditionNow2}`;
  let windStart = response.data.wind.speed;
  let speed = document.querySelector("#wind");
  speed.innerHTML = `${windStart} `;
  let humStart = response.data.main.humidity;
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `${humStart}`;
}
axios.get(apiUrl).then(startCity);
