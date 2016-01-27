// Variables

var todos = []
var newTodoInput = document.getElementById('new-todo-input')
var todoList = document.getElementById('todo-list')
var todoCount = document.getElementById('todo-count')

// renders

function renderTodos() {
  todoList.innerHTML = todos.map(function(todo, index) {
    return '<li>' +
      todo +
      ' <button class="remove-todo" data-index="' + index + '">X</button>' +
    '</li>'
  }).join('')
}

function countTodos() {
  todoCount.innerHTML = '<strong>Items:</strong> ' + todos.length
  console.log(todos.length)
}

// Events

newTodoInput.onkeypress = function(event) {
  if (event.which === 13) {
    todos.push(this.value)
    this.value = ''
    renderTodos()
    countTodos()
  }
}

todoList.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === 'remove-todo') {
    todos.splice(clickedElement.dataset.index, 1)
    renderTodos()
  }
}
