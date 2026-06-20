function filmPlaceholder() {
  return `<svg width="100%" height="100%" viewBox="0 0 160 240" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="240" fill="#e8e4df"/>
    <rect x="0" y="0" width="160" height="20" fill="#d0cbc4"/>
    <rect x="0" y="220" width="160" height="20" fill="#d0cbc4"/>
    <rect x="6" y="4" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="28" y="4" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="50" y="4" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="72" y="4" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="94" y="4" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="116" y="4" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="138" y="4" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="6" y="224" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="28" y="224" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="50" y="224" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="72" y="224" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="94" y="224" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="116" y="224" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <rect x="138" y="224" width="14" height="12" rx="2" fill="#b8b2ab"/>
    <text x="80" y="118" text-anchor="middle" font-size="32" fill="#c0bab3">🎬</text>
    <text x="80" y="148" text-anchor="middle" font-size="11" fill="#b0aaa3" font-family="sans-serif">尚無封面</text>
  </svg>`;
}

function starsHTML(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += `<span class="${i <= rating ? '' : 'empty'}">★</span>`;
  return `<span class="stars">${s}</span>`;
}

function formatDate(str) {
  const d = new Date(str);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

function spoilerBadge(has_spoiler) {
  if (has_spoiler) return `<span class="spoiler-badge spoiler">⚠ 有雷</span>`;
  return `<span class="spoiler-badge no-spoiler">✓ 無雷</span>`;
}

function youtubeEmbed(url) {
  if (!url) return '';
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (!match) return '';
  const id = match[1];
  return `<div class="yt-wrap"><iframe src="https://www.youtube.com/embed/${id}" title="預告片" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
}

function subScoreRow(label, val) {
  if (!val) return '';
  const pct = (val / 10) * 100;
  return `
    <div class="sub-score-row">
      <span class="sub-score-label">${label}</span>
      <div class="sub-score-bar"><div class="sub-score-fill" style="width:${pct}%"></div></div>
      <span class="sub-score-val">${val}</span>
    </div>`;
}

function contentToHTML(text) {
  const ytLineRegex = /^(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})[^\s]*)$/;
  const imgWideRegex = /^!!\[([^\]]*)\]\((https?:\/\/[^\s\)]+)\)$/;
  const imgRegex     = /^!\[([^\]]*)\]\((https?:\/\/[^\s\)]+)\)$/;

  return text.replace(/\r\n/g, '\n').split(/\n/).map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';

    // >> 開頭 → Pull Quote
    if (trimmed.startsWith('>>')) {
      return `<blockquote class="pull-quote"><p>${trimmed.slice(2).trim()}</p></blockquote>`;
    }

    // !![alt](url) → 超寬幅圖片
    const imgMatch = trimmed.match(imgWideRegex);
    if (imgMatch) {
      return `<figure class="img-wide"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" loading="lazy"></figure>`;
    }

    // ![alt](url) → 一般圖片
    const imgInline = trimmed.match(imgRegex);
    if (imgInline) {
      return `<figure class="img-inline"><img src="${imgInline[2]}" alt="${imgInline[1]}" loading="lazy"></figure>`;
    }

    // YouTube embed
    const ytMatch = trimmed.match(ytLineRegex);
    if (ytMatch) {
      return `<div class="yt-wrap"><iframe src="https://www.youtube.com/embed/${ytMatch[2]}" title="影片" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
    }

    let html = trimmed
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/(^|[\s\(])(https?:\/\/[^\s<"'\)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return `<p>${html}</p>`;
  }).join('');
}

function cardHTML(a) {
  return `
    <div class="card" onclick="location.href='review.html?id=${a.id}'">
      <div class="card-image">
        ${(a.thumbnail_image || a.cover_image)
          ? `<img src="${a.thumbnail_image || a.cover_image}" alt="${a.title}" loading="lazy" style="object-position:${a.thumbnail_image ? 'center center' : (a.cover_position||'center center')}" onerror="this.parentElement.innerHTML=filmPlaceholder()">`
          : filmPlaceholder()}
        ${a.rating ? `<span class="card-score">★ ${a.rating}</span>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
        ${a.genre ? `<span class="card-tag">${a.genre}</span>` : ''}
        ${spoilerBadge(a.has_spoiler)}
      </div>
      <div class="card-title">${a.title}</div>
      <div class="card-meta">
        <span>${a.movie_year || ''}</span>
        <span>${formatDate(a.published_at)}</span>
      </div>
      <div class="card-excerpt">${a.excerpt || ''}</div>
    </div>`;
}
