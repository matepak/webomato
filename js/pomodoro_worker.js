importScripts('./pomodoro.js');

let pomodoro;

onmessage = (m) => {
  switch (m.data.message) {
    case 'init':
      if(pomodoro) {delete pomodoro};
      let args = m.data.args;
      pomodoro = new Pomodoro(
        args['pomodoroTime'], 
        args['shortBreakTime'], 
        args['longBreakTime'], 
        args['longBreakAfterInterval'])
      break;
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
