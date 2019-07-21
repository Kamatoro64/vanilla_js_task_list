// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);

	// Add task event
	form.addEventListener('submit', addTask);

	// Remove task event. Event delegation required here since li's are dynamically generated we we're adding the event listener to the ul element itself
	taskList.addEventListener('click', removeTask);

	// Clear task event
	clearBtn.addEventListener('click', clearTasks);

	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS

function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
		tasks.forEach(task => {

			// Create li element
			const li = document.createElement('li');

			// In materialize for lists to look good the ul should have class collection and
			// li should have class collection-item
			li.className = 'collection-item';

			// Interesting, why can't we just set the li's text directly?
			li.appendChild(document.createTextNode(task));

			// Create new link element
			const link = document.createElement('a');
			link.className = 'delete-item secondary-content'; //Look up secondary-content in materialize
			link.innerHTML = '<i class="fa fa-remove"></i>';

			//Append the link to li
			li.appendChild(link);

			// Append li to ul
			taskList.appendChild(li);

		});
	}
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

	// Store in Local Storage
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';

	//console.log(li);
	e.preventDefault()
}

// Store task in LS
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			// x icon parent is the a tag, a tag parent element is the li element, which we want to remove()
			e.target.parentElement.parentElement.remove();

			// Remove from local storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach((task, index) => {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// Implementation 1 clearing the innerHTML of the ul (taskList)
	// taskList.innerHTML = '';

	// Faster! https://jsperf.com/innerhtml-vs-removechild/47
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from local storage
	clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage() {
	localStorage.clear();
};

// Filter Tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	// querySelectAll returns a node list so no array conversion required to use forEach
	document.querySelectorAll('.collection-item').forEach(task => {
		const item = task.firstChild.textContent;

		if (item.toLowerCase().indexOf(text) != -1) {
			// Question: Why use block here?
			// Answer: If you don't put anything here it will not reappear if it was set to display 'none' previously!
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}