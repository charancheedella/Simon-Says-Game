let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];
let highScore = document.querySelector("span");

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let body = document.querySelector("body");
let button = document.querySelector("button");

let best = 0;

// Start button click
button.addEventListener("click", function () {
    if (started === false) {
        console.log("Game started");
        started = true;
        body.classList.remove("alert");
        button.innerText = "Game Running...";
        levelUp();
    }
});

// Game flashes
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Level up
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randInx];
    gameSeq.push(randColor);
    console.log(gameSeq);

    // Blink the full sequence
    let delay = 0;
    gameSeq.forEach((color, index) => {
        let btn = document.querySelector(`.${color}`);
        setTimeout(() => {
            gameFlash(btn);
        }, delay);
        delay += 600; // gap between blinks
    });
}


// Update high score
function updateHighScore() {
    if (level - 1 > best) {
        best = level - 1;
        highScore.innerText = best;
    }
}

// Check answer
function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore();
        button.innerText = "Start";
        h2.innerText = `Game over!! Current score: ${level - 1}`;
        reset();
        body.classList.add("alert");
    }
}

// Button click handling
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id"); // fixed: declare properly
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) { // fixed: use let
    btn.addEventListener("click", btnPress);
}

// Reset game
function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
