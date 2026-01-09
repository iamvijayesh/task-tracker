let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskContainer = document.getElementById("taskContainer");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({
    id: Date.now(),
    text,
    completed: false
  });

  taskInput.value = "";
  saveAndRender();
});

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskContainer.innerHTML = "";

  if (tasks.length === 0) {
    taskContainer.innerHTML = `<p style="text-align:center;color:#9ca3af;">No tasks yet</p>`;
  }

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = `task ${task.completed ? "completed" : ""}`;

    div.innerHTML = `
      <button onclick="toggleTask(${task.id})"></button>
      <div class="task-text">${task.text}</div>
      <span class="status ${task.completed ? "done" : "pending"}">
        ${task.completed ? "Completed" : "Pending"}
      </span>
    `;

    taskContainer.appendChild(div);
  });

  totalTasks.textContent = `${tasks.length} Task${tasks.length !== 1 ? "s" : ""}`;
  completedTasks.textContent = `${tasks.filter(t => t.completed).length} Completed`;
}

renderTasks();
