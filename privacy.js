/* No se instalan cookies de analítica, publicidad ni contenidos externos. */
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
    <aside id="cookieBanner" class="cookie-banner" aria-label="Información de cookies" ${saved ? 'hidden' : ''}>
      <h2>Una fiesta sin cookies de seguimiento</h2>
      <p>Espai Únic utiliza solo almacenamiento técnico para recordar las preferencias de privacidad e idioma. No usamos analítica ni publicidad. Aceptar o rechazar opcionales mantiene la misma navegación. <a href="cookies.html">Política de cookies</a>.</p>
      <div class="cookie-actions"><button class="cookie-choice" data-cookie-choice="accepted">Aceptar</button><button class="cookie-choice" data-cookie-choice="rejected">Rechazar opcionales</button></div>
      <button class="link-button cookie-configure" data-cookie-settings>Ver configuración</button>
    </aside>
    <dialog id="cookieDialog" class="cookie-dialog" aria-labelledby="cookieTitle">
      <button class="dialog-close" id="cookieClose" aria-label="Cerrar configuración">×</button>
      <h2 id="cookieTitle">Tu privacidad,<br><em>tu elección.</em></h2>
      <p>Esta web no activa servicios de terceros al cargar. WhatsApp, mapas y redes sociales se abren únicamente al pulsar sus enlaces.</p>
      <div class="cookie-category"><div><h3>Técnicas</h3><p>Cookies propias espai_privacy y espai_language: recuerdan tu elección de privacidad e idioma durante 180 días. No almacenan los mensajes del chat ni del formulario.</p></div><span>Necesarias</span></div>
      <div class="cookie-category"><div><h3>Analítica y publicidad</h3><p>No hay herramientas ni cookies de estas categorías instaladas.</p></div><span>No utilizadas</span></div>
      <p id="cookieCurrent"></p>
      <div class="cookie-actions"><button class="cookie-choice" data-cookie-choice="necessary">Solo necesarias</button><button class="cookie-choice" id="cookieReset">Retirar elección</button></div>
      <p><a href="cookies.html">Leer la política de cookies</a></p>
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
    document.getElementById('cookieCurrent').textContent = saved ? 'Tu elección está guardada. Puedes retirarla cuando quieras.' : 'Todavía no has guardado una elección.';
    dialog.showModal();
  }));
  document.getElementById('cookieClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('cookieReset').addEventListener('click', () => {
    try { document.cookie = `${KEY}=; Path=/; Max-Age=0; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`; } catch {}
    saved = null; dialog.close(); banner.hidden = false;
  });
});
