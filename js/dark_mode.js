import { ClassToggler } from "./css_class_togler.js";
import { darkModeButton, moonDarkModeButton, sunDarkModeButton } from "./const.js";

const toggleDarkModeButton = ClassToggler(darkModeButton, moonDarkModeButton, sunDarkModeButton);

let isInDarkMode = false;

function darkMode() {
    document.querySelector('ul')
    .classList.add('dark-mode');
    document.querySelector('body')
    .classList.add('dark-mode');
    document.querySelector('.pomodoro')
    .classList.add('dark-mode');
    document.querySelector('#settings-container')
    .classList.add('dark-mode');

    isInDarkMode = true;
    }
  
  function lightMode() {
    document.querySelector('ul')
    .classList.remove('dark-mode');
    document.querySelector('body')
    .classList.remove('dark-mode');
    document.querySelector('.pomodoro')
    .classList.remove('dark-mode');
    document.querySelector('#settings-container')
    .classList.remove('dark-mode');

    isInDarkMode = false;
    }

    darkModeButton.addEventListener('click', () => {
      toggleDarkModeButton();
      if(!isInDarkMode) {
        darkMode();
        return;
      }
      if(isInDarkMode) {
        lightMode();
        return;
      }
    });
