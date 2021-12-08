import {
  pomodoroWorker,
  controlButton,
  settingsButton,
  settingsContainer,
  stopButton,
  playButton,
  pauseButton,
  pomodoroEndSound,
} from './const.js';

import { progressBar } from './progress_bar.js';
import { cssClassTogler } from './css_class_togler.js';
import './dark_mode.js';

let timeInput = document.querySelector('#pomodoro-time');
let shortBreakInput = document.querySelector('#short-break-time');
let longBreakInput = document.querySelector('#long-break-time');
let longBreakIntervalInput = document.querySelector('#long-break-after');
let isPaused = false;
let isStarted = false;
let lock = null;

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      lock = await navigator.wakeLock.request();
      lock.addEventListener('release', () => {
        console.log('wakelock released:', lock.released);
      });
    } catch (ex) {
      console.error(ex.message);
    }
  }
}

function initWorker() {
  if (isStarted || isPaused) return;
  pomodoroWorker.postMessage({
    message: 'init',
    args: {
      pomodoroTime: timeInput.value,
      shortBreakTime: shortBreakInput.value,
      longBreakTime: longBreakInput.value,
      longBreakAfterInterval: longBreakIntervalInput.value,
    },
  });
}

initWorker();

const toggleControlButton = cssClassTogler(
  controlButton,
  playButton,
  pauseButton,
);

const toggleSettingsVisibility = cssClassTogler(
  settingsContainer,
  'container-settings-hidden',
  'container-settings-visible',
);

function showStopButton() {
  stopButton.style.display = 'inline';
}

function pauseTimer() {
  isPaused = true;
  pomodoroWorker.postMessage({ message: 'pause' });
}

async function startTimer() {
  await requestWakeLock();
  pomodoroWorker.postMessage({ message: 'start' });
  isStarted = true;
}

function stopTimer() {
  if (lock) lock.release();
  pomodoroWorker.postMessage({ message: 'stop' });
  isStarted = false;
}

function clearBar() {
  document.getElementById('progress-bar-container').innerHTML =
    progressBar.reset();
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
  audio.addEventListener("canplaythrough", event => {
    audio.play();
  });
}

function stopButtonHandler() {
  isPaused = false;
  stopTimer();
  playSound();
  hideStopButton();
  progressBar.reset();
}
controlButton.addEventListener('click', () => {
  controlButtonHandler();
});

stopButton.addEventListener('click', () => {
  stopButtonHandler();
});

settingsButton.addEventListener('click', () => {
  toggleSettingsVisibility();
});

document.querySelector("#setings-confirmation-button")
.addEventListener('click', () => {
  initWorker();
});

pomodoroWorker.onmessage = (message) => {
  switch (message.data.action) {
    case 'updateTimerElement':
      if (isStarted) {
        document.getElementById('progress-bar-container').innerHTML =
          progressBar.getBar(message.data.actionData.secondsToEnd);
      }
      document.getElementById('timer').innerText =
        message.data.actionData.timer;
      break;
    case 'stopTimer':
      stopButtonHandler();
      toggleControlButton();
      break;
    default:
  }
};
