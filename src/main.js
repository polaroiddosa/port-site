import './style.css'

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
  
  followerX += (mouseX - followerX) * 0.08;
  followerY += (mouseY - followerY) * 0.08;
  follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor interaction
const interactables = document.querySelectorAll('a, button, .work-item, .service-card');
interactables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2.5)';
    follower.style.transform += ' scale(1.5)';
    follower.style.borderColor = 'rgba(243, 156, 18, 0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
    follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
    follower.style.borderColor = 'var(--color-accent)';
  });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Modal Logic
const modal = document.getElementById('videoModal');
const modalFrame = document.getElementById('videoFrame');
const modalClose = document.querySelector('.modal-close');
const workItems = document.querySelectorAll('.work-item[data-type="video"]');

function openModal(videoId, type = 'youtube') {
  let embedUrl = '';
  if (type === 'vimeo') {
    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  } else {
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  modalFrame.src = embedUrl;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  modalFrame.src = '';
  document.body.style.overflow = 'auto';
}

workItems.forEach(item => {
  item.addEventListener('click', () => {
    const videoId = item.getAttribute('data-video-id');
    const videoType = item.getAttribute('data-video-type') || 'youtube';
    if (videoId) {
      openModal(videoId, videoType);
    }
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Navbar Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.padding = '1rem 0';
    nav.style.background = 'rgba(8, 8, 8, 0.95)';
  } else {
    nav.style.padding = '1.5rem 0';
    nav.style.background = 'rgba(8, 8, 8, 0.8)';
  }
});

// Reveal on Scroll
const revealElements = document.querySelectorAll('.service-card, .work-item, .about h2');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  revealObserver.observe(el);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
