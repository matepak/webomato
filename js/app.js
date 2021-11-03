import Task from './tasks.js';

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
const tomatoImage = '<img src="./favicon-32.png" alt="tomato">';
const pomodoroEndSound = './ding.mp3';

let currentTask = {};
let isPaused = false;

// (function init() {
//   currentTask = Task.createTask('task_place_holder');
//   taskField.innerText = currentTask.taskTitle;
// }());

function classTogler(element, firstClass, secondClass) {
  return () => {
    if (element.classList.contains(firstClass)) {
      element.classList.replace(firstClass, secondClass);
      return;
    }

    if (element.classList.contains(secondClass)) {
      element.classList.replace(secondClass, firstClass);
      return;
    }
    console.log('nothing');
  };
}

const toggleControlButton = classTogler(controlButton, playButton, pauseButton);
const toggleDarkModeButton = classTogler(darkModeButton, moonDarkModeButton, sunDarkModeButton);

function showStopButton() {
  stopButton.style.display = 'inline';
}

function pauseTimer() {
  isPaused = true;
  pomodoroWorker.postMessage('pause');
}

function startTimer() {
  pomodoroWorker.postMessage('start');
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

function stopTimer() {
  pomodoroWorker.postMessage('stop');
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
});

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
