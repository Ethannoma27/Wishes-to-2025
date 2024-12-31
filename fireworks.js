(function() {
    // 检查浏览器是否支持 Canvas
    if (!document.createElement('canvas').getContext) {
        console.log('浏览器不支持 Canvas，烟花效果无法显示');
        return;
    }

    // 获取页面的画布元素
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworksCanvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 定义火花效果类
    class Firework {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = Math.random() * 3 + 2; // 火花大小
            this.speed = Math.random() * 5 + 2; // 火花速度
            this.angle = Math.random() * Math.PI * 2; // 方向
            this.velocityX = Math.cos(this.angle) * this.speed; // X轴速度
            this.velocityY = Math.sin(this.angle) * this.speed; // Y轴速度
            this.life = Math.random() * 100 + 50; // 火花生命周期
        }

        update() {
            // 更新火花的位置和速度
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.velocityY += 0.05; // 模拟重力
            this.life -= 1; // 火花生命减少
        }

        draw() {
            // 绘制火花
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // 烟花效果函数
    function createFireworks() {
        const fireworks = [];
        const colors = ['#FF5733', '#FFD700', '#C71585', '#87CEEB', '#32CD32']; // 烟花的颜色

        // 将烟花随机生成在页面的上方和四周
        for (let i = 0; i < 100; i++) {
            let x, y;

            // 通过判断生成位置，来确保烟花出现在上方或四周
            const side = Math.floor(Math.random() * 4); // 生成 0 到 3 之间的数字
            if (side === 0) {
                // 上方
                x = Math.random() * canvas.width;
                y = Math.random() * 50; // 在上方的 50 像素范围内
            } else if (side === 1) {
                // 左边
                x = Math.random() * 50; // 在左边的 50 像素范围内
                y = Math.random() * canvas.height;
            } else if (side === 2) {
                // 右边
                x = canvas.width - Math.random() * 50; // 在右边的 50 像素范围内
                y = Math.random() * canvas.height;
            } else {
                // 下方
                x = Math.random() * canvas.width;
                y = canvas.height - Math.random() * 50; // 在下方的 50 像素范围内
            }

            const color = colors[Math.floor(Math.random() * colors.length)];
            fireworks.push(new Firework(x, y, color));
        }

        // 动画循环
        function animateFireworks() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布

            // 更新和绘制每个火花
            fireworks.forEach((firework, index) => {
                firework.update();
                firework.draw();

                // 删除生命周期结束的火花
                if (firework.life <= 0) {
                    fireworks.splice(index, 1);
                }
            });

            // 如果仍有火花，继续绘制
            if (fireworks.length > 0) {
                requestAnimationFrame(animateFireworks);
            } else {
                canvas.remove(); // 动画结束后移除画布
            }
        }

        animateFireworks(); // 启动动画
    }

    // 页面滚动或点击触发烟花
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            createFireworks();
        }
    });

    // 按钮点击触发烟花
    const fireworksButton = document.getElementById('fireworksButton');
    if (fireworksButton) {
        fireworksButton.addEventListener('click', () => {
            createFireworks();
        });
    }
})();
