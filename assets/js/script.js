// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Todo: create a function to create a task card
function createTaskCard(task) {
  return `<div class="card taskCard mb-3 ${getTaskColor(task.dueDate)}" id="task-${task.id}">
    <div class="card-header">
      <h5 class="card-title">${task.title}</h5>
    </div>
    <div class="card-body">
        <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
        <p class="card-text"><strong>Description:</strong> ${task.description}</p>
        <button class="btn btn-danger delete-task">Delete Task</button>
    </div>
  </div>`;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $("#todo-cards, #in-progress-cards, #done-cards").empty();
  taskList.forEach((task) => {
    const taskHtml = createTaskCard(task);
    $(`#${task.status}-cards`).append(taskHtml);
  });
  makeCardsDraggable();
}

// Function to make cards draggable
function makeCardsDraggable() {
  $(".taskCard").draggable({
    revert: "invalid",
    helper: "clone",
    cursor: "move",
    zIndex: 1000, // Ensure the dragged card appears above other elements
    start: function (event, ui) {
      $(this).addClass("dragging");
    },
    stop: function (event, ui) {
      $(this).removeClass("dragging");
    },
  });
}

// Function to make swim lanes droppable
function makeLanesDroppable() {
  $(".lane").droppable({
    accept: ".card",
    drop: handleDrop,
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitle = $("#taskTitle").val();
  const taskDueDate = $("#taskDueDate").val();
  const taskDescription = $("#taskDescription").val();

  // Add task to the To Do list
  const newTask = {
    id: nextId++,
    title: taskTitle,
    dueDate: taskDueDate,
    description: taskDescription,
    status: "todo",
  };
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", nextId);

  // Clear form inputs
  $("#taskTitle").val("");
  $("#taskDueDate").val("");
  $("#taskDescription").val("");

  // Close the modal
  $("#formModal").modal("hide");

  // Re-render the task list
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const cardId = $(event.target).closest(".card").attr("id");
  const taskId = parseInt(cardId.split("-")[1]);

  // Remove task from taskList
  taskList = taskList.filter((task) => task.id !== taskId);

  // Save updated task list to localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList));

  // Re-render the task list
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const cardId = ui.draggable.attr("id");
  const taskId = parseInt(cardId.split("-")[1]);
  const newStatus = $(this).attr("id");
  const taskIndex = taskList.findIndex((task) => task.id === taskId);

  // Update task status and re-render task list
  taskList[taskIndex].status = newStatus;
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  addEventListeners();
  makeLanesDroppable();
  initializeDatePicker();
});

// Function to add event listeners
function addEventListeners() {
  // Handle form submission
  $("#addTaskForm").submit(handleAddTask);

  // Handle delete task
  $(document).on("click", ".delete-task", handleDeleteTask);
}

// Function to initialize jQuery DatePicker for Task Due Date field
function initializeDatePicker() {
  $("#taskDueDate").datepicker({
    dateFormat: "yy-mm-dd",
    autoclose: true,
  });
}

// Function to determine task card color based on due date
function getTaskColor(dueDate) {
  const today = new Date().toISOString().split("T")[0];
  if (dueDate < today) {
    return "dueInPast"; // Overdue task
  } else if (dueDate === today) {
    return "dueToday"; // Task due today
  } else {
    return "dueInFuture"; // Task due in future
  }
}
