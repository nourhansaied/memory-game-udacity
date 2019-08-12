/*
 * Create a list that holds all of your cards
 */
let iconsArray = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle',
 'fa-diamond','fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
  'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle'];

let cardContainer = document.querySelector('#cards-container')

let shuffleArray = shuffle(iconsArray);

const timer = document.querySelector(".timer");

const hourTimer = document.querySelector(".hour");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");

let timeCounter;
let timerOn = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
// Restart
const restart = document.querySelector(".restart");

// modal
const modal = document.querySelector('.modal');
const btnModal = document.querySelector('.btn-modal');
const ratingModal = document.querySelector('.rating-modal');
const movesModal = document.querySelector('.moves-modal');

const timeModal = document.querySelector('.time-modal');
let checkCards = [];
let matchedCards = [];

// stars
const stars = document.querySelector('.stars').childNodes;
const starsForRate = document.querySelector('.stars');
// Moves
let moves = 0;
const movesCounter = document.querySelector(".moves");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

createCards()

function createCards() {
    // clear old one 
    cardContainer.innerHTML = "";
    // create ul for cards
    let ul = document.createElement('ul');
    ul.classList.add('deck');
    for (let i = 0; i < shuffleArray.length ; i++) {
        let li = document.createElement('li');
        li.classList.add('card');
        li.innerHTML = `<i class="fa ${shuffleArray[i]}" ></i>`;
        ul.appendChild(li);
    }
    cardContainer.appendChild(ul);
    cardContainer.addEventListener('click', onCardClicked)

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function onCardClicked(e){
    let selectedCard = e.target;
    // to make sure that the clicked target is a card & 
    // not an opened/matched card
    if (selectedCard.classList.contains("card") &&
        !selectedCard.classList.contains("open", "show", "match")) {
        // add classes open and show to the selected card
        if (timerOn === false) {
            startTimer();
            timerOn = true;
        }
        selectedCard.classList.add("open", "show");
        // add the selected card to checkCards array to check if it's
        // like the next selected card or not
        checkCards.push(selectedCard);
    }
    // checking cards when their are two cards in checkCards array
    if (checkCards.length === 2) {
        // to prevent opening more than two cards till the
        // checking process is finished
        cardContainer.classList.add("stop-event");
        //counting the moves
        movesNum();
        // if the cards are matched call the matched function
        if (checkCards[0].innerHTML === checkCards[1].innerHTML) {
            matched();
        } else {
            
            checkCards[0].classList.add("unmatch");
            checkCards[1].classList.add("unmatch");
            // if they aren't matched call the notMatched function
            // after 800ms to allow the player to see the second card
            setTimeout(notMatched, 800);
        }
        wohoo();
    }
}
// if the cards are matched 
function matched() {
    // add class match to both cards
    checkCards[0].classList.add("match");
    checkCards[1].classList.add("match");
    // push both cards to the matchedCards array
    matchedCards.push(checkCards[0]);
    matchedCards.push(checkCards[1]);
    // remove cards from checkCards array
    checkCards = [];
    // to allow opening and checking two cards again
    cardContainer.classList.remove("stop-event");
}
// if the cards are not matched 
function notMatched() {
    // remove open & show classes from both cards
    checkCards[0].classList.remove("open", "show","unmatch");
    checkCards[1].classList.remove("open", "show","unmatch");
    // remove cards from checkCards array
    checkCards = [];
    // to allow opening and checking two cards again
    cardContainer.classList.remove("stop-event");
}

// to fix timer by adding zero if the 
// number is less than ten 
function fix(x, y) {
    if (x < 10) {
        return (y.innerHTML = ` 0${x}`);
    } else {
        return (y.innerHTML = ` ${x}`);
    }
}
function movesNum() {
    // to increment moves number after opening two cards
    moves++;
    if (moves === 1) {
        movesCounter.innerHTML = `1  Move`;
    } else {
        movesCounter.innerHTML = `${moves}  Moves`;
    }
    starsRating();
}
function startTimer() {
    // to start the timer to avoid delay
    if (seconds == 0) {
        seconds++;
    }

    timeCounter = setInterval(function () {

        hourTimer.innerHTML = `${hours}`;
        minuteTimer.innerHTML = ` ${minutes} `;
        secondsTimer.innerHTML = ` ${seconds} `;
        // fix each part of the timer
        fix(seconds, secondsTimer);
        fix(minutes, minuteTimer);
        fix(hours, hourTimer);

        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}
////////////////////////////////////
///////// Stars Rating ///////////
//////////////////////////////////

function starsRating() {
    // if the moves number is between 12 and 19
    if (moves === 12) {
        // change the color of the third star to grey
        stars[5].classList.add('grey');
        // if the moves number is 20 or more 
    } else if (moves === 20) {
        // change the color of the second star to grey
        stars[3].classList.add('grey');
    }
}

function restartGame() {
    // set it to false in order to fulfil the condition 
    timerOn = false;
    // reset the moves to zero
    moves = 0;
    movesCounter.innerHTML = `0 Moves`;
    // empty both arrays 
    matchedCards = [];
    checkCards = [];
    // to clear the old board, create a new 
    // shuffled  cards board  
    createCards();
    clearInterval(timeCounter);
    // reset the timer to zero
    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsTimer.innerText = "00";
    minuteTimer.innerText = " 00";
    hourTimer.innerText = "00";
    
    stars[5].classList.remove('grey');
    stars[3].classList.remove('grey');
}
// to restart  the game when the player click on the restart icon
restart.addEventListener("click", restartGame);

////////////////////////////////////////////////////////
/////////////// Win Modal Function ///////////////
////////////////////////////////////////////////////

function wohoo() {
    //when the player finish the game
    if (matchedCards.length === 16) {
        // to add the stats to the modal
        movesModal.innerHTML = movesCounter.innerHTML.slice(0, 3);
        timeModal.innerText = timer.innerText;
        ratingModal.innerHTML = starsForRate.innerHTML;
        //stop the timer and show the modal
        modal.style.display = 'block';
    }
}

btnModal.addEventListener('click', function () {
    // to close the modal and restart the game
    modal.style.display = 'none';
    restartGame();
})
