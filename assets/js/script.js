// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Todo: create a function to create a task card
function createTaskCard(task) {}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
$(document).ready(function () {
  // Initialize jQuery DatePicker for Task Due Date field
  $("#taskDueDate").datepicker({
    dateFormat: "yy-mm-dd", // You can customize the date format as needed
    autoclose: true,
  });

  // Handle form submission
  $("#addTaskForm").submit(function (event) {
    event.preventDefault();
    const taskTitle = $("#taskTitle").val();
    const taskDueDate = $("#taskDueDate").val();
    const taskDescription = $("#taskDescription").val();

    // Add task to the To Do list
    const task = {
      title: taskTitle,
      dueDate: taskDueDate,
      description: taskDescription,
    };
    addToToDoList(task);

    // Clear form inputs
    $("#taskTitle").val("");
    $("#taskDueDate").val("");
    $("#taskDescription").val("");

    // Close the modal
    $("#formModal").modal("hide");
  });

  // Function to add task to the To Do list
  function addToToDoList(task) {
    // Get today's date
    const today = new Date().toLocaleDateString("en-CA");
    // Example code to add task to the To Do list
    const taskHtml = `<div class="card mb-3 ${getTaskColor(task.dueDate, today)}">
      <div class="card-header">
        <h5 class="card-title">${task.title}</h5>
      </div>
      <div class="card-body">
          <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
          <p class="card-text"><strong>Description:</strong> ${task.description}</p>
          <button class="btn btn-danger delete-task">Delete Task</button>
      </div>
    </div>`;
    $("#todo-cards").append(taskHtml);

    // Bind delete task function to the delete button
    $(".delete-task").click(function () {
      $(this).closest(".card").remove();
    });
  }
});

// Function to determine task card color based on due date
function getTaskColor(dueDate, today) {
  console.log(dueDate);
  console.log(today);
  if (dueDate < today) {
    return "dueInPast"; // Overdue task
  } else if (dueDate == today) {
    return "dueToday"; // Task due today
  } else {
    return "dueInFuture"; // Task due in future
  }
}
