// Fireworks.js - Create fireworks animation
let fireworkTimeout;

function startFireworks() {
  const canvas = document.createElement('canvas');
  canvas.id = 'fireworks';
  document.getElementById('fireworks-container').appendChild(canvas);
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  
  function Firework(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    this.createParticles();
  }

  Firework.prototype.createParticles = function() {
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        velocityX: Math.random() * 4 - 2,
        velocityY: Math.random() * 4 - 2,
        alpha: 1,
        size: Math.random() * 3 + 2,
        color: this.color,
      });
    }
  };

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.alpha -= 0.01;
      
      if (particle.alpha <= 0) particles.splice(index, 1);

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    if (particles.length === 0) {
      cancelAnimationFrame(fireworkTimeout);
    } else {
      fireworkTimeout = requestAnimationFrame(animate);
    }
  }

  animate();
}

document.getElementById('start-button').addEventListener('click', () => {
  startFireworks();
  document.getElementById('start-button').style.display = 'none';
});
