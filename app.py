from flask import Flask, render_template, request, redirect, url_for
import requests
import json
app = Flask(__name__)

# Add return error.html in place of print statements

@app.route("/")
def index():
    return render_template(search.html)

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
        print("File not found")
    except json.JSONDecodeError:
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
        return render_template("error.html", code=response.status_code), 500
    
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
        print("File not found")
    except json.JSONDecodeError:
        print("Error decoding JSON data from the file.")

    url = f"http://api.weatherapi.com/v1/search.json?key={key}&q={query}"
    response = requests.get(url)

    if response.status_code == 200:
        search_data = response.json()

        results_number = 0
        
        # Nest this somehow with return statements
        one = search_data["0"]
        if one:
            city_one = one["name"]
            region_one = one["region"]
            country_one = one["country"]
            url_one = one["url"]
            results_number += 1

        two = search_data["1"]
        if two:
            city_two = two["name"]
            region_two = two["region"]
            country_two = two["country"]
            url_two = two["url"]
            results_number += 1

        three = search_data["2"]
        if three:
            city_three = three["name"]
            region_three = three["region"]
            country_three = three["country"]
            url_three = three["url"]
            url_three = three["url"]
            results_number += 1

        four = search_data["3"]
        if four:
            city_four = four["name"]
            region_four = four["region"]
            country_four = four["country"]
            url_four = four["url"]
            results_number += 1

        five = search_data["4"]
        if five:
            city_five = five["name"]
            region_five = five["region"]
            country_five = five["country"]
            url_five = five["url"]
            results_number += 1
        
        return render_template()

    else:
        print("Error Fetching Search Data")
        return render_template("error.html", code=response.status_code), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
