//імпортування бібліотек
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


//створення змінних для елементів DOM для відображення днів, годин, хвилин та секунд таймера
let userSelectedDate;
const buttonStart = document.querySelector('[data-start]');
const daysCount = document.querySelector('[data-days]');
const hoursCount = document.querySelector('[data-hours]');
const minutesCount = document.querySelector('[data-minutes]');
const secondsCount = document.querySelector('[data-seconds]');

//функція, яка додає перед значенням нуль, якщо воно менше 10
function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

// функція для скидання таймера
function resetTime() {
    clearInterval(timerInterval);
    daysCount.textContent = '00';
    hoursCount.textContent = '00';
    minutesCount.textContent = '00';
    secondsCount.textContent = '00';
    userSelectedDate = undefined;
    buttonStart.removeAttribute('disabled');
}

//налаштування параметрів 'flatpickr'
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
     minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates && selectedDates[0]) {
            userSelectedDate = selectedDates[0];
    
            console.log(selectedDates[0]);
      
            if (userSelectedDate.getTime() > Date.now()) {
                buttonStart.removeAttribute('disabled');
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future'
                });
                buttonStart.setAttribute('disabled', 'true');
            }
        } else {
            console.error('User date is not defined');
            userSelectedDate = undefined;
        }
  },
};

flatpickr('#datetime-picker', options);

// обробник подій кнопки
buttonStart.addEventListener('click', () => {
    if (!userSelectedDate) {
        console.error('User date is not defined');
        return;
    }

    const timeMinus = userSelectedDate.getTime() - Date.now();

    if (timeMinus <= 0) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
        return;
    }

    startCountdown(timeMinus);
    buttonStart.setAttribute('disabled', 'true');
});


// функція, яка запускає зворотній відлік часу з інтервалом в 1 сек.
   let timerInterval;
function startCountdown(time) {
    const interval = 1000;

    function updateTimer() {
        const { days, hours, minutes, seconds } = convertMs(time);

        daysCount.textContent = addLeadingZero(days);
        hoursCount.textContent = addLeadingZero(hours);
        minutesCount.textContent = addLeadingZero(minutes);
        secondsCount.textContent = addLeadingZero(seconds);

        time -= interval;

        if (time < 0) {
            clearInterval(timerInterval);
            iziToast.success({
                title: 'Success',
                message: 'Countdown completed',
            });
        }
    }

    timerInterval = setInterval(updateTimer, interval);
}

/*
функція, яка конвертує час в мілісекундах у об'єкт, що містить к-сть днів, годин, хвилин та секунд до обраної дати
*/
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// скидання таймера при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
    resetTime();
});




