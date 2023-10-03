from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

# @app.route('/user/<name>')
# def user(name):
#   return render_template('user.html', name=name)

@app.route("/countdowns")
def countdown():
    return render_template("countdown.html")

@app.route("/todo")
def todo():
    # Get items from text file on server and add them to template variables
    return render_template("todo.html")
