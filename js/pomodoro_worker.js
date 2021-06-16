importScripts('./pomodoro.js');

let pomodoro = new Pomodoro();

onmessage = function(message) {
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
    }
}


