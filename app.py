from flask import Flask, render_template, request, redirect, url_for
import requests
import json
app = Flask(__name__)

# Add return error.html in place of print statements

@app.route("/")
def index():
    return render_template("search.html")

@app.route("/weather")
def weather():
    key = ""
    city = request.args.get("city")
    if not city:
        return redirect(url_for("index"))
    try:
        with open("static/config.json", 'r') as file:
            data = json.load(file)
            key = data["key"]   
    except FileNotFoundError:
        return render_template("error.html", error="<pre><code>config.json</code></pre> Was Not Found", code=response.status_code), 500
        print("File not found")
    except json.JSONDecodeError:
        return render_template("error.html", error="Error Decoding <pre><code>config.json</code></pre>", code=response.status_code), 500
        print("Error decoding JSON data from the file.")

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
        temp_feels_like = current["feelslike_c"]
        wind = current["wind_kph"]
        wind_degree = current["wind_degree"]
        wind_gust = current["gust_kph"]
        rain = current["precip_mm"]
        cloud = current["cloud"]
        humid = current["humidity"]
        vis = current["vis_km"]
        uv = current["uv"]
        return render_template("weather.html", favicon=favicon, 
                                            city=city, 
                                            description=description, 
                                            temp=temp, 
                                            tempFeelsLike=temp_feels_like, 
                                            wind=wind, 
                                            wind_degree=wind_degree, 
                                            wind_gust=wind_gust, 
                                            rain=rain, 
                                            cloud=cloud, 
                                            humid=humid, 
                                            vis=vis, 
                                            uv=uv)

    else:
        print("Error Fetching Weather Data")
        return render_template("error.html", error="Error Fetching Weather Data", code=response.status_code), 500
    
@app.route("/search")
def search():
    query = request.args.get("search")
    key = ""
    if not query:
        return redirect(url_for("index"))
    try:
        with open("static/config.json", 'r') as file:
            data = json.load(file)
            key = data["key"]   
    except FileNotFoundError:
        return render_template("error.html", error="<pre><code>config.json</code></pre> Was Not Found", code=response.status_code), 500
        print("File not found")
    except json.JSONDecodeError:
        return render_template("error.html", error="Error Decoding <pre><code>config.json</code></pre>", code=response.status_code), 500
        print("Error decoding JSON data from the file.")

    url = f"http://api.weatherapi.com/v1/search.json?key={key}&q={query}"
    response = requests.get(url)

    if response.status_code == 200:
        search_data = response.json()

        cities = []
        regions = []
        countries = []
        urls = []

        for i in range(len(search_data)):
            current_result = search_data[i]
            cities.append(current_result["name"])
            regions.append(current_result["region"])
            countries.append(current_result["country"])
            urls.append(current_result["url"])

        return f"{cities}<br>{regions}<br>{countries}<br>{urls}"

    else:
        print("Error Fetching Search Data")
        return render_template("error.html", error="An Error Occured", code=response.status_code), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
