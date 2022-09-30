let apiKey = "ed11d1043f1c6f1f2bbba5333d9da6cd";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
function startCity(response) {
  let city = "Kyiv";
  let cityStart = document.querySelector("#cityStart");
  cityStart.innerHTML = `${city}`;
  console.log(response);
}
axios.get(apiUrl).then(startCity);
