function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('ampm').textContent = ampm;
    
    document.getElementById('date').textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

function setTheme(theme) {
    document.body.className = theme;
}

let alarmTime = null;
let alarmSound = new Audio('alarmsound.wav'); // Using the local alarm sound file

function setAlarm() {
    alarmTime = document.getElementById('alarmTime').value;
    alert(`Alarm set for ${alarmTime}`);
}

function checkAlarm() {
    let now = new Date();
    let currentTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
    
    if (currentTime === alarmTime) {
        let container = document.querySelector('.container');
        container.classList.add('animate');
        alarmSound.loop = true;
        alarmSound.play();
        
        setTimeout(() => {
            alert("⏰ Alarm ringing!");
            container.classList.remove('animate');
            alarmSound.pause();
            alarmSound.currentTime = 0;
            alarmTime = null;
        }, 100);
    }
}
setInterval(checkAlarm, 1000);

let stopwatchInterval, stopwatchTime = 0;
function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            document.getElementById('stopwatchDisplay').textContent = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
        }, 1000);
    }
}
function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}
function resetStopwatch() {
    stopwatchTime = 0;
    document.getElementById('stopwatchDisplay').textContent = "00:00:00";
}

let countdownInterval;
function startCountdown() {
    let timeLeft = parseInt(document.getElementById('countdownInput').value, 10);
    if (isNaN(timeLeft) || timeLeft <= 0) return;
    
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert("⏳ Countdown Complete!");
        }
        document.getElementById('countdownDisplay').textContent = new Date(timeLeft * 1000).toISOString().substr(14, 5);
        timeLeft--;
    }, 1000);
}