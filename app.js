const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');

loadAllEventListeners();

function loadAllEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function getTasks(e) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
  
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
  
    li.appendChild(link);
  
    taskList.appendChild(li);
  })
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

  storeInLocalStorage(taskInput.value);

  taskInput.value = '';
  e.preventDefault();
}

function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure??')){
    e.target.parentElement.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  };
  // e.preventDefault();
}

function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, i) {
    if (taskItem.textContent === task) {
      tasks.splice(i,1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  //taskList.innerHTML = '';
  if (confirm('Are you sure??')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
      // removeFromLocalStorage(taskList.firstChild);
    }
  }
  clearLS();
}

function clearLS() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none'
      }
    }
  )
}