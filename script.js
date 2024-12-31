document.addEventListener('DOMContentLoaded', () => {
    const fireworksButton = document.getElementById('fireworksButton');
  
    // 按钮点击触发烟花效果
    fireworksButton.addEventListener('click', () => {
      createFireworks();
    });
  
    // 页面滚动触发烟花效果
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        createFireworks();
      }
    });
  
    // 烟花效果的实现
    function createFireworks() {
      const canvas = document.createElement('canvas');
      canvas.id = 'fireworksCanvas';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
  
      const ctx = canvas.getContext('2d');
  
      // 火花效果类
      class Firework {
        constructor(x, y, color) {
          this.x = x;
          this.y = y;
          this.color = color;
          this.size = Math.random() * 3 + 2;
          this.speed = Math.random() * 5 + 2;
          this.angle = Math.random() * Math.PI * 2;
          this.velocityX = Math.cos(this.angle) * this.speed;
          this.velocityY = Math.sin(this.angle) * this.speed;
          this.life = Math.random() * 100 + 50;
        }
  
        update() {
          this.x += this.velocityX;
          this.y += this.velocityY;
          this.velocityY += 0.05; // 模拟重力
          this.life -= 1;
        }
  
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
  
      const fireworks = [];
      const colors = ['#FF5733', '#FFD700', '#C71585', '#87CEEB', '#32CD32'];
  
      // 创建烟花
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        fireworks.push(new Firework(x, y, color));
      }
  
      // 动画循环
      function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
          firework.update();
          firework.draw();
  
          if (firework.life <= 0) {
            fireworks.splice(index, 1);
          }
        });
  
        if (fireworks.length > 0) {
          requestAnimationFrame(animateFireworks);
        } else {
          canvas.remove(); // 动画结束后移除画布
        }
      }
  
      animateFireworks();
    }
  });
  