/**
 * 🤖 ESPAI BOT - Chat Agent for Espai Únic
 * Knowledge-based assistant for customer queries.
 */

document.addEventListener('DOMContentLoaded', () => {
    const catalog = window.espaiCatalog;
    const labels = catalog.labels;
    const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, ' ').trim();
    const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
    const includes = (text, words) => words.some(word => text.includes(word));
    const money = amount => `${amount} €`;
    const ratesText = rates => rates.map(rate => `${rate.days} (${rate.hours}): ${labels.rental} ${money(rate.rent)}; ${labels.cleaning} ${rate.cleaning ? money(rate.cleaning) : labels.included.toLowerCase()}; ${labels.deposit} ${money(rate.deposit)}.`).join('\n');
    // --- 🛠️ UI INJECTION ---
    const chatHTML = `
        <div id="espaiChatWidget" class="espai-chat-widget">
            <button id="chatToggleBtn" class="chat-toggle-btn" aria-label="Abrir asistente" aria-expanded="false" aria-controls="chatWindow">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-5 3 1.5-6A8.5 8.5 0 1 1 21 11.5Z"/></svg>
            </button>
            <div id="chatWindow" class="chat-window hidden" role="region" aria-label="Espai Bot, asistente automático">
                <div class="chat-header">
                    <div class="chat-avatar">🤖</div>
                    <div class="chat-title-box">
                        <span class="chat-name">Espai Bot</span>
                        <span class="chat-status">Asistente automático · información orientativa</span>
                    </div>
                    <button class="chat-close" id="chatCloseBtn" aria-label="Cerrar asistente">×</button>
                </div>
                <div id="chatBody" class="chat-body" role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversación">
                    <div class="chat-msg bot">Hola! Soy el asistente de Espai Únic. ¿En qué puedo ayudarte hoy? ✨</div>
                </div>
                <div class="chat-footer">
                    <input type="text" id="chatInput" aria-label="Tu pregunta al asistente" maxlength="1000" placeholder="Escribe tu duda..." autocomplete="off">
                    <button id="chatSendBtn" aria-label="Enviar pregunta"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 9-18 9 3-9-3-9Zm3 9h15"/></svg></button>
                </div>
                <p class="chat-privacy">Chat local: no guardamos esta conversación. <a href="privacidad.html">Privacidad</a> · <a href="https://wa.me/34695613985" target="_blank" rel="noopener noreferrer">Hablar con el equipo ↗</a></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    // --- 🧠 LOGIC ---
    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        const opened = !chatWindow.classList.contains('hidden');
        chatToggleBtn.setAttribute('aria-expanded', String(opened));
        chatToggleBtn.setAttribute('aria-label', opened ? 'Cerrar asistente' : 'Abrir asistente');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    }

    function addMessage(text, side) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${side}`;
        msg.textContent = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    let pendingAction = null;

    function getBotResponse(input) {
        const text = normalize(input);
        if (pendingAction && (text === 'si' || includes(text, ['vale', 'perfecto', 'perfecte', 'd acord']))) {
            pendingAction = null;
            return labels.botBooking;
        }
        pendingAction = null;
        if (includes(text, ['confeti', 'confetti', 'polvos', 'pols de colors', 'normas', 'normes'])) {
            return `${catalog.room.rule} ${catalog.room.depositNote} ${catalog.services.find(service => service.id === 'catering-infantil-1').conditions.join(' ')}`;
        }
        if (includes(text, ['accesibilidad', 'accessibilitat', 'movilidad', 'mobilitat', 'elevador', 'ascensor', 'adaptado', 'adaptat', 'bano', 'bany'])) {
            return `${catalog.room.accessibility} ${catalog.room.accessibilityDetail}`;
        }
        if (includes(text, ['ubicacion', 'ubicacio', 'donde', 'on sou', 'on esteu', 'direccion', 'adreca', 'aparcar', 'aparcamiento', 'aparcament'])) return labels.botLocation;
        if (includes(text, ['fianza', 'fianca', 'deposito', 'diposit'])) return labels.botDeposit;
        if (includes(text, ['hora extra', 'horas extra', 'hores extra'])) return labels.botExtra;
        if (includes(text, ['limpieza', 'neteja', 'limpiar', 'netejar'])) return labels.botCleaning;
        if (includes(text, ['festivo', 'festiu', 'navidad', 'nadal', 'sant esteve', 'nochebuena', 'nit de nadal', 'fin de ano', 'cap d any', 'ano nuevo', 'any nou', 'reyes', 'reis'])) {
            return `${catalog.room.holidayNames}\n${ratesText(catalog.room.holidays)}\n${labels.botExtra} ${catalog.room.depositNote}`;
        }
        if (includes(text, ['domingo noche', 'diumenge nit', 'diumenge a la nit'])) return labels.botSunday;
        if (includes(text, ['traer comida', 'comida propia', 'portar menjar', 'nostre menjar', 'microondas', 'microones', 'nevera'])) return labels.botFood;
        // Longer, specific keywords take priority over category names.
        const matches = catalog.services.map(service => {
            const keys = [service.name, ...service.keywords].map(normalize);
            const found = keys.filter(key => key.length >= 5 ? text.includes(key) : (` ${text} `).includes(` ${key} `));
            return {service, score: found.length ? Math.max(...found.map(key => key.length)) : 0};
        }).filter(item => item.score > 0).sort((a,b) => b.score-a.score);
        if (matches.length) {
            const service = matches[0].service;
            if (service.id === '10') return `${ratesText(catalog.room.rates)}\n${labels.botExtra}\n${catalog.room.depositNote}`;
            pendingAction = true;
            let answer = format(labels.botService, {name:service.name,price:service.priceLabel,description:service.description});
            if (service.options.length) answer += '\n' + service.options.map(option => `${option.name}: ${option.value}`).join('\n');
            if (service.table) answer += '\n' + service.table.rows.map(row => `${service.table.headers[0]} ${row[0]}: ${row.slice(1).map((price,index)=>`${service.table.headers[index+1]} ${price}`).join(' · ')}`).join('\n');
            if (service.conditions.length) answer += '\n' + service.conditions.join(' ');
            if (service.notice) answer += '\n' + service.notice;
            return answer + '\n' + labels.botNext;
        }
        const categoryWords = {
            catering: ['catering','caterings','menjar','comida'],
            animacion: ['animacion','animacio','taller','tallers'],
            espectaculos: ['espectaculo','espectacle','burbujas','bombolles','pompas'],
            decoracion: ['decoracion','decoracio','tematica','tematic'],
            dulces: ['dulces','dolcos'], personajes: ['personajes','personatges']
        };
        for (const [category,words] of Object.entries(categoryWords)) {
            if (includes(text,words)) {
                const services = catalog.services.filter(service => service.category === category);
                const advance = category === 'catering' ? '\n' + catalog.services.find(service=>service.id==='catering-infantil-1').conditions.join(' ') : '';
                return services.map(service => `${service.name}: ${service.priceLabel}`).join('\n') + advance + '\n' + labels.botBooking;
            }
        }
        if (includes(text, ['horario', 'horari', 'precios', 'preus', 'tarifas', 'tarifes', 'cuanto cuesta', 'quant costa', 'obriu'])) return `${ratesText(catalog.room.rates)}\n${labels.botExtra}`;
        if (includes(text, ['reserva','disponibilidad','disponibilitat','fecha','data','visita','whatsapp','telefono','telefon','contacto','contacte'])) return labels.botBooking;
        if (includes(text, ['quienes', 'qui sou', 'empresa', 'dedica'])) return labels.botCompany;
        if (includes(text, ['hola', 'buenos dias', 'bon dia', 'buenas tardes', 'bona tarda'])) return labels.botHello;
        return labels.botFallback;
    }

    function handleSend() {
        const val = chatInput.value.trim();
        if (!val) return;

        addMessage(val, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const reply = getBotResponse(val);
            addMessage(reply, 'bot');
        }, 600);
    }

    // --- ⌨️ EVENTS ---
    chatToggleBtn.addEventListener('click', toggleChat);
    document.getElementById('chatCloseBtn').addEventListener('click', () => { toggleChat(); chatToggleBtn.focus(); });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !chatWindow.classList.contains('hidden')) { toggleChat(); chatToggleBtn.focus(); }
    });
    chatSendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
