import { controlButton, stopButton } from "./variables.js";

let pomodoroWorker = new Worker("./js/pomodoro_worker.js");

function toggleControlButtonClass() {
  if (controlButton.classList.contains("fa-play-circle")) {
    controlButton.classList.replace("fa-play-circle", "fa-pause-circle");
    return;
  }

  if (controlButton.classList.contains("fa-pause-circle")) {
    controlButton.classList.replace("fa-pause-circle", "fa-play-circle");
    return;
  }
}

function controlButtonHandler() {
  switch (controlButton.classList[0]) {
    case "fa-play-circle":
      clearBar();
      toggleControlButtonClass();
      pomodoroWorker.postMessage("start");
      stopButton.style.display = "none";
      break;
    case "fa-pause-circle":
      toggleControlButtonClass();
      pomodoroWorker.postMessage("pause");
      stopButton.style.display = "inline";
      break;
  }
}

function stopButtonHandler() {
  playSound();
  pomodoroWorker.postMessage("stop");
  stopButton.style.display = "none";
  controlButton.classList.replace("fa-pause-circle", "fa-play-circle");
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