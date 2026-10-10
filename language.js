/* La preferencia técnica se escribe únicamente al usar el selector. */
(() => {
  const current = document.documentElement.lang === 'ca' ? 'ca' : 'es';
  // El almacenamiento queda limitado a este sitio también en GitHub Pages.
  const stylesheet = document.querySelector('link[rel="stylesheet"][href$="styles.css"]');
  window.espaiCookiePath = stylesheet ? new URL('.', stylesheet.href).pathname : '/';
  const links = document.querySelectorAll('[data-language]');
  links.forEach(link => {
    const url = new URL(link.href, location.href);
    url.search = location.search;
    url.hash = location.hash;
    link.href = url.href;
    link.addEventListener('click', () => {
      const destination = new URL(link.href, location.href);
      destination.search = location.search;
      destination.hash = location.hash;
      link.href = destination.href;
      try {
        document.cookie = `espai_language=${link.dataset.language}; Path=${window.espaiCookiePath}; Max-Age=15552000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
      } catch { /* Los enlaces funcionan también sin almacenamiento. */ }
    });
  });
  let preference;
  try { preference = document.cookie.split('; ').find(value => value.startsWith('espai_language='))?.split('=')[1]; } catch {}
  if (current === 'es' && preference === 'ca') {
    const target = document.querySelector('[data-language="ca"]');
    if (target) location.replace(target.href);
  }
})();
