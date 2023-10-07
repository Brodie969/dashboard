from flask import Flask, render_template, send_from_directory
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/data")
def fetch():
    return send_from_directory("data", "reminders.txt")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
