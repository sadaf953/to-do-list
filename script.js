// Selectors
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from local storage
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTaskToDOM(task.text, task.completed));
};

// Add Task
addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM(taskText, false);
        saveTask(taskText, false);
        taskInput.value = "";
    }
});

// Add task to DOM
function addTaskToDOM(text, completed) {
    const li = document.createElement("li");
    li.textContent = text;

    // Mark completed tasks
    if (completed) {
        li.classList.add("completed");
    }

    // Toggle completion
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTaskStatus(text, li.classList.contains("completed"));
    });

    // Delete task button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        deleteTask(text);
    });
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

// Save task to local storage
function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task completion status in local storage
function updateTaskStatus(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = tasks.findIndex((task) => task.text === text);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Delete task from local storage
function deleteTask(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter((task) => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

