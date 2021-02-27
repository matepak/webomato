
function Timer(duration) {
    this.minutes = duration;
    this.seconds = 0;
  
    this.tick = function () {
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
  
    this.reset = () => {
      this.minutes = 0;
      this.seconds = 0;
    };
  
    this.getTimer = () => `${this.getMinutes()}:${this.getSeconds()}`;

    this.getMinutes = () => this.minutes.toString().padStart(2, 0);
    this.getSeconds = () => this.seconds.toString().padStart(2, 0);
  }