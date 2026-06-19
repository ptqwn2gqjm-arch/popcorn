// ── 深色模式 ──
(function () {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav 毛玻璃 ──
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav-glass', window.scrollY > 20);
    });
  }

  // ── 深色模式切換按鈕（注入到 nav） ──
  const navRight = document.querySelector('.nav-right');
  if (navRight) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', '切換深色模式');
    btn.innerHTML = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.innerHTML = next === 'dark' ? '☀️' : '🌙';
    });
    navRight.appendChild(btn);
  }

  // ── 回到頂部按鈕 ──
  const topBtn = document.createElement('button');
  topBtn.id = 'back-to-top';
  topBtn.innerHTML = '↑';
  topBtn.setAttribute('aria-label', '回到頂部');
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > 400);
  });

});
