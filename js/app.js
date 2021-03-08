const pomodoroWorker = new Worker("./js/pomodoro_worker.js");
const controlButton = document.getElementById("control-btn");
const stopButton = document.getElementById("stop-btn");
const playButton = "fa-play-circle";
const pauseButton = "fa-pause-circle";
const tomatoImage = `<img src="./favicon-32.png" alt="tomato">`;
const pomodoroEndSound = "./ding.mp3";
let isPaused = false;

function toggleControlButton() {
  if (controlButton.classList.contains(playButton)) {
    controlButton.classList.replace(playButton, pauseButton);
    return;
  }

  if (controlButton.classList.contains(pauseButton)) {
    controlButton.classList.replace(pauseButton, playButton);
    return;
  }
}

function controlButtonHandler() {
  const controlButtonClass = controlButton.classList[0];
  switch (controlButtonClass) {
    case playButton:
      startTimer();
      if(!isPaused) {
        clearBar();
      } else {isPaused = false;}
      toggleControlButton();
      hideStopButton();
      break;
    case pauseButton:
      pauseTimer();
      toggleControlButton();
      showStopButton();
      break;
  }

  function showStopButton() {
    stopButton.style.display = "inline";
  }

  function pauseTimer() {
    isPaused = true;
    pomodoroWorker.postMessage("pause");
  }

  function startTimer() {
    pomodoroWorker.postMessage("start");
  }
}

function hideStopButton() {
  stopButton.style.display = "none";
}

function stopButtonHandler() {
  isPaused = false;
  stopTimer();
  playSound();
  hideStopButton();

  function stopTimer() {
    pomodoroWorker.postMessage("stop");
  }
}

controlButton.addEventListener("click", () => {
  controlButtonHandler();
});

stopButton.addEventListener("click", () => {
  stopButtonHandler();
});

function playSound() {
  const audio = new Audio(pomodoroEndSound);
  audio.play();
}

pomodoroWorker.onmessage = function (message) {
  switch (message.data.action) {
    case "updateTimerElement":
      document.getElementById(
        "timer"
        ).innerText = message.data.actionData;
      break;
    case "updateProgressBar":
      document.getElementById(
        "progress-bar"
      ).innerHTML += tomatoImage;
      break;
    case "stopTimer":
      stopButtonHandler();
      toggleControlButton();
      break;
  }
};

function clearBar() {
  document.getElementById(
    "progress-bar"
    ).innerHTML = " ";
  }
