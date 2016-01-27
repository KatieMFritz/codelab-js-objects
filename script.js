// Variables

var todos = []
var newTodoInput = document.getElementById('new-todo-input')
var todoList = document.getElementById('todo-list')
var todoCount = document.getElementById('todo-count')
var cantDecide = document.getElementById('cant-decide')

// Renders

function renderTodos() {
  todoList.innerHTML = todos.map(function(todo, index) {
    return '<li>' +
      todo +
      ' <button class="remove-todo" data-index="' + index + '">X</button>' +
    '</li>'
  }).join('')
}

function countTodos() {
  if (todos.length === 0) {
    return todoCount.innerHTML = ''
  }
  todoCount.innerHTML = '<strong>Items:</strong> ' + todos.length + ' <button class="clear-all">Clear All</button>'
}

function pickForMe() {
  if (todos.length > 0) {
      cantDecide.innerHTML = '<button class="cant-decide">Can\'t Decide</button>'
  }
}

// Events

newTodoInput.onkeypress = function(event) {
  if (event.which === 13) {
    todos.push(this.value)
    this.value = ''
    renderTodos()
    countTodos()
    pickForMe()
  }
}

todoList.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === 'remove-todo') {
    todos.splice(clickedElement.dataset.index, 1)
    renderTodos()
  }
}

todoCount.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === 'clear-all') {
    todos.splice(0)
    renderTodos()
    countTodos()
  }
}

cantDecide.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === "cant-decide") {
    var suggestion = todos[Math.floor(Math.random() * todos.length)];
    alert("Do this: " + suggestion)
  }
}
