//'use strict';

//import { Pomodoro } from "./pomodoro";
importScripts('./pomodoro.js');

let pomodoro = new Pomodoro();

onmessage = function(e) {
    switch (e.data) {
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
