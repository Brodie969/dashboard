/* How reminders will work:
Client uses a form to submit a date and title (for example 1/1/2000 and "New Millennium")
Javascript formats that properly then sends a POST
Python can take that raw data and place it in the file, in chronological order

There will also be a delete button next to every reminder/countdown to be handled by Javscript */

// I will refactor everything to countdown later (maybe)

// Change Title And Remove "Loading"
const formHead = document.getElementById("remindersFormStatic");
formHead.innerHTML = `<h2>Add A Reminder:</h2>`;

const head = document.getElementById("remindersStatic");
head.innerHTML = `<h2>Reminders:</h2>`;

// This is where the txt will be fetched and added to #reminders
function getReminders() {
    fetch("/fetch")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Get the text content of the file
    })
    .then(text => {
        // Do something with the text content, for example, display it in a <pre> element
        console.log(text);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


// Load Form
const formElement = document.getElementById("remindersForm");
formElement.innerHTML = `<form id="create"><label for="name">Name:</label><input type="text" id="name" required><br><br><label for="date">Date:</label><input type="date" id="date" required><br><br><button type="submit">Submit</button></form>`;

const form = document.getElementById("create");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from submitting normally
    const date = document.getElementById("date").value;
    const name = document.getElementById("name").value;
    alert("Working");
});

getReminders();
