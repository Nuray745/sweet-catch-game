const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const howScreen = document.getElementById("howScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOverHomeBtn = document.getElementById("gameOverHomeBtn"); 
const howBtn = document.getElementById("howBtn");
const backBtn = document.getElementById("backBtn");

const homeBtn = document.getElementById("homeBtn");

const exitModal = document.getElementById("exitModal");
const yesExit = document.getElementById("yesExit");
const noExit = document.getElementById("noExit");

const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const highScoreText = document.getElementById("highScore");

const menuHighScore = document.getElementById("menuHighScore");

const finalScore = document.getElementById("finalScore");
const newHigh = document.getElementById("newHigh"); 

let score = 0;
let lives = 3;
let gameRunning = false;
let spawnTimeout;

let highscoreSoundPlayed = false; 
let targetToBeat = 0; 

const homeBgm = new Audio("assets/home-bgm.mp3");
homeBgm.loop = true; 

const catchSound = new Audio("assets/catch.mp3");
const bombSound = new Audio("assets/explosion.mp3");
const pepperSound = new Audio("assets/pepper.mp3");
const highscoreSound = new Audio("assets/highscore.mp3");
const gameOverSound = new Audio("assets/gameover.mp3");

let highScore = localStorage.getItem("sweetHighScore") || 0;
highScoreText.innerText = highScore;
menuHighScore.innerText = highScore;

function playHomeMusic() {
  if (startScreen.classList.contains("active")) {
    homeBgm.play().catch(err => {
      console.log("Brauzer musiqini hələ bloka salıb.", err);
    });
  }
}

function saveHighScore(){
  if(score > highScore){
    highScore = score;
    localStorage.setItem("sweetHighScore", highScore);
    highScoreText.innerText = highScore;
    menuHighScore.innerText = highScore;
    return true;
  }
  return false;
}

function startGame(){
  gameRunning = true;
  score = 0;
  lives = 3;

  highscoreSoundPlayed = false; 
  targetToBeat = parseInt(highScore); 

  scoreText.innerText = score;
  livesText.innerText = lives;
  scoreText.style.color = "#ff5fa8";
  scoreText.style.transform = "scale(1)";

  document.querySelectorAll(".item").forEach(item => item.remove());
  gameScreen.classList.remove("screen-shake", "pepper-flash");

  homeBgm.pause();
  pepperSound.pause();
  highscoreSound.pause(); 
  gameOverSound.pause(); 

  startScreen.classList.remove("active");
  howScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");
  gameScreen.classList.add("active");

  spawnLoop();
}

function goHome(){
  saveHighScore();
  gameRunning = false;
  clearTimeout(spawnTimeout);

  document.querySelectorAll(".item").forEach(item => item.remove());
  gameScreen.classList.remove("screen-shake", "pepper-flash");

  gameScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");
  howScreen.classList.remove("active");
  startScreen.classList.add("active");

  pepperSound.pause();
  highscoreSound.pause();
  gameOverSound.pause(); 
  playHomeMusic();

  exitModal.classList.remove("show");
}

function endGame(){
  gameRunning = false;
  clearTimeout(spawnTimeout);

  saveHighScore(); 

  gameScreen.classList.remove("active");
  gameScreen.classList.remove("screen-shake", "pepper-flash");
  gameOverScreen.classList.add("active");

  finalScore.innerText = score;
  newHigh.innerText = highScore; 

  homeBgm.pause();
  pepperSound.pause();
  highscoreSound.pause();
  
  gameOverSound.currentTime = 0;
  gameOverSound.play().catch(err => {
    console.log("Game over səsi çalınmadı, klikləmə gözlənilir.", err);
  });
}

function spawnLoop(){
  if(!gameRunning) return;
  createItem();
  spawnTimeout = setTimeout(() => {
    if(gameRunning){
      spawnLoop();
    }
  }, 800);
}

function createItem(){
  const item = document.createElement("div");
  item.classList.add("item");

  const rand = Math.random();
  if (rand < 0.18) {
    item.innerText = "🌶️";
    item.dataset.type = "pepper";
  } else if (rand < 0.38) {
    item.innerText = "💣";
    item.dataset.type = "bomb";
  } else {
    item.innerText = ["🍩","🍬","🍪","🧁"][Math.floor(Math.random() * 4)];
    item.dataset.type = "sweet";
  }

  item.style.left = Math.random() * (window.innerWidth - 100) + "px";
  item.style.top = "-50px";

  gameArea.appendChild(item);
  let y = -50;

  const fall = setInterval(() => {
    if(!gameRunning){
      clearInterval(fall);
      item.remove();
      return;
    }

    y += 5;
    item.style.top = y + "px";

    const basketRect = basket.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const caught =
      itemRect.bottom > basketRect.top &&
      itemRect.left < basketRect.right &&
      itemRect.right > basketRect.left;

    if(caught){
      if(item.dataset.type === "bomb"){
        lives--;
        livesText.innerText = lives;

        bombSound.currentTime = 0;
        bombSound.play().catch(() => {});

        if(gameRunning) {
          gameScreen.classList.remove("screen-shake", "pepper-flash");
          void gameScreen.offsetWidth; 
          gameScreen.classList.add("screen-shake");
        }

        const popup = document.createElement("div");
        popup.classList.add("bomb-popup");
        popup.innerText = "-1 ❤️";
        popup.style.left = (basketRect.left + basketRect.width / 2 - 25) + "px";
        popup.style.top = (basketRect.top - 20) + "px";
        document.body.appendChild(popup);

        setTimeout(() => { popup.remove(); }, 700);

        if(lives <= 0){
          clearInterval(fall);
          item.remove();
          endGame(); 
          return;
        }
      } 
      else if(item.dataset.type === "pepper"){
        score -= 15;
        
        pepperSound.currentTime = 0;
        pepperSound.play().catch(() => {});

        if(score <= 0) {
          score = 0;
          scoreText.innerText = score;
          clearInterval(fall);
          item.remove();
          endGame();
          return;
        }
        scoreText.innerText = score;

        scoreText.style.color = "#ff1a1a";
        scoreText.style.transform = "scale(1.35)";
        scoreText.style.transition = "transform 0.08s, color 0.08s";
        setTimeout(() => { 
          scoreText.style.color = "#ff5fa8"; 
          scoreText.style.transform = "scale(1)";
        }, 800);

        gameScreen.classList.remove("pepper-flash", "screen-shake");
        void gameScreen.offsetWidth;
        gameScreen.classList.add("pepper-flash");

        basket.classList.remove("basket-pop", "basket-burn");
        void basket.offsetWidth; 
        basket.classList.add("basket-burn");
        
        setTimeout(() => { basket.classList.remove("basket-burn"); }, 400);

        const popup = document.createElement("div");
        popup.classList.add("pepper-popup");
        popup.innerText = "-15 🌶️";
        popup.style.left = (basketRect.left + basketRect.width / 2 - 40) + "px";
        popup.style.top = (basketRect.top - 40) + "px";
        document.body.appendChild(popup);

        setTimeout(() => { popup.remove(); }, 750);
      } 
      else {
        score += 10;
        scoreText.innerText = score;

        if (score > targetToBeat && !highscoreSoundPlayed) {
          highscoreSoundPlayed = true; 
          highscoreSound.currentTime = 0;
          highscoreSound.play().catch(() => {}); 
          
          scoreText.style.color = "#ff9800"; 
          setTimeout(() => { scoreText.style.color = "#ff5fa8"; }, 1500);
        } else {
          catchSound.currentTime = 0; 
          catchSound.play().catch(() => {});
        }

        if(score > highScore) {
          highScoreText.innerText = score;
        }

        basket.classList.remove("basket-pop", "basket-burn");
        void basket.offsetWidth; 
        basket.classList.add("basket-pop");

        const popup = document.createElement("div");
        popup.classList.add("score-popup");
        popup.innerText = "+10";
        popup.style.left = (basketRect.left + basketRect.width / 2 - 20) + "px";
        popup.style.top = (basketRect.top - 20) + "px";
        document.body.appendChild(popup);

        setTimeout(() => { popup.remove(); }, 600);
      }

      clearInterval(fall);
      item.remove();
    }

    if(y > window.innerHeight){
      clearInterval(fall);
      item.remove();
    }
  }, 20);
}

document.addEventListener("mousemove", (e) => {
  basket.style.left = e.clientX + "px";
});

startBtn.onclick = () => { startGame(); };
restartBtn.onclick = () => { startGame(); };
gameOverHomeBtn.onclick = () => { goHome(); }; 

howBtn.onclick = () => {
  startScreen.classList.remove("active");
  howScreen.classList.add("active");
};
backBtn.onclick = () => {
  howScreen.classList.remove("active");
  startScreen.classList.add("active");
  playHomeMusic();
};
homeBtn.onclick = () => {
  gameRunning = false;
  exitModal.classList.add("show");
};
yesExit.onclick = () => { goHome(); };
noExit.onclick = () => {
  exitModal.classList.remove("show");
  gameRunning = true;
  spawnLoop();
};

function initHomeCandies() {
  const container = document.querySelector(".floating-candies");
  if(!container) return;
  const candyCount = 15;

  for (let i = 0; i < candyCount; i++) {
    const candy = document.createElement("div");
    candy.classList.add("home-bg-candy");
    candy.innerText = ["🍩","🍬","🍪","🧁"][Math.floor(Math.random() * 4)];
    candy.style.left = Math.random() * 100 + "vw";
    candy.style.fontSize = (Math.random() * 20 + 20) + "px";
    candy.style.animationDuration = (Math.random() * 6 + 6) + "s";
    candy.style.animationDelay = (Math.random() * -12) + "s";
    container.appendChild(candy);
  }
}
initHomeCandies();

document.addEventListener("click", () => {
  playHomeMusic();
}, { once: false });