"use strict";
window.onload = function () {
    printDate();
    renderTime();
    document.getElementById('add').addEventListener('click', addToDo);
    // printToDos();
};
let date = new Date();
function printDate() {
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
    /*document.getElementsByClassName("date").innerHTML = date.toDateString();*/

    let cells = "";
    for (let number = day; number > 0; number--) {
        cells += "<div class='previous_date'>" + (previousDate - number + 1) + "</div>";
    }
    for (let i = 1; i <= endDate; i++) {
        let dayContent = dayNumber(i, currentMonth, currentYear);
        console.log(dayContent);
        if (i == today.getDate() && currentMonth == today.getMonth()) {
            cells += "<div class='today'>" + dayContent + "</div>";
        }
        else {
            cells += "<div>" + dayContent + "</div>";
        }
        document.getElementsByClassName("days")[0].innerHTML = cells;
        let removeButton = document.getElementsByClassName('remove');
        for (let i = 0; i < removeButton.length; i++) {
            removeButton[i].addEventListener('click', removeToDo);
        }
    }
}

function dayNumber(calDate, calMonth, calYear) {
    let allToDos = getToDoList();
    let dateContent = calDate;
    calMonth = calMonth + 1;

    if (allToDos.length) {
        allToDos.forEach(toDo => {
            let newDate = new Date(toDo[1]);
            let toDoContent = toDo[0];

            let toDoDate = newDate.getDate();
            let toDoMonth = newDate.getMonth();
            toDoMonth += 1
            let toDoYear = newDate.getFullYear();
            if (calYear = toDoYear) {
                if (calMonth === toDoMonth) {
                    if (calDate === toDoDate) {
                        for (let i = 0; i < allToDos.length; i++) {
                            dateContent =
                                toDoDate +
                                "<div class='savedtodo'>" +
                                toDoContent +
                                "<button class='remove' id='"
                            }
                            dateContent += allToDos.indexOf(toDo) + "'>x</button></div>"
                    console.log(dateContent);
                    
                        }
                }
            }
            else {
                dateContent = calDate
            }
        })
    }
    else if (!allToDos.length) {
        dateContent = calDate

    }
    return dateContent;
}

function moveDate(button) {
    if (button == "previous") {
        date.setMonth(date.getMonth() - 1);
    }
    else if (button == 'next') {
        date.setMonth(date.getMonth() + 1);
    }
    printDate();
}
function renderTime() {
    // Date
    let myDate = new Date();
    // if (year < 1000) {
    // year += 1900
    // }
    let day = myDate.getDay();
    let month = myDate.getMonth();
    let daym = myDate.getDate();
    let dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    let montArray = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
    // Time
    let currentTime = new Date();
    let h = currentTime.getHours();
    let m = currentTime.getMinutes();
    let s = currentTime.getSeconds();
    if (h === 24) {
        h = 0;
    }
    else if (h > 12) {
        h = h - 0;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    let myClock = document.getElementById("clockDisplay");
    myClock.textContent = "" + dayArray[day] + " " + daym + "/" + montArray[month] + " " + " " + h + ":" + m + ":" + s;
    myClock.innerText = "" + dayArray[day] + " " + daym + "/" + montArray[month] + " " + " " + h + ":" + m + ":" + s;
    setTimeout("renderTime()", 1000);
}
function getToDoList() {
    let allToDos = [];
    let toDoContent = localStorage.getItem('todo');
    if (toDoContent !== null) {
        allToDos = JSON.parse(toDoContent);
    }

    event.preventDefault();
    return allToDos;
}
function addToDo() {
    let toDo = [];
    let task = document.getElementById('inputText').value;
    let date = document.getElementById('inputDate').value;

    let allToDos = getToDoList();
    toDo.push(task, date);
    allToDos.push(toDo);
    localStorage.setItem('todo', JSON.stringify(allToDos));
    printDate();
    
    return false;
}
function removeToDo() {
    let id = event.currentTarget.getAttribute('id');
    let allToDos = getToDoList();
    allToDos.splice(id, 1);
    console.log(id);

    localStorage.setItem('todo', JSON.stringify(allToDos));
    printDate();
    return false;
}