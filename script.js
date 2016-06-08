// Variables

var todos = []
var newTodoTitle = document.getElementById('new-todo-title')
var newTodoDescription = document.getElementById('new-todo-description')
var todoList = document.getElementById('todo-list')
var todoCount = document.getElementById('todo-count')
var cantDecide = document.getElementById('cant-decide')

// Renderers

function renderAll() {
  renderTodos()
  renderTodosCount()
  renderCantDecideInstructionsOrButton()
}

function renderTodos() {
  // change the innerHTML of todoList to the following
  todoList.innerHTML = todos.map(function(todo, index) {
    return '<li>' +
      //display a checkbox
      '<input ' +
        'type="checkbox" ' +
        'value="' + todo.title + '" ' +
        'data-index="' + index + '" ' +
        'id="' + todo.title + '" ' +
        (todo.isComplete === true ? 'checked ' : '') +
      '>' +
      // display the todo title with description when you mouse over
      '<label for="' + todo.title + '" title="' + todo.description + '">' +
        todo.title +
      '</label>' +
      // display up button if not the first list item
      (index > 0 ? ' <button class="move-up" data-index="' + index + '">↑</button>' : '') +
      // display down button if not the last list item
      (index !== todos.length - 1 ? ' <button class="move-down" data-index="' + index + '">↓</button>' : '') +
      ' <button class="remove-todo" data-index="' + index + '">X</button>' +
    '</li>'
  // join together all the list items into a single string to put into the innerHTML
  }).join('')
}

function renderTodosCount() {
  if (todos.length === 0) {
    return todoCount.innerHTML = ''
  }
  todoCount.innerHTML =
    '<strong>Items:</strong> ' +
    todos.length +
    ' <button class="clear-all">Clear All</button>' +
    ' <button class="clear-completed">Clear Completed</button>'
}

function renderCantDecideInstructionsOrButton() {
  if (todos.length === 0) {
    return cantDecide.innerHTML = "Add some items and we'll suggest one for you."
  }
  cantDecide.innerHTML = '<button class="cant-decide">Can\'t Decide</button>'
}

// ******************************
// Events
// *******************************

// add new todo
document.getElementById('new-todo').onsubmit = function(event) {
  // Prevents the form from accidentally submitting.
  event.preventDefault()
  // adds the value of the Title box to the todo array
  todos.push({
    title: newTodoTitle.value,
    description: newTodoDescription.value,
    isComplete: false
  })
  // reset form fields
  newTodoTitle.value = ''
  newTodoDescription.value = ''
  // update everything on the page
  renderAll()
}

// manipulate todo
todoList.onclick = function(event) {
  var clickedElement = event.target
  var index = parseInt(clickedElement.dataset.index)
  // if the user checked the checkbox, toggle isComplete
  if (clickedElement.type === 'checkbox') {
    todos[index].isComplete = !todos[index].isComplete
    renderAll()
  }
  // if the user clicked move up, move the item up
  if (clickedElement.className === 'move-up') {
    var temp = todos[index-1]
    todos[index-1] = todos[index]
    todos[index] = temp
    renderAll()
  }
  // if the user clicked move down, move the item down
  if (clickedElement.className === 'move-down') {
    var temp = todos[index+1]
    todos[index+1] = todos[index]
    todos[index] = temp
    renderAll()
  }
  // if the user clicked the remove button, remove the todo
  if (clickedElement.className === 'remove-todo') {
    todos.splice(index, 1)
    renderAll()
  }
}

// clear all, clear completed
todoCount.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === 'clear-all') {
    todos = []
    renderAll()
  }
  if (clickedElement.className === 'clear-completed') {
    todos = todos.filter(function(todo) {
      return !todo.isComplete
    })
    renderAll()
  }
}

// can't decide
cantDecide.onclick = function(event) {
  var clickedElement = event.target
  if (clickedElement.className === "cant-decide") {
    var suggestion = todos[Math.floor(Math.random() * todos.length)];
    alert("Do this: " + suggestion.title)
  }
}
