// Generado con tools/build-catalan.py; editar fuentes y traducciones.
/* Rediseño visual. Contacto original por WhatsApp; sin envío a un servidor propio. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.getElementById('motionToggle');
  let paused = reduced.matches;
  const syncMotion = () => {
    root.classList.toggle('motion-paused', paused);
    if (motionButton) {
      motionButton.setAttribute('aria-pressed', String(paused));
      motionButton.textContent = paused ? "Activar animacions" : "Pausar animacions";
    }
  };
  syncMotion();
  motionButton?.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduced.addEventListener('change', event => { paused = event.matches; syncMotion(); });
  if ('IntersectionObserver' in window) {
    root.classList.add('motion-enabled');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element, index) => {
      element.classList.add('waiting');
      element.style.transitionDelay = `${(index % 3) * 70}ms`;
      observer.observe(element);
    });
  }
  const nav = document.getElementById('navLinks');
  const menu = document.getElementById('hamburgerBtn');
  function closeMenu(returnFocus = false) {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', "Obrir menú");
    if (returnFocus) menu?.focus();
  }
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? "Tancar menú" : "Obrir menú");
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('click', event => {
    if (nav?.classList.contains('open') && !event.target.closest('.site-header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) closeMenu(true);
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', () => closeMenu());
  const progress = document.querySelector('.scroll-progress');
  let framePending = false;
  const updateProgress = () => {
    const height = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
    framePending = false;
  };
  window.addEventListener('scroll', () => {
    if (!framePending) { framePending = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();
  // Return directly to the chosen category, with its options open.
  const showLinkedCategory = () => {
    if (location.hash === '#tarifas') {
      location.replace('servicio-alquiler-sala.html#roomRates');
      return;
    }
    const target = document.getElementById(location.hash.slice(1));
    if (target?.matches('.service-category')) {
      target.open = true;
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    }
  };
  showLinkedCategory();
  window.addEventListener('hashchange', showLinkedCategory);
  // Movimiento suave solo con ratón, sin interferir con el scroll táctil.
  const art = document.querySelector('.hero-art');
  if (art && window.matchMedia('(pointer: fine)').matches) {
    art.addEventListener('pointermove', event => {
      if (paused) return;
      const box = art.getBoundingClientRect();
      art.style.translate = `${((event.clientX - box.left) / box.width - .5) * 9}px ${((event.clientY - box.top) / box.height - .5) * 6}px`;
    });
    art.addEventListener('pointerleave', () => { art.style.translate = '0 0'; });
  }
  const gallery = document.getElementById('galleryDialog');
  document.querySelectorAll('[data-gallery]').forEach(button => {
    button.addEventListener('click', event => {
      if (!gallery) return;
      event.preventDefault();
      const img = document.getElementById('galleryImage');
      img.src = button.dataset.gallery;
      img.alt = button.dataset.caption;
      document.getElementById('galleryCaption').textContent = button.dataset.caption;
      gallery.showModal();
      if (!paused) gallery.animate([{ opacity: 0, transform: 'translateY(15px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
    });
  });
  document.querySelector('[data-close-gallery]')?.addEventListener('click', () => gallery.close());
  gallery?.addEventListener('click', event => { if (event.target === gallery) gallery.close(); });
  const form = document.getElementById('contactForm');
  form?.querySelector('button[type=submit]')?.removeAttribute('disabled');
  const dateInput = document.getElementById('formDate');
  if (dateInput) {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const get = type => parts.find(part => part.type === type).value;
    dateInput.min = `${get('year')}-${get('month')}-${get('day')}`;
  }
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.getElementById('formName').value.trim();
    const message = document.getElementById('formMessage').value.trim();
    const status = document.getElementById('formStatus');
    if (!name || !message) { status.textContent = "Escriu el teu nom i la teva consulta per continuar."; return; }
    const type = document.getElementById('formEvent').value;
    const date = dateInput.value;
    const text = `Hola Espai Únic, soc ${name}.\n\nCelebració: ${type}${date ? `\nData orientativa: ${date.split('-').reverse().join('/')}` : ''}\n\n${message}`;
    const url = `https://wa.me/34695613985?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    status.replaceChildren(document.createTextNode("El teu missatge està preparat. Completa l'enviament a WhatsApp. "));
    const fallback = document.createElement('a');
    fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer';
    fallback.textContent = "Obrir WhatsApp"; fallback.style.textDecoration = 'underline';
    status.append(fallback);
  });
  // Las URL originales de servicios se conservan.
  const title = document.getElementById('serviceTitle');
  if (title && window.espaiServices && !document.body.dataset.staticService) {
    const id = new URLSearchParams(location.search).get('service');
    const service = Object.prototype.hasOwnProperty.call(window.espaiServices, id) ? window.espaiServices[id] : null;
    if (!service) {
      title.textContent = "Troba la teva celebració";
      document.querySelector('.detail-grid').innerHTML = "<div class=\"error-message\"><p>Aquest servei no està disponible. Descobreix les nostres celebracions i consulta per WhatsApp.</p><a class=\"text-link\" href=\"index.html#servicios\">Veure celebracions ↗</a></div>";
      document.title = "Celebracions · Espai Únic";
      document.querySelector('meta[name="robots"]').content = 'noindex, follow';
      return;
    }
    if (service.page) {
      location.replace(service.page + location.hash);
      return;
    }
    title.textContent = service.title;
    document.title = `${service.title} · Espai Únic`;
    document.getElementById('serviceImage').src = service.img;
    document.getElementById('serviceImage').alt = service.title + ' · Espai Únic';
    if (!service.image) {
      document.querySelector('.detail-visual').classList.add('is-brand');
      document.getElementById('serviceImage').alt = 'Espai Únic · emblema floral';
      document.getElementById('serviceImageCaption').textContent = window.espaiCatalog.labels.separate;
    }
    document.getElementById('serviceDesc').textContent = service.desc;
    document.getElementById('metaDesc').content = service.desc;
    const url = `https://espai-unic.com/ca/service-detail.html?service=${encodeURIComponent(id)}`;
    document.getElementById('canonical').href = url;
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
      const alternate = new URL(link.href);
      alternate.searchParams.set('service', id);
      link.href = alternate.href;
    });
    document.getElementById('ogTitle').content = document.title;
    document.getElementById('ogDesc').content = service.desc;
    document.getElementById('ogUrl').content = url;
    document.getElementById('ogImage').content = `https://espai-unic.com/${service.img.replace('../', '')}`;
    const container = document.getElementById('pricingItems');
    const catalog = window.espaiCatalog;
    const labels = catalog.labels;
    const money = amount => `${amount} €`;
    const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
    const summary = document.createElement('p'); summary.className = 'service-price-summary'; summary.textContent = service.priceLabel;
    container.append(summary);
    service.options.forEach(item => {
      const row = document.createElement('div'); row.className = 'price-item';
      const name = document.createElement('span'); name.className = 'price-name'; name.textContent = item.name;
      const value = document.createElement('span'); value.className = 'price-value'; value.textContent = item.value;
      row.append(name, value); container.append(row);
    });
    const facts = document.getElementById('serviceFacts');
    if (service.duration) {
      const duration = document.createElement('p'); duration.className = 'service-duration';
      duration.textContent = `${labels.duration}: ${service.duration}`; facts.append(duration);
    }
    [[labels.includes, service.includes], [labels.conditions, service.conditions]].forEach(([heading, items]) => {
      if (!items.length) return;
      const section = document.createElement('section'); section.className = 'service-facts';
      const h = document.createElement('h3'); h.textContent = heading;
      const list = document.createElement('ul');
      items.forEach(item => { const li = document.createElement('li'); li.textContent = item; list.append(li); });
      section.append(h, list); facts.append(section);
    });
    if (service.notice) {
      const notice = document.getElementById('serviceNotice'); notice.textContent = service.notice; notice.hidden = false;
    }
    if (service.table) {
      const table = document.createElement('table'); table.className = 'service-options-table';
      const caption = table.createCaption(); caption.textContent = service.table.caption;
      const head = table.createTHead().insertRow();
      service.table.headers.forEach(label => { const th = document.createElement('th'); th.scope = 'col'; th.textContent = label; head.append(th); });
      const body = table.createTBody();
      service.table.rows.forEach(values => {
        const row = body.insertRow();
        values.forEach((value, index) => {
          const cell = document.createElement(index ? 'td' : 'th');
          if (!index) cell.scope = 'row';
          cell.dataset.label = service.table.headers[index]; cell.textContent = value; row.append(cell);
        });
      });
      document.getElementById('serviceTable').append(table);
    }
    if (['1', '5', '10'].includes(id)) {
      const roomContainer = document.getElementById('roomRates');
      const renderRates = rows => rows.forEach(rate => {
        const row = document.createElement('div'); row.className = 'detail-rate';
        const h = document.createElement('h4'); h.textContent = `${rate.days} · ${rate.hours}`;
        const rent = document.createElement('p'); rent.textContent = `${labels.rental}: ${money(rate.rent)}`;
        const cleaning = document.createElement('p'); cleaning.textContent = `${labels.cleaning}: ${rate.cleaning ? money(rate.cleaning) : labels.included}`;
        const deposit = document.createElement('p'); deposit.className = 'refundable-note'; deposit.textContent = `${labels.deposit}: ${money(rate.deposit)}`;
        row.append(h, rent, cleaning, deposit); roomContainer.append(row);
      });
      renderRates(catalog.room.rates);
      const holiday = document.createElement('h3'); holiday.textContent = catalog.room.holidayNames; roomContainer.append(holiday);
      renderRates(catalog.room.holidays);
      const conditions = document.createElement('p'); conditions.className = 'detail-note';
      conditions.textContent = `${catalog.room.depositNote} ${labels.botExtra}`; roomContainer.append(conditions);
    }
    const reserve = document.getElementById('reserveBtn');
    reserve.replaceChildren(document.createTextNode(service.cta || labels.serviceCta));
    const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '↗'; reserve.append(arrow);
    reserve.href = `https://wa.me/34695613985?text=${encodeURIComponent(format(labels.serviceMessage, { name: service.title, price: service.priceLabel }))}`;
  }
});
