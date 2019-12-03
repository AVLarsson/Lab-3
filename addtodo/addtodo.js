window.addEventListener('load', function () {
    addEventListeners();
});
function addEventListeners() {
    var toDoList = [];
    var submitButton = document.querySelector('button');
    submitButton.addEventListener('click', function () {
        addToDo(event, toDoList);
    });
}

/**
 *
 * @param {MouseEvent} event
 * @param {Array<{Number: String}>} list
 */
function addToDo(event, list) {
    var toDoInput = document.querySelector('#addtodo');
    list.push(toDoInput.value);
    console.log(toDoInput)
    event.preventDefault();
}
