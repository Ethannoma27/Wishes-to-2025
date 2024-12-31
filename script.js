// 烟花效果
const fireworksContainer = document.querySelector('.fireworks');

// 创建烟花动画
function createFirework() {
  const firework = document.createElement('div');
  firework.classList.add('firework');
  const size = Math.random() * 5 + 10;  // 随机生成烟花大小
  firework.style.width = `${size}px`;
  firework.style.height = `${size}px`;
  firework.style.top = `${Math.random() * 100}%`;
  firework.style.left = `${Math.random() * 100}%`;
  fireworksContainer.appendChild(firework);

  // 动画结束后移除烟花
  setTimeout(() => {
    firework.remove();
  }, 1000);
}

// 每隔200ms创建一个烟花
setInterval(createFirework, 200);
