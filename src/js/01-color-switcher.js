function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyColorEl = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

buttonStart.addEventListener('click', buttonHandleStart);
buttonStop.addEventListener('click', buttonHandleStop);

// const randomIntegerFromInterval = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

function changeBackground(color) {
  bodyColorEl.style.backgroundColor = color;
}

let intervalColorChange = undefined;
function buttonHandleStart() {
  intervalColorChange = setInterval(() => {
    
    changeBackground(getRandomHexColor());
  }, 1000);
  buttonStop.removeAttribute('disabled');
  buttonStart.setAttribute('disabled', true);
}

function buttonHandleStop() {
  clearInterval(intervalColorChange);
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);
}
