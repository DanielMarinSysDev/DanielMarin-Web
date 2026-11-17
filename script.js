// Esperamos a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', (event) => {

    // --- I18N LOGIC ---
    let isSpanish = true;
    const storedLang = localStorage.getItem('site_lang');
    
    if (storedLang) {
        isSpanish = storedLang === 'es';
    } else {
        isSpanish = navigator.language.toLowerCase().startsWith('es');
    }

    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.textContent = isSpanish ? 'EN' : 'ES';
        langToggleBtn.title = isSpanish ? 'Change Language to English' : 'Cambiar Idioma a Español';
        langToggleBtn.addEventListener('click', () => {
            const newLang = isSpanish ? 'en' : 'es';
            localStorage.setItem('site_lang', newLang);
            window.location.reload(); // Recarga para aplicar los cambios de inmediato
        });
    }

    if (!isSpanish) {
        document.documentElement.lang = 'en';
        
        const dict = {
            nav_inicio: "Home",
            nav_sobre_mi: "About",
            nav_proyectos: "Projects",
            nav_contacto: "Contact",
            preloader_iniciando: "SYSTEM BOOT_",
            hero_h1: "Backend & <br>\n                        <span class=\"bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-sky-300\">Systems</span>",
            hero_p1: 'I am <span class="text-white font-bold">Daniel Marin</span>, Backend Developer & Automation Engineer.',
            hero_p2: "I design REST APIs, ETL pipelines, and containerized architectures with Python, PostgreSQL, and Docker.",
            hero_btn_proyectos: 'PROJECTS <span class="ml-2">→</span>',
            hero_btn_sobre_mi: "ABOUT ME",
            term_modulos: "» Loading core modules... [OK]",
            term_motor: "» Initializing UI Engine... [OK]",
            term_bienvenido: "Welcome to the interactive portfolio v2.0",
            term_ayuda: 'Type <span class="text-brand-blue bg-brand-blue/10 px-1 rounded">help</span> to see available commands.',
            about_h2: 'Behind the <span class="text-brand-blue">Code</span>',
            about_p: 'Backend Developer focused on <strong class="text-white">Python, relational database modeling, and operational automation</strong>. I diagnose real-world bottlenecks to turn them into scalable, containerized systems. Systems Engineering student (IUPSM) • English B2.',
            about_arq: 'Independent Software Developer <span class="text-xs text-brand-blue font-normal ml-1">(2024 – Present)</span>',
            about_arq_desc: "REST APIs, PostgreSQL/Supabase, Python ETL workers, Telegram bots, Docker, CI/CD, and Next.js / Flutter integration.",
            about_front: 'Production Coordinator — Grafic-K <span class="text-xs text-brand-orange font-normal ml-1">(2022 – 2024)</span>',
            about_front_desc: "End-to-end operational optimization, manual bottleneck detection, and real-time technical troubleshooting under pressure.",
            about_eco: "Core Tech Stack",
            about_eco_desc: "Python (Flask, Django, SQLAlchemy, Alembic, Pandas) • PostgreSQL, Supabase • TypeScript, Next.js, Flutter • Docker, GitHub Actions, n8n, Cloudflare.",
            proj_h2: 'Projects <span class="text-brand-orange">Vault</span>',
            proj_cargando: "Loading featured projects...",
            contact_h2: "Connect With Me",
            contact_p: "My inbox is always open centralizing ideas and building the future.",
            contact_btn_email: "contact@danielmarinp.com",
            footer_derechos: " Daniel Marin - All rights reserved."
        };

        // DOM Updates
        document.querySelectorAll('.nav-link[data-section="inicio"]').forEach(el => el.textContent = dict.nav_inicio);
        document.querySelectorAll('.nav-link[data-section="sobre-mi"]').forEach(el => el.textContent = dict.nav_sobre_mi);
        document.querySelectorAll('.nav-link[data-section="proyectos"]').forEach(el => el.textContent = dict.nav_proyectos);
        document.querySelectorAll('.nav-link[data-section="contacto"]').forEach(el => el.textContent = dict.nav_contacto);

        const preloaderText = document.querySelector('#preloader .flex span:first-child');
        if (preloaderText) preloaderText.textContent = dict.preloader_iniciando;

        const h1 = document.querySelector('#inicio h1');
        if (h1) h1.innerHTML = dict.hero_h1;

        const heroP1 = document.querySelector('#inicio p.text-xl');
        if (heroP1) heroP1.innerHTML = dict.hero_p1;

        const heroP2 = document.querySelector('#inicio p.text-md');
        if (heroP2) heroP2.textContent = dict.hero_p2;

        const btnProyectos = document.querySelector('#inicio a[href="#proyectos"]');
        if (btnProyectos) btnProyectos.innerHTML = dict.hero_btn_proyectos;

        const btnSobreMi = document.querySelector('#inicio a[href="#sobre-mi"]');
        if (btnSobreMi) btnSobreMi.textContent = dict.hero_btn_sobre_mi;

        const termBody = document.querySelector('#terminal-body');
        if (termBody) {
            const pTags = termBody.querySelectorAll('p');
            if (pTags.length >= 4) {
                pTags[1].textContent = dict.term_modulos;
                pTags[2].textContent = dict.term_motor;
                pTags[3].textContent = dict.term_bienvenido;
                pTags[4].innerHTML = dict.term_ayuda;
            }
        }

        const aboutH2 = document.querySelector('#sobre-mi h2');
        if (aboutH2) aboutH2.innerHTML = dict.about_h2;

        const aboutP = document.querySelector('#sobre-mi p.text-lg');
        if (aboutP) aboutP.innerHTML = dict.about_p;

        const aboutH4s = document.querySelectorAll('#sobre-mi h4');
        const aboutPs = document.querySelectorAll('#sobre-mi .border-l-2 p');
        if (aboutH4s.length >= 3) {
            aboutH4s[0].innerHTML = dict.about_arq;
            aboutH4s[1].innerHTML = dict.about_front;
            aboutH4s[2].innerHTML = dict.about_eco;
        }
        if (aboutPs.length >= 3) {
            aboutPs[0].textContent = dict.about_arq_desc;
            aboutPs[1].textContent = dict.about_front_desc;
            aboutPs[2].textContent = dict.about_eco_desc;
        }

        const projH2 = document.querySelector('#proyectos h2');
        if (projH2) projH2.innerHTML = dict.proj_h2;

        const projLoader = document.querySelector('#proyectos-container p');
        if (projLoader) projLoader.textContent = dict.proj_cargando;

        const contactH2 = document.querySelector('#contacto h2');
        if (contactH2) contactH2.textContent = dict.contact_h2;

        const contactP = document.querySelector('#contacto p.text-lg');
        if (contactP) contactP.textContent = dict.contact_p;

        const btnEmail = document.querySelector('#contacto button[data-type="email"]');
        if (btnEmail) {
            btnEmail.textContent = dict.contact_btn_email;
            btnEmail.setAttribute('data-part1', 'contact');
        }

        const footerP = document.querySelector('footer p');
        if (footerP) {
            footerP.innerHTML = `&copy; <span id="current-year">${new Date().getFullYear()}</span>${dict.footer_derechos}`;
        }
    }

    // --- 0. PRELOADER V2 ---
    const preloader = document.getElementById('preloader');
    const loaderPerc = document.getElementById('loader-perc');
    const loaderBar = document.getElementById('loader-bar');

    if (preloader) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) progress = 100;
            
            if (loaderPerc) loaderPerc.textContent = `${progress}%`;
            if (loaderBar) loaderBar.style.width = `${progress}%`;

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.transform = 'translateY(-100%)';
                }, 400); // 400ms después de llegar a 100% de animación
            }
        }, 80); // Velocidad base del loading falso
    }

    // --- 0.1 CURSOR MAGNÉTICO (Graffio Style) ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const interactiveEls = document.querySelectorAll('a, button, .cursor-pointer, input, textarea');

    if (cursorDot && cursorRing && !window.matchMedia("(max-width: 768px)").matches) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        // Rastrear posición real del mouse
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // El punto sigue instantáneamente al mouse
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Animar el anillo exterior con requestAnimationFrame para suavidad "magnética"
        const animateCursor = () => {
            // Ecuación de ease/suavizado (Graffio-like mejorado para evitar deforma)
            ringX += (mouseX - ringX) * 0.25; 
            ringY += (mouseY - ringY) * 0.25;
            
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Efecto Hover en elementos interactivos
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('scale-[3]', 'bg-brand-blue/60');
                cursorDot.classList.remove('bg-brand-orange/80');
                cursorRing.classList.add('scale-150', 'border-transparent');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('scale-[3]', 'bg-brand-blue/60');
                cursorDot.classList.add('bg-brand-orange/80');
                cursorRing.classList.remove('scale-150', 'border-transparent');
            });
        });
    }

    // --- 0.2 TERMINAL INTERACTIVA (Easter Egg V2) ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput && terminalHistory) {
        let cmdHistory = [];
        let historyIndex = -1;

        // Enfocar el input al hacer clic en cualquier parte de la terminal
        terminalBody.addEventListener('click', () => terminalInput.focus());

        const executeCommand = (cmd) => {
            if (cmd.trim() !== '') {
                cmdHistory.push(cmd);
                historyIndex = cmdHistory.length;
            }

            const command = cmd.trim().toLowerCase();
            let response = '';

            switch(command) {
                case 'help':
                    response = isSpanish ? `
                        <div class="text-gray-300 ml-4 py-2">
                            <span class="text-brand-blue w-24 inline-block">help</span> Muestra este mensaje<br>
                            <span class="text-brand-blue w-24 inline-block">projects</span> Navega a mis proyectos<br>
                            <span class="text-brand-blue w-24 inline-block">contact</span> Navega a mis redes<br>
                            <span class="text-brand-blue w-24 inline-block">skills</span> Ver stack tecnológico<br>
                            <span class="text-brand-blue w-24 inline-block">experience</span> Ver trayectoria<br>
                            <span class="text-brand-blue w-24 inline-block">theme light</span> Cambia a modo diurno<br>
                            <span class="text-brand-blue w-24 inline-block">theme dark</span> Cambia a modo nocturno<br>
                            <span class="text-brand-blue w-24 inline-block">github</span> Ir a mi perfil de GitHub<br>
                            <span class="text-brand-blue w-24 inline-block">whoami</span> ¿Quién eres?<br>
                            <span class="text-brand-blue w-24 inline-block">ping</span> Prueba de conexión<br>
                            <span class="text-brand-blue w-24 inline-block">clear</span> Limpia la consola<br>
                            <span class="text-brand-blue w-24 inline-block">sysdev</span> ?????
                        </div>` : `
                        <div class="text-gray-300 ml-4 py-2">
                            <span class="text-brand-blue w-24 inline-block">help</span> Shows this message<br>
                            <span class="text-brand-blue w-24 inline-block">projects</span> Navigate to my projects<br>
                            <span class="text-brand-blue w-24 inline-block">contact</span> Navigate to my socials<br>
                            <span class="text-brand-blue w-24 inline-block">skills</span> View tech stack<br>
                            <span class="text-brand-blue w-24 inline-block">experience</span> View experience<br>
                            <span class="text-brand-blue w-24 inline-block">theme light</span> Switch to light mode<br>
                            <span class="text-brand-blue w-24 inline-block">theme dark</span> Switch to dark mode<br>
                            <span class="text-brand-blue w-24 inline-block">github</span> Go to my GitHub profile<br>
                            <span class="text-brand-blue w-24 inline-block">whoami</span> Who are you?<br>
                            <span class="text-brand-blue w-24 inline-block">ping</span> Connection test<br>
                            <span class="text-brand-blue w-24 inline-block">clear</span> Clear the console<br>
                            <span class="text-brand-blue w-24 inline-block">sysdev</span> ?????
                        </div>`;
                    break;
                case 'projects':
                    document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' });
                    response = isSpanish ? '<span class="text-green-400">» Navegando a proyectos...</span>' : '<span class="text-green-400">» Navigating to projects...</span>';
                    break;
                case 'contact':
                    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                    response = isSpanish ? '<span class="text-green-400">» Abriendo canal de comunicaciones...</span>' : '<span class="text-green-400">» Opening comms channel...</span>';
                    break;
                case 'clear':
                    terminalHistory.innerHTML = '';
                    return; // Retornamos temprano para no imprimir repeticiones
                case 'sysdev':
                    document.body.classList.toggle('sysdev-mode');
                    if(isSpanish) {
                        response = document.body.classList.contains('sysdev-mode') ? 
                            '<span class="text-red-500 font-bold animate-pulse">» PROTOCOLO OVERRIDE ACTIVADO.</span>' : 
                            '<span class="text-green-400">» Sistemas restaurados.</span>';
                    } else {
                        response = document.body.classList.contains('sysdev-mode') ? 
                            '<span class="text-red-500 font-bold animate-pulse">» OVERRIDE PROTOCOL ACTIVATED.</span>' : 
                            '<span class="text-green-400">» Systems restored.</span>';
                    }
                    break;
                case 'skills':
                    response = `
                        <div class="text-green-400 py-1 font-mono text-xs sm:text-sm">
                            <span class="text-white">Python / Flask / Django..</span> ██████████ 95%<br>
                            <span class="text-white">PostgreSQL / Supabase....</span> █████████░ 90%<br>
                            <span class="text-white">Docker / CI-CD / n8n.....</span> █████████░ 88%<br>
                            <span class="text-white">TypeScript / Next.js.....</span> ████████░░ 82%<br>
                            <span class="text-white">Flutter / Dart...........</span> ███████░░░ 75%
                        </div>`;
                    break;
                case 'experience':
                    response = isSpanish ? `
                        <div class="text-gray-300 py-1 space-y-1 text-xs sm:text-sm">
                            <div><span class="text-brand-blue font-bold">2024 – Presente:</span> Desarrollador Independiente (APIs REST, ETL, Docker, Next.js)</div>
                            <div><span class="text-brand-orange font-bold">2022 – 2024:</span> Coordinador de Producción @ Grafic-K (Optimización & Soporte)</div>
                        </div>` : `
                        <div class="text-gray-300 py-1 space-y-1 text-xs sm:text-sm">
                            <div><span class="text-brand-blue font-bold">2024 – Present:</span> Independent Developer (REST APIs, ETL, Docker, Next.js)</div>
                            <div><span class="text-brand-orange font-bold">2022 – 2024:</span> Production Coordinator @ Grafic-K (Optimization & Support)</div>
                        </div>`;
                    break;
                case 'theme light':
                    document.body.classList.add('light-mode');
                    const logoLight = document.getElementById('nav-logo');
                    if (logoLight) logoLight.src = 'L_O.png';
                    const heroLogoLight = document.getElementById('profile-img');
                    if (heroLogoLight) heroLogoLight.src = 'L_N.png';
                    response = isSpanish ? '<span class="text-yellow-400">» Modo luz activado. Brillo al máximo.</span>' : '<span class="text-yellow-400">» Light mode activated. Max brightness.</span>';
                    break;
                case 'theme dark':
                    document.body.classList.remove('light-mode');
                    const logoDark = document.getElementById('nav-logo');
                    if (logoDark) logoDark.src = 'L_C.png';
                    const heroLogoDark = document.getElementById('profile-img');
                    if (heroLogoDark) heroLogoDark.src = 'L_B.png';
                    response = isSpanish ? '<span class="text-gray-400">» Oscuridad restaurada.</span>' : '<span class="text-gray-400">» Darkness restored.</span>';
                    break;
                case 'github':
                    window.open('https://github.com/DanielMarinSysDev', '_blank');
                    response = isSpanish ? '<span class="text-green-400">» Abriendo enlace de GitHub.</span>' : '<span class="text-green-400">» Opening GitHub link.</span>';
                    break;
                case 'whoami':
                    response = isSpanish ? '<span class="text-gray-300">Daniel Marin — Desarrollador Backend & Automatización | Python · PostgreSQL · Docker | contacto@danielmarinp.com</span>' : '<span class="text-gray-300">Daniel Marin — Backend & Automation Developer | Python · PostgreSQL · Docker | contact@danielmarinp.com</span>';
                    break;
                case 'ping':
                    response = isSpanish ? '<span class="text-gray-300">PONG! (Latencia: 1ms directo a mi portafolio)</span>' : '<span class="text-gray-300">PONG! (Latency: 1ms straight to my portfolio)</span>';
                    break;
                case 'date':
                case 'time':
                    const now = new Date();
                    response = `<span class="text-brand-blue">${now.toLocaleString()}</span>`;
                    break;
                case 'sudo rm -rf /':
                    response = isSpanish ? '<span class="text-red-500 font-bold animate-pulse">FATAL ERROR: PERMISSION DENIED.</span><br><span class="text-gray-400">¿De verdad creíste que te dejaría borrar mi portafolio? Nice try.</span>' : '<span class="text-red-500 font-bold animate-pulse">FATAL ERROR: PERMISSION DENIED.</span><br><span class="text-gray-400">Did you really think I would let you delete my portfolio? Nice try.</span>';
                    break;
                case 'download cv':
                    response = isSpanish ? '<span class="text-brand-blue">» Preparando descarga de CV_Daniel_Marin.pdf... [MOCK]</span>' : '<span class="text-brand-blue">» Preparing download for CV_Daniel_Marin.pdf... [MOCK]</span>';
                    break;
                case 'matrix':
                    document.body.classList.add('sysdev-mode');
                    setTimeout(() => document.body.classList.remove('sysdev-mode'), 3000);
                    response = isSpanish ? '<span class="text-green-500">» Vaya conejo blanco... [Simulando Matrix por 3s]</span>' : '<span class="text-green-500">» Follow the white rabbit... [Simulating Matrix for 3s]</span>';
                    break;
                case '':
                    break;
                default:
                    if (command.startsWith('sudo ')) {
                        response = isSpanish ? '<span class="text-red-400 font-bold">» ACCESS DENIED. </span> <span class="text-gray-400">Ese comando será reportado a los administradores.</span>' : '<span class="text-red-400 font-bold">» ACCESS DENIED. </span> <span class="text-gray-400">This command will be reported to the admins.</span>';
                    } else if (command.startsWith('echo ')) {
                        response = `<span class="text-gray-300">${command.substring(5)}</span>`;
                    } else {
                        response = isSpanish ? `<span class="text-red-400">Comando no encontrado: ${command}. Escribe <span class="text-brand-blue">help</span>.</span>` : `<span class="text-red-400">Command not found: ${command}. Type <span class="text-brand-blue">help</span>.</span>`;
                    }
            }

            // Añadir comando e historial al DOM
            if (command !== '') {
                terminalHistory.innerHTML += `
                    <div>
                        <span class="text-brand-blue font-bold">daniel@sysdev:~$</span> <span class="text-white drop-shadow-md">${cmd}</span>
                        <div class="mt-1">${response}</div>
                    </div>
                `;
            } else {
                terminalHistory.innerHTML += `<div><span class="text-brand-blue font-bold">daniel@sysdev:~$</span></div>`;
            }

            // Auto-scroll al fondo
            terminalBody.scrollTop = terminalBody.scrollHeight;
        };

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                executeCommand(cmd);
                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = cmdHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < cmdHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = cmdHistory[historyIndex];
                } else {
                    historyIndex = cmdHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }

    // --- 1. Botón de Subir (Scroll to Top) ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Mostrar/ocultar el botón basado en el scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });

        // Acción de clic para subir
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 2. Scroll Suave para Anclas (Navegación) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Navegación Activa iudgiugiuhriugigiuyvuyf(Resaltar sección actual) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Se activa cuando la sección está a 1/3 de la pantalla
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('nav-link-active');
                if (link.getAttribute('data-section') === currentSectionId) {
                    link.classList.add('nav-link-active');
                }
            });
        });
    }

    // --- 4. Animación de Aparición (Fade-in on scroll) ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    if (fadeInElements.length > 0) {
        // Opciones del Intersection Observer
        const observerOptions = {
            root: null, // usa el viewport
            rootMargin: '0px',
            threshold: 0.2 // 20% del elemento debe ser visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    // Dejamos de observar el elemento una vez que es visible
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar cada elemento con la clase .fade-in
        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- 5. Año Actual en el Footer ---
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- 6. Menú Móvil ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn') || document.querySelector('.md\\:hidden button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- 7. Enlaces Seguros (Anti-Scraping) ---
    const secureLinks = document.querySelectorAll('.secure-link');

    secureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const type = link.getAttribute('data-type');
            const part1 = link.getAttribute('data-part1');
            const part2 = link.getAttribute('data-part2');

            if (type === 'email') {
                window.location.href = `mailto:${part1}@${part2}`;
            }
        });
    });

    // --- 8. Fondo de Partículas (tsParticles) ---
    const iniciarParticulas = async () => {
        await tsParticles.load('tsparticles', {
            particles: {
                color: { value: "#4c96b3" },
                links: {
                    enable: true,
                    color: "#4c96b3",
                    opacity: 0.25,
                    distance: 150
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: { default: "bounce" }
                },
                number: {
                    value: 60,
                    density: { enable: true, area: 800 }
                },
                opacity: { value: 0.35 },
                shape: { type: "circle" },
                size: { value: { min: 1.5, max: 3 } }
            },
            interactivity: {
                detectsOn: "window",
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: false }
                },
                modes: {
                    grab: { distance: 150, links: { opacity: 0.65 } }
                }
            },
            background: { color: "transparent" }, // Fondo transparente para ver el gradiente del body
            detectRetina: true
        });
    };
    iniciarParticulas();

    // --- 9. Proyectos Destacados (Curados del Perfil) ---
    const cargarProyectos = () => {
        const container = document.getElementById('proyectos-container');
        if (!container) return;

        const proyectosDestacados = [
            {
                title: "TaskCore — Workflow Hub & Production Core",
                category: isSpanish ? "Backend & Arquitectura" : "Backend & Architecture",
                description: isSpanish
                    ? "Sistema integral de gestión de órdenes, control de inventario y flujo financiero. Arquitectura modular en Flask con migraciones Alembic, tableros Kanban, backups automatizados, Docker Compose y CI/CD."
                    : "Comprehensive order management, inventory control, and financial flow system. Modular Flask architecture with Alembic migrations, interactive Kanban boards, automated backups, Docker Compose, and CI/CD.",
                stack: ["Python", "Flask", "PostgreSQL", "Docker", "Alembic", "GitHub Actions"],
                github: "https://github.com/DanielMarinSysDev/taskcore-showcase",
                demo: null,
                accent: "from-brand-blue/30 via-[#0a1d28] to-[#05080b]"
            },
            {
                title: "SoraAtelier — Headless E-Commerce & AI",
                category: isSpanish ? "Full Stack & IA" : "Full Stack & AI",
                description: isSpanish
                    ? "Catálogo dinámico en Next.js y TypeScript con enriquecimiento automático de productos mediante Google Gemini API, Google Sheets/Drive como Headless CMS y cierre de ventas vía WhatsApp API."
                    : "Dynamic catalog platform built with Next.js and TypeScript featuring automated product enrichment via Google Gemini API, Google Sheets/Drive as a decoupled Headless CMS, and WhatsApp API checkout.",
                stack: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Google Drive API", "WhatsApp API"],
                github: "https://github.com/DanielMarinSysDev",
                demo: null,
                accent: "from-brand-orange/30 via-[#0a1d28] to-[#05080b]"
            },
            {
                title: isSpanish ? "Pipeline ETL E-Commerce & Bots" : "E-Commerce ETL Pipeline & Bots",
                category: isSpanish ? "Automatización & Datos" : "Automation & Data",
                description: isSpanish
                    ? "Herramienta ETL en Python para autenticación, ingesta y transformación de datos JSON anidados desde Shopify API, generando reportes periódicos de producción y alertas en tiempo real vía Telegram Bot y n8n."
                    : "Python ETL tool for authentication, ingestion, and transformation of nested JSON data from Shopify API, generating periodic production reports and real-time alerts via Telegram Bot and n8n.",
                stack: ["Python", "Shopify API", "Telegram Bot API", "Requests", "n8n"],
                github: "https://github.com/DanielMarinSysDev",
                demo: null,
                accent: "from-sky-500/25 via-[#0a1d28] to-[#05080b]"
            }
        ];

        container.innerHTML = '';

        proyectosDestacados.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'swiper-slide flex justify-center pb-12 pt-4 px-2';

            const badgesHtml = proj.stack
                .map(tech => `<span class="inline-block bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-sm px-2.5 py-1 text-xs font-tech">${tech}</span>`)
                .join('');

            card.innerHTML = `
                <div class="bg-[#05080b]/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(76,150,179,0.2)] border border-white/5 group w-full h-full flex flex-col">
                    <div class="relative overflow-hidden w-full h-40 shrink-0 bg-gradient-to-br ${proj.accent} flex flex-col justify-between p-6 border-b border-white/5">
                        <span class="font-tech text-xs uppercase tracking-widest text-brand-orange font-bold">${proj.category}</span>
                        <h3 class="text-xl md:text-2xl font-display font-bold text-white leading-snug line-clamp-2">${proj.title}</h3>
                    </div>
                    <div class="p-6 relative z-20 flex flex-col flex-grow">
                        <p class="text-gray-300 mb-5 text-sm md:text-base font-tech leading-relaxed flex-grow">
                            ${proj.description}
                        </p>
                        <div class="mb-5 flex flex-wrap gap-2 shrink-0">
                            ${badgesHtml}
                        </div>
                        <div class="flex space-x-3 shrink-0 mt-auto font-tech">
                            ${proj.demo ? `<a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="text-[#0a1d28] bg-brand-blue hover:bg-sky-300 transition duration-300 px-4 py-1.5 rounded-sm font-bold border border-brand-blue">${isSpanish ? 'Ver Demo' : 'Live Demo'}</a>` : ''}
                            <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="text-brand-blue font-bold hover:text-white transition duration-300 bg-transparent px-4 py-1.5 rounded-sm border border-brand-blue/30 hover:bg-brand-blue/10">GitHub</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        new Swiper(".proyectos-swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            grabCursor: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    };
    cargarProyectos();

    // --- 10. Easter Eggs (Konami + Mobile Tap) ---
    // Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activarModoSysDev();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Mobile Tap (5 toques en imagen de perfil)
    const profileImg = document.getElementById('profile-img');
    let tapCount = 0;
    let tapTimer;

    if (profileImg) {
        profileImg.addEventListener('click', () => {
            tapCount++;
            clearTimeout(tapTimer);

            if (tapCount === 5) {
                activarModoSysDev();
                tapCount = 0;
            } else {
                tapTimer = setTimeout(() => {
                    tapCount = 0;
                }, 500); // Resetear si pasa medio segundo sin click
            }
        });
    }

    function activarModoSysDev() {
        alert(isSpanish ? '¡Modo SysDev Activado! 🐇💻' : 'SysDev Mode Activated! 🐇💻');
        document.body.classList.toggle('sysdev-mode');
    }

});