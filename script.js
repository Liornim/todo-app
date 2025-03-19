// Get DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const categorySelect = document.getElementById('categorySelect');
const filterButtons = document.querySelectorAll('.filter-btn');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        // Skip tasks that don't match the current filter
        if (currentFilter !== 'all' && task.category !== currentFilter) {
            return;
        }

        const li = document.createElement('li');
        li.className = `${task.completed ? 'completed' : ''} ${task.category}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleTask(index);
        
        const span = document.createElement('span');
        span.textContent = task.text;
        
        const categoryBadge = document.createElement('span');
        categoryBadge.className = 'category-badge';
        categoryBadge.textContent = task.category;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(index);
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(categoryBadge);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const category = categorySelect.value;
        tasks.push({ text, completed: false, category });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to update filter
function updateFilter(category) {
    currentFilter = category;
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    renderTasks();
}

// Add event listeners
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        updateFilter(btn.dataset.category);
    });
});

// Initial render
renderTasks(); 