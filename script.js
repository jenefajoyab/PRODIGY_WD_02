let startTime;
let running = false;
let laps = [];

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - getTotalPausedTime();
        running = true;
        updateDisplay();
        startInterval();
    }
}

function pauseStopwatch() {
    if (running) {
        running = false;
        updateDisplay();
        clearInterval(interval);
    }
}

function resetStopwatch() {
    if (!running) {
        startTime = undefined;
        laps = [];
        updateDisplay();
        clearInterval(interval);
    }
}

function recordLap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateDisplay() {
    const elapsedTime = running ? Date.now() - startTime : getTotalPausedTime();
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(millisecondsFormatted)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function getTotalPausedTime() {
    const pausedTime = laps.reduce((total, lap) => total + lap, 0);
    return pausedTime;
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsList.appendChild(lapItem);
    });
}

let interval;

function startInterval() {
    interval = setInterval(updateDisplay, 10);
}
