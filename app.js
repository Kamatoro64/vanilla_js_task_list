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

	// Remove task event. Event delegation required here since li's are dynamically generated we we're adding the event listener to the ul element itself
	taskList.addEventListener('click', removeTask);

	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
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

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			// x icon parent is the a tag, a tag parent element is the li element, which we want to remove()
			e.target.parentElement.parentElement.remove();
		}
	}
}

// Clear Tasks

function clearTasks() {
	// Implementation 1 clearing the innerHTML of the ul (taskList)
	// taskList.innerHTML = '';

	// Faster! https://jsperf.com/innerhtml-vs-removechild/47
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
}