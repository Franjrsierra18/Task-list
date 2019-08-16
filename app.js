const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');

loadAllEventListeners();

function loadAllEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
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

function removeItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure??')){
    e.target.parentElement.parentElement.remove();
    }
  };
  // e.preventDefault();
}

function clearTasks(e) {
  //taskList.innerHTML = '';
  if (confirm('Are you sure??')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
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