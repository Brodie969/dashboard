from flask import Flask, request, render_template, send_from_directory
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/data")
def fetch():
    return send_from_directory("data", "reminders.txt")

@app.route("/update", methods=["POST"])
def update():
    data = request.get_json()  # Assuming you send data as JSON
    if data:
        with open("data/reminders.txt", "a") as file:
            file.write(data + "\n")
        return "Data appended successfully"
    else:
        return "No data received"

@app.route("/delete", methods=["POST"])
def delete():
    data = request.get_json()
    print(data)
    index = data.get('index')
    if index:
        index = int(index)
        print(index)
        lines = []
        with open("data/reminders.txt", "r") as file:
            lines = file.readlines()
        if len(lines) >= index:
            del lines[index - 1]
            with open("data/reminders.txt", "w") as file:
                file.writelines(lines)
            return "File Updated Sucessfully"
        else:
            return "File Was Not Updated"
    else:
        return "Invalid Input"
        

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
