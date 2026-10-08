// Generado con tools/build-catalan.py; editar fuentes y traducciones.
/**
 * 🤖 ESPAI BOT - Chat Agent for Espai Únic
 * Knowledge-based assistant for customer queries.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 📚 KNOWLEDGE BASE ---
    const KB = {
        general: {
            name: "Espai Únic",
            location: "Camí Ral, 11 semisoterrani, 08292 Esparreguera, Barcelona",
            locationShort: "Esparreguera (Barcelona)",
            phone: "+34 695 613 985",
            whatsapp: "https://wa.me/34695613985",
            hours: "Dilluns-Dijous: 10:30-14:30. Divendres-Diumenge: 10:30-01:30.",
            description: "Som un espai polivalent de 215m² dissenyat per crear records inoblidables. Oferim una sala privada totalment equipada perquè només t'hagis de preocupar de gaudir.",
            philosophy: "Ens adaptem al teu estil i ens importa la teva celebració com si fos nostra. Volem ser l'escenari dels teus moments més feliços."
        },
        services: [
            {
                id: 1,
                name: "Festes d'aniversari",
                price: "Des de 160€",
                details: "Sala de 215m² decorada per a l'aniversari del teu petit. Inclou zona de jocs Chikipark (5-11 anys).",
                keywords: ["cumpleaños", "cumple", "niños", "infantil", "fiesta"]
            },
            {
                id: 5,
                name: "Baby Showers",
                price: "Des de 160€",
                details: "Celebra l'arribada del nadó en un entorn íntim amb decoració a mida.",
                keywords: ["baby", "shower", "bebe", "embarazo"]
            },
            {
                id: 6,
                name: "Esdeveniments temàtics",
                price: "Des de 200€",
                details: "Transformem la sala en qualsevol univers (pirates, princeses, etc.) amb decoració completa.",
                keywords: ["tematico", "piratas", "princesas", "personajes", "tematica"]
            },
            {
                id: 7,
                name: "Pack DJ Superior",
                price: "600€",
                details: "DJ/Speaker 4h, so d'alta potència (4 altaveus + 2 sub), il·luminació professional, truss amb TV 65\", màquina de fum i micros.",
                keywords: ["dj superior", "dj profesional", "musica", "superior", "luces", "truss"]
            },
            {
                id: 8,
                name: "Pack DJ Essencial",
                price: "400€",
                details: "DJ 4h, 2 altaveus 15\", truss 4x3m, caps mòbils, làser i flaix.",
                keywords: ["dj esencial", "dj musica", "esencial", "equipo sonido"]
            },
            {
                id: 9,
                name: "Espectacle de màgia",
                price: "215€ o 265€",
                details: "Espectacle infantil 50 min (265€) o màgia de prop per a adults 1h (215€).",
                keywords: ["mago", "magia", "espectaculo", "ilusionismo", "show magia"]
            },
            {
                id: 10,
                name: "Lloguer de sala (215m²)",
                price: "Des de 160€",
                details: "Ús exclusiu de la sala amb WiFi, so Bluetooth, nevera, cafetera, microones, Chikipark, futbolí, diana, disfresses, TV i mobiliari complet.",
                keywords: ["alquiler", "sala", "espacio", "precio sala", "cuanto cuesta", "cuantos metros", "metros cuadrados"]
            },
            {
                id: 11,
                name: "La Pilar (Animació)",
                price: "280€",
                details: "Animació teatral amb guió (~90 min) exclusivament per a adults. Interactiva i personalitzada.",
                keywords: ["pilar", "adultos", "teatro", "animacion adultos", "guionizado"]
            },
            {
                id: 2,
                name: "Chikipark",
                price: "Inclòs en el lloguer",
                details: "Zona de jocs amb parc de boles, tobogans, matalassos, futbolí i diana. Ideal per a infants de 5 a 11 anys.",
                keywords: ["bolas", "parque", "juego", "chikipark", "tobogan", "colchonetas", "futbolin", "diana"]
            }
        ],
        pricingDetails: [
            { text: "De dilluns a dijous i divendres matí: 160€ (neteja inclosa)." },
            { text: "Divendres tarda, dissabtes i diumenges (matí/tarda): 180€ (+20€ neteja)." },
            { text: "Divendres i dissabtes nit (21:30 - 01:30): 250€ (+20€ neteja)." },
            { text: "Festius matí (12h-19h): 390€. Nit (20h-03h): 420€." }
        ],
        faqs: [
            { q: ["comida", "catering", "nevera", "microondas", "comer", "beber"], a: "I tant! Pots portar el teu propi menjar i beguda. Tenim nevera, microones i cafetera. També oferim un Pack Càtering Bàsic per 50€." },
            { q: ["limpieza", "limpiar", "recoger"], a: "La neteja està inclosa de dilluns a dijous i divendres matí. En altres horaris té un suplement de 20€ si no es deixa la sala recollida." },
            { q: ["reserva", "disponibilidad", "libre", "fecha", "reservar", "visita", "ver la sala"], a: "Per consultar dates o concertar una visita, el millor és escriure'ns per WhatsApp al 695 613 985. Et respondrem de seguida!" },
            { q: ["aparcamiento", "aparcar", "coche", "donde dejar"], a: "És una zona molt tranquil·la a Esparreguera i és molt fàcil aparcar just al costat de la sala." },
            { q: ["que incluye", "inclusiones", "equipamiento", "que hay"], a: "El lloguer inclou: 215m² exclusius, WiFi, so Bluetooth, nevera, microones, cafetera, Chikipark, futbolí, diana, disfresses, TV i mobiliari (52 cadires d'adults + 15 d'infants)." }
        ]
    };
    // Vocabulario catalán y castellano; las tildes no alteran la búsqueda.
    const aliases = {
        1: ['aniversari', 'aniversaris', 'nens', 'infants', 'festa'],
        5: ['nado', 'embaras'], 6: ['tematic', 'pirates', 'princeses', 'personatges'],
        7: ['dj professional', 'llums'], 8: ['dj essencial', 'equip de so'],
        9: ['mag', 'espectacle', 'il·lusionisme'],
        10: ['lloguer', 'espai', 'preu sala', 'quant costa', 'metres quadrats'],
        11: ['teatre', 'animacio adults', 'guio'],
        2: ['boles', 'parc', 'jocs', 'tobogan', 'matalassos', 'futboli']
    };
    KB.services.forEach(service => service.keywords.push(...(aliases[service.id] || [])));
    [['menjar','microones','beguda'], ['neteja','netejar','recollir'],
     ['disponibilitat','data','dates','veure la sala'], ['aparcament','cotxe'],
     ['que inclou','equipament','que hi ha']].forEach((words,index) => KB.faqs[index].q.push(...words));
    const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    KB.services.forEach(service => { service.keywords = service.keywords.map(normalize); });
    KB.faqs.forEach(faq => { faq.q = faq.q.map(normalize); });
    // --- 🛠️ UI INJECTION ---
    const chatHTML = `
        <div id="espaiChatWidget" class="espai-chat-widget">
            <button id="chatToggleBtn" class="chat-toggle-btn" aria-label="Obrir assistent" aria-expanded="false" aria-controls="chatWindow">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-5 3 1.5-6A8.5 8.5 0 1 1 21 11.5Z"/></svg>
            </button>
            <div id="chatWindow" class="chat-window hidden" role="region" aria-label="Espai Bot, assistent automàtic">
                <div class="chat-header">
                    <div class="chat-avatar">🤖</div>
                    <div class="chat-title-box">
                        <span class="chat-name">Espai Bot</span>
                        <span class="chat-status">Assistent automàtic · informació orientativa</span>
                    </div>
                    <button class="chat-close" id="chatCloseBtn" aria-label="Tancar assistent">×</button>
                </div>
                <div id="chatBody" class="chat-body" role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversa">
                    <div class="chat-msg bot">Hola! Soc l'assistent d'Espai Únic. En què et puc ajudar avui? ✨</div>
                </div>
                <div class="chat-footer">
                    <input type="text" id="chatInput" aria-label="La teva pregunta a l&#x27;assistent" maxlength="1000" placeholder="Escriu el teu dubte..." autocomplete="off">
                    <button id="chatSendBtn" aria-label="Enviar pregunta"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 9-18 9 3-9-3-9Zm3 9h15"/></svg></button>
                </div>
                <p class="chat-privacy">Xat local: no desem aquesta conversa. <a href="privacidad.html">Privacitat</a> · <a href="https://wa.me/34695613985" target="_blank" rel="noopener noreferrer">Parlar amb l'equip ↗</a></p>
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
        chatToggleBtn.setAttribute('aria-label', opened ? "Tancar assistent" : "Obrir assistent");
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

    // --- 🧠 LOGIC ---
    function getBotResponse(input) {
        const text = normalize(input);

        // --- Contextual Handling (Yes/No) ---
        if (pendingAction === "RESERVA") {
            if (text === "si" || text.includes("d'acord") || text.includes("perfecte") || text.includes("vale") || text.includes("perfecto") || text.includes("claro")) {
                pendingAction = null;
                return `Perfecte! Pots consultar la reserva o la disponibilitat per WhatsApp aquí: ${KB.general.phone} (Enllaç: ${KB.general.whatsapp})`;
            }
            if (text === "no" || text.includes("nada más") || text.includes("así está bien")) {
                pendingAction = null;
                return "Entesos, hi ha alguna altra cosa en què et pugui ajudar?";
            }
        }

        // Reset context if it's a new query
        pendingAction = null;

        // Check Company Info
        if (text.includes("qui sou") || text.includes("que feu") || text.includes("quienes") || text.includes("que haceis") || text.includes("dedica") || text.includes("empresa")) {
            return KB.general.description + " " + KB.general.philosophy;
        }
        if (text.includes("on sou") || text.includes("on esteu") || text.includes("ubicacio") || text.includes("adreca") || text.includes("donde") || text.includes("ubicacion") || text.includes("donde estais") || text.includes("direccion")) {
            return `Som a ${KB.general.location}. És una zona de fàcil aparcament a ${KB.general.locationShort}.`;
        }

        if (text.includes('horari') || text.includes('horario') || text.includes('obriu')) return KB.general.hours;
        // Check Prices General
        if ((text.includes("preus") || text.includes("tarifes") || text.includes("cuanto cuesta") || text.includes("precios") || text.includes("tarifas")) && !KB.services.some(s => s.keywords.some(k => text.includes(k)))) {
            let res = "Les nostres tarifes varien segons l'horari: \n";
            KB.pricingDetails.forEach(p => res += "- " + p.text + "\n");
            return res + "T'interessa algun horari o servei en concret?";
        }

        // Check services
        for (const s of KB.services) {
            if (s.keywords.some(k => text.includes(k))) {
                pendingAction = "RESERVA";
                return `Sobre ${s.name}: El preu és ${s.price}. ${s.details} Vols que t’expliqui com reservar o consultar dates?`;
            }
        }

        // Check FAQs
        for (const f of KB.faqs) {
            if (f.q.some(keyword => text.includes(keyword))) {
                return f.a;
            }
        }

        // Generic Handlers
        if (text.includes("contacte") || text.includes("telefon") || text.includes("contacto") || text.includes("telefono") || text.includes("whatsapp")) {
            return `Pots contactar amb nosaltres per WhatsApp al ${KB.general.phone} (fes clic aquí: ${KB.general.whatsapp}). Ens encantarà ajudar-te!`;
        }
        if (text.includes("hola") || text.includes("bon dia") || text.includes("bona tarda") || text.includes("buenos dias") || text.includes("buenas tardes")) {
            return "Hola! Soc Espai Bot, l'assistent d'Espai Únic. Vols saber més sobre els nostres serveis, preus o on som?";
        }

        return "No estic segur d'haver-te entès bé. Puc informar-te sobre els nostres serveis (aniversaris, DJ, màgia, etc.), preus segons l'horari o la nostra ubicació a Esparreguera. Què prefereixes?";
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
