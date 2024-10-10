document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.getElementById("input-box");
  const addButton = document.getElementById("add-btn");
  const listContainer = document.getElementById("list-container");
  const markAllButton = document.getElementById("mark-all-btn");

  // Function to add a new task to the list
  function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText !== "") {
      const li = document.createElement("li");

      // Wrap task text in a <span> for individual styling
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;

      // Create and add a delete button to the task
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.style.marginLeft = "10px";
      deleteButton.style.background = "none";
      deleteButton.style.border = "none";
      deleteButton.style.cursor = "pointer";
      deleteButton.addEventListener("click", deleteTask);

      // Apend task span and delete button to the list item
      li.appendChild(taskSpan);
      li.appendChild(deleteButton);

      // Toggle task completion
      li.addEventListener("click", function (event) {
        if (event.target !== deleteButton) {
          li.classList.toggle("completed");
          taskSpan.classList.toggle("completed");
        }
      });

      listContainer.appendChild(li);
      inputBox.value = "";

      // Show the "Mark all as done" button when the first task is added
      markAllButton.style.display = "block";
    } else {
      alert("Enter your task.");
    }
  }

  // Function to delete a task
  function deleteTask(event) {
    event.stopPropagation(); // Prevent triggering toggleTaskComplete
    const li = event.target.parentElement; // Get the parent <li> of the delete button
    listContainer.removeChild(li);

    // Hide the "Mark all as done" button if there are no tasks
    if (listContainer.children.length === 0) {
      markAllButton.style.display = "none";
    }
  }

  // Function to mark all tasks as completed
  function markAllDone() {
    const allTasks = listContainer.querySelectorAll("li");
    allTasks.forEach((li) => {
      li.classList.add("completed");
      li.querySelector("span").classList.add("completed");
    });
  }

  // "Add" button
  addButton.addEventListener("click", addTask);

  // Event listener to handle "ENTER" key press in input field
  inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // "Mark all as done" button
  markAllButton.addEventListener("click", markAllDone);
});
