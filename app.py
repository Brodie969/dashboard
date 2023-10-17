from flask import Flask, render_template
import requests
app = Flask(__name__)

@app.route("/")
def index():
    # access local JSON here

    # Needs the key to test ^
    url = f"http://api.weatherapi.com/v1/current.json?key={key}&q={city}"

    response = requests.get(url)

    if response.status_code == 200:
        weather_data = response.json()
        
        # Extract values from the JSON
        location = weather_data["location"]
        current = weather_data["current"]
        condition = current["condition"]
        
        favicon = condition["icon"]
        city = location["name"]
        description = condition["text"]
        temp = current["temp_c"]
        tempFeelsLike = current["feelslike_c"]
        wind = current["wind_kph"]
        windDir = current["wind_degree"]
        windGust = current["gust_kph"]
        rain = current["precip_mm"]
        cloud = current["cloud"]
        humid = current["humidity"]
        vis = current["vis_km"]
        uv = current["uv"]
        return render_template("home.html", description=description)

    else:
        print("Error Fetching Weather Data")
        return render_template("error.html", code=response.status_code), 500
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
