let count = 0;
let historyLog = [];
let lastPressTime = null;
let timerInterval;

function confirmButtonClick() {
    const currentTime = new Date().getTime();
    const timeSinceLastPress = lastPressTime ? currentTime - lastPressTime : 0;

    handleButtonClick(timeSinceLastPress);
    lastPressTime = currentTime;
}

function handleButtonClick(timeSinceLastPress) {
    count++;
    logButtonClick();
    updateLogWindow();
    updateHistory();
    animateButton();
    updatePressCount(timeSinceLastPress);
    startTimer();
}

function logButtonClick() {
    const currentTime = new Date().toLocaleString();
    console.log(`Button pressed ${count} times at ${currentTime}`);
}

function updateLogWindow() {
    const logWindow = document.getElementById('logWindow');
    const currentTime = new Date().toLocaleTimeString();
    logWindow.innerHTML = `<p>Last Pressed At: ${currentTime}</p>`;
}

function updateHistory() {
    const historyDropdown = document.getElementById('historyDropdown');
    const currentTime = new Date().toLocaleString();
    historyLog.push({ count, lastPressedAt: currentTime });
    historyDropdown.innerHTML = '<p>History Log:</p>';
    historyLog.forEach((entry, index) => {
        const formattedTime = entry.lastPressedAt === "Reset" ? "Reset" : new Date(entry.lastPressedAt).toLocaleString();
        historyDropdown.innerHTML += `<p>${formattedTime}: Press Count - ${entry.count}</p>`;
    });
}

function resetCounter() {
    count = 0;
    updateLogWindow();
    updateHistory();
    animateButton();
    updatePressCount(0); // Reset time elapsed
    resetTimer();
}

function clearHistoryLog() {
    count = 0;  // Reset press count
    historyLog = [];
    const historyDropdown = document.getElementById('historyDropdown');
    historyDropdown.innerHTML = '<p>History Log:</p>';
}

function toggleHistory() {
    const historyDropdown = document.getElementById('historyDropdown');
    historyDropdown.style.display = historyDropdown.style.display === 'block' ? 'none' : 'block';
}

function animateButton() {
    const button = document.getElementById('counterButton');
    const pressCount = document.getElementById('pressCount');

    // Apply animation to the button
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 300);

    // Apply animation to the Press Count
    setTimeout(() => {
        pressCount.style.transform = 'scale(1.1)';
        setTimeout(() => {
            pressCount.style.transform = 'scale(1)';
        }, 300);
    }, 150);
}

function updatePressCount(timeSinceLastPress) {
    const pressCount = document.getElementById('pressCount');
    const timeElapsed = document.getElementById('timeElapsed');
    const currentTime = document.getElementById('currentTime');

    if (timeElapsed) {
        timeElapsed.innerText = `Time Elapsed: ${formatTime(timeSinceLastPress)}`;
        timeElapsed.style.display = 'block'; // Show Time Elapsed
    }

    if (currentTime) {
        const currentDateTime = new Date().toLocaleTimeString();
        currentTime.innerText = `Last Pressed At: ${currentDateTime}`;
        currentTime.style.display = 'block'; // Show Current Time
    }

    pressCount.innerText = `Press Count: ${count}`;
}

function startTimer() {
    let seconds = 1; // Start from 1 second
    const timeElapsed = document.getElementById('timeElapsed');
    timerInterval = setInterval(() => {
        timeElapsed.innerText = `Time Elapsed: ${formatTime(seconds * 1000)}`;
        seconds++;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}