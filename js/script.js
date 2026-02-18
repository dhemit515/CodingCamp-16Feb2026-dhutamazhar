let todos = [];

const form = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// 1. Add Task
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = document.getElementById('todo-input').value;
    const taskDate = document.getElementById('date-input').value;

    // Simple Validation
    if (!taskText.trim() || !taskDate) return alert("Please fill all fields");

    const newTodo = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        completed: false
    };

    todos.push(newTodo);
    renderTodos(todos);
    form.reset();
});

// 2. Render Function (The "Source of Truth")
function renderTodos(data) {
    todoList.innerHTML = '';
    data.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="${todo.completed ? 'text-decoration: line-through' : ''}">
                ${todo.text} - <small>${todo.date}</small>
            </span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// 3. Delete Task
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos(todos);
}

// 4. Filter Logic
document.querySelector('.filters').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const filter = e.target.dataset.filter;
    
    let filtered = todos;
    if (filter === 'completed') filtered = todos.filter(t => t.completed);
    if (filter === 'pending') filtered = todos.filter(t => !t.completed);
    
    renderTodos(filtered);
});