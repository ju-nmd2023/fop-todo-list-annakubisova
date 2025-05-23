class Todo {
  constructor() {
    this.TODO_INPUT = document.getElementById("task-input");
    this.TODO_LIST = document.getElementById("task-list");
    this.TODO_CONFIRM = document.getElementById("add-button");
    this.TODO_CLEAR = document.getElementById("clear-button");

    // Setting actions
    this.createTask = this.createTask.bind(this);
    this.delete = this.delete.bind(this);

    // Task submitted to the form (either Enter or clicking "Add task")
    document.getElementById("task-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.createTask();
    });

    this.TODO_CLEAR.addEventListener("click", this.delete);

    // Disabling the "Add task" btn if the input is empty
    this.TODO_INPUT.addEventListener("input", () => {
      this.TODO_CONFIRM.disabled = this.TODO_INPUT.value.trim() == "";
    });

    // Loading local storage
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    this.load();
    this.render();
  }

  render() {
    this.TODO_LIST.innerHTML = "";
    this.TODO_CLEAR.disabled = this.tasks.length === 0;

    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = task.text;

      if (task.isDone) span.classList.add("completed");

      const actions = document.createElement("div");
      actions.className = "actions";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.isDone ? "✅" : "✅";
      completeBtn.onclick = () => this.toggleTaskState(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.onclick = () => this.deleteTask(index);

      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);

      this.TODO_LIST.appendChild(li);
    });
  }

  // Runs when you add new task
  createTask(task = null) {
    if (!(task instanceof Task)) {
      const text = this.TODO_INPUT.value.trim();
      if (text == "") return;
      task = new Task(text, false);

      // Clear input and disable the add-btn after task is added on the TO DO list
      this.TODO_INPUT.value = "";
      this.TODO_CONFIRM.disabled = true;
    }

    this.tasks.push(task);

    this.save();
    this.render();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.save();
    this.render();
  }

  toggleTaskState(index) {
    this.tasks[index].isDone = !this.tasks[index].isDone;
    this.save();
    this.render();
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  load() {
    const parsedStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    if (parsedStorage.length === 0) return;
    this.tasks = parsedStorage.map((task) => new Task(task.text, task.isDone));
  }

  delete() {
    this.tasks = [];
    this.save();
    this.render();
  }
}

class Task {
  constructor(text, isDone = false) {
    this.text = text;
    this.isDone = isDone;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Todo();
});
