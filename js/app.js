import { controlButton, stopButton } from "./variables.js";
import { Pomodoro } from "./pomodoro.js";

function controlButtonHandler() {
  switch (controlButton.classList[1]) {
    case "fa-play-circle":
      pomodoro.start();
      controlButton.className = "far fa-pause-circle fa-5x";
      stopButton.style.display = "none";
      break;
    case "fa-pause-circle":
      pomodoro.pause();
      controlButton.className = "far fa-play-circle fa-5x"
      stopButton.style.display = "inline";
      break;
  }
}

function stopButtonHandler() {
  pomodoro.stop();
  stopButton.style.display = "none";
}

let pomodoro = new Pomodoro();

controlButton.addEventListener("click", () => {
  controlButtonHandler();
});

stopButton.addEventListener("click", () => {
  stopButtonHandler();
});
