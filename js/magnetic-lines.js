/**
 * 磁场连线效果
 * 使用 Canvas 绘制卡片之间的动态连线
 */

class MagneticLines {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'magnetic-canvas';
    this.canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;';
    
    this.ctx = this.canvas.getContext('2d');
    this.cards = [];
    this.mouse = { x: 0, y: 0, active: false };
    this.rafId = null;
    this.isVisible = true;
    
    this.init();
  }

  init() {
    this.container.style.position = 'relative';
    this.container.insertBefore(this.canvas, this.container.firstChild);
    
    this.resize();
    this.updateCardPositions();
    
    window.addEventListener('resize', () => this.resize());
    this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.container.addEventListener('mouseenter', () => { this.mouse.active = true; });
    this.container.addEventListener('mouseleave', () => { this.mouse.active = false; });
    
    this.setupVisibilityDetection();
    this.animate();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.updateCardPositions();
  }

  updateCardPositions() {
    this.cards = [];
    const features = this.container.querySelectorAll('.oura-feature');
    const containerRect = this.container.getBoundingClientRect();
    
    features.forEach(feature => {
      const rect = feature.getBoundingClientRect();
      this.cards.push({
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      });
    });
  }

  onMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (!this.mouse.active) return;
    
    this.cards.forEach(card => {
      const dx = this.mouse.x - card.x;
      const dy = this.mouse.y - card.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const opacity = (1 - distance / 200) * 0.3;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x, this.mouse.y);
        this.ctx.lineTo(card.x, card.y);
        this.ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
        this.ctx.lineWidth = 1 + (1 - distance / 200);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(card.x, card.y, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 107, 53, ${opacity * 2})`;
        this.ctx.fill();
      }
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
function initMagneticLines() {
  if (window.innerWidth > 1024) {
    new MagneticLines('#technology');
  }
}

// 页面加载后自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMagneticLines);
} else {
  initMagneticLines();
}
