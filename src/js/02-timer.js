import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

class Timer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.start();

    this.refs = {
      inputPickerEl: document.querySelector(
        `${this.selector} #datetime-picker`
      ),
      buttonEl: document.querySelector(`${this.selector} button[data-start]`),
      // const boxEl = document.querySelector('.timer');
      days: document.querySelector(`${this.selector} span[data-days]`),
      hours: document.querySelector(`${this.selector} span[data-hours]`),
      mins: document.querySelector(`${this.selector} span[data-minutes]`),
      secs: document.querySelector(`${this.selector} span[data-seconds]`),
    };
  }

  calcHandleTime() {
    const dateNow = Date.now();
    const deltaTime = this.targetDate - dateNow;

    this.timerReview(deltaTime);
    this.getTimeComponents(deltaTime);
  }

  timerReview(time) {
    if (time < 0) {
      document.querySelector(`${this.selector}`).innerHTML =
        'Please choose a date in the future';

      clearInterval(this.intervalId);
    }
  }

  getTimeComponents(time) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  updateClockFace(days, hours, mins, secs) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  start() {
    this.intervalId = setInterval(() => {
      this.calcHandleTime();
    }, 1000);
  }
}

buttonEl.addEventListener('click', () => {
  timer.start();
});

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
