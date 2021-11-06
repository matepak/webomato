import {
  pomodoroWorker,
  controlButton,
  settingsButton,
  settingsContainer,
  darkModeButton,
  taskField,
  stopButton,
  playButton,
  pauseButton,
  tomatoImage,
  pomodoroEndSound
} from './const.js';

import {cssClassTogler} from './css_class_togler.js';
import './dark_mode.js';

let timeInput = document.querySelector('#pomodoro-time');
let shortBreakInput = document.querySelector('#short-break-time');
let longBreakInput = document.querySelector('#long-break-time');
let longBreakIntervalInput = document.querySelector('#long-break-after');
let isPaused = false;

function initWorker() {
  pomodoroWorker.postMessage({
    message: 'init', 
    args: {
      pomodoroTime: timeInput.value,
      shortBreakTime: shortBreakInput.value,
      longBreakTime: longBreakInput.value,
      longBreakAfterInterval: longBreakIntervalInput.value
    }})
}

initWorker();

const toggleControlButton = cssClassTogler(controlButton, playButton, pauseButton);

const toggleSettingsVisibility = cssClassTogler(
  settingsContainer,
  'container-settings-hidden',
  'container-settings-visible'
  );

function showStopButton() {
  stopButton.style.display = 'inline';
}

function pauseTimer() {
  isPaused = true;
  pomodoroWorker.postMessage({message: 'pause'});
}

function startTimer() {
  pomodoroWorker.postMessage({message: 'start'});
}

function stopTimer() {
  pomodoroWorker.postMessage({message: 'stop'});
}

function clearBar() {
  document.getElementById('progress-bar').innerHTML = ' ';
}

function hideStopButton() {
  stopButton.style.display = 'none';
}

function controlButtonHandler() {
  const controlButtonClass = controlButton.classList[0];
  switch (controlButtonClass) {
    case playButton:
      startTimer();
      if (!isPaused) {
        clearBar();
      } else {
        isPaused = false;
      }
      toggleControlButton();
      hideStopButton();
      break;
    case pauseButton:
      pauseTimer();
      toggleControlButton();
      showStopButton();
      break;
    default:
  }
}

function playSound() {
  const audio = new Audio(pomodoroEndSound);
  audio.play();
}

function stopButtonHandler() {
  isPaused = false;
  stopTimer();
  playSound();
  hideStopButton();
}

controlButton.addEventListener('click', () => {
  controlButtonHandler();
});

stopButton.addEventListener('click', () => {
  stopButtonHandler();
});

settingsButton.addEventListener('click', () => {toggleSettingsVisibility()});
timeInput.addEventListener('input', () => {initWorker()});
shortBreakInput.addEventListener('input', () => {initWorker()});
longBreakInput.addEventListener('input', () => {initWorker()});
longBreakIntervalInput.addEventListener('input', () => {initWorker()});

pomodoroWorker.onmessage = (message) => {
  switch (message.data.action) {
    case 'updateTimerElement':
      document.getElementById('timer').innerText = message.data.actionData;
      break;
    case 'updateProgressBar':
      document.getElementById('progress-bar').innerHTML += tomatoImage;
      break;
    case 'stopTimer':
      stopButtonHandler();
      toggleControlButton();
      break;
    default:
  }
};
