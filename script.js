// Esperamos a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', (event) => {

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
                    response = `
                        <div class="text-gray-300 ml-4 py-2">
                            <span class="text-brand-blue w-24 inline-block">help</span> Muestra este mensaje<br>
                            <span class="text-brand-blue w-24 inline-block">projects</span> Navega a mis proyectos<br>
                            <span class="text-brand-blue w-24 inline-block">contact</span> Navega a mis redes<br>
                            <span class="text-brand-blue w-24 inline-block">skills</span> Ver stack tecnológico<br>
                            <span class="text-brand-blue w-24 inline-block">theme light</span> Cambia a modo diurno<br>
                            <span class="text-brand-blue w-24 inline-block">theme dark</span> Cambia a modo nocturno<br>
                            <span class="text-brand-blue w-24 inline-block">github</span> Ir a mi perfil de GitHub<br>
                            <span class="text-brand-blue w-24 inline-block">whoami</span> ¿Quién eres?<br>
                            <span class="text-brand-blue w-24 inline-block">ping</span> Prueba de conexión<br>
                            <span class="text-brand-blue w-24 inline-block">clear</span> Limpia la consola<br>
                            <span class="text-brand-blue w-24 inline-block">sysdev</span> ?????
                        </div>`;
                    break;
                case 'projects':
                    document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' });
                    response = '<span class="text-green-400">» Navegando a proyectos...</span>';
                    break;
                case 'contact':
                    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                    response = '<span class="text-green-400">» Abriendo canal de comunicaciones...</span>';
                    break;
                case 'clear':
                    terminalHistory.innerHTML = '';
                    return; // Retornamos temprano para no imprimir repeticiones
                case 'sysdev':
                    document.body.classList.toggle('sysdev-mode');
                    response = document.body.classList.contains('sysdev-mode') ? 
                        '<span class="text-red-500 font-bold animate-pulse">» PROTOCOLO OVERRIDE ACTIVADO.</span>' : 
                        '<span class="text-green-400">» Sistemas restaurados.</span>';
                    break;
                case 'skills':
                    response = `
                        <div class="text-green-400 py-1 font-mono">
                            <span class="text-white">Python.......</span> ██████████ 95%<br>
                            <span class="text-white">JavaScript...</span> ████████░░ 80%<br>
                            <span class="text-white">SQL..........</span> ███████░░░ 70%<br>
                            <span class="text-white">Tailwind/CSS.</span> █████████░ 90%<br>
                            <span class="text-white">Git/GitHub...</span> ████████░░ 85%
                        </div>`;
                    break;
                case 'theme light':
                    document.body.classList.add('light-mode');
                    const logoLight = document.getElementById('nav-logo');
                    if (logoLight) logoLight.src = 'L_O.png';
                    const heroLogoLight = document.getElementById('profile-img');
                    if (heroLogoLight) heroLogoLight.src = 'L_N.png';
                    response = '<span class="text-yellow-400">» Modo luz activado. Brillo al máximo.</span>';
                    break;
                case 'theme dark':
                    document.body.classList.remove('light-mode');
                    const logoDark = document.getElementById('nav-logo');
                    if (logoDark) logoDark.src = 'L_C.png';
                    const heroLogoDark = document.getElementById('profile-img');
                    if (heroLogoDark) heroLogoDark.src = 'L_B.png';
                    response = '<span class="text-gray-400">» Oscuridad restaurada.</span>';
                    break;
                case 'github':
                    window.open('https://github.com/DanielMarinSysDev', '_blank');
                    response = '<span class="text-green-400">» Abriendo enlace de GitHub.</span>';
                    break;
                case 'whoami':
                    response = '<span class="text-gray-300">Te identifico como: Visitante curioso. ¡Encantado de conocerte!</span>';
                    break;
                case 'ping':
                    response = '<span class="text-gray-300">PONG! (Latencia: 1ms directo a mi portafolio)</span>';
                    break;
                case 'date':
                case 'time':
                    const now = new Date();
                    response = `<span class="text-brand-blue">${now.toLocaleString()}</span>`;
                    break;
                case 'sudo rm -rf /':
                    response = '<span class="text-red-500 font-bold animate-pulse">FATAL ERROR: PERMISSION DENIED.</span><br><span class="text-gray-400">¿De verdad creíste que te dejaría borrar mi portafolio? Nice try.</span>';
                    break;
                case 'download cv':
                    response = '<span class="text-brand-blue">» Preparando descarga de CV_Daniel_Marin.pdf... [MOCK]</span>';
                    break;
                case 'matrix':
                    document.body.classList.add('sysdev-mode');
                    setTimeout(() => document.body.classList.remove('sysdev-mode'), 3000);
                    response = '<span class="text-green-500">» Vaya conejo blanco... [Simulando Matrix por 3s]</span>';
                    break;
                case '':
                    break;
                default:
                    if (command.startsWith('sudo ')) {
                        response = '<span class="text-red-400 font-bold">» ACCESS DENIED. </span> <span class="text-gray-400">Ese comando será reportado a los administradores.</span>';
                    } else if (command.startsWith('echo ')) {
                        response = `<span class="text-gray-300">${command.substring(5)}</span>`;
                    } else {
                        response = `<span class="text-red-400">Comando no encontrado: ${command}. Escribe <span class="text-brand-blue">help</span>.</span>`;
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

            let url = '';

            switch (type) {
                case 'email':
                    url = `mailto:${part1}@${part2}`;
                    window.location.href = url;
                    break;
                case 'whatsapp':
                    const msg = link.getAttribute('data-msg');
                    url = `https://wa.me/${part1}?text=${encodeURIComponent(msg)}`;
                    window.open(url, '_blank');
                    break;
            }
        });
    });

    // --- 8. Fondo de Partículas (tsParticles) ---
    const iniciarParticulas = async () => {
        await tsParticles.load('tsparticles', {
            particles: {
                color: { value: "#ffffff" },
                links: {
                    enable: true,
                    color: "#ffffff",
                    opacity: 0.1,
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
                opacity: { value: 0.1 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: { distance: 140, links: { opacity: 0.5 } },
                    push: { quantity: 4 }
                }
            },
            background: { color: "transparent" }, // Fondo transparente para ver el gradiente del body
            detectRetina: true
        });
    };
    iniciarParticulas();

    // --- 9. Cargar Proyectos desde GitHub ---
    const cargarProyectos = async () => {
        const container = document.getElementById('proyectos-container');
        if (!container) return;

        try {
            const response = await fetch('https://api.github.com/users/DanielMarinSysDev/repos?sort=updated');
            if (!response.ok) throw new Error('Error al cargar repositorios');

            const repos = await response.json();
            // Filtrar forks y el repositorio de perfil (readme de GitHub)
            const proyectos = repos.filter(repo => !repo.fork && repo.name !== 'DanielMarinSysDev');

            container.innerHTML = ''; // Limpiar loader

            proyectos.forEach(repo => {
                const card = document.createElement('div');
                // Añadimos la clase 'swiper-slide' obligatoria para el carrusel
                card.className = 'swiper-slide flex justify-center pb-12 pt-4 px-2';

                // Imagen por defecto o personalizada si existiera
                const imgUrl = `https://opengraph.githubassets.com/1/DanielMarinSysDev/${repo.name}`;

                // Lógica personalizada para proyectos específicos
                if (repo.name.toLowerCase().includes('inventario') || repo.name.toLowerCase().includes('electiva')) {
                    repo.homepage = 'https://inventario.danielmarinsysdev.me';
                }

                card.innerHTML = `
                    <div class="bg-[#05080b]/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(76,150,179,0.2)] border border-white/5 group w-full h-full flex flex-col">
                        <div class="relative overflow-hidden w-full h-48 md:h-56 shrink-0">
                            <div class="absolute inset-0 github-card-gradient opacity-80 z-10 transition-opacity duration-300 group-hover:opacity-40"></div>
                            <img src="${imgUrl}" alt="Imagen del proyecto ${repo.name}" class="absolute inset-0 w-full h-full object-cover transform transition duration-500 group-hover:scale-110">
                        </div>
                        <div class="p-6 relative z-20 flex flex-col flex-grow">
                            <h3 class="text-xl md:text-2xl font-display font-bold text-brand-blue mb-3 capitalize line-clamp-1">${repo.name.replace(/-/g, ' ')}</h3>
                            <p class="text-gray-300 mb-4 line-clamp-3 text-sm md:text-base font-tech flex-grow">
                                ${repo.description || 'Sin descripción disponible.'}
                            </p>
                            <div class="mb-5 flex flex-wrap gap-2 shrink-0">
                                <span class="inline-block bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-sm px-3 py-1 text-xs md:text-sm font-tech">${repo.language || 'Code'}</span>
                                <span class="inline-block bg-white/5 text-gray-300 border border-white/10 rounded-sm px-3 py-1 text-xs md:text-sm font-tech">★ ${repo.stargazers_count}</span>
                            </div>
                            <div class="flex space-x-3 shrink-0 mt-auto font-tech">
                                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="text-[#0a1d28] bg-brand-blue hover:bg-sky-300 transition duration-300 px-4 py-1.5 rounded-sm font-bold border border-brand-blue">Ver Demo</a>` : ''}
                                <a href="${repo.html_url}" target="_blank" class="text-brand-blue font-bold hover:text-white transition duration-300 bg-transparent px-4 py-1.5 rounded-sm border border-brand-blue/30 hover:bg-brand-blue/10">GitHub</a>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });

            // Inicializar SwiperJS después de que los proyectos se han renderizado
            new Swiper(".proyectos-swiper", {
                slidesPerView: 1,
                spaceBetween: 30,
                grabCursor: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    dynamicBullets: true,
                },
                breakpoints: {
                    // Mobile landscape y tablets
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // Desktop
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });

        } catch (error) {
            console.error(error);
            container.innerHTML = '<p class="text-red-400 col-span-full text-center">No se pudieron cargar los proyectos. Intenta más tarde.</p>';
        }
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
        alert('¡Modo SysDev Activado! 🐇💻');
        document.body.classList.toggle('sysdev-mode');
    }

});