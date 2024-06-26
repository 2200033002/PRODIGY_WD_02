let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(3, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    lapCount = 0;
    document.getElementById("laps-list").innerHTML = "";
    showButton("PLAY");
}

function lap() {
    lapCount++;
    const lapTime = timeToString(elapsedTime);
    const lapElement = document.createElement("li");
    lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
    document.getElementById("laps-list").appendChild(lapElement);
}

function showButton(buttonKey) {
    const playButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");

    if (buttonKey === "PLAY") {
        playButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    } else {
        playButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    }
}

// Event Listeners
document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);

// Initialize
showButton("PLAY");
