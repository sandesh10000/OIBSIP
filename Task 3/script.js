const taskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

function addTask(taskText) {
  const taskItem = createTaskItem(taskText);
  pendingTasksList.appendChild(taskItem);
}

function createTaskItem(taskText) {
  const taskItem = document.createElement('li');
  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;
  taskItem.appendChild(taskContent);

  const taskActions = document.createElement('div');
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', completeTask);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteTask);
  taskActions.appendChild(completeButton);
  taskActions.appendChild(deleteButton);
  taskItem.appendChild(taskActions);

  return taskItem;
}

function completeTask(event) {
  const taskItem = event.target.parentElement.parentElement;
  const completeButton = event.target;
  const repeatButton = document.createElement('button');
  repeatButton.textContent = 'Repeat';
  repeatButton.classList.add('repeat');
  repeatButton.addEventListener('click', repeatTask);
  taskItem.classList.toggle('completed');
  completeButton.remove();
  const taskActions = taskItem.querySelector('div');
  taskActions.appendChild(repeatButton);
  completedTasksList.appendChild(taskItem);
}

function repeatTask(event) {
  const taskItem = event.target.parentElement.parentElement;
  const repeatButton = event.target;
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.addEventListener('click', completeTask);
  taskItem.classList.toggle('completed');
  repeatButton.remove();
  const taskActions = taskItem.querySelector('div');
  taskActions.appendChild(completeButton);
  pendingTasksList.appendChild(taskItem);
}

function deleteTask(event) {
  const taskItem = event.target.parentElement.parentElement;
  taskItem.remove();
}
