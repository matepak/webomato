class Timer {
    constructor(duration) {
    this.minutes = duration;
    this.seconds = 0;
    }
  
    tick() {
      if (this.minutes === 0 && this.seconds === 0) {
        return false;
      }
  
      if (this.seconds === 0 && this.minutes > 0) {
        this.seconds = 59;
        this.minutes--;
        return true;
      }
      this.seconds--;
      return true;
    };
  
    reset() {
      this.minutes = 0;
      this.seconds = 0;
    };
  
    getTimer = () => `${this.getMinutes()}:${this.getSeconds()}`;
    getMinutes = () => this.minutes.toString().padStart(2, 0);
    getSeconds = () => this.seconds.toString().padStart(2, 0);
    getMiliSeconds = () => (this.seconds * 1000) + (this.minutes * 60 * 1000);
  };

  //export default Timer;