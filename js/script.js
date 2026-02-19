/* JAVASCRIPT: Logika Aplikasi dengan Local Storage */
let todos = [];
let currentFilter = 'all';

// 1. MUAT DATA SAAT HALAMAN DIBUKA (LOAD)
window.onload = () => {
    const savedTodos = localStorage.getItem('myTodoList');
    if (savedTodos) {
        todos = JSON.parse(savedTodos); // Mengubah string kembali jadi array
        renderTodos();
    }
};

// 2. SIMPAN DATA KE BROWSER (SAVE)
function saveToLocalStorage() {
    localStorage.setItem('myTodoList', JSON.stringify(todos)); // Simpan array sebagai string
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const taskText = input.value.trim();
    
    if (taskText !== "") {
        const newTodo = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        todos.push(newTodo);
        input.value = "";
        saveToLocalStorage(); // Simpan setiap ada perubahan
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage(); // Simpan setelah menghapus
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveToLocalStorage(); // Simpan setelah mengubah status
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
            <span onclick="toggleTodo(${todo.id})">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}

document.getElementById('todoInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});