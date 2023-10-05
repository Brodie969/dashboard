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
            locationElement.textContent = `Weather For ${city}:`;

            const favicon = data.current.condition.icon;
            const faviconElement = document.createElement("p"); // Because I don't know how to set src and stuff yet
            faviconElement.innerHTML = `<img src="${favicon}" alt="Weather Icon"></img>`;
            weatherElement.appendChild(faviconElement);

            const description = data.current.condition.text;
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = description;
            weatherElement.appendChild(descriptionElement);

            const temp = data.current.temp_c;
            const tempElement = document.createElement("p");
            tempElement.textContent = `Temperature: ${temp}°C`;
            weatherElement.appendChild(tempElement);

            const wind = data.current.wind_kph;

        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}
