/** Show clock */
function renderTime() {
    // Date
    let myDate = new Date();
    let day = myDate.getDay();
    let month = myDate.getMonth();
    let daym = myDate.getDate();
    let dayArray = new Array("Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag");
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