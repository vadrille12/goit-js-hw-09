function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const refs = {
  startBtn: document.querySelector('button[data-start]'),
stopBtn : document.querySelector('button[data-stop]'),
body : document.querySelector('body')
}

let timerId = null;


refs.startBtn.addEventListener('click', () => {
  onClickStartBtn();

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
});

refs.stopBtn.addEventListener('click', () => {
  onClickStopBtn();

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

});

function onClickStartBtn() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStopBtn() {
  clearInterval(timerId);
};
