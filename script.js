const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

const format12Button = document.getElementById("format12");
const format24Button = document.getElementById("format24");

let use24HourFormat = false;

function updateClock() {

    const now = new Date();

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !use24HourFormat
    };

    timeElement.textContent =
        new Intl.DateTimeFormat(
            undefined,
            options
        ).format(now);

    dateElement.textContent =
        new Intl.DateTimeFormat(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        ).format(now);
}

format12Button.addEventListener("click", () => {

    use24HourFormat = false;

    format12Button.classList.add("active");
    format24Button.classList.remove("active");

    updateClock();
});

format24Button.addEventListener("click", () => {

    use24HourFormat = true;

    format24Button.classList.add("active");
    format12Button.classList.remove("active");

    updateClock();
});

updateClock();

setInterval(updateClock, 1000);

const stopwatchDisplay = document.getElementById("stopwatch");

const startButton = document.getElementById("startBtn");

const pauseButton = document.getElementById("pauseBtn");

const resetButton = document.getElementById("resetBtn");

const statusElement = document.getElementById("status");

let elapsedTime = 0;
let startTime = 0;
let stopwatchInterval = null;

function formatStopwatch(milliseconds) {

    const totalMilliseconds = Math.floor(milliseconds);

    const hours = Math.floor(totalMilliseconds / 3600000);

    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);

    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);

    const format = number => String(number).padStart(2, "0");

    return (
        format(hours) + ":" +
        format(minutes) + ":" +
        format(seconds)
    );
}

function updateStopwatch() {

    const currentElapsed = elapsedTime + (Date.now() - startTime);

    stopwatchDisplay.textContent = formatStopwatch(currentElapsed);
}

function startStopwatch() {
    if (stopwatchInterval !== null) { return; }

    startTime = Date.now();

    stopwatchInterval = setInterval(updateStopwatch, 100);

    statusElement.textContent = "Stopwatch is running";
}

function pauseStopwatch() {
    if (stopwatchInterval === null) { return; }

    elapsedTime += Date.now() - startTime;

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

    stopwatchDisplay.textContent = formatStopwatch(elapsedTime);

    statusElement.textContent = "Stopwatch paused";
}

function resetStopwatch() {

    clearInterval(stopwatchInterval);

    stopwatchInterval = null;

    elapsedTime = 0;

    startTime = 0;

    stopwatchDisplay.textContent = "00:00:00";

    statusElement.textContent = "Stopwatch is ready";
}

startButton.addEventListener("click", startStopwatch);

pauseButton.addEventListener("click", pauseStopwatch);

resetButton.addEventListener("click", resetStopwatch);