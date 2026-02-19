/* JAVASCRIPT LENGKAP DENGAN TANGGAL */
let todos = [];
let currentFilter = 'all';

window.onload = () => {
    const savedTodos = localStorage.getItem('myTodoList');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
};

function saveToLocalStorage() {
    localStorage.setItem('myTodoList', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const dateInput = document.getElementById('todoDate'); // Ambil element tanggal
    const taskText = input.value.trim();
    const taskDate = dateInput.value; // Ambil nilai tanggal
    
    if (taskText !== "") {
        const newTodo = {
            id: Date.now(),
            text: taskText,
            date: taskDate || "Tanpa tanggal", // Default jika tanggal kosong
            completed: false
        };
        todos.push(newTodo);
        input.value = "";
        dateInput.value = ""; // Reset input tanggal
        saveToLocalStorage();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveToLocalStorage();
    renderTodos();
}

function setFilter(criteria) {
    currentFilter = criteria;
    renderTodos();
}

function renderTodos() {
    const listElement = document.getElementById('todoList');
    listElement.innerHTML = "";

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        
        li.innerHTML = `
            <div onclick="toggleTodo(${todo.id})" style="flex:1;">
                <strong>${todo.text}</strong><br>
                <small style="color: #888;">Deadline: ${todo.date}</small>
            </div>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}