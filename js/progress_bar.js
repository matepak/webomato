import { tomatoImage } from './const.js';
let denominator = 0;
function getValue(timer) {
  if(timer === 0) return 0;
  if (denominator === 0) {
    denominator = timer;
  }
  return 10 * (1-(timer/denominator)).toFixed(1); 
}

function getBar(value) {
let tomato = '';
  for (let i = 0; i < value; i++) {
    tomato += tomatoImage;
  }
  return `<div id="progress-bar" class="rounded-container">${tomato}</div>`;
}

export const progressBar = {
  reset: function () {
    denominator = 0;
    return `<div id="progress-bar" class="rounded-container"></div>`;
  },
  getBar: function (timer) {
    return getBar(Number.parseInt(getValue(timer)));
  },
};