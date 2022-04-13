var gElStopWatch = document.querySelector('.stopwatch') //<div class="stopwatch">0.000</div>
var gTimerInterval
var gStartTime

function timerCycle() {
    var currTime = Date.now()
    var sec = (currTime - gStartTime) / 1000
    sec = sec.toFixed(3)
    gElStopWatch.innerHTML = sec
}

function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(timerCycle, 10)
}

function stopTimer() {
    clearInterval(gTimerInterval)
}

function resetTimer() {
    clearInterval(gTimerInterval)
    gElStopWatch.innerText = '0.000'
}



function getRandomIntExclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
