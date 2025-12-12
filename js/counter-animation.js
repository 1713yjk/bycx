/**
 * 数字滚动动画类
 */

class CounterAnimation {
  constructor(element, targetValue, duration = 2000) {
    this.element = element;
    this.originalText = targetValue;
    this.targetValue = this.parseValue(targetValue);
    this.suffix = this.parseSuffix(targetValue);
    this.duration = duration;
    this.startValue = 0;
    this.startTime = null;
  }

  parseValue(value) {
    const str = String(value);
    const match = str.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  parseSuffix(value) {
    const str = String(value);
    return str.replace(/[\d.,\s]+/, '');
  }

  formatValue(value) {
    const rounded = Math.round(value);
    
    if (this.suffix.includes('K')) {
      return rounded + 'K+';
    } else if (this.suffix.includes('年')) {
      return rounded + '年';
    } else if (this.suffix.includes('+')) {
      return rounded + '+';
    } else if (this.suffix.includes('/')) {
      return rounded + '/7';
    } else {
      return rounded + this.suffix;
    }
  }

  easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  animate(currentTime) {
    if (!this.startTime) {
      this.startTime = currentTime;
    }

    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const easedProgress = this.easeOutExpo(progress);
    
    const currentValue = this.startValue + (this.targetValue - this.startValue) * easedProgress;
    this.element.textContent = this.formatValue(currentValue);

    if (progress < 1) {
      requestAnimationFrame((time) => this.animate(time));
    } else {
      this.element.textContent = this.formatValue(this.targetValue);
    }
  }

  start() {
    requestAnimationFrame((time) => this.animate(time));
  }
}

// 使用 Intersection Observer 触发数字动画
const observerOptions = {
  threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = new CounterAnimation(
        entry.target,
        entry.target.textContent
      );
      counter.start();
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// 初始化函数
function initCounterAnimations() {
  const counters = document.querySelectorAll('#about .oura-card > div > div > div:first-child');
  counters.forEach(el => counterObserver.observe(el));
}

// 页面加载后自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCounterAnimations);
} else {
  initCounterAnimations();
}
