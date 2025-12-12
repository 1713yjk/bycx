/**
 * 背景粒子场效果
 * 使用 Canvas 绘制缓慢移动的几何粒子
 */

class ParticlesBackground {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particles-canvas';
    this.canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0;';
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 18;
    this.rafId = null;
    
    this.init();
  }

  init() {
    this.container.style.position = 'relative';
    this.container.insertBefore(this.canvas, this.container.firstChild);
    
    this.resize();
    this.createParticles();
    
    window.addEventListener('resize', () => this.resize());
    
    this.setupVisibilityDetection();
    this.animate();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.1 + 0.05,
      shape: Math.floor(Math.random() * 3), // 0: 圆, 1: 三角, 2: 方
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    };
  }

  drawParticle(particle) {
    this.ctx.save();
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);
    
    switch(particle.shape) {
      case 0: // 圆形
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        break;
        
      case 1: // 三角形
        this.ctx.beginPath();
        this.ctx.moveTo(0, -particle.size);
        this.ctx.lineTo(particle.size, particle.size);
        this.ctx.lineTo(-particle.size, particle.size);
        this.ctx.closePath();
        this.ctx.fill();
        break;
        
      case 2: // 方形
        this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        break;
    }
    
    this.ctx.restore();
  }

  updateParticle(particle) {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.rotation += particle.rotationSpeed;
    
    // 边界检测和反弹
    if (particle.x < 0 || particle.x > this.canvas.width) {
      particle.speedX *= -1;
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
    }
    
    if (particle.y < 0 || particle.y > this.canvas.height) {
      particle.speedY *= -1;
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });
  }

  setupVisibilityDetection() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.resume();
          } else {
            this.pause();
          }
        });
      },
      { threshold: 0 }
    );
    
    observer.observe(this.container);
  }

  pause() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  resume() {
    if (!this.rafId) {
      this.animate();
    }
  }

  animate() {
    this.draw();
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

// 初始化函数
function initParticlesBackground() {
  new ParticlesBackground('#about');
}

// 页面加载后自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticlesBackground);
} else {
  initParticlesBackground();
}
