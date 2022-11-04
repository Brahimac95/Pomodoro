let initialTime = 1800;
let restTime = 600;

//Fonction de format du temps
function formatTime(time) {
    //On regarde le reste du temps restant et on affiche avec un 0 devant lorsque celui-ci est inferieur à 10 (29:09)
    return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWork = document.querySelector(".work-display-time");
const displayPause = document.querySelector(".pause-display-time");

displayWork.textContent = formatTime(initialTime);
displayPause.textContent = formatTime(restTime);

const startPauseBtn = document.querySelector(".start-btn");
startPauseBtn.addEventListener("click", togglePomodoro);
let currentInterval = false
let timerID;//L'id de setInterval

function togglePomodoro() {
    handlePlayPause()

    if(currentInterval) return;// s'il y a un interval en cours on block les autres si jamais on réapui sur le boutton play
    currentInterval = true
    //Pour déclencher la decompte juste au clic du bouton
    initialTime--;
    displayWork.textContent = formatTime(initialTime)
    handleClassAnimation({work: true, rest: false})
    timerID = setInterval(handleCount, 1000)

}

let pause = true
//Function de changement d'icone  quand on click sur le bouton lors du demarrage du temps et la mise en pause. 
function handlePlayPause() {
    if(startPauseBtn.firstElementChild.src.includes("play")) {
        startPauseBtn.firstElementChild.src = "ressources/pause.svg";
        pause = false;
    }
    else {
        startPauseBtn.firstElementChild.src = "ressources/play.svg"
        pause = true
    }

}

function handleClassAnimation(itemState) {
    //On boucle à travers les objets
    for(const item in itemState) {
        if(itemState[item]){
            document.querySelector(`.${item}`).classList.add("active")
        }
        else {
            document.querySelector(`.${item}`).classList.remove("active")

        }
    }

}

const cycles = document.querySelector(".cycles");

function handleCount() {
    if(!pause && initialTime > 0) {
        initialTime--;
        displayWork.textContent = formatTime(initialTime)
        handleClassAnimation({work: true, rest: false})
    }
    else if(!pause && initialTime === 0 && restTime > 0) {
        restTime--;
        displayPause.textContent = formatTime(restTime)
        handleClassAnimation({work: false, rest: true})

    }
    else if (pause){
        displayWork.textContent = formatTime(initialTime)
        displayPause.textContent = formatTime(restTime);
        handleClassAnimation({work: false, rest: false})
       
    }
    else {
        initialTime = 1800; //On initialise le temps de travail directement à 29:59
        restTime = 600;
        displayWork.textContent = formatTime(initialTime)
        displayPause.textContent = formatTime(restTime);
    
    }

}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset)

function reset() {
    initialTime = 1800;
    restTime = 600;
    displayWork.textContent = formatTime(initialTime)
    displayPause.textContent = formatTime(restTime);
    pause = true
    handleClassAnimation({work: false, rest: false})
    startPauseBtn.firstElementChild.src = "ressources/play.svg"; //On remet l'icone play

    clearInterval(timerID)
    currentInterval = false;

}

