import { data } from "/static/config.js";

const key = data.key;
const city = data.location;

weather(city);

function weather(city) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            const weatherElement = document.getElementById("weather");

            const locationElement = document.getElementById("weatherTitle");
            locationElement.innerHTML = `Weather For ${city}:`;

            const favicon = data.current.condition.icon;
            const faviconElement = document.createElement("img");
            faviconElement.src = favicon;
            faviconElement.alt = "Weather Icon";
            weatherElement.appendChild(faviconElement);

            const description = data.current.condition.text;
            const descriptionElement = document.createElement("p");
            descriptionElement.innerHTML = description;
            weatherElement.appendChild(descriptionElement);

            const temp = data.current.temp_c;
            const tempFeelsLike = data.current.feelslike_c;
            const tempElement = document.createElement("p");
            tempElement.innerHTML = `Temperature: ${temp}°C<br>Feels Like: ${tempFeelsLike}°C`;
            weatherElement.appendChild(tempElement);

            const wind = data.current.wind_kph;
            const windDir = data.current.wind_degree;
            const windGust = data.current.gust_kph;
            const windElement = document.createElement("p");
            windElement.innerHTML = `Wind Speed: ${wind}kph<br>Direction: ${windDir}°<br>Gusts: ${windGust}kph`;
            weatherElement.appendChild(windElement);

            const rain = data.current.precip_mm;
            const rainElement = document.createElement("p");
            rainElement.innerHTML = `Precipitaion: ${rain}mm`;
            weatherElement.appendChild(rainElement);

            const cloud = data.current.cloud;
            const cloudElement = document.createElement("p");
            cloudElement.innerHTML = `Cloud Cover: ${cloud}%`;
            weatherElement.appendChild(cloudElement);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}
