// Map to store the scheduled reminders
let reminders = new Map();

// Function to schedule a pill reminder
function scheduleReminder() {
  // Get the user input
  let medicationName = document.getElementById("medicationName").value;
  let reminderDate = document.getElementById("reminderDate").value;
  let reminderTime = document.getElementById("reminderTime").value;

  // Combine the date and time into a single string
  let reminderDateTime = reminderDate + " " + reminderTime;

  // Add the reminder to the map
  reminders.set(reminderDateTime, {
    medicationName: medicationName,
    completed: false
  });

  // Display the reminder in the list
  let reminderList = document.getElementById("reminders");
  let reminderItem = document.createElement("li");
  reminderItem.innerHTML = "Medication: " + medicationName + ", Reminder Time: " + reminderDateTime;
  reminderList.appendChild(reminderItem);

  // Schedule the reminder alert
  let currentTime = new Date().getTime();
  let reminderTimeMs = new Date(reminderDateTime).getTime();
  let delay = reminderTimeMs - currentTime;

  if (delay > 0) {
    setTimeout(function() {
      showAlert("Reminder: It's time to take " + medicationName);
    }, delay);
  }
}

// Function to display the alert box
function showAlert(message) {
  let alertBox = document.getElementById("alertBox");
  let alertMessage = document.getElementById("alertMessage");

  // Set the alert message
  alertMessage.innerText = message;

  // Display the alert box
  alertBox.style.display = "block";
}

// Function to close the alert box and remove the completed reminder
function closeAlert() {
  let alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none";

  // Remove the completed reminders from the map and DOM
  reminders.forEach(function (reminder, reminderDateTime) {
    if (reminder.completed) {
      reminders.delete(reminderDateTime);
      let reminderList = document.getElementById("reminders");
      let reminderItem = reminderList.querySelector(`[data-reminder="${reminderDateTime}"]`);
      reminderList.removeChild(reminderItem);
    }
  });
}

// Function to display the "We are coming to get you" message
function displayEmergencyMessage() {
  showAlert("Ambulance is on the way...");
}

// Event listener for the "Add Reminder" button
let addReminderButton = document.getElementById("addReminderButton");
addReminderButton.addEventListener("click", scheduleReminder);

// Event listener for the "Emergency Contacts" button
let emergencyContactsButton = document.getElementById("emergencyContactsButton");
emergencyContactsButton.addEventListener("click", displayEmergencyMessage);

// Event listener for dynamically created "Mark as Completed" buttons
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("markCompletedButton")) {
    let reminderDateTime = event.target.dataset.reminder;
    markReminderCompleted(reminderDateTime);
  }
});

// Function to mark a reminder as completed and change its color to green
function markReminderCompleted(reminderDateTime) {
  if (reminders.has(reminderDateTime)) {
    let reminder = reminders.get(reminderDateTime);
    reminder.completed = true;

    let reminderList = document.getElementById("reminders");
    let reminderItem = reminderList.querySelector(`[data-reminder="${reminderDateTime}"]`);
    reminderItem.classList.add("completed");
  }
}
