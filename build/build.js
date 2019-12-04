"use strict";
window.onload = function () {
    renderTime();
    document.getElementById('add').addEventListener('click', addToDo);
    printDate();
    printToDos();
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
    let matches = compareDates();

    for (let i = 1; i <= endDate; i++) {
        let matchingDate = compare(endDate);
        console.log('result', matchingDate, endDate);
        if (i == today.getDate() && currentMonth == today.getMonth()) {
            cells += "<div class='today'>" + i + "<div class='savedtodo'></div></div>";
        }
        else {
            cells += "<div>" + i + "<div class='savedtodo'></div></div>";
        }
        document.getElementsByClassName("days")[0].innerHTML = cells;
    }
}
function moveDate(button) {
    if (button == "previous") {
        date.setMonth(date.getMonth() - 1);
    }
    else if (button == 'next') {
        date.setMonth(date.getMonth() + 1);
    }
    printDate();
    printToDos()
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
    printToDos();
    makeToDoObject();
    makeCalendarDateObject();
    printDate();
    // event.preventDefault();
    return false;
}
function removeToDo() {
    let id = this.getAttribute('id');
    let allToDos = getToDoList();
    allToDos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(allToDos));
    printToDos();
    printDate();
    event.preventDefault();
    return false;
}
/**
 * Print to dos in calendar
 */
function printToDos() {
    printDate();
    let allToDos = getToDoList();           // Recieve to do list
    let toDoList = makeToDoObject();
    let calDate = makeCalendarDateObject();
    let dateMatch = compareDates();

    let calendarDays = Array.from(document.querySelectorAll('.days>div'))
    let calendarDates = document.querySelectorAll('.savedtodo');

    for (let i = 0; i < dateMatch.length; i++) {
        calendarDays[i].innerHTML = 'hej'
        console.log(calendarDays);
    }
    for (let i = 0; i < allToDos.length; i++) { // Loop through to dos
        let toDoContent = '<div class="savedtodo"><ul>'; // To Do content
        let toDo = allToDos[i][1];
        toDo = new Date(toDo);
        let toDoDate = toDo.getDate() - 1;
        let toDoMonth = toDo.getMonth() + 1;

        toDoContent +=
            '<li id="' + i + '">' + allToDos[i][0] +
            '</li><li>' + allToDos[i][1] +
            '</li><li>' + '<button class="remove" id="' + i + '">x</button></li>';
        toDoContent += '</ul></div';

        // calendarDates[toDoDate].innerHTML = toDoContent;
    }
    let removeButton = document.getElementsByClassName('remove');
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener('click', removeToDo);
    }
    event.preventDefault();
}
function compare(enddate) {
    let matchingDate = compareDates();

    for (let i = 0; i < enddate; i++) {
        let match = new Date(matchingDate[i]);
        match = match.getDate();
        console.log(matchingDate[i], i);


        if (match = i) {
            console.log('if', match, i);
            return match.getDate()
        }
        else {
            i++
            console.log('else', i);

        }

    }
}
function makeToDoObject() {
    const allToDos = getToDoList();
    let toDoList = {};
    let toDoFullDate;

    for (let i = 0; i < allToDos.length; i++) { // Loop through to dos
        let toDo = allToDos[i][1];
        const toDoText = allToDos[i][0];

        toDo = new Date(toDo);
        toDoFullDate =
            toDo.getFullYear() + "-" +
            (toDo.getMonth() + 1) + "-" +
            toDo.getDate();
        toDoList[toDoFullDate] = toDoText
    }
    return toDoList;
}

function makeCalendarDateObject() {
    let calendarDates = document.querySelectorAll('.days>div:not(.previous_date)');  // Select all dates in shown month
    let calendarDatesList = Array.from(calendarDates); // Convert NodeList of calendar dates to array

    // Select month + year heading
    let shownMonthYear = document.querySelector('#month');

    shownMonthYear = shownMonthYear.innerText;
    shownMonthYear = shownMonthYear.toString();

    let calDate = {}
    let fullDate;

    for (let i = 0; i < calendarDatesList.length; i++) {                              // Loop through shown dates
        let monthYear = shownMonthYear.split(' ');                                  // Split month and year string in two, each on separate index
        let date = calendarDatesList[i];                                              // Variable for each calendar date
        const dateContent = date.innerText;                                         // Variable for calendar date number

        let dateArr = []                                                            // Array for each date (date, month, year)
        date = dateContent.toString();                                              // Convert to string
        monthYear.unshift(date);                                                    // Put date at first index of array, array is now "date", "month", "year"
        monthYear.forEach(date => {
            dateArr.push(date);
        });
        dateArr = new Date(dateArr);
        fullDate =
            dateArr.getFullYear() + "-" +
            (dateArr.getMonth() + 1) + "-" +
            dateArr.getDate();

        // Push each full date to full list of calendar dates
        calDate[fullDate] = ""
    }
    return calDate;
}

function compareDates() {
    let calDate = makeCalendarDateObject();
    let toDoList = makeToDoObject();
    let dateMatch = []

    for (let key in calDate) {
        if (calDate.hasOwnProperty(key)) {
            let date = new Date(key);
            if (toDoList.hasOwnProperty(key)) {
                key = date
                dateMatch.push(key)
            }
        }
    }
    return dateMatch;
}

/**
 * let matchingDate = compareDates(endDate);
 *
 * let match = matchingDate.getDate();
 * for (let i = 0; i < endDate; i++) {
       if (match = i) {
           return match
       }
       else {
           return i
       }
  }
 */

/**
 * för varje DAG i KALENDER
 * printa ut dag och
 * OM idag - printa ut extra klass och
 *      OM date match
 *          printa ut todo
 *      printa stängdiv
 * ANNARS
 *      printa ut div
 *          OM date match
 *              printa ut todo
 *      printa ut datum o slutdiv
 *
 */