var table = document.getElementById("taskList");

function addTask() {
    var tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox" name="" id="task"></td>
        <td><input type="text" name="" id="task-name"></td>
        <td><input type="date" name="" id="date-task"></td>
        <td><textarea name="" id="date-desc"></textarea></td>
        <td><button onclick="removeTask(event)">Remove</button></td>
    `;
    table.appendChild(tr);
}

function removeTask(e) {
    var tr = e.target.closest("tr");
    table.removeChild(tr);
}

