// Local storage functions completed with help from ChatGPT; link: https://chatgpt.com/share/67095b9d-d554-8004-b99a-530225927cb1
// Used help from ChatGPT; link: https://chatgpt.com/share/67095cad-d750-800f-b419-1ae9bbd78dfe

document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements for interacting with the TO DO LIST
  const inputBox = document.getElementById("input-box");
  const addButton = document.getElementById("add-btn");
  const listContainer = document.getElementById("list-container");
  const markAllButton = document.getElementById("mark-all-btn");

  // Load tasks from local storage when the page loads
  loadTasksFromLocalStorage();

  // Function to add a new task to the list
  function addTask(taskText = inputBox.value.trim(), isCompleted = false) {
    if (taskText !== "") {
      const li = document.createElement("li");

      // Create a <span> element to hold the task text separately for styling
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;

      // If the task is marked as completed, add the 'completed' class
      if (isCompleted) {
        li.classList.add("completed");
        taskSpan.classList.add("completed");
      }

      // Create and configure the delete button for removing the tasks
      const deleteButton = document.createElement("button");

      // Function to create a delete button for each task
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", deleteTask);
      deleteButton.classList.add("delete-btn");

      // Apend both task and delete button to the task (list item)
      li.appendChild(taskSpan);
      li.appendChild(deleteButton);

      // Add click event listener to the task to toggle its completion status
      li.addEventListener("click", function (event) {
        if (event.target !== deleteButton) {
          li.classList.toggle("completed");
          taskSpan.classList.toggle("completed");
          saveTasksToLocalStorage();
        }
      });

      // Add the task (list item) to the container holding the task list
      listContainer.appendChild(li);
      inputBox.value = "";

      // Save the updated task list to local storage
      saveTasksToLocalStorage();

      // Display the "Mark all as done" button when at least one task exists
      markAllButton.style.display = "block";
    } else {
      alert("Enter your task."); // Prompts user if input is empty
    }
  }

  // Function to create a delete button for each task
  function deleteTask(event) {
    event.stopPropagation(); // Prevent triggering toggleTaskComplete
    const li = event.target.parentElement; // Get the parent <li> of the delete button
    listContainer.removeChild(li);

    // Save tasks to local storage after deleting
    saveTasksToLocalStorage();

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
    saveTasksToLocalStorage(); // Save the state after marking tasks as completed
  }

  // Save tasks to local storage
  function saveTasksToLocalStorage() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach((li) => {
      const taskText = li.querySelector("span").textContent;
      const isCompleted = li.classList.contains("completed");
      tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from local storage
  function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      savedTasks.forEach((task) => {
        addTask(task.text, task.completed);
      });
    }

    // Show the "Mark all as done" button if there are tasks
    if (listContainer.children.length > 0) {
      markAllButton.style.display = "block";
    }
  }

  // "Add" button
  addButton.addEventListener("click", function () {
    addTask(); // Call addTask without arguments when adding tasks manualy
  });

  // Event listener to handle "ENTER" key press in input field
  inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // "Mark all as done" button
  markAllButton.addEventListener("click", markAllDone);
});
