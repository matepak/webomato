import Task from './tasks.js';

const pomodoroWorker = new Worker('./js/pomodoro_worker.js');

const controlButton = document.getElementById('control-btn');
const taskField = document.getElementById('task-field');
const stopButton = document.getElementById('stop-btn');
const playButton = 'fa-play-circle';
const pauseButton = 'fa-pause-circle';
const tomatoImage = '<img src="./favicon-32.png" alt="tomato">';
const pomodoroEndSound = './ding.mp3';

let currentTask = {};
let isPaused = false;

// (function init() {
//   currentTask = Task.createTask('task_place_holder');
//   taskField.innerText = currentTask.taskTitle;
// }());

function toggleControlButton() {
  if (controlButton.classList.contains(playButton)) {
    controlButton.classList.replace(playButton, pauseButton);
    return;
  }

  if (controlButton.classList.contains(pauseButton)) {
    controlButton.classList.replace(pauseButton, playButton);
  }
}
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
