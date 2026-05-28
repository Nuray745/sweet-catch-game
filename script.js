const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");

let score = 0;
let lives = 3;
let gameRunning = false;

document.getElementById("startBtn").onclick = startGame;
document.getElementById("restartBtn").onclick = startGame;

function startGame() {
    // 1. Köhnə obyektləri təmizlə
    const items = document.querySelectorAll(".item");
    items.forEach(item => item.remove());

    // 2. Dəyişənləri sıfırla
    score = 0; 
    lives = 3; 
    gameRunning = true;
    
    scoreElement.innerText = score;
    livesElement.innerText = lives;
    
    // 3. Ekranları dəyiş
    startScreen.classList.remove("active");
    gameOverScreen.classList.remove("active");
    gameScreen.classList.add("active");
    
    spawnLoop();
}

function endGame() {
    gameRunning = false;
    gameScreen.classList.remove("active");
    gameOverScreen.classList.add("active");
}

function spawnLoop() {
    if (!gameRunning) return;
    createItem();
    setTimeout(spawnLoop, 1000);
}

function createItem() {
    if (!gameRunning) return;
    const item = document.createElement("div");
    item.classList.add("item");
    const isSweet = Math.random() > 0.3;
    item.innerText = isSweet ? "🍬" : "💣";
    item.style.left = Math.random() * (window.innerWidth - 50) + "px";
    item.style.top = "-50px";
    gameArea.appendChild(item);

    let y = -50;
    const fall = setInterval(() => {
        if (!gameRunning) { clearInterval(fall); item.remove(); return; }
        y += 5;
        item.style.top = y + "px";
        const basketRect = basket.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        if (itemRect.bottom > basketRect.top && itemRect.left < basketRect.right && itemRect.right > basketRect.left) {
            isSweet ? (score += 10, scoreElement.innerText = score) : (lives -= 1, livesElement.innerText = lives);
            if (lives <= 0) endGame();
            item.remove(); clearInterval(fall);
        }
        if (y > window.innerHeight) { item.remove(); clearInterval(fall); }
    }, 20);
}

document.addEventListener("mousemove", (e) => {
    basket.style.left = (e.clientX - 25) + "px";
});