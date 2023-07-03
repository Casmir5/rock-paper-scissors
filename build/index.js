'use strict';
const playerScoreEl = document.querySelector('#player-score');
const computerScoreEl = document.querySelector('#computer-score');
const message = document.querySelector('.message');
const playerValue = document.querySelector('#player-value');
const computerValue = document.querySelector('#computer-value');
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const mainMenu = document.querySelector('#main-menu');
const restart = document.querySelector('#restart');
const modalMesssage = document.querySelector('.end-messsage');
const buttons = document.querySelectorAll('.second-page button');
const generateBtn = document.querySelector('.generate');
const selectMyselfBtn = document.querySelector('#user-chose');
const generateRandomlybtn = document.querySelector('#computer-chose');
const gameValues = document.querySelectorAll('.game-values');

let randomNumberForUser,
  randNumberForComputer,
  playerScore,
  computerScore,
  isPlaying;

selectMyselfBtn.addEventListener('click', function () {
  document.querySelector('.first-page').classList.add('hidden');
  document.querySelector('.second-page').classList.remove('hidden');
  generateBtn.classList.add('hidden');
});
generateRandomlybtn.addEventListener('click', function () {
  document.querySelector('.first-page').classList.add('hidden');
  document.querySelector('.second-page').classList.remove('hidden');
  for (const [i, value] of gameValues.entries()) {
    value.classList.add('hidden');
  }
});

function getRandomValueFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
const messageCorrect = [
  'Taar commot body joor🥶',
  'sodiki🤯',
  'You too sabi🔥🔥',
  'Odogwu 🙌',
  'Aaa bad guy😬',
  'Idan🔥🔥',
  'Idolo🤠',
];

const messageWrong = [
  'Oops🥴',
  'Is that all you got 🥱',
  'You should be a dinner man😂',
  'Just dey play',
  'Loser 😂',
  'Give up already loser🤣',
];

const init = function () {
  isPlaying = false;
  randomNumberForUser = 0;
  randNumberForComputer = 0;
  playerScore = 0;
  computerScore = 0;

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  message.textContent = '';
  message.classList.add('hidden');
};
const displayScore = function () {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
};

const guessedRight = function () {
  playerScore += 1;
  message.classList.add('right-message');
};

const guessedWrong = function () {
  computerScore += 1;
  message.classList.add('wrong-message');
};

const userwinsModal = function () {
  modalEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
  modalEl.classList.add('bg-emerald-600');
};

const userlostModal = function () {
  modalEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
  modalEl.classList.remove('bg-emerald-600');

  modalEl.classList.add('user-lost');
  modalMesssage.textContent = 'Sorry, you lost 😥';
};

const gameReset = function () {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
  modalEl.classList.add('bg-emerald-600');
  modalMesssage.textContent = 'congratulation You won 🥳🎊';
  playerValue.src = `./images/right/value-1.png`;
  computerValue.src = `./images/left/value-1.png`;
  modalEl.classList.remove('user-lost');
  init();
};
const goBack = function () {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
  modalEl.classList.add('bg-emerald-600');
  modalMesssage.textContent = 'congratulation You won 🥳🎊';
  playerValue.src = `./images/right/value-1.png`;
  computerValue.src = `./images/left/value-1.png`;
  document.querySelector('.first-page').classList.remove('hidden');
  document.querySelector('.second-page').classList.add('hidden');
  for (const [i, btn] of buttons.entries()) {
    btn.classList.remove('hidden');
  }
  init();
};

init();

for (const [i, btn] of buttons.entries()) {
  btn.addEventListener('click', function (e) {
    isPlaying = true;
    message.classList.remove('tied');
    message.classList.remove('right-message');
    message.classList.remove('wrong-message');
    displayScore();
    if (isPlaying) {
      if (e.target.id === 'rock') {
        randomNumberForUser = 1;
      } else if (e.target.id === 'papper') {
        randomNumberForUser = 2;
      } else if (e.target.id === 'scissors') {
        randomNumberForUser = 3;
      } else {
        randomNumberForUser = Math.trunc(Math.random() * 3) + 1;
      }
      randNumberForComputer = Math.trunc(Math.random() * 3) + 1;
      playerValue.src = `./images/right/value-${randomNumberForUser}.png`;
      computerValue.src = `./images/left/value-${randNumberForComputer}.png`;
      message.classList.remove('hidden');
      const randomMessageWhenUserWins = getRandomValueFromArray(messageCorrect);
      const randomMessageWhenUserlose = getRandomValueFromArray(messageWrong);
      if (randomNumberForUser === randNumberForComputer) {
        message.textContent = 'tied👀';
        message.classList.add('tied');
      }
      // if player = scissors and computer = rock
      else if (randomNumberForUser === 3 && randNumberForComputer === 1) {
        message.textContent = randomMessageWhenUserlose;
        guessedWrong();
      }
      // if computer = scissors and player = rock
      else if (randNumberForComputer === 3 && randomNumberForUser === 1) {
        message.textContent = randomMessageWhenUserWins;
        guessedRight();
      } else if (randomNumberForUser > randNumberForComputer) {
        message.textContent = randomMessageWhenUserWins;
        guessedRight();
      } else if (randNumberForComputer > randomNumberForUser) {
        message.textContent = randomMessageWhenUserlose;
        guessedWrong();
      }
      displayScore();
    }
    if (playerScore > computerScore && playerScore === 7) {
      isPlaying = false;
      userwinsModal();
    } else if (computerScore > playerScore && computerScore === 7) {
      isPlaying = false;
      userlostModal();
    }
  });
}
restart.addEventListener('click', gameReset);
mainMenu.addEventListener('click', goBack);
