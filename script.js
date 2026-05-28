const basket = document.getElementById("basket");

document.addEventListener("mousemove", (e) => {
    basket.style.left = (e.clientX - 25) + "px";
});