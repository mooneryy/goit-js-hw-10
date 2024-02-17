// підключення бібліотеки
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// отримання елементу форми
const notificationForm = document.querySelector('.form');

// додавання обробника подій для форми
notificationForm.addEventListener('submit', function (event) {
    event.preventDefault();

// отримання значень полів вводу
    const delayInput = notificationForm.querySelector('input[name = "delay"]');
    const stateInput = notificationForm.querySelector('input[name="state"]:checked');

// перевірка, чи введена затримка є коректним числовим значенням
    const delay = parseInt(delayInput.value, 10);

    if (isNaN(delay) || delay <= 0) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a valid positive delay value',
        });
        return;
    }

// створення промісу та його обробка
    const state = stateInput ? stateInput.value : null;

    if (state === null) {
        iziToast.error({
            title: 'Error',
            message: 'Please select a state (Fulfilled/Rejected)',
        });
        return;
    }

    createPromise(delay, state);
});

function createPromise(delay, state) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') {
                reject(delay);
            }
        }, delay);
    });

    promise.then((delay) => {
        iziToast.success({
            title: 'Fulfilled',
            message: `✅ Fulfilled promise in ${delay}ms`,
        });

    }).catch((delay) => {
        iziToast.error({
            title: 'Rejected',
            message: `❌ Rejected promise in ${delay}ms`,
        });
    });

}
