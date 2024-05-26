var myCards = document.getElementById('container');
var resultsArray = [];
var flippedCards = [];
var counter = 0;
var text = document.getElementById('text');
var seconds = 0;
var minutes = 0;
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
    if (tens >= 100) {
        tens = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    appendTens.innerHTML = tens < 10 ? "0" + tens : tens;
    appendSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
}
function win() {
    if (counter === 10) {
        clearInterval(Interval);
        // Display congratulatory message with time
        document.getElementById('congratulations').style.display = 'flex';
        document.getElementById('congratulations').querySelector('.congratulations_window').innerHTML = 
            `<h1>Congratulations, you won!</h1>
            <h3><p>Time: ${formatTime(minutes, seconds)}</p></h3>
            <center><a href = "menu_en.html"><button class = "popup-button">Try again</button></a></center>`;
    }
}
function formatTime(minutes, seconds) {
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
