import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStartEl = document.querySelector('button[data-start]');
// const boxEl = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

buttonStartEl.addEventListener('click', onTimerStart);

buttonStartEl.disabled = true;

const timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date();

    if (selectedDates[0] - currentTime > 0) {
      buttonStartEl.disabled = false;
    } else {
      buttonStartEl.disabled = true;
      alert('Please choose a date in the future', 1000);
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onTimerStart() {
  const selectedDate = InputPickrEl.selectedDates[0];
}

timerId = setInterval(() => {
  const startTime = new Date();
  const deltaTime = selectedDate - startTime;
  buttonStartEl.disabled = true;

  if (deltaTime < 0) {
    clearInterval(timerId);
    return;
  }
  updateClockFace(convertMs(deltaTime));
}, 1000);

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

const InputPickrEl = flatpickr('#datetime-picker', options);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }

//     const startTime = Date.now();
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = convertMs(deltaTime);
//       updateClockFace(time);
//     }, 1000);
//   },
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   },
// };

// buttonEl.addEventListener('click', () => {
//   timer.start();
// });

// function updateClockFace({ days, hours, minutes, seconds }) {
//   boxEl.textContent = `${days}: ${hours}: ${minutes}: ${seconds}`;
// }

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = pad(Math.floor(ms / day));
//   const hours = pad(Math.floor((ms % day) / hour));
//   const minutes = pad(Math.floor(((ms % day) % hour) / minute));
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
