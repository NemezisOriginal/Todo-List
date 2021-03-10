const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Function
function addTodo(e) {
  e.preventDefault();

  // div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // add todo in locasstrg
  saveLocalTodos(todoInput.value);

  // completed button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = "<i class='fas fa-check'></i>";
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);

  // Append todo
  todoList.appendChild(todoDiv);
  // Clear input
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // delete todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("todo-fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Check todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // completed button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = "<i class='fas fa-check'></i>";
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    // Append todo
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
