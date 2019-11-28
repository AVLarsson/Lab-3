"use strict";

window.onload = function() {
    printDate();
}

let date = new Date();
function printDate() {
    date.setDate(1);
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