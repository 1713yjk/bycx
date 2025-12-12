/**
 * 精致微交互动效系统
 * 主控制文件
 */

// ============================================
// 工具函数
// ============================================

function throttle(func, wait) {
  let timeout;
  let previous = 0;
  
  return function(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ============================================
// 页面加载动画
// ============================================

function initPageLoadAnimation() {
  gsap.set('.oura-logo', { opacity: 0, scale: 0.8 });
  gsap.set('.oura-nav-links', { opacity: 0, y: -20 });
  gsap.set('.hero-carousel', { opacity: 0, scale: 0.95 });
  
  window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('.oura-logo', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    })
    .to('.oura-nav-links', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3')
    .to('.hero-carousel', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.2');
  });
}

// ============================================
// 滚动进度条
// ============================================

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  const updateProgress = throttle(() => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, 16);
  
  window.addEventListener('scroll', updateProgress, { passive: true });
}

// ============================================
// 滚动指示器
// ============================================

function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  
  const labels = document.querySelectorAll('.indicator-labels .label');
  const sections = ['home', 'products', 'technology', 'about'];
  
  const updateIndicator = throttle(() => {
    if (window.scrollY > 300) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
    
    updateActiveSection();
  }, 100);
  
  function updateActiveSection() {
    let currentSection = '';
    
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = sectionId;
        }
      }
    });
    
    labels.forEach((label, index) => {
      if (sections[index] === currentSection) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });
    
    const activeIndex = sections.indexOf(currentSection);
    if (activeIndex !== -1) {
      const thumb = document.querySelector('.indicator-thumb');
      if (thumb) {
        const percentage = (activeIndex / (sections.length - 1)) * 80;
        thumb.style.transform = `translateY(${percentage}%)`;
      }
    }
  }
  
  window.addEventListener('scroll', updateIndicator, { passive: true });
  
  labels.forEach((label, index) => {
    label.addEventListener('click', () => {
      const targetSection = document.getElementById(sections[index]);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// 轮播图 3D 倾斜效果
// ============================================

function initCarousel3DTilt() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel || window.innerWidth <= 1024) return;
  
  let isHovering = false;
  
  const handleMouseMove = throttle((e) => {
    if (!isHovering) return;
    
    const rect = carousel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);
    
    gsap.to(carousel, {
      rotateY: mouseX * 6,
      rotateX: -mouseY * 6,
      duration: 0.15,
      ease: 'power2.out'
    });
  }, 16);
  
  carousel.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  carousel.addEventListener('mousemove', handleMouseMove);
  
  carousel.addEventListener('mouseleave', () => {
    isHovering = false;
    gsap.to(carousel, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}

// ============================================
// 技术创新区视差效果
// ============================================

function initTechnologyParallax() {
  const features = gsap.utils.toArray('.oura-feature');
  if (features.length === 0) return;
  
  features.forEach((feature, index) => {
    const speed = 1 - (index * 0.15);
    
    gsap.to(feature, {
      y: () => -100 * (1 - speed),
      ease: 'none',
      scrollTrigger: {
        trigger: '#technology',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}

// ============================================
// 公司介绍 - 文字逐字显现
// ============================================

function initTextReveal() {
  const title = document.querySelector('#about .oura-section-title');
  if (!title) return;
  
  const text = title.textContent;
  title.innerHTML = '';
  
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    title.appendChild(span);
  });
  
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('#about .oura-section-title span', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out'
      });
    },
    once: true
  });
}

// ============================================
// 公司介绍 - 统计卡片动画
// ============================================

function initAboutCardsAnimation() {
  const cards = document.querySelectorAll('#about .oura-card > div > div');
  if (cards.length === 0) return;
  
  gsap.set(cards, {
    y: 40,
    opacity: 0
  });
  
  ScrollTrigger.create({
    trigger: '#about .oura-card',
    start: 'top 80%',
    onEnter: () => {
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
      });
    },
    once: true
  });
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      const numberEl = card.querySelector('div:first-child');
      if (numberEl) {
        gsap.to(numberEl, {
          color: 'var(--oura-accent)',
          duration: 0.3
        });
      }
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      const numberEl = card.querySelector('div:first-child');
      if (numberEl) {
        gsap.to(numberEl, {
          color: 'var(--oura-white)',
          duration: 0.3
        });
      }
    });
  });
}

// ============================================
// 公司介绍 - 分割线动画
// ============================================

function initDecorativeLineAnimation() {
  const line = document.querySelector('.decorative-line');
  if (!line) return;
  
  ScrollTrigger.create({
    trigger: line,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(line, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut'
      });
      
      gsap.to('.line-glow', {
        opacity: 1,
        duration: 0.5,
        delay: 1.2,
        stagger: 0.1
      });
      
      gsap.to('.line-glow', {
        opacity: 0.3,
        duration: 1,
        delay: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    },
    once: true
  });
}

// ============================================
// Intersection Observer 动画观察
// ============================================

function observeAnimationElements() {
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          setTimeout(() => {
            entry.target.classList.add('animation-complete');
          }, 1000);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );
  
  const elements = document.querySelectorAll('.fade-in, .oura-card, .oura-feature');
  elements.forEach(el => animationObserver.observe(el));
}
