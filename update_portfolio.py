import json
import urllib.parse
import os

path = '/Users/polaroiddosa/.gemini/antigravity/scratch/polaroid-dosa-portfolio/portfolio.html'
assets_path = '/Users/polaroiddosa/.gemini/antigravity/scratch/polaroid-dosa-portfolio/assets.json'

with open(path, 'r') as f:
    content = f.read()

script_start = content.find('const vimeoIds = [')
script_end = content.rfind('loadWork();') + len('loadWork();')

if script_start == -1 or script_end == -1:
    print('Could not find script markers')
    exit(1)

with open(assets_path, 'r') as f:
    assets_json = f.read()

new_js = f"""const vimeoIds = [
      1187486935, 1187487079, 1187487059, 1187487036, 1187486968, 1187486910,
      1187486890, 1187486871, 1187486807, 1187486734, 1187486344, 1187485920,
      1187485968, 1187486021, 1187486286, 1187486242, 1187486074, 1187486573,
      1187486626, 1187486678
    ];

    const workGrid = document.getElementById('workGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    // EXHAUSTIVE LIST OF POSTERS (GENERATED)
    const allPosters = {assets_json};

    async function addVideoItem(id, type, customTitle = null) {{
        try {{
          let data;
          if (type === 'vimeo') {{
            const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=800`);
            data = await res.json();
          }} else {{
            data = {{
                thumbnail_url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
                title: customTitle || "YouTube Video"
            }};
          }}
          
          const item = document.createElement('div');
          item.className = `work-item video reveal`;
          item.innerHTML = `
            <img src="${{data.thumbnail_url}}" alt="${{data.title}}">
            <div class="play-btn">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="work-overlay">
              <div class="work-tag">Brand Film</div>
              <div class="work-title">${{customTitle || data.title}}</div>
            </div>
          `;
          item.addEventListener('click', () => openLightbox(id, type));
          workGrid.appendChild(item);
          revealObserver.observe(item);
        }} catch (e) {{ console.error("Video fetch error", e); }}
    }}

    function addPosterItem(path, title) {{
        const item = document.createElement('div');
        item.className = 'work-item poster reveal';
        item.innerHTML = `
          <img src="${{path}}" alt="${{title}}" loading="lazy">
          <div class="work-overlay">
            <div class="work-tag">Creative Work</div>
            <div class="work-title">${{title}}</div>
          </div>
        `;
        workGrid.appendChild(item);
        revealObserver.observe(item);
    }}

    async function loadWork() {{
      const customWorks = JSON.parse(localStorage.getItem('pd_custom_works') || '[]');
      
      // 1. Add Custom Works first
      for (const work of customWorks) {{
        if (work.type === 'video') {{
            await addVideoItem(work.videoId, work.videoType, work.title);
        }} else {{
            addPosterItem(work.path, work.title);
        }}
      }}

      // 2. Add Hardcoded Vimeo Items
      for (const id of vimeoIds) {{
        await addVideoItem(id, 'vimeo');
      }}

      // 3. Add Hardcoded Poster Items
      allPosters.forEach(poster => {{
        addPosterItem(poster.path, poster.title);
      }});

      // Re-attach cursor expand
      document.querySelectorAll('.work-item').forEach(el => {{
        el.addEventListener('mouseenter', () => ring.classList.add('expand'));
        el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
      }});
    }}

    function openLightbox(id, type = 'vimeo') {{
      let embedUrl = '';
      if (type === 'vimeo') {{
        embedUrl = `https://player.vimeo.com/video/${id}?autoplay=1&color=F39C12&title=0&byline=0&portrait=0`;
      }} else {{
        embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }}
      lightboxContent.innerHTML = `<iframe src="${{embedUrl}}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      lightbox.classList.add('active');
    }}

    function closeLightbox() {{
      lightbox.classList.remove('active');
      lightboxContent.innerHTML = '';
    }}

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {{
      if (e.target === lightbox) closeLightbox();
    }});

    window.addEventListener('keydown', (e) => {{
      if (e.key === 'Escape') closeLightbox();
    }});

    loadWork();"""

final_content = content[:script_start] + new_js + content[script_end:]

with open(path, 'w') as f:
    f.write(final_content)
