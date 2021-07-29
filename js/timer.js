// class Timer {
//     constructor(duration) {
//     this.minutes = duration;
//     this.seconds = 0;
//     }
//     tick() {
//       if (this.minutes === 0 && this.seconds === 0) {
//         return false;
//       }
//       if (this.seconds === 0 && this.minutes > 0) {
//         this.seconds = 59;
//         this.minutes--;
//         return true;
//       }
//       this.seconds--;
//       return true;
//     };
//     reset() {
//       this.minutes = 0;
//       this.seconds = 0;
//     };
//     getTimer = () => `${this.getMinutes()}:${this.getSeconds()}`;
//     getMinutes = () => this.minutes.toString().padStart(2, 0);
//     getSeconds = () => this.seconds.toString().padStart(2, 0);
//     getMiliSeconds = () => (this.seconds * 1000) + (this.minutes * 60 * 1000);
//   };

//   //export default Timer;

function minutesToMilliseconds(minutes) {
  return minutes * 60000;
}

function millisecondsToSeconds(milliseconds) {
  return Math.floor(milliseconds / 1000);
}

class Timer {
  constructor(duration = 1) {
    this.isPaused = false;
    this.duration = minutesToMilliseconds(duration);
    this.pauseOffset = 0;
  }

  tick() {
    if (this.isPaused) return;
    if (!this.startTime) this.startTime = parseInt(Date.now(), 10);
    this.now = parseInt(Date.now(), 10) - this.pauseOffset;
    this.difference = this.now - this.startTime;
  }

  pause() {
    if (this.isPaused) return;
    this.isPaused = true;
    this.pausedTime = this.now;
  }

  start() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.pauseOffset = Date.now() - this.pausedTime;
  }

  reset() {
    this.isPaused = false;
    this.now = 0;
    this.difference = 0;
    this.pauseOffset = 0;
    this.startTime = null;
  }

  isFinished() {
    return this.getMinutes() === '0' && this.getSeconds() === '0';
  }

  getSeconds() {
    return (
      millisecondsToSeconds(this.duration - this.difference) % 60
    ).toString();
  }

  getMinutes() {
    return Math.floor(
      millisecondsToSeconds(this.duration - this.difference) / 60,
    ).toString();
  }

  getTimer() {
    return `${this.getMinutes().padStart(2, '0')}:${this.getSeconds().padStart(
      2,
      '0',
    )}`;
  }
}

export default Timer;
