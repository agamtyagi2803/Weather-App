//in fetchweatherdata function we will fetch weather data from weather api
// in updateweatherui we will convert weather data into ui from console

const apikey = 'a6da68df95f2a25434f986bca10dc463';

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const windSpeedElement = document.querySelector(".wind-speed");
const humidityElement = document.querySelector(".humidity");
const visibilityElement = document.querySelector(".visibility-distance");
const descriptionTextElement = document.querySelector(".description-text");
const dateElement = document.querySelector(".date");
const descriptionIconElement = document.querySelector(".description i");

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    visibilityElement.textContent = `${data.visibility / 1000} Km`;
    descriptionTextElement.textContent = data.weather[0].description;
    
    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();
    
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIconElement.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help";
}
