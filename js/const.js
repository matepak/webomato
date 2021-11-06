const pomodoroWorker = new Worker('./js/pomodoro_worker.js');
const controlButton = document.getElementById('control-btn');
const settingsButton = document.getElementById('settings');
const settingsContainer = document.getElementById('settings-container');
const darkModeButton = document.getElementById('dark-mode');
const taskField = document.getElementById('task-field');
const stopButton = document.getElementById('stop-btn');
const playButton = 'fa-play-circle';
const pauseButton = 'fa-pause-circle';
const moonDarkModeButton = 'fa-moon';
const sunDarkModeButton = 'fa-sun';
const tomatoImage = '<img src="./assets/img/favicon-32.png" alt="tomato">';
const pomodoroEndSound = './assets/sound/ding.mp3';

export {
        pomodoroWorker,
        controlButton,
        settingsButton,
        settingsContainer,
        darkModeButton,
        taskField,
        stopButton,
        playButton,
        pauseButton,
        moonDarkModeButton,
        sunDarkModeButton,
        tomatoImage,
        pomodoroEndSound
    };