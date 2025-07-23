
function loadNavbar() {
    const navbarContainer = document.getElementById('navbar');
    
    if (navbarContainer) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
                initializeDropdown();
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }
}



function goHome() {
    window.location.href = "index.html";
}

function editTask(taskId) {
    if (!taskId) {
        alert("Task ID is missing.");
        return;
    }
    window.location.href = `edit-task.html?id=${taskId}`;
}

function deleteTask() {
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get("id");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    alert("Task deleted successfully!");
    window.location.href = "index.html";
}


function initializeDropdown() {
    const actionsDropdown = document.getElementById('actionsDropdown');
    
    if (actionsDropdown) {
        actionsDropdown.addEventListener('change', function() {
            const selectedValue = this.value;
            
            switch (selectedValue) {
            case 'addTask':
                window.location.href = 'add-task.html';
                break;
            case 'retrieveTask':
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                if (tasks.length > 0) {
                    goToTaskDetails(tasks[0].id);
                } else {
                    alert("No tasks to retrieve.");
                }
                break;
            default:
            break;
        }

        this.selectedIndex = 0;
    });
    }
}

function initializeFormHandler() {
    const taskForm = document.getElementById('taskForm');
    if (!taskForm) return;

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const task = {
            id: document.getElementById('taskId').value.trim(),
            date: document.getElementById('taskDate').value,
            title: document.getElementById('taskTitle').value.trim(),
            description: document.getElementById('taskDesc').value.trim(),
            uiTech: document.getElementById('uiTech').value,
            backendTech: document.querySelector('input[name="backendTech"]:checked')?.value || '',
            libraryUsed: Array.from(document.querySelectorAll('input[name="libraryUsed"]:checked')).map(cb => cb.value)
        }; 

        if (!task.id || !task.date || !task.title) {
            alert("Please fill in Task ID, Date, and Title.");
            return;
        }

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (tasks.some(t => t.id === task.id)) {
            alert("Task ID already exists. Try something more original.");
            return;
        }

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert("Task added successfully!");

        window.location.href = 'index.html';
    });

    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }
}

function loadTaskDetails() {
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get("id");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);
    const table = document.getElementById("detailsTable");

    if (!table) return;

    if (!task) {
        table.innerHTML = "<tr><td colspan='2'>Task not found!</td></tr>";
        return;
    }

    const fields = {
        "ID": task.id,
        "Date": task.date,
        "Title": task.title,
        "Description": task.description,
        "UI Technology": task.uiTech,
        "Back End Technology": task.backendTech,
        "Library Used": Array.isArray(task.libraryUsed) ? task.libraryUsed.join(", ") : task.libraryUsed

    };

    for (const label in fields) {
        const row = document.createElement("tr");
        row.innerHTML = `<th>${label}</th><td>${fields[label] || "-"}</td>`;
        table.appendChild(row);
    }

    const editBtn = document.getElementById("editBtn");
    if (editBtn && taskId) {
        editBtn.addEventListener("click", function () {
            editTask(task.id);
        });
    }
}

function initializeEditHandler() {
    const taskForm = document.getElementById('taskForm');
    if (!taskForm) return;

    const params = new URLSearchParams(window.location.search);
    const taskId = params.get("id");
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        alert("Task not found!");
        return;
    }

    document.getElementById('taskId').value = task.id;
    document.getElementById('taskDate').value = task.date;
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.description;
    document.getElementById('uiTech').value = task.uiTech;
    
    if (task.backendTech) {
        const backendRadio = document.querySelector(`input[name="backendTech"][value="${task.backendTech}"]`);
        if (backendRadio) {
            backendRadio.checked = true;
        }
    }

    if(Array.isArray(task.libraryUsed)) {
        task.libraryUsed.forEach(lib => {
            const checkbox = document.querySelector(`input[name="libraryUsed"][value="${lib}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const updatedTask = {
            id: document.getElementById('taskId').value.trim(),
            date: document.getElementById('taskDate').value,
            title: document.getElementById('taskTitle').value.trim(),
            description: document.getElementById('taskDesc').value.trim(),
            uiTech: document.getElementById('uiTech').value,
            backendTech: document.querySelector('input[name="backendTech"]:checked')?.value || '',
            libraryUsed: Array.from(document.querySelectorAll('input[name="libraryUsed"]:checked')).map(cb => cb.value)
        };

        const updatedTasks = tasks.map(t => t.id === taskId ? updatedTask : t);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        alert("Task updated successfully!");
        window.location.href = 'index.html';
    });
    const cancelBtn = document.querySelector('.cancel-btn');
    if(cancelBtn){
        cancelBtn.addEventListener('click',function(){
            window.location.href = 'index.html';  
        })
    }


}

function goToTaskDetails(taskId) {
    if (!taskId) {
        alert("Task ID is missing.");
        return;
    }
    window.location.href = `task-details.html?id=${taskId}`;
}


document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();

    if (window.location.pathname.includes("add-task.html")) {
        initializeFormHandler();
    }

    if (window.location.pathname.includes("edit-task.html")) {
        initializeEditHandler();
    }

    if (window.location.pathname.includes("task-details.html")) {
        loadTaskDetails();
    }

    if (window.location.pathname.includes("index.html")) {
        populateTaskTable();
    }
});

