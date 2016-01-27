// Variables

var todos = []
var newTodoInput = document.getElementById('new-todo-input')
var todoList = document.getElementById('todo-list')
var todoCount = document.getElementById('todo-count')
var cantDecide = document.getElementById('cant-decide')

// Renderers

function renderAll() {
  renderTodos()
  countTodos()
  pickForMe()
}

function renderTodos() {
  todoList.innerHTML = todos.map(function(todo, index) {
    return '<li>' +
      todo +
      ' <button class="move-up" data-index="' + index + '">↑</button>' +
      ' <button class="move-down" data-index="' + index + '">↓</button>' +
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
  if (todos.length === 0) {
    return cantDecide.innerHTML = "Add some items and we'll suggest one for you."
  }
  cantDecide.innerHTML = '<button class="cant-decide">Can\'t Decide</button>'
}

// ******************************
// Events
// *******************************

// add new todo
newTodoInput.onkeypress = function(event) {
  if (event.which === 13) {
    todos.push(this.value)
    this.value = ''
    renderAll()
  }
}

// manipulate todo
todoList.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === 'move-up') {
    var index = clickedElement.dataset.index
    // console.log('index is ' + index + ' and value is ' + todos[index])
    // console.log('index - 1 = ' + todos[index-1])
    var temp = todos[index-1]
    todos[index-1] = todos[index]
    todos[index] = temp
  }
  if (clickedElement.className === 'move-down') {
    console.log('move down')
  }
  if (clickedElement.className === 'remove-todo') {
    todos.splice(clickedElement.dataset.index, 1)
  }
  renderAll()
}

// clear all
todoCount.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === 'clear-all') {
    todos.splice(0)
    renderAll()
  }
}

// can't decide
cantDecide.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === "cant-decide") {
    var suggestion = todos[Math.floor(Math.random() * todos.length)];
    alert("Do this: " + suggestion)
  }
}
