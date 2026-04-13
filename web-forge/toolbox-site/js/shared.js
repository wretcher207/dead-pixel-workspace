/* ============================================
   DEAD PIXEL TOOLBOX — Shared Utilities
   ============================================ */

function showToast(message, duration = 2000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('visible'), duration);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied to clipboard');
  });
}

function downloadFile(filename, content, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function getHeaderHTML(activeToolName) {
  return `
    <header class="site-header">
      <div class="page-wrapper">
        <a href="/toolbox-site/" class="logo">
          <span class="logo-icon"></span>
          <span>DEAD PIXEL <span class="logo-text-dim">TOOLBOX</span></span>
        </a>
        <div class="header-links">
          <a href="/toolbox-site/">All Tools</a>
          <a href="https://deadpixeldesign.com" target="_blank" rel="noopener">Dead Pixel Design</a>
        </div>
      </div>
    </header>
  `;
}

function getFooterHTML() {
  return `
    <footer class="site-footer">
      <div class="page-wrapper">
        <p>Built by <a href="https://deadpixeldesign.com" target="_blank" rel="noopener">Dead Pixel Design</a> &mdash; Houlton, Maine</p>
      </div>
    </footer>
  `;
}
