import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const NOTIFICATION_DELAY = 3000;
let timeoutAlertId = null;
let timerCountdownId = null;
let finishTime = null;
let countdownTimerWork = false;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  notification: document.querySelector('.js-alert'),
  leftDays: document.querySelector('span[data-days]'),
  leftHours: document.querySelector('span[data-hours]'),
  leftMinutes: document.querySelector('span[data-minutes]'),
  leftSeconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      showNotification();
      disactivateButton();
      return;
    }
    finishTime = selectedDates[0];
    activateButton();
  },
};

refs.notification.addEventListener('click', onNotificationClick);
refs.notification.addEventListener('mouseenter', onNotificationMouseEnter);
refs.notification.addEventListener('mouseleave', onNotificationMouseLeave);

disactivateButton();

flatpickr('input#datetime-picker', options);


function onNotificationMouseLeave() {
   setTimeout(() => {
    hideNotification();
  }, NOTIFICATION_DELAY);
}

function onNotificationMouseEnter() {
  clearTimeout(timeoutAlertId);
}

function onNotificationClick() {
  hideNotification();
  clearTimeout(timeoutAlertId);
}

function showNotification() {
  refs.notification.classList.add('is-visible');

  timeoutAlertId = setTimeout(() => {
    hideNotification();
  }, NOTIFICATION_DELAY);
}

function hideNotification() {
  refs.notification.classList.remove('is-visible');
}

function activateButton() {
  refs.startBtn.disabled = false;
  refs.startBtn.addEventListener('click', onStartClick);
}

function disactivateButton() {
  refs.startBtn.disabled = true;
  refs.startBtn.removeEventListener('click', onStartClick);
}

function onStartClick() {
  if (!countdownTimerWork) {
    timerCountdownId = setInterval(updateTimerInterface, 1000);
    countdownTimerWork = true;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerInterface() {
  const { days, hours, minutes, seconds } = convertMs(finishTime - Date.now());
  refs.leftDays.textContent = days;
  refs.leftHours.textContent = hours;
  refs.leftMinutes.textContent = minutes;
  refs.leftSeconds.textContent = seconds;
  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    countdownTimerWork = false;
    clearInterval(timerCountdownId);
  }
}