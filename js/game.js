const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let isGameActive = false;
let isJumping = false; // Защита от двойного прыжка
let score = 0;
let gameLoop;
let scoreInterval;

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

// Обработчик клавиатуры
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault(); 
        
        if (isGameActive && !isJumping) {
            jump();
        }
    }
});

// Функция прыжка
function jump() {
    isJumping = true; // Запрещаем прыгать, пока не приземлимся
    dino.classList.add("jump");
    
    setTimeout(function () {
        dino.classList.remove("jump");
        isJumping = false; // Разрешаем следующий прыжок
    }, 500); 
}

function startGame() {
    isGameActive = true;
    isJumping = false;
    score = 0;
    scoreEl.innerText = score;
    
    startBtn.style.display = "none";
    restartBtn.style.display = "none"; 

    cactus.classList.remove("cactus-active");
    void cactus.offsetWidth; 

    startCollisionCheck();
    startScoreCounter();

    setTimeout(() => {
        cactus.classList.add("cactus-active");
    }, 100);
}

// Проверка столкновения
function startCollisionCheck() {
    clearInterval(gameLoop);
    gameLoop = setInterval(function () {
        if (!isGameActive) return;

        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        if (cactusLeft < 75 && cactusLeft > 35 && dinoTop >= 135) {
            endGame();
        }
    }, 10);
}

function startScoreCounter() {
    clearInterval(scoreInterval);
    scoreInterval = setInterval(function () {
        if (isGameActive) {
            score++;
            scoreEl.innerText = score;
        }
    }, 200); 
}

function endGame() {
    isGameActive = false;
    clearInterval(gameLoop);
    clearInterval(scoreInterval);

    cactus.classList.remove("cactus-active");

    setTimeout(() => {
        alert("GAME OVER! Ваш счёт: " + score);
    }, 50);
    
    restartBtn.style.display = "inline-block";
}