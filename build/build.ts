"use strict";

window.onload = function () {
    printDate();
    renderTime();

    document.getElementById('add').addEventListener('click', addToDo);
    printToDos();
}


let date = new Date();

function printDate() {
    date.setDate(7);

    let day = date.getDay();
    let today = new Date();

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

function getToDoList(): String[] {
    let allToDos: Array<String> = []
    let toDoContent = localStorage.getItem('todo');
    if (toDoContent !== null) {
        allToDos = JSON.parse(toDoContent);
    }

    event.preventDefault();

    return allToDos;
}

function addToDo() {
    let toDo: String[]
    let task = document.getElementById('inputText').value;
    let date = document.getElementById('inputDate').value;
    
    let allToDos = getToDoList();
    toDo.push(task, date);
    allToDos.push(toDo.toString());
    localStorage.setItem('todo', JSON.stringify(allToDos));

    printToDos();

    event.preventDefault();

    return false;
}

function removeToDo(): boolean {
    let id: Number = this.getAttribute('id');
    this.parentNode
    console.log(this.parentNode.parentNode);

    let allToDos = getToDoList();
    allToDos.splice(id, 0);
    localStorage.setItem('todo', JSON.stringify(allToDos));

    printToDos();

    event.preventDefault();

    return false;
}

function printToDos() {
    let allToDos = getToDoList();

    let toDoContent: String = '<ul>';
    for (let i = 0; i < allToDos.length; i++) {
        toDoContent += 
        '<li>' + allToDos[i][0] + 
        '</li><li>' + allToDos[i][1] + 
        '</li><li>' + '<button class="remove" id="' + i + '">x</button></li>';
    }
    toDoContent += '</ul>';

    let calendarDates = document.querySelectorAll('.days>div');
    for (let i = 0; i < calendarDates.length; i++) {
        let dayDate = calendarDates[i];
        dayDate.innerHTML = toDoContent
    }

    let removeButton = document.getElementsByClassName('remove');
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener('click', removeToDo);
    };

    // for (let i = 0; i < calendarDays.length; i++) {
    //     let day = calendarDays[i];
    //     let dayNumber = day.innerHTML

    //     // console.log(day.innerHTML);

    //     day.innerHTML += html
    //     allToDos.forEach(element => {
    //         let toDoInput = new Date(allToDos[1])
    //         let taskDate = toDoInput.getDate()
    //         taskDate = taskDate.toString()


    //         if (taskDate === dayNumber) {
    //             console.log(dayNumber);
    //         }

    //     });
    // };
    event.preventDefault();
}