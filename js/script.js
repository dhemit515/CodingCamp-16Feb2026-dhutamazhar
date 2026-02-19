// 1. Inisialisasi Data
let todos = [];
let currentFilter = 'all';

// 2. Fungsi untuk Menambah Tugas
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
        renderTodos();
    }
}

// 3. Fungsi untuk Menghapus Tugas (DELETE)
function deleteTodo(id) {
    // Memfilter array untuk membuang item dengan ID yang dipilih
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// 4. Fungsi untuk Toggle Status Selesai
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos();
}

// 5. Fungsi untuk Mengatur Filter
function setFilter(criteria) {
    currentFilter = criteria;
    renderTodos();
}

// 6. Fungsi Render (Menampilkan ke Layar)
function renderTodos() {
    const listElement = document.getElementById('todoList');
    listElement.innerHTML = "";

    // Logika Filter
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // Default 'all'
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        
        li.innerHTML = `
            <span onclick="toggleTodo(${todo.id})">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}