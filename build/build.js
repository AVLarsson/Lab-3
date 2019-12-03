"use strict";

window.onload = function () {
    printDate();
    renderTime();
    document.getElementById('submit').addEventListener('click', addToDo);
    printToDos();
}


let date = new Date();

function printDate() {
    date.setDate(7);
    console.log(date);

    let day = date.getDay();
    let today = new Date();

    console.log(today);

    let currentMonth = date.getMonth()
    let currentYear = date.getFullYear()
    let endDate = new Date(currentYear, currentMonth + 1, 0).getDate();


    let previousDate = new Date(currentYear, currentMonth, 0).getDate();
    const months = [
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
        if (i == today.getDate() && currentMonth == today.getMonth()) cells += "<div class='today'>" + i + "</div>";
        else
            cells += "<div>" + i + "</div>";
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;

}

function moveDate(para) {
    if (para == "previous") {
        date.setMonth(date.getMonth() - 1);
    } else if (para == 'next') {
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
    } else if (h > 12) {
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

// function addEventListeners() {
//     let toDoList = [];
//     const submitButton = document.querySelector('button');
//     submitButton.addEventListener('click', function () {
//         addToDo();
//     });
// }

// function addToDo() {
//     let inputDate = document.querySelector()
// }

function get_todos() {
    var allToDos = new Array;
    var allToDos_str = localStorage.getItem('todo');
    if (allToDos_str !== null) {
        allToDos = JSON.parse(allToDos_str);
    }

    event.preventDefault();
    return allToDos;
}

function addToDo() {
    let task = document.getElementById('addtodo').value;
    let date = document.getElementById('indate').value
    let allToDos = get_todos();
    allToDos.push(task + date);
    localStorage.setItem('todo', JSON.stringify(allToDos));

    printToDos();

    event.preventDefault();
}

function removeToDo() {
    const id = this.getAttribute('id');
    let allToDos = get_todos();
    allToDos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(allToDos));

    printToDos();
    // event.preventDefault();

    return false;
}

function printToDos() {
    let allToDos = get_todos();
    
    let html = '<ul>';
    for (var i = 0; i < allToDos.length; i++) {
        html += '<li>' + allToDos[i] + '<button class="remove" id="' + i + '">x</button></li>';
    };
    html += '</ul>';
    
    let calendarDays = document.querySelectorAll('.days>div')

    
    for (let i = 0; i < calendarDays.length; i++) {
        let element = calendarDays[i]
        element.innerHTML += html
        console.log(calendarDays[i]);
    }

    let buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeToDo);
    };
}



// for (let i = 0; i < days.length; i++) {
//     const element = days[i];
//     for (let i = 0; i < task.length; i++) {
//         const element = task[i];

//     }
// }