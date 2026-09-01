var table = document.getElementById("taskList");
var resetTime = document.getElementById("resetTime");
var date = new Date();
var selectedTime = resetTime.value;
var currentTime = date.toTimeString().slice(0, 5);
console.log("Selected Time: " + selectedTime);



resetTime.addEventListener("change", function() {
    selectedTime = resetTime.value;
    
    console.log("Selected Time: " + selectedTime);
    console.log("Current Time: " + currentTime);
    
    selectedTime === currentTime ? console.log("equal") : console.log("not equal");
});

function addTask() {
    var tr = document.createElement("tr");
    tr.classList.add("task-row");
    tr.innerHTML = `
        <td><input type="checkbox" name="" id="task"></td>
        <td><input type="text" name="" id="task-name"></td>
        <td><input type="time" name="" id="time-task"></td>
        <td><textarea name="" id="date-desc"></textarea></td>
        <td><button onclick="removeTask(event)">Remove</button></td>
    `;
    table.appendChild(tr);
}

function removeTask(e) {
    var tr = e.target.closest("tr");
    table.removeChild(tr);
}

function resetTasks() {
    var taskRows = document.querySelectorAll(".task-row");

    taskRows.forEach(function(row) {
        table.removeChild(row);
    });

    const noti = new Notification("Tasks have been reset!");
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

function notifyTask(currentTime) {
    var timeInputs = document.querySelectorAll("#time-task");

    timeInputs.forEach(function(input) {
        if (input.value === currentTime) {
            const notification = new Notification("Task Reminder", {
                body: "You have a task scheduled for now!",
            });
        }
    });
}

// keep track of document time changes and update currentTime variable
setInterval(function() {
    date = new Date();
    currentTime = date.toTimeString().slice(0, 5);
    
    console.log("Current Time: " + currentTime);

    if (selectedTime === currentTime) {
        resetTasks();
    }

    // notifyTask(currentTime);
}, 1000);