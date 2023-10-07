const formHead = document.getElementById("remindersTitle");
formHead.textContent = "Add A Reminder:";
const formHead2 = document.getElementById("remindersTitle2");
formHead2.textContent = "Select A Reminder To Delete:";
const head = document.getElementById("remindersStatic");
head.innerHTML = "Reminders:";

const reminderArray = [];

function getReminders() {
    fetch("/data")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(text => {
            const lines = text.split("\n");
            const parent = document.getElementById("reminders");
            parent.innerHTML = "";
            reminderArray.length = 0; // Clear Array

            lines.forEach(line => {
                const [title, date] = line.split(",");

                const div = document.createElement("div");
                const reminder = `${title.trim()} on ${date.trim()}`;
                div.textContent = reminder;
                parent.appendChild(div);

                reminderArray.push(reminder);
            });
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}

function formatDate(inputDate) {
    const dateNumbers = inputDate.split('-');
    if (dateNumbers.length === 3) {
      const year = dateNumbers[0];
      const month = dateNumbers[1];
      const day = dateNumbers[2];
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
}  

function clearForm() {
    let form = document.getElementById("create");
    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        field.value = "";
    }
}

// Load Form
const addFormElement = document.getElementById("remindersAdd");
addFormElement.innerHTML = `<form id="create"><label for="name">Name:</label><input type="text" id="name" required><br><br><label for="date">Date:</label><input type="date" id="date" required><br><br><button type="submit">Submit</button></form>`;
const delFormElement = document.getElementById("remindersDel");
delFormElement.innerHTML = `<form id="del"><label for="index">Select A Reminder To Delete:</label><input type="number" id="index" name="index" min="1" max="100"><p id="selected">Selected Reminder: None</p><button type="submit">Delete</button></form>`

const form = document.getElementById("create");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from submitting normally
    let date = document.getElementById("date").value;
    let name = document.getElementById("name").value;
    date = formatDate(date);
    let reminder = `${name},${date}`;

    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reminder),
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); // Logging the response from Flask
        alert("Working! " + result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    getReminders();
    clearForm();
});

const output = document.getElementById("selected");
const del = document.getElementById('index');
del.addEventListener('input', function(event) {
    const value = event.target.value;
    const child = reminderArray[value - 1];
    output.textContent = `Selected Reminder: ${child}`;
    console.log('Field value changed to:', value);
});

getReminders();
