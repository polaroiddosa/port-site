/* -------------------------------------------------------------------------- */
    /* 1. CUSTOM CURSOR LOGIC                                                     */
    /* -------------------------------------------------------------------------- */
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';

      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';

      requestAnimationFrame(animate);
    }
    animate();

    /* -------------------------------------------------------------------------- */
    /* 2. SCROLL REVEAL & NAV LOGIC                                               */
    /* -------------------------------------------------------------------------- */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });

    /* -------------------------------------------------------------------------- */
    /* 3. WORK GRID & DYNAMIC LOADING (Merged)                                   */
    /* -------------------------------------------------------------------------- */
    const STORAGE_KEY = 'pd_custom_works';
    const workGrid = document.getElementById('workGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    // Default Vimeo IDs (Backup if LocalStorage is empty)
    const vimeoIds = [
      1187486935, 1187487079, 1187487059, 1187487036, 1187486968, 1187486910,
      1187486890, 1187486871, 1187486807, 1187486734, 1187486344, 1187485920,
      1187485968, 1187486021, 1187486286, 1187486242, 1187486074, 1187486573,
      1187486626, 1187486678
    ];

    async function addVideoItem(id, type, customTitle = null) {
      try {
        let data;
        if (type === 'vimeo') {
          const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=800`);
          data = await res.json();
        } else {
          data = {
              thumbnail_url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
              title: customTitle || "YouTube Video"
          };
        }
        
        const item = document.createElement('div');
        item.className = 'work-item video reveal';
        item.innerHTML = `
          <img src="${data.thumbnail_url}" alt="${data.title}" loading="lazy">
          <div class="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="work-overlay">
            <div class="work-tag">Brand Film</div>
            <div class="work-title">${customTitle || data.title}</div>
          </div>
        `;
        item.addEventListener('click', () => openLightbox(id, type));
        workGrid.appendChild(item);
        revealObserver.observe(item);
      } catch (e) { console.error("Video fetch error", e); }
    }

    function addPosterItem(path, title) {
        const item = document.createElement('div');
        item.className = 'work-item poster reveal';
        item.innerHTML = `
          <img src="${path}" alt="${title}" loading="lazy">
          <div class="work-overlay">
            <div class="work-tag">Creative Work</div>
            <div class="work-title">${title}</div>
          </div>
        `;
        item.addEventListener('click', () => openLightbox(path, 'image'));
        workGrid.appendChild(item);
        revealObserver.observe(item);
    }

    function openLightbox(id, type = 'vimeo') {
      let content = '';
      if (type === 'image') {
        content = `<img src="${id}" style="width:100%; height:100%; object-fit:contain;">`;
      } else if (type === 'vimeo') {
        const embedUrl = `https://player.vimeo.com/video/${id}?autoplay=1&color=FF6B00&title=0&byline=0&portrait=0`;
        content = `<iframe src="${embedUrl}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      } else {
        const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
        content = `<iframe src="${embedUrl}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      }
      lightboxContent.innerHTML = content;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightboxContent.innerHTML = '';
      document.body.style.overflow = '';
    }

    if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if(lightbox) {
      lightbox.addEventListener('click', closeLightbox);
      if(lightboxContent) {
        lightboxContent.addEventListener('click', (e) => e.stopPropagation());
      }
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    const staticPosters = [
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0001%20%281%29.jpg", "title": "0001 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0001%20%281%29.png", "title": "0001 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0001%20%282%29.jpg", "title": "0001 (2)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0001%20-%2001.png", "title": "0001 01"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0001-01.jpg", "title": "0001 01"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0001.jpg", "title": "0001"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0002%20%281%29.jpg", "title": "0002 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0002%20%281%29.png", "title": "0002 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0002%20-%205.jpg", "title": "0002 5"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0002.jpg", "title": "0002"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0003%20%281%29.jpg", "title": "0003 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0003%20%282%29.jpg", "title": "0003 (2)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0003%281%29.jpg", "title": "0003(1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0003.jpg", "title": "0003"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0003.png", "title": "0003"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0004%20%281%29%281%29.jpg", "title": "0004 (1)(1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0004%20%281%29%282%29.jpg", "title": "0004 (1)(2)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0004%20%281%29.jpg", "title": "0004 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0004.jpg", "title": "0004"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0005%20%281%29.jpg", "title": "0005 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0005%20-%202.jpg", "title": "0005 2"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0005.jpg", "title": "0005"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0006-1.jpg", "title": "0006 1"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0006.jpg", "title": "0006"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0007%281%29.jpg", "title": "0007(1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0007.jpg", "title": "0007"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0008%20%281%29.jpg", "title": "0008 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0008%20-%20001.jpg", "title": "0008 001"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0008%20-%20002.jpg", "title": "0008 002"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0008.jpg", "title": "0008"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0009%20-%20002.jpg", "title": "0009 002"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0009.jpg", "title": "0009"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0010%20%281%29.jpg", "title": "0010 (1)"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0010.jpg", "title": "0010"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0011-1.jpg", "title": "0011 1"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0012.jpg", "title": "0012"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0013.jpg", "title": "0013"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0014.jpg", "title": "0014"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/0015.jpg", "title": "0015"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/NEC.png", "title": "Nec"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/YRTS.png", "title": "Yrts"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/coming%20soon.jpg", "title": "Coming Soon"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/hiring.jpg", "title": "Hiring"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/inauguration.jpg", "title": "Inauguration"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/launch%20poster.png", "title": "Launch Poster"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/notice%20english.jpg", "title": "Notice English"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/notice%20malayalam.jpg", "title": "Notice Malayalam"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/obt.png", "title": "Obt"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/placement.png", "title": "Placement"},
      {"path": "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/poster%202.png", "title": "Poster 2"}
    ];

    async function loadAll() {
      if(!workGrid) return;
      const works = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      workGrid.innerHTML = ''; 
      
      if (works.length > 0) {
        // 1. Load Custom Posters FIRST
        for (const work of works) {
          if (work.type !== 'video') {
            addPosterItem(work.path, work.title);
          }
        }
        // 2. Load Custom Videos AFTER (non-blocking)
        for (const work of works) {
          if (work.type === 'video') {
            addVideoItem(work.videoId, work.videoType, work.title);
          }
        }
      } else {
        // 1. Load Static Posters FIRST (instant, no network wait)
        staticPosters.forEach(poster => {
          addPosterItem(poster.path, poster.title);
        });
        // 2. Load Vimeo Videos AFTER (non-blocking, no await)
        for (const id of vimeoIds) {
          addVideoItem(id, 'vimeo');
        }
      }

      // Re-attach cursor expand
      document.querySelectorAll('.work-item').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('expand'));
        el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
      });

      // Trigger default filter click (shows posters only)
      const posterFilter = document.querySelector('.filter-btn[data-filter="poster"]');
      if (posterFilter) posterFilter.click();
    }

    // Live Refresh when LocalStorage changes (Admin tab updates)
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) loadAll();
    });

    // Filtering logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) activeBtn.classList.remove('active');
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        document.querySelectorAll('.work-item').forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    /* -------------------------------------------------------------------------- */
    /* 4. THEME TOGGLE LOGIC                                                      */
    /* -------------------------------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }

    // Initialize
    async function init() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      html.setAttribute('data-theme', savedTheme);
      await loadAll();
    }

    /* -------------------------------------------------------------------------- */
    /* 5. LAZY LOADING INTERSECTION OBSERVER                                      */
    /* -------------------------------------------------------------------------- */
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.onload = () => el.classList.add('loaded');
            el.onerror = () => el.classList.add('loaded');
            lazyObserver.unobserve(el);
          }
        }
      });
    }, { rootMargin: '600px' });

    // Observe all static data-src elements (client logos)
    document.querySelectorAll('img[data-src], video[data-src]')
      .forEach(el => lazyObserver.observe(el));

    /* -------------------------------------------------------------------------- */
    /* 6. SECTION PREFETCHER — preload next section's images in background        */
    /* -------------------------------------------------------------------------- */
    const prefetchedSections = new Set();
    const sectionPrefetcher = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const sectionId = section.id || section.className;
          if (prefetchedSections.has(sectionId)) return;
          prefetchedSections.add(sectionId);

          // Find the NEXT section and prefetch its images
          const nextSection = section.nextElementSibling;
          if (nextSection) {
            const imgs = nextSection.querySelectorAll('img[data-src]');
            imgs.forEach(img => {
              if (img.dataset.src && !img.src.includes(img.dataset.src)) {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = img.dataset.src;
                document.head.appendChild(link);
              }
            });
          }
        }
      });
    }, { rootMargin: '400px' });

    // Observe all sections for prefetching
    document.querySelectorAll('section').forEach(s => sectionPrefetcher.observe(s));

    init();
