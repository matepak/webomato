importScripts("./timer.js");

class Pomodoro {
  constructor(
    pomodoroTime = 1,
    shortBreakTime = 1,
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
    this.timer.start();
    this.intervalId = setInterval(() => {
      if (this.timer.isFinished()) {
        postMessage(this.actionObject.stopTimer());
      }
      this.timer.tick();
      this.updateTimer();
    }, 100);
    postMessage(this.actionObject.clearProgressBar());
    this.progressBar();
  }

  stop() {
    this.nextTimer();
    this.isPaused = false;
    this.progressBarCount = 0;
    clearInterval(this.intervalId);
    clearInterval(this.progressBarIntervalId);
    this.timer.reset();
  }

  pause() {
    this.timer.pause();
    this.isPaused = true;
    clearInterval(this.intervalId);
    clearInterval(this.progressBarIntervalId);
  }

  nextTimer() {
    this.timer.reset();
    this.timer.duration = this.breakHandler()*60*1000;
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
    let duration = this.timer.duration;
    if (duration < 1) duration = 1;
    this.progressBarInterval = duration / (11 - this.progressBarCount);
    console.log(duration);

    this.progressBarIntervalId = setInterval(() => {
      postMessage(this.actionObject.updateProgressBar());
      this.progressBarCount++;
    }, this.progressBarInterval);

  }
}
