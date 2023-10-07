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
            const imgElement = document.getElementById("favicon");
            const faviconElement = document.getElementById("favi");
            imgElement.src = favicon;
            imgElement.alt = "Weather Icon";
            faviconElement.href = favicon

            const description = data.current.condition.text;
            const descriptionElement = document.createElement("p");
            descriptionElement.innerHTML = description;
            descriptionElement.classList.add("gridElement");
            weatherElement.appendChild(descriptionElement);

            const temp = data.current.temp_c;
            const tempFeelsLike = data.current.feelslike_c;
            const tempElement = document.createElement("p");
            tempElement.innerHTML = `Temperature: ${temp}°C<br>Feels Like: ${tempFeelsLike}°C`;
            tempElement.classList.add("gridElement");
            weatherElement.appendChild(tempElement);

            const wind = data.current.wind_kph;
            const windDir = data.current.wind_degree;
            const windGust = data.current.gust_kph;
            const windElement = document.createElement("p");
            windElement.innerHTML = `Wind Speed: ${wind}kph<br>Direction: ${windDir}°<br>Gusts: ${windGust}kph`;
            windElement.classList.add("gridElement");
            weatherElement.appendChild(windElement);

            const rain = data.current.precip_mm;
            const rainElement = document.createElement("p");
            rainElement.innerHTML = `Precipitaion: ${rain}mm`;
            rainElement.classList.add("gridElement");
            weatherElement.appendChild(rainElement);

            const cloud = data.current.cloud;
            const cloudElement = document.createElement("p");
            cloudElement.innerHTML = `Cloud Cover: ${cloud}%`;
            cloudElement.classList.add("gridElement");
            weatherElement.appendChild(cloudElement);

            const humid = data.current.humidity;
            const humidElement = document.createElement("p");
            humidElement.innerHTML = `Humidity: ${humid}%`;
            humidElement.classList.add("gridElement");
            weatherElement.appendChild(humidElement);

            const vis = data.current.vis_km;
            const visElement = document.createElement("p");
            visElement.innerHTML = `Visibility: ${vis}km`;
            visElement.classList.add("gridElement");
            weatherElement.appendChild(visElement);

            const uv = data.current.uv;
            const uvElement = document.createElement("p");
            uvElement.innerHTML = `UV Index: ${uv}`;
            uvElement.classList.add("gridElement");
            weatherElement.appendChild(uvElement);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}
