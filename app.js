const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');

loadAllEventListeners();

function loadAllEventListeners() {
  form.addEventListener('submit', addTask);
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add Task!!!')
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  taskInput.value = '';
  e.preventDefault();
}