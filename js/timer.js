function minutesToMilliseconds(minutes) {
  return minutes * 60000;
}

function millisecondsToSeconds(milliseconds) {
  return Math.floor(milliseconds / 1000);
}
// eslint-disable-next-line no-unused-vars
class Timer {
  constructor(duration = 1) {
    this.isPaused = false;
    this.duration = minutesToMilliseconds(duration);
    this.difference = 0;
    this.pauseOffset = 0;
  }

  tick() {
    if (this.isPaused) return;
    if (!this.startedAt) this.startedAt = parseInt(Date.now(), 10);
    this.now = parseInt(Date.now(), 10) - this.pauseOffset;
    this.difference = this.now - this.startedAt;
  }

  pause() {
    if (this.isPaused) return;
    this.isPaused = true;
    this.pausedAt = this.now;
  }

  start() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.pauseOffset = Date.now() - this.pausedAt;
  }

  reset() {
    this.isPaused = false;
    this.now = 0;
    this.difference = 0;
    this.pauseOffset = 0;
    this.startedAt = null;
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
