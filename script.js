'use strict';

//Selecting elements to prevent repetitive use of querySelector 
const score0DOM = document.querySelector(`#score--0`);
const score1DOM = document.getElementById(`score--1`); //Different method of calling DOM with ID 
const diceDOM = document.querySelector(`.dice`);
const player0DOM = document.querySelector(`.player--0`);
const player1DOM = document.querySelector(`.player--1`);
const current0DOM = document.getElementById(`current--0`);
const current1DOM = document.getElementById(`current--1`);


const buttonNew = document.querySelector(`.btn--new`);
const buttonRoll = document.querySelector(`.btn--roll`);
const buttonHold = document.querySelector(`.btn--hold`); //Determines the state of the game: which player is playing. 0 - player 1   1 - player 2 
let scores, currentScore, activePlayer, playingGame; //Final scores for each player 

gameInitialization(); //Start game; 



diceDOM.classList.add(`hidden`); //Adding the hidden class to the dice element, so dice can't be seen 

function switchPlayer(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1:0; //Ternary Operator to set value to reciprocal of what it was 
    player0DOM.classList.toggle(`player--active`); //.toggle will toggle the feature from the class 
    player1DOM.classList.toggle(`player--active`);
}

function gameInitialization(){ //Function to restart/reset game status 
    scores = [0,0];
    playingGame = true;
    currentScore = 0;
    score0DOM.textContent = 0;
    score1DOM.textContent = 0;
    current0DOM.textContent = 0;
    current1DOM.textContent = 0;
    player0DOM.classList.remove('player--winner');
    player1DOM.classList.remove('player--winner');
    player0DOM.classList.remove('player--loser');
    player1DOM.classList.remove('player--loser');
    player0DOM.classList.add('player--active');
    player1DOM.classList.remove('player--active');
    activePlayer = 0;

};

//Rolling dice functionality 
buttonRoll.addEventListener(`click`, function(){
    if(playingGame){ //ONLY execute button function when the game is playing 
        const randomNumber = Math.trunc(Math.random()*6) + 1;  
        diceDOM.classList.remove(`hidden`);
        diceDOM.src = `dice-${randomNumber}.png`; //Use .src in order to change image displayed. 

        if (randomNumber !== 1){
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; //Dynamically changes score depending on state of game 
        } else {
            switchPlayer();

        }
    }
});

buttonHold.addEventListener(`click`, function(){
    if (playingGame){

        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; //Updates overall score 

        if (scores[activePlayer]>= 20){
            playingGame = false; 
            diceDOM.classList.add(`hidden`);
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`); 
            document.querySelector(`.player--${activePlayer === 1 ? 0:1}`).classList.add(`player--loser`);
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`); //Don't forget '.' for querySelector!!! only remove '.' in getElementbyId

        } else {
            switchPlayer();
        }
    }
})

buttonNew.addEventListener(`click`,function(){
    gameInitialization();
})
