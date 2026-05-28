const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

let score = 0;
let lives = 3;

document.addEventListener("mousemove", (e) => {
    basket.style.left = (e.clientX - 25) + "px";
});

function createItem() {
    const item = document.createElement("div");
    item.classList.add("item");
    const isSweet = Math.random() > 0.3;
    item.innerText = isSweet ? "🍬" : "💣";
    item.dataset.type = isSweet ? "sweet" : "bomb";
    
    item.style.left = Math.random() * (window.innerWidth - 50) + "px";
    item.style.top = "-50px";
    gameArea.appendChild(item);

    let y = -50;
    const fall = setInterval(() => {
        y += 5;
        item.style.top = y + "px";

        const basketRect = basket.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        if (itemRect.bottom > basketRect.top && itemRect.left < basketRect.right && itemRect.right > basketRect.left) {
            if (item.dataset.type === "sweet") {
                score += 10;
                scoreElement.innerText = score;
            } else {
                lives -= 1;
                livesElement.innerText = lives;
            }
            item.remove();
            clearInterval(fall);
        }

        if (y > window.innerHeight) {
            item.remove();
            clearInterval(fall);
        }
    }, 20);
}

setInterval(createItem, 1000);