const modal = document.querySelector(".modal");
const add = document.querySelector(".add");
const close = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
const body = document.getElementById("body");
const container = document.querySelector(".main-container");
const addListBtn = document.querySelector(".add-list");
const titleInput = document.querySelector(".title");
const descriptionInput = document.querySelector(".description");
const taskTitleInput = document.querySelector(".titleTask");
const taskDescriptionInput = document.querySelector(".descriptionTask");

//Opening the modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.classList.add("blur");
};
add.addEventListener("click", openModal);

//Closing the modal
const closeModal = function () {
  modal.classList.add("hidden");
  body.classList.remove("blur");
  overlay.classList.add("hidden");
  titleInput.value = "";
  descriptionInput.value = "";
};
close.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Function to show the task list
const showTaskList = function () {
  document.getElementById("taskList").style.display = "flex";
};

// Function to add a new task dynamically
// Function to add a new task dynamically
const addTask = function (title, description) {
  // Create the task element
  const taskElement = document.createElement("li");
  taskElement.innerHTML = `
    <section class="taskList">
      <div class="div-titleTask">
        <input type="text" class="titleTask" readonly disabled="disabled" value="${title}" />
      </div>
      <div class="div-descriptionTask">
        <textarea name="description" cols="30" rows="10" class="descriptionTask" readonly disabled="disabled">${description}</textarea>
      </div>
    </section>
  `;

  // Append the task element to the task list
  document.getElementById("taskList").appendChild(taskElement);

  // Create and append the spans for task actions
  const taskActions = document.createElement("div");
  taskActions.classList.add("task-actions");
  taskActions.innerHTML = `
    <span class="material-symbols-outlined" style="color: #edc90c; margin: 20px; font-size: 2rem; cursor: pointer"> edit </span>
    <span class="material-symbols-outlined" style="color: #edc90c; font-size: 2rem; cursor: pointer"> check_circle </span>
    <span class="material-symbols-outlined" style="color: rgb(241, 48, 48); font-size: 2rem; cursor: pointer"> delete </span>
  `;
  document.getElementById("taskList").appendChild(taskActions);
};

// Event listener for adding a new task
addListBtn.addEventListener("click", function () {
  console.log("Add task button clicked");
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title && description) {
    addTask(title, description);
    closeModal();
    showTaskList(); // Show the task list after adding a task
  }
});

// Show the task list when the page loads
showTaskList();
