"use strict";

/* On load, print days, show clock and add event listener to add button */
window.addEventListener('load', () => {
    printDate();
    renderTime();
    document.getElementById('add').addEventListener('click', addToDo);
})

// Global variable shared and used by printDate() and moveDate().
// Needs to be worked into/communicated between each function.
let date = new Date();

/** Print content for each day */
function printDate() {
    printToDos();
    date.setDate(7);
    let day = date.getDay();
    let today = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let endDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    let previousDate = new Date(currentYear, currentMonth, 0).getDate();
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    document.getElementById("month").innerHTML = months[currentMonth] + " " + currentYear;
    let cells = "";
    for (let number = day; number > 0; number--) {
        cells += "<div class='previous_date'>" + (previousDate - number + 1) + "</div>";
    }
    for (let i = 1; i <= endDate; i++) {
        let dayContent = dayNumber(i, currentMonth, currentYear);


        if (i == today.getDate() && currentMonth == today.getMonth()) {
            cells += "<div class='today'>" + dayContent + "</div>"
        }
        else {
            cells += "<div>" + dayContent + "</div>";
        }
        document.getElementsByClassName('days')[0].innerHTML = cells;
    }
}

/**
 * Create content for each day
 * @param {number} calDate 
 * @param {number} calMonth 
 * @param {number} calYear 
 * @returns {[string | number]} dateContent
 */
function dayNumber(calDate, calMonth, calYear) {
    const allToDos = getToDoList();
    let dateContent = [];
    calMonth = calMonth + 1;
    // Check if to dos exist
    if (allToDos.length) {
        allToDos.forEach(function (toDo) {
            const newDate = new Date(toDo[1]);
            let toDoDate = newDate.getDate();
            let toDoMonth = newDate.getMonth();
            toDoMonth += 1;
            let toDoYear = newDate.getFullYear();

            if (calYear = toDoYear) {
                if (calMonth === toDoMonth) {
                    if (calDate === toDoDate) {

                        // Create HTML element, add content and remove button

                        let div = document.createElement('div');
                        div.classList.add('savedtodo');
                        div.innerHTML = toDo[0];
                        dateContent.push(div.outerHTML)
                        dateContent.join(" ");
                    }
                }
            }
        })

        // Add date number and number of tasks
        if (0 < dateContent.length) {
            dateContent.unshift("<span class='task_number'>" + dateContent.length + " task(s)</span>");
        }
        dateContent.unshift("<span class='date_number'>" + calDate + "</span>");
    }
    // Check if to dos don't exist
    else if (!allToDos.length) {
        dateContent.push(calDate);
    }
    // Return content to print to array
    return dateContent.join(" ");
}

/**
 * Change month in calendar view
 * @param {string} button 
 */
function moveDate(button) {
    if (button == 'previous') {
        date.setMonth(date.getMonth() - 1);
    }
    else if (button == 'next') {
        date.setMonth(date.getMonth() + 1);
    }
    printDate();
}

/**
 * Recieve saved to dos as array
 * @returns {string[]} allToDos
 */
function getToDoList() {
    let allToDos = [];
    let toDoContent = localStorage.getItem('todo');
    if (toDoContent !== null) {
        allToDos = JSON.parse(toDoContent);
    }
    event.preventDefault();
    return allToDos;
}

/**
 * Save user input as to do
 * @returns {boolean} false
 */
function addToDo() {
    let toDo = [];
    let task = document.getElementById('inputText').value;
    let date = document.getElementById('inputDate').value;

    // Check if input fields are empty
    if (task == (null || undefined || "") ||
        date == (null || undefined || "")) {
            showWarning();
    }
    else if (date && task) {
        let allToDos = getToDoList();
        toDo.push(task, date);
        allToDos.push(toDo);
        localStorage.setItem('todo', JSON.stringify(allToDos));
    }

    printDate();

    return false;
}

/** Replace button text to warning if no user input */
function showWarning() {
    const button = document.getElementById('add');
    let originalText = button.innerText;
    button.innerText = "Vänligen fyll i alla fält korrekt.";
    button.classList.add('red');
    setTimeout(function () {
        button.innerText = originalText;
        button.classList.remove('red');
    }, 1500);
}

/**
 * Remove to do 
 * @returns {boolean} false
 */
function removeToDo() {
    let id = event.currentTarget.getAttribute('id');
    let allToDos = getToDoList();
    allToDos.splice(id, 1);
    console.log(localStorage);
    
    localStorage.setItem('todo', JSON.stringify(allToDos));
    printDate();
    return false;
}

/**
 * Print to do list
 * @returns addRemoveButtons - prevent page reload and fire addRemoveButtons function.
 */
function printToDos() {
    let allToDos = getToDoList();
    let listElement = document.querySelector('.alltodos');
    let ul = document.createElement('ul');
    
    allToDos.forEach(function (toDo) {
        let removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.setAttribute('id', allToDos.indexOf(toDo));
        removeButton.innerHTML = 'x';

        let li = document.createElement('li');
        li.append(toDo[1] + ": " + toDo[0]);
        li.appendChild(removeButton);
        ul.append(li);
        
    });
    listElement.innerHTML = "";
    listElement.append(ul);

    event.preventDefault();
    return addRemoveButtons();
}

/**
 * Adds remove button for each to do in to do list.
 */
function addRemoveButtons() {
    let removeButton = document.getElementsByClassName('remove');
    for (let iTwo = 0; iTwo < removeButton.length; iTwo++) {
        removeButton[iTwo].addEventListener('click', removeToDo);
    }
    event.preventDefault();
    return false;
} 

/**
 * (skriv vad den gör här, t ex Show calendar)
 */
function myFunction() {
    let x = document.getElementById("showCalendar");
    if (x.classList.contains("showCalendar")) {
        x.classList.remove("showCalendar");
    }
    else {
        x.classList.add("showCalendar");
    }

    event.preventDefault();
}