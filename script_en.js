var myCards = document.getElementById('container');
var resultsArray = [];
var counter = 0;
var text = document.getElementById('text');
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval;
var images = [
    'sass',
    'git',
    'gulp',
    'css',
    'grunt'
];
var clone = images.slice(0); // duplicate array
var cards = images.concat(clone); // merge two arrays

// Double the number of cards for each item
cards = cards.concat(cards);

// Shuffle function
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function startGame() {
    
    // Hide menu
    document.getElementById('menu').style.display = 'none';
    document.getElementById('clicktoStart').style.display='block';
    
    // Shuffle cards
    shuffle(cards);
    
    // Create cards
    for (var i = 0; i < cards.length; i++) {
        var card = document.createElement('div');
        card.dataset.item = cards[i];
        card.dataset.view = "card";
        myCards.appendChild(card);
        card.onclick = function () {
            if (this.className != 'flipped' && this.className != 'correct') {
                this.className = 'flipped';
                var result = this.dataset.item;
                resultsArray.push(result);
                clearInterval(Interval);
                Interval = setInterval(startTimer, 10);
            }
            if (resultsArray.length > 1) {
                if (resultsArray[0] === resultsArray[1]) {
                    check("correct");
                    counter++;
                    win();
                    resultsArray = [];
                } else {
                    check("reverse");
                    resultsArray = [];
                }
            }
        };
    }
}
function startTimer() {
    text.innerHTML = 'Current time ' + seconds + ":" + tens;
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
function check(className) {
    var x = document.getElementsByClassName("flipped");
    setTimeout(function () {
        for (var i = (x.length - 1); i >= 0; i--) {
            x[i].className = className;
        }
    }, 500);
}
function win() {
    if (counter === 10) {
        clearInterval(Interval);
        text.innerHTML = "Your time was " + seconds + ":" + tens;
        // Display congratulatory message
        document.getElementById('congratulations').style.display = 'block';
    }
}

