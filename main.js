const modal = document.querySelector(".modal");
const add = document.querySelector(".add");
const close = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
const body = document.getElementById("body");
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
};
close.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
