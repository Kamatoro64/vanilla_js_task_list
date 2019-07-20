// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// Add task event
	form.addEventListener('submit', addTask);
}

// Add task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');

	// In materialize for lists to look good the ul should have class collection and
	// li should have class collection-item
	li.className = 'collection-item';

	// Interesting, why can't we just set the li's text directly?
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link element
	const link = document.createElement('a');
	link.className = 'delete-item secondary-content'; //Look up secondary-content in materialize

	link.innerHTML = '<i class="fa fa-remove"></i>';

	//Append the link to li

	li.appendChild(link);

	// Append li to ul

	taskList.appendChild(li);

	// Clear input

	taskInput.value = '';
	//console.log(li);








	e.preventDefault()
}