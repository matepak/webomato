import { timerField, controlButton } from "./variables.js";
import Timer from "./timer.js";

export class Pomodoro {
  constructor(
    pomodoroTime = 25,
    shortBreakTime = 5,
    longBreakTime = 15,
    longBreakAfterInterval = 4
  ) {
    this.lastPomodoroRun = false;
    this.pomodoroTime = pomodoroTime;
    this.shortBreakTime = shortBreakTime;
    this.longBreakTime = longBreakTime;
    this.longBreakAfterInterval = longBreakAfterInterval;
    this.shortBreakesLeft = longBreakAfterInterval;
    this.currentBreakTime = shortBreakTime;
    this.timer = new Timer(pomodoroTime);
    this.updateTimer();
  }

  updateTimer() {
    timerField.innerText = this.timer.getTimer();
  }

  start() {
    this.intervalId = setInterval(() => {
      this.isRunning = this.timer.tick();
      if (!this.isRunning) this.stop();
      this.updateTimer();
    }, 1000);
    this.clearBar();
    this.progressBar();
  }

  stop() {
    this.lastPomodoroRun = !this.lastPomodoroRun;
    this.nextTimer();
    clearInterval(this.intervalId);
    this.playSound();
    clearInterval(this.progressBarIntervalId);
    controlButton.className = "far fa-play-circle fa-5x"

  }

  pause() {
    clearInterval(this.intervalId);
    clearInterval(this.progressBarIntervalId);
  }

  nextTimer() {
    this.timer.reset();
    this.breakHandler();
    this.updateTimer();
  }

  breakHandler() {
    if (this.shortBreakesLeft === 0) {
      this.shortBreakesLeft = 4;
      this.currentBreakTime = this.longBreakTime;
      console.log(this.currentBreakTime);
    } else {
      this.currentBreakTime = this.shortBreakTime;
    }

    if (this.lastPomodoroRun) {
      this.timer.minutes = this.currentBreakTime;
      this.shortBreakesLeft = --this.shortBreakesLeft;
      console.log(this.shortBreakesLeft);
    } else {
      this.timer.minutes = this.pomodoroTime;
    }
  }

  playSound() {
    let audio = new Audio("./ding.mp3");
    audio.play();
  }

  progressBar() {
    let duration = this.timer.getMinutes();
    if(duration < 1) duration = 1;
    this.progressBarInterval = (duration * 60 * 1000) / 10;

    this.progressBarIntervalId = setInterval(() => {
      document.getElementById(
        "progress-bar"
      ).innerHTML += `<img src="./favicon-32.png" alt="tomato">`;
    }, this.progressBarInterval);
  }

  clearBar() {
    document.getElementById("progress-bar").innerHTML = " ";
  }
}
