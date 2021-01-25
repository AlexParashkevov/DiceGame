'use strict';

//Selecting elements
const Player0El = document.querySelector('.player--0');
const Player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const bntHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  Player0El.classList.toggle('player--active');
  Player1El.classList.toggle('player--active');
};

//Rolling dice functionality
bntRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchplayer();
    }
  }
});
bntHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to score of active player's score
    // 2. Check if score is >=100
    // 3. if not switch to the next player
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchplayer();
    }
  }
});
bntNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  diceEl.classList.toggle('hidden');
  Player0El.classList.remove('player--winner');
  Player1El.classList.remove('player--winner');
  Player0El.classList.add('player--active');
  Player1El.classList.remove('player--active');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
});
