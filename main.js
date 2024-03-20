const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const inputTitle = document.getElementById("input-title");
const inputTextArea = document.getElementById("input-textarea");
const listContainer = document.getElementById("list-task");

// Open modal function
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
openModalBtn.addEventListener("click", openModal);

// Close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);

// Close modal on escape key press
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Function to add a task
function addTask() {
  if (inputTitle.value === "" || inputTextArea.value === "") {
    alert("You must fill out all fields!");
  } else {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    let listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="todo-list">
        <span class="material-symbols-outlined todo-span visible-hidden"> edit </span>
        <span class="material-symbols-outlined todo-span visible-hidden"> done </span>
        <div class="todo-hover-container">
          <div class="todo-container">
            <div>
              <input type="text" value="${inputTitle.value}" readonly />
            </div>
            <div>
              <textarea readonly>${inputTextArea.value}</textarea>
            </div>
            <div>
              <span>Date: ${formattedDate}</span>
            </div>
          </div>
        </div>
        <span class="material-symbols-outlined todo-span visible-hidden" style="background-color: red; color: #d9d9d9"> delete </span>
      </div>
    `;

    listContainer.appendChild(listItem);

    // Save the data after adding a task
    saveData();

    inputTitle.value = "";
    inputTextArea.value = "";

    closeModal();
  }
}

// Function to update footer date
function updateFooterDate() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();
  document.getElementById("footer-date").textContent = "Date: " + formattedDate;
}

// Function to delete a task
function deleteTask(task) {
  task.remove();
  saveData();
}

function editTask(task) {
  const todoList = task.querySelector(".todo-list");
  const inputs = todoList.querySelectorAll("input, textarea");
  const dateSpan = todoList.querySelector(".todo-container div:nth-child(3) span");
  const initialDate = dateSpan.textContent; // Store the initial date

  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.classList.add("editable");
    input.classList.add("editing");
  });

  // Add the initial date as a data attribute to the todo-list container
  todoList.dataset.initialDate = initialDate;
}

function saveTask(task) {
  const todoList = task.querySelector(".todo-list");
  const titleInput = task.querySelector("input[type='text']");
  const textareaInput = task.querySelector("textarea");
  const dateSpan = todoList.querySelector(".todo-container div:nth-child(3) span");
  const initialDate = todoList.dataset.initialDate; // Get the initial date

  let isTaskEdited = false;

  // Check if any input element is being edited
  const inputs = todoList.querySelectorAll("input.editing, textarea.editing");
  inputs.forEach((input) => {
    if (input.classList.contains("editing")) {
      isTaskEdited = true;
    }
    input.setAttribute("readonly", true);
    input.classList.remove("editing");
  });

  // Update title and textarea values if task was edited
  if (isTaskEdited) {
    titleInput.value = inputs[0].value; // Update title
    textareaInput.value = inputs[1].value; // Update textarea

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    dateSpan.textContent = `Date: ${formattedDate}`;
  } else {
    dateSpan.textContent = initialDate; // Restore the initial date
  }

  saveData();
}

// Event delegation to handle clicks on delete, edit, and done icons
listContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("material-symbols-outlined")) {
    const parentTask = clickedElement.closest("li");
    if (parentTask) {
      if (clickedElement.textContent.trim() === "delete") {
        deleteTask(parentTask);
      } else if (clickedElement.textContent.trim() === "edit") {
        editTask(parentTask);
      } else if (clickedElement.textContent.trim() === "done") {
        saveTask(parentTask);
      }
    }
  }
});

// Function to save data to local storage
function saveData() {
  const tasks = [];
  const taskElements = listContainer.querySelectorAll("li");
  taskElements.forEach((taskElement) => {
    const title = taskElement.querySelector("input[type='text']").value;
    const textarea = taskElement.querySelector("textarea").value;
    const date = taskElement.querySelector(".todo-container div:nth-child(3) span").textContent;
    tasks.push({ title, textarea, date });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load saved data from local storage
function loadSavedData() {
  // Clear existing tasks
  listContainer.innerHTML = "";

  const savedData = JSON.parse(localStorage.getItem("tasks"));
  if (savedData) {
    savedData.forEach((taskData) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="todo-list">
          <span class="material-symbols-outlined todo-span visible-hidden"> edit </span>
          <span class="material-symbols-outlined todo-span visible-hidden"> done </span>
          <div class="todo-hover-container">
            <div class="todo-container">
              <div>
                <input type="text" value="${taskData.title}" readonly />
              </div>
              <div>
                <textarea readonly>${taskData.textarea}</textarea>
              </div>
              <div>
                <span>${taskData.date}</span>
              </div>
            </div>
          </div>
          <span class="material-symbols-outlined todo-span visible-hidden" style="background-color: red; color: #d9d9d9"> delete </span>
        </div>
      `;
      listContainer.appendChild(listItem);
    });

    // Update footer date only once after all tasks are loaded
    updateFooterDate();
  }
}

// Load saved data when the page is loaded
window.addEventListener("load", function () {
  loadSavedData();
  updateFooterDate(); // Update footer date when page is loaded
});
