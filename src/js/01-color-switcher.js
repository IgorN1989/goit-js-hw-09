const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

stopBtn.disabled = true;

function onStartBtn() {
  switchActiveButton(stopBtn, startBtn);
  changeBgColor(bodyRef);
  intervalId = setInterval(() => {
    changeBgColor(bodyRef);
  }, 1000);
}

function onStopBtn() {
  switchActiveButton(startBtn, stopBtn);
  clearInterval(intervalId);
}

function switchActiveButton(firstBtn, secondBtn) {
  if (firstBtn.disabled) {
    firstBtn.disabled = false;
    secondBtn.disabled = true;
  }
}

function changeBgColor(element) {
  element.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
