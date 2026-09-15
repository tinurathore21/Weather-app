const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    // Check if the input is empty

    if (city === "") {

        showError("Please enter a city name.");

        return;
    }

    // Clear any previous error

    clearError();

    getCoordinates(city);
});


async function getCoordinates(city) {

    try {

        const url =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

        const response = await fetch(url);


        // Check if the API request failed

        if (!response.ok) {

            throw new Error("Geocoding API request failed.");

        }


        const data = await response.json();

        console.log(data);


        // Check if no city was found

        if (!data.results || data.results.length === 0) {

            showError("City not found. Please check the spelling and try again.");

            return;

        }


        const latitude = data.results[0].latitude;

        const longitude = data.results[0].longitude;


        console.log("Latitude:", latitude);

        console.log("Longitude:", longitude);


        document.getElementById("cityName").textContent =
            "Weather for " + city;


        getWeather(latitude, longitude);

    }

    catch (error) {

        console.error(error);

        showError("Unable to find the city. Please check your internet connection and try again.");

    }
}


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


        // Display temperature

        document.getElementById("temperature").textContent =
            temperature + " °C";


        // Display humidity

        document.getElementById("humidity").textContent =
            humidity + " %";


        // Display wind speed

        document.getElementById("windSpeed").textContent =
            windSpeed + " km/h";


        // Clear previous error

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
// ABOUT APP
// =========================================

const aboutLink = document.getElementById("aboutLink");

const aboutModal = document.getElementById("aboutModal");

const closeAbout = document.getElementById("closeAbout");


// Open About popup

aboutLink.addEventListener("click", function(event) {

    event.preventDefault();

    aboutModal.classList.add("show");

});


// Close About popup

closeAbout.addEventListener("click", function() {

    aboutModal.classList.remove("show");

});


// Close when clicking outside the card

aboutModal.addEventListener("click", function(event) {

    if (event.target === aboutModal) {

        aboutModal.classList.remove("show");

    }

});

function clearError() {

    const errorMessage =
        document.getElementById("errorMessage");

    errorMessage.textContent = "";

    errorMessage.style.display = "none";
}

function showError(message) {

    const errorMessage =
        document.getElementById("errorMessage");

    errorMessage.textContent = message;

    errorMessage.style.display = "block";
}