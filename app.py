from flask import Flask, request, render_template, send_from_directory
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/data")
def fetch():
    return send_from_directory("data", "reminders.txt")

@app.route("/send", methods=["POST"])
def send():
    data = request.get_json()  # Assuming you send data as JSON
    if data:
        with open("data/reminders.txt", "a") as file:
            file.write(data + "\n")
        return "Data appended successfully"
    else:
        return "No data received"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
