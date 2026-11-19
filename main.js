var table = document.getElementById("taskList");
var resetTime = document.getElementById("resetTime");
var date = new Date();
var selectedTime = resetTime.value;
var currentTime = date.toTimeString().slice(0, 5);
console.log("Selected Time: " + selectedTime);

resetTime.addEventListener("change", function () {
  selectedTime = resetTime.value;

  console.log("Selected Time: " + selectedTime);
  console.log("Current Time: " + currentTime);

  selectedTime === currentTime
    ? console.log("equal")
    : console.log("not equal");
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("tasks")) {
    table.innerHTML = localStorage.getItem("tasks");
  }
});

function addTask() {
  // Table elements
  var tr = document.createElement("tr");
  tr.classList.add("task-row");

  // Inputs
  var taskName = document.getElementById("taskName").value;
  var taskHours = document.getElementById("taskHours").value;
  var taskDescription = document.getElementById("taskDescription").value;

  tr.innerHTML = `
        <td><input class="form-check-input" type="checkbox" name="" id="task"></td>
        <td>${taskName}</td>
        <td>${taskHours}</td>
        <td>${taskDescription}</td>
        <td><button class="btn btn-danger" onclick="removeTask(event)">Remove</button></td>
    `;
  table.appendChild(tr);

  notifyTask(taskHours, taskName);

  // Clear the input fields
  document.getElementById("taskName").value = "";
  document.getElementById("taskHours").value = "";
  document.getElementById("taskDescription").value = "";

  localStorage.setItem("tasks", table.innerHTML);
}

function removeTask(e) {
  var tr = e.target.closest("tbody");
  table.removeChild(tr);

  localStorage.setItem("tasks", table.innerHTML);
}

function resetTasks() {
  var taskRows = document.querySelectorAll(".task-row");

  taskRows.forEach(function (row) {
    table.removeChild(row);
  });

  const noti = new Notification("Tasks have been reset!");

  localStorage.removeItem("tasks");
}

document.getElementById("notifyButton").addEventListener("click", notifyMe);

function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Notifications active!");
    document.getElementById("notifyButton").disabled = true;
    document.getElementById("notifyButton").innerText = "Notifications Active";
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Notifications active!");
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
notifyMe();

function notifyTask(taskHours, taskName) {
  if (Notification.permission !== "granted") return;

  const now = new Date();

  // taskHours is in the format "HH:MM", we need to convert it to a Date object to calculate the delay
  const [hours, minutes] = taskHours.split(":").map(Number);
  const taskTime = new Date();
  taskTime.setHours(hours, minutes, 0, 0);
  const delay = taskTime - now; // Convert hours to milliseconds and subtract current time in milliseconds
  console.log("Delay: " + delay);

  if (delay > 0) {
    setTimeout(() => {
      new Notification("Task Reminder", {
        body: `You have a task scheduled for now: ${taskName}`,
      });
    }, delay);
  }
}

// keep track of document time changes and update currentTime variable
setInterval(function () {
  date = new Date();
  currentTime = date.toTimeString().slice(0, 5);

  console.log("Current Time: " + currentTime);

  if (selectedTime === currentTime) {
    resetTasks();
  }

  // notifyTask(currentTime);
}, 1000);
