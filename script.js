// =========================================
// CITY SEARCH
// =========================================

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    // Check if input is empty
    if (city === "") {

        showError("Please enter a city name.");

        return;
    }

    // Clear previous error
    clearError();

    getCoordinates(city);
});


// =========================================
// GET CITY COORDINATES
// =========================================

async function getCoordinates(city) {

    try {

        const url =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

        const response = await fetch(url);


        // Check if API request failed
        if (!response.ok) {

            throw new Error("Geocoding API request failed.");

        }


        const data = await response.json();

        console.log(data);


        // Check if city was not found
        if (!data.results || data.results.length === 0) {

            showError(
                "City not found. Please check the spelling and try again."
            );

            return;
        }


        // Get latitude and longitude
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;


        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);


        // Update city name
        document.getElementById("cityName").textContent =
            "Weather for " + city;


        // Get weather
        getWeather(latitude, longitude);

    }

    catch (error) {

        console.error(error);

        showError(
            "Unable to find the city. Please check your internet connection and try again."
        );

    }
}


// =========================================
// GET WEATHER DATA
// =========================================

async function getWeather(latitude, longitude) {

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

        const response = await fetch(url);


        // Check if weather API request failed
        if (!response.ok) {

            throw new Error("Weather API request failed.");

        }


        const data = await response.json();

        console.log(data);


        // Get weather data
        const temperature =
            data.current.temperature_2m;

        const humidity =
            data.current.relative_humidity_2m;

        const windSpeed =
            data.current.wind_speed_10m;

        const weatherCode =
            data.current.weather_code;


        // =========================================
        // DISPLAY WEATHER DATA
        // =========================================

        document.getElementById("temperature").textContent =
            temperature + " °C";


        document.getElementById("humidity").textContent =
            humidity + " %";


        document.getElementById("windSpeed").textContent =
            windSpeed + " km/h";


        // =========================================
        // CHANGE WEATHER ICON
        // =========================================

        const weatherIcon =
            document.getElementById("weatherIcon");


        if (weatherCode === 0) {

            // Clear sky
            weatherIcon.textContent = "☀️";

        }

        else if (weatherCode === 1 || weatherCode === 2) {

            // Mainly clear / partly cloudy
            weatherIcon.textContent = "🌤️";

        }

        else if (weatherCode === 3) {

            // Overcast
            weatherIcon.textContent = "☁️";

        }

        else if (
            weatherCode === 45 ||
            weatherCode === 48
        ) {

            // Fog
            weatherIcon.textContent = "🌫️";

        }

        else if (
            weatherCode >= 51 &&
            weatherCode <= 67
        ) {

            // Drizzle / rain
            weatherIcon.textContent = "🌧️";

        }

        else if (
            weatherCode >= 71 &&
            weatherCode <= 77
        ) {

            // Snow
            weatherIcon.textContent = "❄️";

        }

        else if (
            weatherCode >= 80 &&
            weatherCode <= 82
        ) {

            // Rain showers
            weatherIcon.textContent = "🌦️";

        }

        else if (
            weatherCode >= 95 &&
            weatherCode <= 99
        ) {

            // Thunderstorm
            weatherIcon.textContent = "⛈️";

        }

        else {

            // Default
            weatherIcon.textContent = "🌤️";

        }


        // Weather loaded successfully
        clearError();

    }

    catch (error) {

        console.error(error);

        showError(
            "Unable to fetch weather data. Please try again."
        );

    }
}


// =========================================
// ERROR HANDLING
// =========================================

function showError(message) {

    const errorMessage =
        document.getElementById("errorMessage");

    errorMessage.textContent = message;

    errorMessage.style.display = "block";
}


function clearError() {

    const errorMessage =
        document.getElementById("errorMessage");

    errorMessage.textContent = "";

    errorMessage.style.display = "none";
}


// =========================================
// ABOUT APP
// =========================================

const aboutLink =
    document.getElementById("aboutLink");

const aboutModal =
    document.getElementById("aboutModal");

const closeAbout =
    document.getElementById("closeAbout");


// Open About popup

aboutLink.addEventListener("click", function (event) {

    event.preventDefault();

    aboutModal.classList.add("show");

});


// Close About popup

closeAbout.addEventListener("click", function () {

    aboutModal.classList.remove("show");

});


// Close when clicking outside the card

aboutModal.addEventListener("click", function (event) {

    if (event.target === aboutModal) {

        aboutModal.classList.remove("show");

    }

});