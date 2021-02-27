importScripts("./timer.js");

class Pomodoro {
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

  actionObject = {
    updateTimerElement: function (data) {
      return { action: "updateTimerElement", actionData: data };
    },
    updateProgressBar: function () {
      return { action: "updateProgressBar", actionData: null };
    },

    clearProgressBar: function () {
      return { action: "clearProogressBar", actionData: null };
    },
    stopTimer: function () {
      return { action: "stopTimer", actionData: null };
    },
  };

  updateTimer() {
    postMessage(this.actionObject.updateTimerElement(this.timer.getTimer()));
  }

  start() {
    this.lastPomodoroRun = !this.lastPomodoroRun;
    this.intervalId = setInterval(() => {
      this.isRunning = this.timer.tick();
      if (!this.isRunning) {
        postMessage(this.actionObject.stopTimer());
      }
      this.updateTimer();
    }, 1000);
    postMessage(this.actionObject.clearProgressBar());
    this.progressBar();
  }

  stop() {
    this.nextTimer();
    clearInterval(this.intervalId);
    clearInterval(this.progressBarIntervalId);
  }

  pause() {
    clearInterval(this.intervalId);
    clearInterval(this.progressBarIntervalId);
  }

  nextTimer() {
    this.timer.reset();
    this.timer.minutes = this.breakHandler();
    this.updateTimer();
  }

  breakHandler() {
    if (!this.lastPomodoroRun) return this.pomodoroTime;
    if (this.lastPomodoroRun) this.shortBreakesLeft -= 1;
    if (this.shortBreakesLeft === 0) {
      return this.longBreakTime;
    } else {
      return this.shortBreakTime;
    }
  }

  progressBar() {
    let duration = this.timer.getMinutes();
    if (duration < 1) duration = 1;
    this.progressBarInterval = (duration * 60 * 1000) / 10;

    this.progressBarIntervalId = setInterval(() => {
      postMessage(this.actionObject.updateProgressBar());
    }, this.progressBarInterval);
  }
}
