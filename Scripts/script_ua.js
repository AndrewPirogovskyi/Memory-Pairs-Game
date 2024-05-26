var myCards = document.getElementById('container');
var resultsArray = [];
var flippedCards = [];
var counter = 0;
var text = document.getElementById('text');
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval;
var images = [
    '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '10'
];
var cards = images.concat(images); // Create pairs

// Shuffle function
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function startGame() {
    // Hide menu
    document.getElementById('menu').style.display = 'none';
    document.getElementById('clicktoStart').style.display = 'block';

    // Shuffle cards
    shuffle(cards);

    // Create cards
    for (var i = 0; i < cards.length; i++) {
        var card = document.createElement('div');
        card.dataset.item = cards[i];
        card.dataset.view = "card";
        myCards.appendChild(card);
        card.onclick = function () {
            if (flippedCards.length < 2 && this.className !== 'flipped' && this.className !== 'correct') {
                this.className = 'flipped';
                flippedCards.push(this);
                var result = this.dataset.item;
                resultsArray.push(result);
                clearInterval(Interval);
                Interval = setInterval(startTimer, 10);
                if (flippedCards.length === 2) {
                    setTimeout(compareCards, 700); // Adjust this timeout as needed for card flipping animation duration
                }
            }
        };
    }
}

function compareCards() {
    if (resultsArray[0] === resultsArray[1]) {
        for (var i = 0; i < flippedCards.length; i++) {
            flippedCards[i].className = 'correct';
        }
        counter++;
        win();
    } else {
        for (var i = 0; i < flippedCards.length; i++) {
            flippedCards[i].className = 'reverse';
        }
    }
    resultsArray = [];
    flippedCards = [];
}

function startTimer() {
    document.getElementById('title').style.display = 'none';

    tens++;
    if (tens < 9) {
        appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
        appendTens.innerHTML = tens;
    }
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}

function win() {
    if (counter === 10) {
        clearInterval(Interval);
        // Display congratulatory message
        document.getElementById('congratulations').style.display = 'flex';
    }
}