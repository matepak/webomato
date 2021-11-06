function darkMode() {
    document.querySelector('ul')
    .classList.add('dark-mode');
    document.querySelector('.flex-container')
    .classList.add('dark-mode');
    document.querySelector('.base-container')
    .classList.add('dark-mode');
    document.querySelector('#settings-container')
    .classList.add('dark-mode');
    }
  
  function lightMode() {
    document.querySelector('ul')
    .classList.remove('dark-mode');
    document.querySelector('.flex-container')
    .classList.remove('dark-mode');
    document.querySelector('.base-container')
    .classList.remove('dark-mode');
    document.querySelector('#settings-container')
    .classList.remove('dark-mode');
    }

    export {darkMode, lightMode};