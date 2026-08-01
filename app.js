let userScore = 0;
let compScore = 0;

let userMatch = Number(localStorage.getItem("userMatch")) || 0;
let compMatch = Number(localStorage.getItem("compMatch")) || 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const userMatchPara = document.querySelector("#user-match");
const compMatchPara = document.querySelector("#comp-match");

userMatchPara.innerText = userMatch;
compMatchPara.innerText = compMatch;

const userImg = document.querySelector("#user-img");
const compImg = document.querySelector("#comp-img");
const vs = document.querySelector("#vs");
const battleSec = document.querySelector(".battle-section");

const popup = document.querySelector("#winner-popup");
const popupTittle = document.querySelector("#popup-title");
const popupMessage = document.querySelector("#popup-message");
const playAgainBtn = document.querySelector("#play-again");

const resetBtn = document.querySelector("#reset-btn");

const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");

choices.forEach((choice) => {
    choice.addEventListener("click", () => {

        clickSound.currentTime = 0;
        clickSound.play();

        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

const playGame = async (userChoice) => {

    userImg.style.display = "none";
    compImg.style.display = "none";
    vs.style.display = "none";
    battleSec.style.display = "none";

    const compChoice = genCompChoice();

    userImg.src = `images/${userChoice}.png`;
    compImg.src = `images/${compChoice}.png`;

    userImg.style.display = "block";
    compImg.style.display = "block";
    vs.style.display = "block";
    battleSec.style.display = "block";
    battleSec.style.border = "solid";

    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            userWin = compChoice === "scissors" ? false : true;
        }
        else{
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

const drawGame = () => {
    msg.innerText = "Game was draw. Play again!";
    msg.style.backgroundColor = "#0d85bd";
}
function showPopup(winner){

    popup.style.display = "flex";
    if(winner === "user"){
        popupTittle.innerText = "Congratulations!";
        popupMessage.innerText = "You won this match!";
        winSound.currentTime = 0;
        winSound.play();
    }
    else{
        popupTittle.innerText = "Better Luck Next Time!";
        popupMessage.innerText = "Computer won this match!";
        loseSound.currentTime = 0;
        loseSound.play();
    }
}
playAgainBtn.addEventListener("click",()=>{
    popup.style.display="none";
});

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;

        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = "green";

        if(userScore == 10){
            userMatch++;
            localStorage.setItem("userMatch",userMatch);
            userMatchPara.innerText = userMatch;

            showPopup("user");

            userScore = 0;
            compScore = 0;

            userScorePara.innerText = userScore;
            compScorePara.innerText = compScore;
        }
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;

        msg.innerText = `You lose! ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = "red";

        if(compScore == 10){
            compMatch++;
            localStorage.setItem("compMatch",compMatch);
            compMatchPara.innerText = compMatch;

            showPopup("computer"); 

            userScore = 0;
            compScore = 0;

            userScorePara.innerText = userScore;
            compScorePara.innerText = compScore;
        }
    }
};

resetBtn.addEventListener("click", () => {

    const confirmReset = confirm(
        "Are you sure you want to reset all statistics?"
    );

    if(!confirmReset) return;

    // Reset scores
    userScore = 0;
    compScore = 0;

    // Reset matches
    userMatch = 0;
    compMatch = 0;

    // Update UI
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;

    userMatchPara.innerText = 0;
    compMatchPara.innerText = 0;

    // Remove Local Storage
    localStorage.removeItem("userMatch");
    localStorage.removeItem("compMatch");

    // Reset message
    msg.innerText = "Play your move.";
    msg.style.backgroundColor = "#0d85bd";

    // Hide battle images
    userImg.style.display = "none";
    compImg.style.display = "none";
    vs.style.display = "none";
});