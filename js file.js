let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let Btns =["pink","blue","green","yellow"];

let h2 = document.querySelector("h2");


document.addEventListener("keypress", function () {
    if (started==false) {
        started = true;
        levelup();
    }
});
function btnFlash(Btn) {
     Btn.classList.add("flash");
    setTimeout(function () {
        Btn.classList.remove("flash");
    }, 250);
}
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = Btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    btnFlash(randBtn);
}
function checkAnswer(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(function () {
                levelup();
            }, 1000);
        }
    }else {
        h2.innerHTML = `Game Over! your score was <b>${level}</b> .<br> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
         highestScore();
        reset();
    }
}



function buttonPress() {
    let Btn = this;
    btnFlash(Btn);
    userColor = Btn.getAttribute("id");
    userseq.push(userColor);
    checkAnswer(userseq.length - 1);
}
let allBtns = document.querySelectorAll(".Btn");
for(Btn of allBtns) {
    Btn.addEventListener("click", buttonPress);
    
}
function reset() {
    level = 0;
    gameseq = [];
    started = false;
    userseq = [];
   

}
function highestScore() {
    let score = localStorage.getItem("score");
    if (score === null) {
        localStorage.setItem("score", level);
        addScore = document.createElement("h3");
        addScore.innerHTML = `Highest Score: ${level}`;
        document.querySelector("body").appendChild(addScore);
    }else {
        if (level > score) {
            localStorage.setItem("score", level);
            addScore = document.createElement("h3");
            addScore.innerHTML = `Highest Score: ${level}`;
            document.querySelector("body").appendChild(addScore);
        }else {
            addScore = document.createElement("h3");
            addScore.innerHTML = `Highest Score: ${score}`;
            document.querySelector("body").appendChild(addScore);
        }
}}