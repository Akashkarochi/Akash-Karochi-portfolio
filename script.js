// Enhanced Animation Controllers for Neon Dark Theme

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollAnimations();
  initGeometricShapes();
  initTiltEffect();
  initSmoothScroll();
  initTypingEffect();
});

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.querySelector('.progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  });
}

// Scroll-triggered Animations
function initScrollAnimations() {
  const faders = document.querySelectorAll('.fade-in');
  
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('appear');
      
      // Add staggered animation to child elements
      const children = entry.target.querySelectorAll('.skill, .experience-item, .project, .certifications li');
      children.forEach((child, index) => {
        child.style.animationDelay = (index * 0.08) + 's';
      });
      
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
}

// Floating Geometric Shapes
function initGeometricShapes() {
  const shapesContainer = document.createElement('div');
  shapesContainer.className = 'geometric-shapes';
  
  const shapes = [
    { class: 'shape-1', delay: 0 },
    { class: 'shape-2', delay: -5 },
    { class: 'shape-3', delay: -10 },
    { class: 'shape-4', delay: -7 }
  ];
  
  shapes.forEach(shapeData => {
    const shape = document.createElement('div');
    shape.className = `shape ${shapeData.class}`;
    shape.style.animationDelay = shapeData.delay + 's';
    shapesContainer.appendChild(shape);
  });
  
  document.body.appendChild(shapesContainer);
}

// 3D Tilt Effect for Cards
function initTiltEffect() {
  const cards = document.querySelectorAll('.project, .experience-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Typing Effect for Name
function initTypingEffect() {
  const nameElement = document.querySelector('.typing-effect');
  if (nameElement) {
    const text = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.borderRight = '3px solid #00ffaa';
    
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        nameElement.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
        // Keep cursor blinking
        setTimeout(() => {
          nameElement.style.borderRight = '3px solid transparent';
        }, 1000);
      }
    }, 100);
  }
}

// Add hover glow effect to all interactive elements
document.querySelectorAll('.skill, .project, .experience-item, nav a, .btn, .download-resume, .social-links a').forEach(el => {
  el.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// Add parallax effect on scroll
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const shapes = document.querySelectorAll('.shape');
      
      shapes.forEach((shape, index) => {
        const speed = 0.1 * (index + 1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      ticking = false;
    });
    
    ticking = true;
  }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .download-resume').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      background: rgba(0, 255, 170, 0.4);
      border-radius: 50%;
      pointer-events: none;
      width: 100px;
      height: 100px;
      left: ${x - 50}px;
      top: ${y - 50}px;
      transform: scale(0);
      animation: ripple 0.6s linear;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add reveal animation on scroll for specific elements
const revealElements = document.querySelectorAll('.education p, .certifications ul');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  revealObserver.observe(el);
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Add loading animation
function initLoadingAnimation() {
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a0a0f;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transition: opacity 0.5s, visibility 0.5s;
  `;
  
  const spinner = document.createElement('div');
  spinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid rgba(0, 255, 170, 0.2);
    border-top-color: #00ffaa;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;
  
  const spinKeyframes = document.createElement('style');
  spinKeyframes.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  
  loader.appendChild(spinner);
  loader.appendChild(spinKeyframes);
  document.body.appendChild(loader);
  
  // Hide loader after page load
  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    setTimeout(() => loader.remove(), 500);
  });
}

// Initialize loading animation
initLoadingAnimation();

