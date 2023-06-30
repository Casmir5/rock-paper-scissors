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
const userChose = document.querySelector('#user-chose');
const computerChose = document.querySelector('#computer-chose');
const gameValues = document.querySelectorAll('.game-values');
console.log(modalEl, overlayEl);

userChose.addEventListener('click', function () {
  document.querySelector('.first-page').classList.add('hidden');
  document.querySelector('.second-page').classList.remove('hidden');
  generateBtn.classList.add('hidden');
});
computerChose.addEventListener('click', function () {
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

let playerRand, computerRand, playerScore, computerScore, isPlaying;
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
// const randomMessageWhenUserWins = getRandomValueFromArray(messageCorrect);

const init = function () {
  isPlaying = false;
  playerRand = 0;
  computerRand = 0;
  playerScore = 0;
  computerScore = 0;

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  message.textContent = '';
  message.classList.add('hidden');
};
console.log(playerScore, computerScore);
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
  init();
};

init();

// goodmessage = [good, great, idan, starboy];
for (const [i, btn] of buttons.entries()) {
  btn.addEventListener('click', function (e) {
    isPlaying = true;
    console.log(isPlaying);
    message.classList.remove('tied');
    message.classList.remove('right-message');
    message.classList.remove('wrong-message');
    displayScore();
    if (isPlaying) {
      console.log(e.target.id);
      if (e.target.id === 'rock') {
        playerRand = 1;
      } else if (e.target.id === 'papper') {
        playerRand = 2;
      } else if (e.target.id === 'scissors') {
        playerRand = 3;
      } else {
        playerRand = Math.trunc(Math.random() * 3) + 1;
      }
      computerRand = Math.trunc(Math.random() * 3) + 1;
      console.log(playerRand, computerRand);

      playerValue.src = `./images/right/value-${playerRand}.png`;
      computerValue.src = `./images/left/value-${computerRand}.png`;
      message.classList.remove('hidden');
      const randomMessageWhenUserWins = getRandomValueFromArray(messageCorrect);
      const randomMessageWhenUserlose = getRandomValueFromArray(messageWrong);
      if (playerRand === computerRand) {
        message.textContent = 'tied👀';
        message.classList.add('tied');
      }

      // if player = scissors and computer = rock
      else if (playerRand === 3 && computerRand === 1) {
        message.textContent = randomMessageWhenUserlose;
        guessedWrong();
      }
      // if computer = scissors and player = rock
      else if (computerRand === 3 && playerRand === 1) {
        message.textContent = randomMessageWhenUserWins;
        guessedRight();
      } else if (playerRand > computerRand) {
        message.textContent = randomMessageWhenUserWins;
        guessedRight();
      } else if (computerRand > playerRand) {
        message.textContent = randomMessageWhenUserlose;
        guessedWrong();
      }
      console.log(computerScore, playerScore);
      displayScore();
    }
    if (playerScore > computerScore && playerScore === 7) {
      console.log('you win hurray🎉🎊');
      userwinsModal();
      isPlaying = false;
    } else if (computerScore > playerScore && computerScore === 7) {
      console.log('gameover , U lost 😶');
      isPlaying = false;
      userlostModal();
    } else {
    }
  });
}
restart.addEventListener('click', gameReset);
mainMenu.addEventListener('click', goBack);
