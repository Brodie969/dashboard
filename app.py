from flask import Flask, request, render_template, send_from_directory
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
