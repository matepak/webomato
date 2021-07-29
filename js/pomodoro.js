importScripts("./timer.js");

class Pomodoro {
  constructor(
    pomodoroTime = 25,
    shortBreakTime = 5,
    longBreakTime = 15,
    longBreakAfterInterval = 4
  ) {
    this.lastPomodoroRun = false;
    this.isPaused = false;
    this.pomodoroTime = pomodoroTime;
    this.shortBreakTime = shortBreakTime;
    this.longBreakTime = longBreakTime;
    this.longBreakAfterInterval = longBreakAfterInterval;
    this.shortBrakesLeft = longBreakAfterInterval;
    this.currentBreakTime = shortBreakTime;
    this.timer = new Timer(pomodoroTime);
    this.progressBarCount = 0;
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
      return { action: "clearProgressBar", actionData: null };
    },
    stopTimer: function () {
      return { action: "stopTimer", actionData: null };
    },
  };

  updateTimer() {
    postMessage(this.actionObject.updateTimerElement(this.timer.getTimer()));
  }

  start() {
    if(!this.isPaused) {this.lastPomodoroRun = !this.lastPomodoroRun;}
    this.isPaused = false;
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
    this.isPaused = false;
    this.progressBarCount = 0;
    clearInterval(this.intervalId);
    clearInterval(this.progressBarIntervalId);
  }

  pause() {
    this.isPaused = true;
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
    if (this.lastPomodoroRun) this.shortBrakesLeft -= 1;
    if (this.shortBrakesLeft === 0) {
      return this.longBreakTime;
    } else {
      return this.shortBreakTime;
    }
  }

  progressBar() {
    let duration = this.timer.getMiliSeconds();
    if (duration < 1) duration = 1;
    this.progressBarInterval = duration / (10 - this.progressBarCount);

    this.progressBarIntervalId = setInterval(() => {
      postMessage(this.actionObject.updateProgressBar());
      this.progressBarCount++;
    }, this.progressBarInterval);

  }
}
