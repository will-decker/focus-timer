let countdown;
let selectedTimer = 1500;
let timerOn = false;
let secondsLeft = 0;
let pausedTime = 0;
const alarm = new Audio('analog-alarm.mp3');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const selectButtons = document.querySelectorAll('[data-time]');
const startButton = document.querySelector('.timer__start');
const stopButton = document.querySelector('.timer__stop');

// Display default timer on page load
displayTimeLeft(selectedTimer);

selectButtons.forEach(button => button.addEventListener('click', setTimer));

startButton.addEventListener('click', function (event) {
  if (!timerOn) {
    startButton.innerHTML = '<i class="fas fa-pause fa-2x">';
    startTimer();
    timerOn = true;
  } else {
    startButton.innerHTML = '<i class="fas fa-play fa-2x">';
    stopTimer();
    timerOn = false;
  }
});

endTime.textContent = 'Select a timer and click start to begin.';

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft == 0) {
      alarm.play();
      startButton.innerHTML = '<i class="fas fa-play fa-2x">';
    }
    // Check if timer hit 0
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = `(${display}) Focus Timer`;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();

  endTime.textContent = `Ends At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function setTimer() {
  pausedTime = 0;
  clearInterval(countdown);
  alarm.pause();
  endTime.textContent = 'Ready to begin!';
  startButton.innerHTML = '<i class="fas fa-play fa-2x">';
  timerOn = false;
  selectedTimer = parseInt(this.dataset.time);
  displayTimeLeft(selectedTimer);
}

function startTimer() {
  if (pausedTime == 0) {
    timer(selectedTimer);
  } else {
    timer(pausedTime);
  }
}

function stopTimer() {
  clearInterval(countdown);
  pausedTime = secondsLeft;
}

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  pausedTime = 0;
  clearInterval(countdown);
  const mins = this.minutes.value;
  endTime.textContent = 'Ready to begin!';
  startButton.innerHTML = '<i class="fas fa-play fa-2x">';
  timerOn = false;
  selectedTimer = mins * 60;
  displayTimeLeft(selectedTimer);
  // timer(mins * 60);
  this.reset();
});
