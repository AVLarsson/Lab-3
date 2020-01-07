/** Show clock */
function renderTime() {
    // Date
    let dateObj = new Date();
    let day = dateObj.getDay();
    let month = dateObj.getMonth();
    let date = dateObj.getDate();
    let days = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
    let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    // Time
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    if (hours === 24) {
        hours = 0;
    }
    else if (hours > 12) {
        hours = hours - 0;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let clock = document.getElementById("clockDisplay");
    clock.textContent = days[day] + " " + date + "/" + months[month] + " " + hours + ":" + minutes + ":" + seconds;
    clock.innerText = days[day] + " " + date + "/" + months[month] + " " + hours + ":" + minutes + ":" + seconds;
    setTimeout("renderTime()", 1000);
}