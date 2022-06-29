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
    this.updateTimer();
  }

  actionObject = {
    updateTimerElement: function (data) {
      return { action: "updateTimerElement", actionData: data };
    },
    stopTimer: function () {
      return { action: "stopTimer", actionData: null };
    },
  };

  updateTimer() {
    postMessage(this.actionObject.updateTimerElement({
      timer: this.timer.getTimer(), 
      secondsToEnd: this.timer.getSecondsToEnd()
    }));
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
  }

  stop() {
    this.nextTimer();
    this.isPaused = false;
    clearInterval(this.intervalId);
    this.timer.reset();
  }

  pause() {
    this.timer.pause();
    this.isPaused = true;
    clearInterval(this.intervalId);
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
      this.shortBrakesLeft = this.longBreakAfterInterval;
      return this.longBreakTime;
    } else {
      return this.shortBreakTime;
    }
  }
}
