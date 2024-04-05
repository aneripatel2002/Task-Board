# Third-Party APIs: Task Board

I have created a task board where I can enter all my tasks at hand with color coding systems. When I open the task board, the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed).

When I view the task board for the project, each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red).

When I click on the button to define a new task, I can enter the title, description and deadline date for the new task into a modal dialog.

When I click the save button for that task, the properties for that task are saved in localStorage.

When I drag a task to a different progress column, the task's progress state is updated accordingly and will stay in the new column after refreshing.

When I click the delete button for a task, the task is removed from the task board and will not be added back after refreshing.

When I refresh the page, the saved tasks persist.

The following animation demonstrates the application functionality:

(snippet.mp4)

