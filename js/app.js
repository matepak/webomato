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
  moonDarkModeButton,
  sunDarkModeButton,
  tomatoImage,
  pomodoroEndSound
} from './const.js';

let timeInput = document.querySelector('#pomodoro-time');
let shortBreakInput = document.querySelector('#short-break-time');
let longBreakInput = document.querySelector('#long-break-time');
let longBreakIntervalInput = document.querySelector('#long-break-after');
let isIndarkMode = false;
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

function cssClassTogler(element, firstClass, secondClass) {
  return () => {
    if (element.classList.contains(firstClass)) {
      element.classList.replace(firstClass, secondClass);
      return;
    }

    if (element.classList.contains(secondClass)) {
      element.classList.replace(secondClass, firstClass);
      return;
    }
  };
}

function darkMode() {
  document.querySelector('ul')
  .classList.add('dark-mode');
  document.querySelector('.flex-container')
  .classList.add('dark-mode');
  document.querySelector('.base-container')
  .classList.add('dark-mode');
  settingsContainer.classList.add('dark-mode');
  }

function lightMode() {
  document.querySelector('ul')
  .classList.remove('dark-mode');
  document.querySelector('.flex-container')
  .classList.remove('dark-mode');
  document.querySelector('.base-container')
  .classList.remove('dark-mode');
  settingsContainer.classList.remove('dark-mode');
  }



const toggleControlButton = cssClassTogler(controlButton, playButton, pauseButton);
const toggleDarkModeButton = cssClassTogler(darkModeButton, moonDarkModeButton, sunDarkModeButton);
const togleSettingsVisibility = cssClassTogler(
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

darkModeButton.addEventListener('click', () => {
  toggleDarkModeButton();
  if(!isIndarkMode) {
    darkMode();
    isIndarkMode = true;
    return;
  }
  if(isIndarkMode) {
    lightMode();
    isIndarkMode = false;
    return;
  }
});

settingsButton.addEventListener('click', () => {togleSettingsVisibility()});
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
