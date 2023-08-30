import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

class CountdownTimer {
  constructor({ targetTime, onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.targetTime = targetTime;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    // Не зміг прибрати дублювання.
    // Якщо не додавати цей код (33-35), то відлік починається через секунду, а не одразу після кліка
    const deltaTime = new Date(this.targetTime) - Date.now();
    const timeComponents = this.convertMs(deltaTime);
    this.onTick(timeComponents);

    this.intervalId = setInterval(() => {
      const deltaTime = new Date(this.targetTime) - Date.now();
      const timeComponents = this.convertMs(deltaTime);
      this.onTick(timeComponents);

      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
        Notiflix.Notify.success('Time is out');
      }
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    refs.startBtn.disabled = false;
  },
};
flatpickr(refs.input, flatpickrOptions);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  const timer = new CountdownTimer({
    targetTime: refs.input.value,
    onTick: updateClockface,
  });
  timer.start();
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
