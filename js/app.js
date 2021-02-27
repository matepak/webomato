import { controlButton, stopButton } from "./variables.js";

let pomodoroWorker = new Worker("./js/pomodoro_worker.js");

function controlButtonHandler() {
  switch (controlButton.classList[1]) {
    case "fa-play-circle":
      clearBar();
      pomodoroWorker.postMessage("start");
      controlButton.className = "far fa-pause-circle fa-5x";
      stopButton.style.display = "none";
      break;
    case "fa-pause-circle":
      pomodoroWorker.postMessage("pause");
      controlButton.className = "far fa-play-circle fa-5x";
      stopButton.style.display = "inline";
      break;
  }
}

function stopButtonHandler() {
  playSound();
  pomodoroWorker.postMessage("stop");
  stopButton.style.display = "none";
  controlButton.className = "far fa-play-circle fa-5x"
}

controlButton.addEventListener("click", () => {
  controlButtonHandler();
});

stopButton.addEventListener("click", () => {
  stopButtonHandler();
});

function playSound() {
  let audio = new Audio("./ding.mp3");
  audio.play();
}

pomodoroWorker.onmessage = function (message) {
  switch (message.data.action) {
    case "updateTimerElement":
      document.getElementById("timer").innerText = message.data.actionData;
      break;
    case "updateProgressBar":
      document.getElementById(
        "progress-bar"
      ).innerHTML += `<img src="./favicon-32.png" alt="tomato">`;
      break;
    case "stopTimer":
      stopButtonHandler();
      break;
  }
};

function clearBar() {
  document.getElementById("progress-bar").innerHTML = " ";
  }