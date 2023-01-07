import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({ useIcon: false });

const refs = {
  firstDelay: document.querySelector('input[name=delay]'),
  delayStep: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  createPromisesForm: document.querySelector('form[class=form]'),
};
console.log(refs.createPromisesBtn);
refs.createPromisesForm.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises() {
  for (let i = 0; i < refs.amount.value; i += 1) {
    createPromise(
      i + 1,
      Number(refs.firstDelay.value) + Number(refs.delayStep.value) * i
    )
      .then(({ position, delay }) => {
        const textOutput = `✅ Fulfilled promise ${position} in ${delay}ms`;
        console.log(textOutput);
        Notify.success(textOutput);
      })
      .catch(({ position, delay }) => {
        const textOutput = `❌ Rejected promise ${position} in ${delay}ms`;
        console.log(textOutput);
        Notify.failure(textOutput);
      });
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  createPromises();
  // evt.currentTarget.reset();
}