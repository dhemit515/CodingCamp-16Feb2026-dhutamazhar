/* JAVASCRIPT LENGKAP: TO-DO LIST PRO */

let todos = [];
let currentFilter = 'all'; // Untuk filter status (all, active, completed)
let dateFilter = null;     // Untuk filter tanggal spesifik

// 1. MUAT DATA SAAT HALAMAN DIBUKA (LOAD)
window.onload = () => {
    const savedTodos = localStorage.getItem('myTodoList');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
};

// 2. SIMPAN DATA KE BROWSER (SAVE)
function saveToLocalStorage() {
    localStorage.setItem('myTodoList', JSON.stringify(todos));
}

// 3. FUNGSI TAMBAH TUGAS
function addTodo() {
    const input = document.getElementById('todoInput');
    const dateInput = document.getElementById('todoDate');
    const taskText = input.value.trim();
    const taskDate = dateInput.value;
    
    if (taskText !== "") {
        const newTodo = {
            id: Date.now(),
            text: taskText,
            date: taskDate || "Tanpa tanggal",
            completed: false
        };
        
        todos.push(newTodo);
        input.value = "";
        dateInput.value = "";
        saveToLocalStorage();
        renderTodos();
    }
}

// 4. FUNGSI HAPUS TUGAS (DELETE)
function deleteTodo(id) {
    if (confirm("Yakin ingin menghapus tugas ini?")) {
        todos = todos.filter(todo => todo.id !== id);
        saveToLocalStorage();
        renderTodos();
    }
}

// 5. FUNGSI TOGGLE SELESAI
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

// 6. FUNGSI FILTER STATUS
function setFilter(criteria) {
    currentFilter = criteria;
    renderTodos();
}

// 7. FUNGSI FILTER TANGGAL SPESIFIK
function filterByDate(val) {
    dateFilter = val;
    renderTodos();
}

// 8. RESET FILTER TANGGAL
function resetDateFilter() {
    dateFilter = null;
    document.getElementById('filterDate').value = "";
    renderTodos();
}

// 9. CEK DEADLINE LEWAT (OVERDUE)
function isOverdue(dateStr) {
    if (!dateStr || dateStr === "Tanpa tanggal") return false;
    const today = new Date().setHours(0,0,0,0);
    const deadline = new Date(dateStr).setHours(0,0,0,0);
    return deadline < today;
}

// 10. FUNGSI RENDER (MENAMPILKAN KE LAYAR)
function renderTodos() {
    const listElement = document.getElementById('todoList');
    listElement.innerHTML = "";

    // A. SORTING: Tugas dengan tanggal terdekat muncul di atas
    let processedTodos = [...todos].sort((a, b) => {
        if (a.date === "Tanpa tanggal") return 1;
        if (b.date === "Tanpa tanggal") return -1;
        return new Date(a.date) - new Date(b.date);
    });

    // B. FILTER berdasarkan STATUS
    processedTodos = processedTodos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    // C. FILTER berdasarkan TANGGAL SPESIFIK
    if (dateFilter) {
        processedTodos = processedTodos.filter(todo => todo.date === dateFilter);
    }

    // D. GENERATE HTML
    processedTodos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');
        
        const overdueStyle = isOverdue(todo.date) && !todo.completed ? 'color: red; font-weight: bold;' : 'color: #888;';
        
        li.innerHTML = `
            <div onclick="toggleTodo(${todo.id})" style="flex:1; cursor:pointer;">
                <strong>${todo.text}</strong><br>
                <small style="${overdueStyle}">Deadline: ${todo.date}</small>
            </div>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });
}

// 11. DUKUNG TOMBOL ENTER
document.getElementById('todoInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});