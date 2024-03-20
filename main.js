const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const inputTitle = document.getElementById("input-title");
const inputTextArea = document.getElementById("input-textarea");
const listContainer = document.getElementById("list-task");

//Open modal function
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
openModalBtn.addEventListener("click", openModal);

//Close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);

//Keypress close modal function
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Adding task list
// Function to add a task
function addTask() {
  if (inputTitle.value === "" || inputTextArea.value === "") {
    alert("You must fill out all fields!");
  } else {
    // Create a new list item element
    let listItem = document.createElement("li");

    // Create a new Date object to get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Set the inner HTML of the list item
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

    // Append the list item to the list container
    listContainer.appendChild(listItem);

    // Update footer date
    updateFooterDate();

    // Clear the input fields
    inputTitle.value = "";
    inputTextArea.value = "";

    // Close the modal
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
}

// Event delegation to handle clicks on delete icons
listContainer.addEventListener("click", function (event) {
  // Check if the clicked element has the class 'material-symbols-outlined' and contains the word 'delete'
  if (event.target.classList.contains("material-symbols-outlined") && event.target.textContent.trim() === "delete") {
    // Traverse up the DOM to find the parent list item
    const task = event.target.closest("li");
    if (task) {
      // Call deleteTask function passing the task to be deleted
      deleteTask(task);
    }
  }
});

//Function to edit task and save
// Function to handle editing a task
function editTask(task) {
  // Find the todo-list div inside the task
  const todoList = task.querySelector(".todo-list");

  // Enable editing by removing the 'readonly' attribute from inputs and textareas
  const inputs = todoList.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.classList.add("editable"); // Add a class to mark as editable
  });
}

// Function to save changes made to a task
// Function to handle editing a task
function editTask(task) {
  // Find the todo-list div inside the task
  const todoList = task.querySelector(".todo-list");

  // Enable editing by removing the 'readonly' attribute from inputs and textareas
  const inputs = todoList.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.classList.add("editable"); // Add a class to mark as editable
    input.classList.add("editing"); // Add a class to indicate edit mode
  });
}

// Function to save changes made to a task
function saveTask(task) {
  // Find the todo-list div inside the task
  const todoList = task.querySelector(".todo-list");

  // Disable editing by adding the 'readonly' attribute back to inputs and textareas
  const inputs = todoList.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.setAttribute("readonly", true);
    input.classList.remove("editing"); // Remove the class indicating edit mode
  });
}

// Event delegation to handle clicks on edit and check icons
listContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;

  // Check if the clicked element has the class 'material-symbols-outlined'
  if (clickedElement.classList.contains("material-symbols-outlined")) {
    const parentTask = clickedElement.closest("li");

    // Check if the clicked element is the edit span
    if (clickedElement.textContent.trim() === "edit") {
      if (parentTask) {
        // Call editTask function passing the task to be edited
        editTask(parentTask);
      }
    }
    // Check if the clicked element is the check span
    else if (clickedElement.textContent.trim() === "done") {
      if (parentTask) {
        // Call saveTask function passing the task to be saved
        saveTask(parentTask);
      }
    }
  }
});

// Event delegation to handle clicks on tasks to save changes when user clicks outside the task
document.addEventListener("click", function (event) {
  const clickedElement = event.target;

  // Check if the clicked element is an editable input or textarea
  if (clickedElement.classList.contains("editable")) {
    return; // Do nothing if clicking on an editable element
  }

  // Find the task containing the clicked element
  const parentTask = clickedElement.closest("li");

  // Check if the clicked element is outside any task
  if (!parentTask) {
    // Find all tasks in edit mode and save changes
    const tasksInEditMode = listContainer.querySelectorAll(".editing");
    tasksInEditMode.forEach((task) => {
      saveTask(task);
    });
  }
});
