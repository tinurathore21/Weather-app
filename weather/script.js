const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = cityInput.value;

    getCoordinates(city);
});


async function getCoordinates(city) {

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    document.getElementById("cityName").textContent =
        "Weather for " + city;

    getWeather(latitude, longitude);
}


async function getWeather(latitude, longitude) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    const temperature = data.current.temperature_2m;
    const humidity = data.current.relative_humidity_2m;
    const windSpeed = data.current.wind_speed_10m;

    document.getElementById("temperature").textContent =
        temperature + " °C";

    document.getElementById("humidity").textContent =
        humidity + " %";

    document.getElementById("windSpeed").textContent =
        windSpeed + " km/h";
}