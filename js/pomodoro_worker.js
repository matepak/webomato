importScripts('./pomodoro.js');

const pomodoro = new Pomodoro();

onmessage = (message) => {
  switch (message.data) {
    case 'start':
      pomodoro.start();
      break;
    case 'pause':
      pomodoro.pause();
      break;
    case 'stop':
      pomodoro.stop();
      break;
    default:
  }
};
