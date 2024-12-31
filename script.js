// 烟花动画代码
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y, color, size, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.speed = speed;
    this.angle = Math.random() * 2 * Math.PI;
    this.velocityX = Math.cos(this.angle) * speed;
    this.velocityY = Math.sin(this.angle) * speed;
    this.life = 100;
}

Particle.prototype.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.size *= 0.96;
    this.life -= 2;
};

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
};

function createFirework(x, y) {
    const colors = ['#FF4500', '#FF6347', '#FFD700', '#FFFF00'];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], 3 + Math.random() * 3, 3 + Math.random() * 3));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// 在页面加载时生成烟花
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    createFirework(x, y);
}, 1000);

animate();

