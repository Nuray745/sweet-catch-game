# 🤖 AI-Assisted Development

## AI Tools Used

### ChatGPT Free

Used for brainstorming gameplay ideas, debugging JavaScript logic, fixing collision issues, and improving the overall game structure.

### Gemini Free

Used for planning the functional game structure, organizing the project flow, and improving game loop performance.

### Claude Free

Used for improving CSS animations, visual effects, and making the JavaScript code cleaner and easier to read.

Using multiple AI tools helped compare solutions, verify logic, and improve the overall quality of the project.

---

# 📘 Development Log

## [2026-05-25] - Initial Game Structure Planning

### What I asked the AI:

"How can I structure a Sweet Catch game using vanilla JavaScript and a functional programming approach without using external libraries?"

### What it gave me:

A structure using reusable functions, arrays, and separate game logic functions for spawning items, collisions, and score updates.

### What was wrong:

The AI initially suggested mixing `requestAnimationFrame()` and `setInterval()` in a way that caused falling objects to move inconsistently.

### How I fixed it:

I reorganized the logic so item spawning uses timed intervals while movement updates remain smooth and consistent.

### Time lost:

~40 minutes

---

## [2026-05-26] - Collision Detection Problems

### What I asked the AI:

"How can I detect when the basket catches falling items?"

### What it gave me:

A simple collision detection function comparing X and Y positions.

### What was wrong:

Collisions were triggering too early because the coordinates were not perfectly aligned with the DOM elements.

### How I fixed it:

I used `getBoundingClientRect()` to get accurate positions for both the basket and falling items.

### Time lost:

~20 minutes

---

## [2026-05-26] - Browser Audio Autoplay Issue

### What I asked the AI:

"Why is my background music not playing automatically?"

### What it gave me:

An explanation about browser autoplay restrictions and the need for user interaction before audio can play.

### What was wrong:

The music still failed to start automatically when entering the game.

### How I fixed it:

I triggered the background music after the user's first click interaction on the page.

### Time lost:

~30 minutes

---

## [2026-05-27] - CSS Animation Not Restarting

### What I asked the AI:

"How can I make my pepper hit animation play every time?"

### What it gave me:

A solution using `classList.add()` to apply animation classes.

### What was wrong:

The animation only worked once because the CSS class remained attached to the element.

### How I fixed it:

I forced a browser reflow using `void element.offsetWidth` before re-adding the animation class.

### Time lost:

~25 minutes

---

## [2026-05-27] - High Score Saving Logic

### What I asked the AI:

"How can I permanently save the player's best score using localStorage?"

### What it gave me:

Basic `localStorage.setItem()` logic.

### What was wrong:

The high score was being overwritten even when the current score was lower.

### How I fixed it:

I added a condition to update localStorage only when the player achieves a new high score.

### Time lost:

~15 minutes
