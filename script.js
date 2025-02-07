const canvas = document.getElementById("animated-bg");
const ctx = canvas.getContext("2d");

// Resize Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas(); // Set initial size
window.addEventListener("resize", resizeCanvas);

// Particle Settings
let particlesArray = [];
const numberOfParticles = 80;
const colors = ["#00aaff", "#aaaaaa", "#ffffff"]; // Blue, Gray, White

// Particle Constructor
class Particle {
    constructor() {
        this.size = Math.random() * 3 + 2;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Draw Gradient Background on Canvas
function drawGradientBackground() {
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#090a0f");
    gradient.addColorStop(0.5, "#0b1b38");
    gradient.addColorStop(1, "#1a1a2e");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Initialize Particles
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animate Particles
function animateParticles() {
    drawGradientBackground(); // Keep drawing the gradient every frame

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animateParticles);
}

// Run Everything
initParticles();
animateParticles();
