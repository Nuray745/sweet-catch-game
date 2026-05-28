const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");

document.addEventListener("mousemove", (e) => {
    basket.style.left = (e.clientX - 25) + "px";
});

function createItem() {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerText = Math.random() > 0.5 ? "🍬" : "💣";
    item.style.left = Math.random() * (window.innerWidth - 50) + "px";
    item.style.top = "-50px";
    gameArea.appendChild(item);

    let y = -50;
    const fall = setInterval(() => {
        y += 5;
        item.style.top = y + "px";

        // Toqquşma (Collision) yoxlaması
        const basketRect = basket.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        if (
            itemRect.bottom > basketRect.top &&
            itemRect.left < basketRect.right &&
            itemRect.right > basketRect.left
        ) {
            item.remove();
            clearInterval(fall);
            console.log("Toqquşma oldu!");
        }

        if (y > window.innerHeight) {
            item.remove();
            clearInterval(fall);
        }
    }, 20);
}

// Obyektləri hər 1 saniyədən bir yarat
setInterval(createItem, 1000);