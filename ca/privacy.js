// Generado con tools/build-catalan.py; editar fuentes y traducciones.
﻿/* No se instalan cookies de analítica, publicidad ni contenidos externos. */
document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'espai_privacy';
  const VERSION = 1;
  const duration = 60 * 60 * 24 * 180;
  let saved = null;
  try {
    const raw = document.cookie.split('; ').find(value => value.startsWith(KEY + '='));
    saved = raw ? JSON.parse(decodeURIComponent(raw.slice(KEY.length + 1))) : null;
    if (!saved || saved.version !== VERSION || !['accepted','rejected','necessary'].includes(saved.choice) || !Number.isFinite(saved.timestamp) || Date.now() - saved.timestamp > duration * 1000) saved = null;
  } catch { saved = null; }
  document.body.insertAdjacentHTML('beforeend', `
    <aside id="cookieBanner" class="cookie-banner" aria-label="Informació sobre galetes" ${saved ? 'hidden' : ''}>
      <h2>Una festa sense galetes de seguiment</h2>
      <p>Espai Únic només utilitza emmagatzematge tècnic per recordar les preferències de privacitat i d'idioma. No fem servir analítica ni publicitat. Acceptar o rebutjar opcionals manté la mateixa navegació. <a href="cookies.html">Política de galetes</a>.</p>
      <div class="cookie-actions"><button class="cookie-choice" data-cookie-choice="accepted">Acceptar</button><button class="cookie-choice" data-cookie-choice="rejected">Rebutjar opcionals</button></div>
      <button class="link-button cookie-configure" data-cookie-settings>Veure configuració</button>
    </aside>
    <dialog id="cookieDialog" class="cookie-dialog" aria-labelledby="cookieTitle">
      <button class="dialog-close" id="cookieClose" aria-label="Tancar configuració">×</button>
      <h2 id="cookieTitle">La teva privacitat,<br><em>la teva elecció.</em></h2>
      <p>Aquest web no activa serveis de tercers en carregar. WhatsApp, mapes i xarxes socials només s'obren en prémer els seus enllaços.</p>
      <div class="cookie-category"><div><h3>Tècniques</h3><p>Galetes pròpies espai_privacy i espai_language: recorden l'elecció de privacitat i l'idioma durant 180 dies. No emmagatzemen els missatges del xat ni del formulari.</p></div><span>Necessàries</span></div>
      <div class="cookie-category"><div><h3>Analítica i publicitat</h3><p>No hi ha eines ni galetes d'aquestes categories instal·lades.</p></div><span>No utilitzades</span></div>
      <p id="cookieCurrent"></p>
      <div class="cookie-actions"><button class="cookie-choice" data-cookie-choice="necessary">Només necessàries</button><button class="cookie-choice" id="cookieReset">Retirar elecció</button></div>
      <p><a href="cookies.html">Llegir la política de galetes</a></p>
    </dialog>`);
  const banner = document.getElementById('cookieBanner');
  const dialog = document.getElementById('cookieDialog');
  const save = choice => {
    saved = { version: VERSION, choice, timestamp: Date.now() };
    try { document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(saved))}; Path=/; Max-Age=${duration}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; } catch { /* La web funciona aunque el navegador bloquee almacenamiento. */ }
    banner.hidden = true;
    dialog.close();
  };
  document.querySelectorAll('[data-cookie-choice]').forEach(button => button.addEventListener('click', () => save(button.dataset.cookieChoice)));
  document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
    document.getElementById('cookieCurrent').textContent = saved ? "La teva elecció està desada. Pots retirar-la quan vulguis." : "Encara no has desat cap elecció.";
    dialog.showModal();
  }));
  document.getElementById('cookieClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('cookieReset').addEventListener('click', () => {
    try { document.cookie = `${KEY}=; Path=/; Max-Age=0; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; } catch {}
    saved = null; dialog.close(); banner.hidden = false;
  });
});
