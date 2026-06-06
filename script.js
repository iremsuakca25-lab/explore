/* =========================================
   EXPLORE — JavaScript Engine
   Animations, Interactions & Kinetic Typography
   ========================================= */

window.addEventListener('error', function (e) {
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'position:fixed;bottom:20px;left:20px;background:rgba(200,50,50,0.95);color:white;padding:15px;z-index:999999;border-radius:8px;font-family:monospace;max-width:80%;box-shadow:0 5px 20px rgba(0,0,0,0.3);font-size:12px;';
    errorMsg.innerHTML = '<strong>JS Hatası:</strong> ' + e.message + '<br><small>' + e.filename.split('/').pop() + ' Satır: ' + e.lineno + '</small>';
    document.body.appendChild(errorMsg);
});

// =========================================
// PRELOADER
// =========================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const letters = document.querySelectorAll('.preloader-letter');
    const barFill = document.querySelector('.preloader-bar-fill');

    const tl = gsap.timeline({
        onComplete: () => {
            preloader.classList.add('loaded');
            document.body.style.overflow = '';
            initMainAnimations();
        }
    });

    // Animate letters staggered
    tl.to(letters, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out'
    });

    // Animate loading bar
    tl.to(barFill, {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut'
    }, '-=0.3');

    // Fade out letters
    tl.to(letters, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.in'
    }, '-=0.3');

    // Wait a bit before hiding
    tl.to({}, { duration: 0.2 });
}

// =========================================
// SMOOTH SCROLL (LENIS)
// =========================================
let lenis;

function initSmoothScroll() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
    });

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// =========================================
// CUSTOM CURSOR
// =========================================
function initCustomCursor() {
    // Custom cursor disabled to use default browser cursor
}

// =========================================
// NAVIGATION
// =========================================
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll detection for nav background
    ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
            if (self.scroll() > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');

        if (mobileMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
            // Stagger animate mobile links
            gsap.fromTo(mobileLinks,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
            );
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close on mobile link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Top Right Nav Keşfet Button
    const navCtaBtn = document.getElementById('nav-cta-btn');
    if (navCtaBtn) {
        navCtaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: '#cta', offsetY: 80 },
                ease: 'power3.inOut',
                onComplete: () => {
                    const searchInput = document.getElementById('cta-search-input');
                    if (searchInput) searchInput.focus();
                }
            });
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#' || !href) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -80 });
            }
        });
    });
}

// =========================================
// HERO — Simple
// =========================================
function initHero() {
    const heroSection = document.querySelector('.section-hero');
    const heroBottom = document.querySelector('.hero-bottom');
    const sloganLines = document.querySelectorAll('.hero-slogan-line');

    // Animate slogan lines in from the left on load
    gsap.fromTo(sloganLines,
        { x: -80, opacity: 0, filter: 'blur(6px)' },
        {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.18,
            delay: 0.4
        }
    );

    // Animate the vertical border line
    gsap.fromTo('.hero-slogan',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

}

// =========================================
// SECTION HEADERS — Reveal Animation
// =========================================
function initSectionHeaders() {
    const labels = document.querySelectorAll('.section-label');
    const titleLines = document.querySelectorAll('.title-line');

    labels.forEach(label => {
        gsap.to(label, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: label,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    titleLines.forEach(line => {
        gsap.to(line, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// =========================================
// ROUTES — Horizontal Scroll Cards
// =========================================
function initRoutes() {
    const cards = document.querySelectorAll('.route-card');

    // Stagger reveal cards
    gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.routes-scroll-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Touch/drag horizontal scroll for routes
    const container = document.querySelector('.routes-scroll-container');
    let isDown = false;
    let startX, scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = '';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = '';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });
}

// =========================================
// CITIES — Grid Reveal
// =========================================
function initCities() {
    const cityCards = document.querySelectorAll('.city-card');

    cityCards.forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 80, scale: 0.9 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.1
            }
        );
    });

    // Parallax effect on city card images
    cityCards.forEach(card => {
        const img = card.querySelector('img');
        gsap.to(img, {
            y: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

// =========================================
// EXPERIENCES — Accordion with Kinetic Text
// =========================================
function initExperiences() {
    const items = document.querySelectorAll('.experience-item');

    // Stagger reveal
    items.forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, x: -30 },
            {
                opacity: 1, x: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Accordion toggle
    items.forEach(item => {
        const word = item.querySelector('.experience-word');

        word.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others
            items.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });

            // Toggle current
            item.classList.toggle('active');

            // Kinetic animation on word
            if (!isActive) {
                const color = item.getAttribute('data-color');
                gsap.to(word, {
                    color: color,
                    letterSpacing: '0.15em',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(word, {
                    color: '#F5F4EE',
                    letterSpacing: '0.1em',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// =========================================
// STORIES — Timeline Scroll
// =========================================
function initStories() {
    const chapters = document.querySelectorAll('.story-chapter');
    const storyTitle = document.querySelector('.story-main-title');

    // Title reveal
    gsap.fromTo(storyTitle,
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: storyTitle,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Activate chapters on scroll
    chapters.forEach((chapter, i) => {
        ScrollTrigger.create({
            trigger: chapter,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
                chapters.forEach(c => c.classList.remove('active'));
                chapter.classList.add('active');

                // Animate content
                const content = chapter.querySelector('.story-chapter-content');
                gsap.fromTo(content,
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
                );
            },
            onEnterBack: () => {
                chapters.forEach(c => c.classList.remove('active'));
                chapter.classList.add('active');
            }
        });
    });

    // Story image parallax
    const storyImg = document.querySelector('#story-main-img');
    if (storyImg) {
        gsap.to(storyImg, {
            y: -12,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
                trigger: '.section-stories',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

// =========================================
// GUIDES — Card Reveal
// =========================================
function initGuides() {
    const guideCards = document.querySelectorAll('.guide-card');

    guideCards.forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60, rotateY: 8 },
            {
                opacity: 1, y: 0, rotateY: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.12
            }
        );
    });
}

// =========================================
// STATISTICS — Count-Up Animation
// =========================================
function initStats() {
    const statItems = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Reveal stat items
    gsap.to(statItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Count-up animation
    statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));

        ScrollTrigger.create({
            trigger: num,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                const counter = { val: 0 };
                gsap.to(counter, {
                    val: target,
                    duration: 2.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        if (target >= 1000) {
                            num.textContent = Math.floor(counter.val).toLocaleString('tr-TR');
                        } else {
                            num.textContent = Math.floor(counter.val);
                        }
                    }
                });
            }
        });
    });
}

// =========================================
// QUOTE — Word-by-Word Reveal
// =========================================
function initQuote() {
    const words = document.querySelectorAll('.quote-word');

    gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-quote',
            start: 'top 50%',
            toggleActions: 'play none none reverse'
        }
    });

    // Parallax on quote background
    const quoteBg = document.querySelector('.quote-bg img');
    if (quoteBg) {
        gsap.to(quoteBg, {
            y: -20,
            scale: 1.03,
            ease: 'none',
            scrollTrigger: {
                trigger: '.section-quote',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

// =========================================
// CTA — Final Section Animation
// =========================================
function initCTA() {
    const ctaLines = document.querySelectorAll('.cta-title-line');
    const ctaSearch = document.querySelector('.cta-search');
    const ctaButton = document.querySelector('.cta-button');

    const ctaTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-cta',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        }
    });

    ctaTl.to(ctaLines, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    ctaTl.to(ctaSearch, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3');

    ctaTl.to(ctaButton, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3');

    // CTA Particles
    initCTAParticles();
}

// =========================================
// SEARCH ENGINE
// =========================================
function initSearchEngine() {
    const input = document.getElementById('cta-search-input');
    const btn = document.getElementById('cta-explore-btn');
    const resultsContainer = document.getElementById('cta-search-results');
    if (!input || !btn || !resultsContainer) return;

    const cityData = {
        'istanbul': { title: 'İstanbul', image: 'images/istanbul_panorama.jpg', desc: 'İki kıtayı birleştiren, tarih ve kültürle dolu büyüleyici metropol.' },
        'kapadokya': { title: 'Kapadokya', image: 'images/cappadocia.jpg', desc: 'Peri bacaları ve sıcak hava balonlarıyla masalsı bir doğa harikası.' },
        'izmir': { title: 'İzmir', image: 'images/aegean_coast.jpg', desc: 'Ege\'nin incisi; tarihi dokusu ve harika sahilleriyle huzur dolu bir şehir.' },
        'rize': { title: 'Rize', image: 'images/blacksea_highlands.jpg', desc: 'Yemyeşil yaylaları ve hırçın doğasıyla Karadeniz\'in gözbebeği.' },
        'fethiye': { title: 'Fethiye', image: 'images/parasut.jpg', desc: 'Turkuaz koyları ve yamaç paraşütüyle macera tutkunlarının adresi.' },
        'kars': { title: 'Kars', image: 'images/kars.jpg', desc: 'Baltık mimarisi ve kış masalı atmosferiyle Doğu\'nun mistik şehri.' },
        'paris': { title: 'Paris', image: 'images/paris_cityscape.jpg', desc: 'Sanatın, romantizmin ve modanın dünya başkenti.' },
        'kyoto': { title: 'Kyoto', image: 'images/kyoto_temple.jpg', desc: 'Geleneksel tapınakları ve Zen bahçeleriyle Japon kültürünün kalbi.' },
        'roma': { title: 'Roma', image: 'images/rome.jpg', desc: 'Antik kalıntıları ve eşsiz mutfağıyla bir açık hava müzesi.' },
        'reykjavik': { title: 'Reykjavik', image: 'images/reykjavik_nature.jpg', desc: 'Kuzey ışıkları ve volkanik doğasıyla İzlanda\'nın başkenti.' },
        'santorini': { title: 'Santorini', image: 'images/santorini_view.jpg', desc: 'Beyaz evleri ve mavi kubbeleriyle Ege\'nin en romantik adası.' },
        'marrakech': { title: 'Marrakech', image: 'images/marrakech_market.jpg', desc: 'Baharat kokulu çarşıları ve otantik kültürüyle Fas\'ın incisi.' }
    };

    function handleSearch() {
        // Fallback or generic button click if input is empty
        gsap.to(window, { duration: 1.2, scrollTo: { y: '#routes', offsetY: 80 }, ease: 'power3.inOut' });
    }

    input.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');

        if (query.length < 2) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
            return;
        }

        let html = '';
        let hasResults = false;

        // Search Routes
        for (const [key, data] of Object.entries(routeData)) {
            const searchStr = (data.title + ' ' + data.intro).toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
            if (searchStr.includes(query)) {
                hasResults = true;
                html += `
                    <div class="search-result-item" data-type="route" data-id="${key}">
                        <img src="${data.image}" alt="${data.title}" class="search-result-img">
                        <div class="search-result-info">
                            <h4 class="search-result-title">${data.title}</h4>
                            <p class="search-result-desc">${data.intro}</p>
                        </div>
                        <span class="search-result-badge badge-route">Rota</span>
                    </div>
                `;
            }
        }

        // Search Cities
        for (const [key, data] of Object.entries(cityData)) {
            const searchStr = (data.title + ' ' + data.desc).toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
            if (searchStr.includes(query)) {
                hasResults = true;
                html += `
                    <div class="search-result-item" data-type="city" data-id="${data.title}">
                        <img src="${data.image}" alt="${data.title}" class="search-result-img">
                        <div class="search-result-info">
                            <h4 class="search-result-title">${data.title}</h4>
                            <p class="search-result-desc">${data.desc}</p>
                        </div>
                        <span class="search-result-badge badge-city">Şehir</span>
                    </div>
                `;
            }
        }

        if (hasResults) {
            resultsContainer.innerHTML = html;
            resultsContainer.classList.add('active');

            // Add click listeners to items
            const items = resultsContainer.querySelectorAll('.search-result-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    const type = item.getAttribute('data-type');
                    const id = item.getAttribute('data-id');

                    if (type === 'route') {
                        const card = document.querySelector(`.route-card[data-route="${id}"]`);
                        if (card) {
                            // Check if it's international or domestic to switch tab if necessary
                            const parentTrack = card.closest('.routes-track');
                            if (parentTrack && parentTrack.id) {
                                const tabBtn = document.querySelector(`.tab-btn[data-target="${parentTrack.id}"]`);
                                if (tabBtn && !tabBtn.classList.contains('active')) tabBtn.click();
                            }
                            gsap.to(window, { duration: 1, scrollTo: { y: '#routes', offsetY: 80 }, onComplete: () => { setTimeout(() => card.click(), 100); } });
                        }
                    } else if (type === 'city') {
                        const card = document.querySelector(`.city-card[data-city="${id}"]`);
                        if (card) {
                            const parentGrid = card.closest('.cities-grid');
                            if (parentGrid && parentGrid.id) {
                                const tabBtn = document.querySelector(`.tab-btn[data-target="${parentGrid.id}"]`);
                                if (tabBtn && !tabBtn.classList.contains('active')) tabBtn.click();
                            }
                            gsap.to(window, { duration: 1, scrollTo: { y: '#cities', offsetY: 80 } });
                        }
                    }

                    resultsContainer.classList.remove('active');
                    input.value = '';
                });
            });

        } else {
            resultsContainer.innerHTML = '<div class="search-result-item" style="cursor:default;"><div class="search-result-info"><p class="search-result-desc" style="text-align:center;">Sonuç bulunamadı...</p></div></div>';
            resultsContainer.classList.add('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cta-search')) {
            resultsContainer.classList.remove('active');
        }
    });

    btn.addEventListener('click', handleSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// =========================================
// CTA PARTICLES
// =========================================
function initCTAParticles() {
    const container = document.getElementById('cta-particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${Math.random() > 0.5 ? 'rgba(168, 192, 143, 0.3)' : 'rgba(214, 138, 83, 0.3)'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        container.appendChild(particle);

        // Animate each particle
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: Math.random() * 0.6 + 0.1,
            duration: Math.random() * 6 + 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 3
        });
    }
}

// =========================================
// MOUSE PARALLAX (Hero)
// =========================================
function initMouseParallax() {
    if (window.innerWidth < 768) return;
    
    let ticking = false;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                gsap.to('.hero-bg-image', {
                    x: targetX * -4,
                    y: targetY * -3,
                    duration: 1.5,
                    ease: 'power2.out'
                });
                
                gsap.to('.kinetic-word', {
                    x: targetX * 3,
                    y: targetY * 2,
                    duration: 1,
                    ease: 'power2.out'
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// =========================================
// ROUTE DETAIL MODAL — Data & Logic
// =========================================
const routeData = {
    kapadokya: {
        title: 'Kapadokya Macerası',
        image: 'images/cappadocia.jpg',
        season: 'Nisan — Ekim',
        duration: '5 Gün',
        difficulty: 'Orta',
        intro: 'Kapadokya, peri bacaları, yeraltı şehirleri ve sıcak hava balonlarıyla dünyada eşi benzeri olmayan bir destinasyon. Bu rotada Göreme\'nin büyülü vadilerinden Derinkuyu\'nun gizemli dehlizlerine kadar unutulmaz bir yolculuk sizi bekliyor.',
        morning: [
            {
                title: 'Sıcak Hava Balonu ile Gün Doğumu',
                desc: 'Kapadokya\'nın simgesi olan balon turlarıyla peri bacalarının üzerinde süzülün. Güneşin ilk ışıklarıyla boyanan vadiler, yukarıdan muhteşem bir tablo sunar.',
                tags: ['Balon Turu', 'Fotoğraf', 'Gün Doğumu']
            },
            {
                title: 'Göreme Açık Hava Müzesi',
                desc: 'UNESCO Dünya Mirası listesindeki kaya kiliseleri ve freskleri keşfedin. Bizans dönemine ait eşsiz sanat eserleri sizi tarihe götürecek.',
                tags: ['Tarih', 'UNESCO', 'Kültür']
            }
        ],
        noon: [
            {
                title: 'Yeraltı Şehirleri Keşfi',
                desc: 'Derinkuyu veya Kaymaklı yeraltı şehirlerinde 8 kat derinliğe inin. Binlerce yıl önce insanların nasıl yaşadığını keşfedin.',
                tags: ['Macera', 'Tarih', 'Keşif']
            },
            {
                title: 'Yerel Mutfak Deneyimi',
                desc: 'Testi kebabı, mantı ve Kapadokya şaraplarının tadına bakın. Taş fırında pişen yerel lezzetler damak tadınıza hitap edecek.',
                tags: ['Gastronomi', 'Şarap', 'Yöresel']
            }
        ],
        evening: [
            {
                title: 'Kızılçukur Vadisi\'nde Gün Batımı',
                desc: 'Kapadokya\'nın en güzel gün batımı noktasında doğanın büyüleyici renklerine tanık olun. Şarap eşliğinde unutulmaz bir akşam.',
                tags: ['Doğa', 'Fotoğraf', 'Romantik']
            },
            {
                title: 'Taş Konaklarda Akşam Yemeği',
                desc: 'Tarihi taş konaklarda mum ışığında özel bir akşam yemeğinin keyfini çıkarın. Canlı müzik eşliğinde Kapadokya gecelerinin büyüsüne kapılın.',
                tags: ['Fine Dining', 'Atmosfer', 'Müzik']
            }
        ],
        tips: [
            'Balon turu için sabah erken kalkmayı göze alın — gün doğumu manzarası buna değer.',
            'Rahat yürüyüş ayakkabısı mutlaka yanınızda olsun, vadilerde çok yürüyeceksiniz.',
            'Sonbahar aylarında gitmek hem daha uygun fiyat hem daha az kalabalık demek.',
            'Yerel çömlekçilerden seramik atölyesine katılmayı deneyin.'
        ]
    },
    ege: {
        title: 'Ege Kıyıları',
        image: 'images/aegean_coast.jpg',
        season: 'Mayıs — Ekim',
        duration: '7 Gün',
        difficulty: 'Kolay',
        intro: 'Ege\'nin turkuaz koylarından antik kentlerine, zeytinliklerle kaplı tepelerinden rüzgârlı sahil kasabalarına uzanan bir rota. Efes\'in görkeminden Alaçatı\'nın taş sokaklarına, Bozcaada\'nın bağ yollarından gizli koylara kadar Türkiye\'nin en keyifli sahil deneyimi sizi bekliyor.',
        morning: [
            {
                title: 'Efes Antik Kenti Keşfi',
                desc: 'Dünyanın en iyi korunmuş antik kentlerinden birinde sabahın serinliğinde yürüyün. Celsus Kütüphanesi\'nin görkemli cephesi, Büyük Tiyatro ve mermer döşeli sokaklarla tarihe yolculuk yapın.',
                tags: ['UNESCO', 'Tarih', 'Antik Kent']
            },
            {
                title: 'Alaçatı\'da Rüzgârlı Kahvaltı',
                desc: 'Taş evlerin arasındaki butik kafelerde serpme kahvaltı keyfi yapın. Taze otlar, zeytinyağlı lezzetler ve sıcak pide eşliğinde Ege sabahının tadını çıkarın.',
                tags: ['Kahvaltı', 'Gastronomi', 'Butik']
            }
        ],
        noon: [
            {
                title: 'Gizli Koyları Keşfet',
                desc: 'Tekne ile el değmemiş turkuaz koylara ulaşın. Tertemiz sularda yüzün, deniz kaplumbağalarını gözlemleyin ve güverte üzerinde taze balık ziyafeti yapın.',
                tags: ['Tekne Turu', 'Deniz', 'Doğa']
            },
            {
                title: 'Zeytinyağı Tadım Turu',
                desc: 'Ege\'nin asırlık zeytin ağaçlarının arasında butik üreticileri ziyaret edin, soğuk sıkım zeytinyağı tadımı yapın ve üretim sürecini öğrenin.',
                tags: ['Gastronomi', 'Yerel', 'Workshop']
            }
        ],
        evening: [
            {
                title: 'Bozcaada Bağ Yolu Şarap Tadımı',
                desc: 'Çamlıca ve Corvus gibi butik bağ evlerinde yerel şarapları deneyin. Üzüm bağlarının arasında gün batımının altın ışığını yakalayın.',
                tags: ['Şarap', 'Bağ', 'Gün Batımı']
            },
            {
                title: 'Sahilde Deniz Ürünleri Ziyafeti',
                desc: 'Dalga sesini dinleyerek, taptaze kalamar, ahtapot ve levrek eşliğinde rakı-balık geleneğini yaşayın. Ayın denize yansıdığı büyülü bir akşam.',
                tags: ['Deniz Ürünleri', 'Romantik', 'Sahil']
            }
        ],
        tips: [
            'Efes\'i sabah erken saatlerde ziyaret edin — hem serin olur hem kalabalıktan kaçarsınız.',
            'Alaçatı\'da sörf yapmak istiyorsanız Temmuz-Ağustos rüzgâr sezonu idealdir.',
            'Tekne turlarında güneş kremi, şapka ve suya dayanıklı çanta şart.',
            'Bozcaada feribot biletlerini özellikle bayram dönemlerinde önceden alın.',
            'Ege otlarından yapılan yerel çayları ve kekik balını mutlaka deneyin.'
        ]
    },
    karadeniz: {
        title: 'Karadeniz Yaylaları',
        image: 'images/blacksea_highlands.jpg',
        season: 'Haziran — Ağustos',
        duration: '6 Gün',
        difficulty: 'Zor',
        intro: 'Sisli yaylalar, yemyeşil vadiler, buz gibi dere suları ve ahşap yayla evleri... Karadeniz, Türkiye\'nin en gizemli ve büyüleyici bölgesi. Fırtına Vadisi\'nin vahşi doğasından Pokut\'un bulutlar üstündeki yaylalarına, Sümela Manastırı\'nın kayalık yamaçlarından Uzungöl\'ün ayna gibi sularına kadar her adımda doğanın bir mucizesiyle karşılaşacaksınız.',
        morning: [
            {
                title: 'Pokut Yaylası\'nda Yayla Kahvaltısı',
                desc: 'Bulutların üzerinde, 2.000 metre yükseklikte kurulan sofrada taze tereyağı, bal kaymak, muhlama ve kuymak ile Karadeniz\'in efsanevi kahvaltısını yapın.',
                tags: ['Yayla', 'Kahvaltı', 'Doğa']
            },
            {
                title: 'Fırtına Vadisi Trekking',
                desc: 'Yeşilin her tonunu barındıran vadide, şelaleler ve taş kemerli köprüler eşliğinde yürüyüş yapın. Kaçkar Dağları\'na doğru yükselen patikalar nefes kesici manzaralar sunar.',
                tags: ['Trekking', 'Vadi', 'Şelale']
            }
        ],
        noon: [
            {
                title: 'Sümela Manastırı Keşfi',
                desc: 'Altındere Vadisi\'ndeki dik kayalıklara yapışmış gibi duran 1.600 yıllık manastırı ziyaret edin. Freskleri ve manzarası ile dünyada benzersiz bir yapı.',
                tags: ['Tarih', 'Mimari', 'UNESCO']
            },
            {
                title: 'Uzungöl Pikniği',
                desc: 'Çam ormanlarıyla çevrili, ayna gibi yüzeye sahip gölün kıyısında piknik yapın. Sisler arasında beliren manzara masal kitaplarından fırlamış gibi.',
                tags: ['Göl', 'Piknik', 'Huzur']
            }
        ],
        evening: [
            {
                title: 'Ayder Kaplıcaları',
                desc: 'Gün boyu yürüyüşün yorgunluğunu Ayder\'in şifalı termal sularında atın. Kaçkar eteklerinde, yeşillikler içinde doğal sıcak su havuzları sizi dinlendirecek.',
                tags: ['Kaplıca', 'Dinlenme', 'Wellness']
            },
            {
                title: 'Horon Gecesi & Karadeniz Lezzetleri',
                desc: 'Akşam yemeğinde kuymak, hamsi tava ve Karadeniz pidesi tadın. Kemençe sesleri eşliğinde coşkulu Horon dansını izleyin — belki siz de katılırsınız!',
                tags: ['Kültür', 'Gastronomi', 'Müzik']
            }
        ],
        tips: [
            'Karadeniz\'de hava her an değişebilir — yağmurluk ve katmanlı kıyafet şart.',
            'Yaylalara ulaşım için 4x4 araç veya minibüs tercih edin, yollar dardır.',
            'Sümela Manastırı ziyareti için online bilet alınması gerekiyor.',
            'Fırtına Vadisi\'nde rafting yapmak istiyorsanız önceden tur operatörlerinden bilgi alın.',
            'Yayla balını ve kurutulmuş dut pestilini hediye olarak almayı unutmayın.'
        ]
    },
    kyoto_route: {
        title: 'Kyoto Zen Rotası',
        image: 'images/kyoto_temple.jpg',
        season: 'Mart — Kasım',
        duration: '6 Gün',
        difficulty: 'Kolay',
        intro: 'Japonya\'nın eski başkenti Kyoto\'da tarihi tapınaklar, huzur verici Zen bahçeleri ve geleneksel çay seremonileriyle dolu, ruhunuzu dinlendirecek eşsiz bir keşif rotası.',
        morning: [
            {
                title: 'Fushimi Inari Tapınağı',
                desc: 'Binlerce turuncu Torii kapısı altından geçerek ormanlık dağ yolunda mistik bir yürüyüş yapın. Erken saatler, kalabalıktan uzak fotoğraf çekmek için idealdir.',
                tags: ['Yürüyüş', 'Fotoğraf', 'Kültür']
            },
            {
                title: 'Arashiyama Bambu Ormanı',
                desc: 'Gökyüzüne uzanan bambu ağaçları arasında rüzgarın huzur veren sesini dinleyin ve doğanın içinde kaybolun.',
                tags: ['Doğa', 'Huzur', 'Zen']
            }
        ],
        noon: [
            {
                title: 'Geleneksel Çay Seremonisi',
                desc: 'Uji bölgesinden gelen kaliteli Matcha çayının özel bir ritüelle hazırlandığı seremonide Japon misafirperverliğini deneyimleyin.',
                tags: ['Deneyim', 'Geleneksel', 'Matcha']
            },
            {
                title: 'Nishiki Pazarı\'nda Öğle Yemeği',
                desc: '"Kyoto\'nun Mutfağı" olarak bilinen bu tarihi pazarda taze deniz ürünleri, yerel turşular ve sokak lezzetlerini tadın.',
                tags: ['Gastronomi', 'Sokak Lezzeti', 'Yerel']
            }
        ],
        evening: [
            {
                title: 'Gion Bölgesinde Yürüyüş',
                desc: 'Ahşap çay evleri ve dar sokaklarıyla ünlü Gion bölgesinde gezerken gerçek bir Geyşa (Geiko) veya Maiko görebilirsiniz.',
                tags: ['Tarih', 'Akşam Yürüyüşü', 'Gece Hayatı']
            },
            {
                title: 'Kamo Nehri Kıyısında Akşam Yemeği',
                desc: 'Yaz aylarında nehir üzerine kurulan ahşap teraslarda (Kawadoko) serin bir akşam yemeği keyfi yapın.',
                tags: ['Restoran', 'Manzara', 'Romantik']
            }
        ],
        tips: [
            'Tapınakları ziyaret ederken kolay çıkarılabilen ayakkabılar giymeyi unutmayın.',
            'Bambu ormanına çok erken saatlerde gidin, aksi takdirde çok kalabalık olur.',
            'Matcha çayının yanında sunulan geleneksel wagashi tatlılarını mutlaka deneyin.',
            'Gion bölgesinde gezerken Geyşaların fotoğraflarını izinsiz çekmekten kaçının.'
        ]
    },
    paris_route: {
        title: 'Paris Sanat Rotası',
        image: 'images/paris_cityscape.jpg',
        season: 'Tüm Yıl',
        duration: '4 Gün',
        difficulty: 'Orta',
        intro: 'Dünyanın en ikonik şehrinde, tarihi anıtlardan bohem mahallelere, dünyaca ünlü müzelerden zarif kafelere uzanan sanat ve romantizm dolu bir yolculuk.',
        morning: [
            {
                title: 'Louvre Müzesi Keşfi',
                desc: 'Güne dünyanın en büyük sanat müzesinde başlayın. Mona Lisa ve Milo Venüsü gibi eşsiz başyapıtları yakından inceleyin.',
                tags: ['Sanat', 'Müze', 'Tarih']
            },
            {
                title: 'Paris Kafelerinde Kahvaltı',
                desc: 'Müzeye yakın tarihi bir kafede, fırından yeni çıkmış çıtır kruvasanlar ve sıcak kahve ile tipik bir Paris sabahı yaşayın.',
                tags: ['Kahvaltı', 'Kruvasan', 'Yerel']
            }
        ],
        noon: [
            {
                title: 'Montmartre Tepesi & Sacré-Cœur',
                desc: 'Picasso ve Van Gogh gibi sanatçıların yaşadığı bohem Montmartre sokaklarında gezin ve tepeden Paris manzarasını izleyin.',
                tags: ['Manzara', 'Yürüyüş', 'Sanat']
            },
            {
                title: 'Ressamlar Meydanı (Place du Tertre)',
                desc: 'Sokak ressamlarına portrenizi çizdirin ve etraftaki renkli bistrolarda Fransız soğan çorbası veya escargot tadın.',
                tags: ['Deneyim', 'Gastronomi', 'Sanatçı']
            }
        ],
        evening: [
            {
                title: 'Seine Nehri Tekne Turu',
                desc: 'Gün batımında Bateaux Mouches tekneleriyle nehirde süzülün. Notre Dame ve diğer tarihi binaları nehir üzerinden görün.',
                tags: ['Romantik', 'Tekne Turu', 'Manzara']
            },
            {
                title: 'Eyfel Kulesi Işık Gösterisi',
                desc: 'Hava karardıktan sonra saat başı 5 dakika boyunca parıldayan Eyfel Kulesi\'ni Champ de Mars parkından şarap eşliğinde izleyin.',
                tags: ['Gece', 'Simge', 'Büyülü']
            }
        ],
        tips: [
            'Müzelere giriş için önceden online bilet alarak uzun kuyruklardan kurtulun.',
            'Metro ağını kullanmak Paris\'i gezmenin en kolay yoludur, günlük bilet tercih edin.',
            'Restoranlarda akşam yemeği genellikle geç saatlerde başlar, rezervasyon yaptırmayı unutmayın.',
            'Seine nehri kıyısında yürüyüş yapmak için rahat bir ayakkabı şart.'
        ]
    },
    istanbul: {
        title: 'İstanbul Tarih Rotası',
        image: 'images/istanbul_panorama.jpg',
        season: 'Tüm Yıl',
        duration: '4 Gün',
        difficulty: 'Kolay',
        intro: 'İki kıtayı birleştiren efsanevi şehir, her köşesinde tarih, kültür ve lezzet barındırıyor. Bizans\'tan Osmanlı\'ya, modern sanattan sokak kültürüne uzanan dolu dolu bir İstanbul deneyimi.',
        morning: [
            {
                title: 'Sultanahmet & Ayasofya',
                desc: 'Sabahın ilk ışıklarıyla Ayasofya\'nın görkemli kubbesinin altına geçin. Binlerce yıllık tarihin ağırlığını hissedin. Ardından Sultanahmet Camii\'nin zarif çinilerini keşfedin.',
                tags: ['Tarih', 'Mimari', 'UNESCO']
            },
            {
                title: 'Simit, Çay & Boğaz Manzarası',
                desc: 'Sahil boyunca yürüyüş yapın ve bir fırından taze simit alıp çayla birlikte Boğaz\'ı seyre dalın. İstanbul\'un en otantik sabah ritüeli.',
                tags: ['Kahvaltı', 'Manzara', 'Yerel']
            }
        ],
        noon: [
            {
                title: 'Kapalıçarşı & Mısır Çarşısı',
                desc: 'Dünyanın en eski kapalı çarşılarından birinde kaybolun. 4.000\'den fazla dükkânda baharatlar, halılar, takılar ve el işi ürünleri keşfedin.',
                tags: ['Alışveriş', 'Tarih', 'Baharat']
            },
            {
                title: 'Sokak Lezzetleri Turu',
                desc: 'Balık ekmekten midye dolmaya, kumpirden ıslak hamburgere — İstanbul\'un efsanevi sokak yemeklerini tadın. Her lokma bir keşif.',
                tags: ['Street Food', 'Gastronomi', 'Keşif']
            }
        ],
        evening: [
            {
                title: 'Boğaz\'da Gün Batımı Turu',
                desc: 'Özel bir tekneyle Boğaz\'ın iki yakasını seyredin. Yalılar, köprüler ve tarihi yapılar gün batımının altın ışığıyla büyüleyici bir manzara sunar.',
                tags: ['Tekne Turu', 'Gün Batımı', 'Boğaz']
            },
            {
                title: 'Meyhane & Canlı Müzik',
                desc: 'Beyoğlu\'nun tarihi meyhanelerinde rakı-balık geleneğini yaşayın. Canlı fasıl müziği eşliğinde İstanbul gecelerinin sihrine kapılın.',
                tags: ['Gece Hayatı', 'Müzik', 'Meyhane']
            }
        ],
        tips: [
            'Müze Kart alarak birçok müzeye indirimli ve sırasız giriş yapabilirsiniz.',
            'İstanbul\'da toplu taşıma için İstanbulkart alın — hem ekonomik hem pratik.',
            'Kapalıçarşı\'da pazarlık yapmayı unutmayın, kültürün bir parçası!',
            'Kadıköy yakasını keşfetmeyi atlamamayın — en iyi kafeler ve sanat galerileri burada.'
        ]
    },
    kars: {
        title: 'Doğu Ekspresi',
        image: 'images/kars.jpg',
        season: 'Aralık — Mart',
        duration: '3 Gün',
        difficulty: 'Kolay',
        intro: 'Türkiye\'nin en meşhur tren rotasıyla karlar altında masalsı bir yolculuğa çıkın. Anadolu\'nun uçsuz bucaksız beyaz manzaralarından geçerek tarihi Kars şehrine uzanan nostaljik bir deneyim.',
        morning: [
            {
                title: 'Trende Uyanış',
                desc: 'Bembeyaz dağların arasından süzülürken kompartımanınızın penceresinden manzarayı izleyerek kahvenizi yudumlayın.',
                tags: ['Tren', 'Manzara', 'Nostalji']
            },
            {
                title: 'Ani Harabeleri Keşfi',
                desc: 'Kars\'a varışın ardından Ermenistan sınırındaki UNESCO Dünya Mirası Ani Harabeleri\'ni karlar altında gezin.',
                tags: ['Tarih', 'UNESCO', 'Kültür']
            }
        ],
        noon: [
            {
                title: 'Çıldır Gölü\'nde Kızak',
                desc: 'Yüzeyi tamamen buz tutan Çıldır Gölü üzerinde atlı kızaklarla gezintiye çıkın ve buza delik açılarak tutulan sarı balığın tadına bakın.',
                tags: ['Kış', 'Göl', 'Deneyim']
            },
            {
                title: 'Kars Kaz Evi',
                desc: 'Geleneksel Kars kazı yemeği ve yöresel peynir tadımı ile zengin Doğu Anadolu mutfağını keşfedin.',
                tags: ['Gastronomi', 'Yöresel', 'Öğle Yemeği']
            }
        ],
        evening: [
            {
                title: 'Baltık Mimarisinde Yürüyüş',
                desc: 'Rus işgali döneminden kalan geniş caddelerde ve tarihi taş binalar arasında akşam yürüyüşü yapın.',
                tags: ['Mimari', 'Tarih', 'Şehir']
            },
            {
                title: 'Kafkas Gecesi',
                desc: 'Ateş etrafında geleneksel Kafkas halk oyunları gösterisini izleyerek gecenizi renklendirin.',
                tags: ['Kültür', 'Dans', 'Eğlence']
            }
        ],
        tips: [
            'Doğu Ekspresi biletleri çok hızlı tükenir, aylar öncesinden rezervasyon yapın.',
            'Termal içlik ve çok kalın kıyafetler getirmeyi unutmayın.',
            'Trende yanınıza kendi atıştırmalıklarınızı ve içeceklerinizi alabilirsiniz.'
        ]
    },
    rome_route: {
        title: 'Roma Antik Keşfi',
        image: 'images/rome.jpg',
        season: 'Nisan — Ekim',
        duration: '5 Gün',
        difficulty: 'Kolay',
        intro: 'Açık hava müzesi olan bu antik şehirde, gladyatörlerin arenası Kolezyum\'dan Vatikan\'ın ihtişamına ve sokak aralarındaki harika İtalyan lezzetlerine uzanan bir yolculuk.',
        morning: [
            {
                title: 'Kolezyum ve Forum',
                desc: 'Güne dünyanın en ikonik amfitiyatrosu Kolezyum\'da başlayın. Ardından Antik Roma\'nın kalbi olan Forum\'da gezinin.',
                tags: ['Antik Kent', 'Tarih', 'Mimari']
            },
            {
                title: 'Vatikan Müzeleri & Sistina Şapeli',
                desc: 'Erken saatlerde Vatikan\'ı ziyaret ederek Michelangelo\'nun eşsiz tavan freskini kalabalıklar olmadan görün.',
                tags: ['Sanat', 'Din', 'Müze']
            }
        ],
        noon: [
            {
                title: 'Trastevere Sokakları',
                desc: 'Sarmaşıklarla kaplı dar sokakları ve renkli İtalyan evleriyle ünlü bu mahallede kaybolun.',
                tags: ['Yürüyüş', 'Fotoğraf', 'Lokal']
            },
            {
                title: 'Gerçek İtalyan Pizzası',
                desc: 'Odun ateşinde pişen ince hamurlu Roma usulü pizzanızı şarap eşliğinde tadın.',
                tags: ['Gastronomi', 'Pizza', 'İtalyan']
            }
        ],
        evening: [
            {
                title: 'Trevi Çeşmesi\'nde Dilek',
                desc: 'Aydınlatmaların çeşmeyi daha da büyüleyici kıldığı akşam saatlerinde bozuk paranızı atıp dilek tutun.',
                tags: ['Romantik', 'Gece', 'Gelenek']
            },
            {
                title: 'İspanyol Merdivenleri',
                desc: 'Günü İspanyol Merdivenleri\'nde oturarak ve sokak sanatçılarını dinleyerek, elinizde gerçek İtalyan dondurmasıyla (Gelato) bitirin.',
                tags: ['Dinlenme', 'Gelato', 'Atmosfer']
            }
        ],
        tips: [
            'Müzelere giriş biletlerini kesinlikle online ve haftalar öncesinden alın.',
            'Çeşmelerden akan sular içilebilir, yanınızda boş bir şişe taşıyın.',
            'Roma\'da kahve barda (ayakta) içilir, masaya oturursanız fiyat artar.'
        ]
    },
    swiss_route: {
        title: 'İsviçre Alpleri',
        image: 'images/swiss.jpg',
        season: 'Haziran — Eylül',
        duration: '6 Gün',
        difficulty: 'Zor',
        intro: 'İsviçre Alpleri\'nin heybetli zirveleri, kristal berraklığındaki buzul gölleri ve yemyeşil vadileri eşliğinde kusursuz bir doğa tatili.',
        morning: [
            {
                title: 'Buzul Ekspresi',
                desc: 'Panoramik camlı trenlerle karla kaplı dağların ve derin vadilerin arasından unutulmaz bir yolculuk yapın.',
                tags: ['Tren', 'Manzara', 'Panoramik']
            },
            {
                title: 'Dağ Yürüyüşü (Trekking)',
                desc: 'Matterhorn dağı eteklerinde, yemyeşil çayırlar ve inek çanları eşliğinde temiz dağ havası alın.',
                tags: ['Doğa', 'Spor', 'Alpler']
            }
        ],
        noon: [
            {
                title: 'Buzul Gölleri',
                desc: 'Turkuaz renkli buzul göllerinin kenarında piknik yapın veya cesaretiniz varsa buz gibi suya girin.',
                tags: ['Göl', 'Piknik', 'Huzur']
            },
            {
                title: 'Geleneksel Peynir Fondu',
                desc: 'Öğle yemeğinde ahşap bir dağ evinde erimiş İsviçre peyniri ve patates ile fondu keyfi yapın.',
                tags: ['Gastronomi', 'Peynir', 'Yerel']
            }
        ],
        evening: [
            {
                title: 'Dağ Evinde Dinlenme',
                desc: 'Gün batımında Alplerin kızıla boyanmasını şömine ateşinin karşısında sıcak çikolatanızı yudumlayarak izleyin.',
                tags: ['Dinlenme', 'Manzara', 'Romantik']
            },
            {
                title: 'Zermatt Sokakları',
                desc: 'Araç trafiğine kapalı bu şirin Alp kasabasında, butikleri ve lüks çikolata dükkanlarını gezin.',
                tags: ['Alışveriş', 'Çikolata', 'Kasaba']
            }
        ],
        tips: [
            'İsviçre seyahat kartı (Swiss Travel Pass) almak ulaşım için çok büyük avantaj sağlar.',
            'Yaz aylarında bile yükseklerde hava soğuk olabilir, polar mont bulundurun.',
            'Musluk suyu doğrudan dağlardan gelir, dünyanın en temiz içme sularından biridir.'
        ]
    },
    egypt_route: {
        title: 'Mısır Piramitleri',
        image: 'images/egypt.jpg',
        season: 'Ekim — Nisan',
        duration: '5 Gün',
        difficulty: 'Orta',
        intro: 'İnsanlık tarihinin en büyük gizemlerinden birine, firavunların altın kumlar üzerinde yükselen anıtsal mezarlarına doğru egzotik bir yolculuk.',
        morning: [
            {
                title: 'Giza Piramitleri ve Sfenks',
                desc: 'Güneş henüz çok yakıcı olmadan dünyanın yedi harikasından biri olan Büyük Piramit\'i ve dev Sfenks\'i ziyaret edin.',
                tags: ['Tarih', 'Harika', 'Antik']
            },
            {
                title: 'Mısır Müzesi',
                desc: 'Tutankhamun\'un altın maskesi başta olmak üzere binlerce yıllık mumyalar ve firavun hazinelerini keşfedin.',
                tags: ['Müze', 'Hazine', 'Mumya']
            }
        ],
        noon: [
            {
                title: 'Nil Nehri Felucca Turu',
                desc: 'Geleneksel yelkenli teknelerle (Felucca) Nil nehri üzerinde hafif bir esinti eşliğinde gezinin.',
                tags: ['Tekne', 'Nil', 'Dinlenme']
            },
            {
                title: 'Yerel Mısır Mutfağı',
                desc: 'Öğle yemeğinde Koshari (nohutlu, mercimekli makarna) ve taze falafel gibi doyurucu yerel lezzetleri tadın.',
                tags: ['Gastronomi', 'Lokal', 'Lezzet']
            }
        ],
        evening: [
            {
                title: 'Piramitlerde Ses ve Işık Gösterisi',
                desc: 'Gece çöktüğünde piramitlerin üzerine yansıtılan ışıklar eşliğinde antik Mısır tarihini anlatan gösteriyi izleyin.',
                tags: ['Gece', 'Gösteri', 'Büyüleyici']
            },
            {
                title: 'Han El-Halili Çarşısı',
                desc: 'Baharat kokulu, labirent gibi sokaklara sahip bu tarihi çarşıda nargile içip naneli çay yudumlayın.',
                tags: ['Alışveriş', 'Çarşı', 'Otantik']
            }
        ],
        tips: [
            'Pazarlık yapmak kültürün ayrılmaz bir parçasıdır, söylenen fiyatın en az yarısını teklif edin.',
            'Yaz aylarından (Mayıs-Eylül) kaçının, çöl sıcağı gezmeyi çok zorlaştırır.',
            'Piramitlerin içine girmek klostrofobik olabilir, dar alan korkunuz varsa dışarıdan görmek de yeterlidir.'
        ]
    }
};

// =========================================
// ROUTE MODAL — Open / Close / Animate
// =========================================
function initRouteModal() {
    const modal = document.getElementById('route-modal');
    const modalOverlay = document.getElementById('route-modal-overlay');
    const closeBtn = document.getElementById('route-modal-close');
    const modalContainer = document.querySelector('.route-modal-container');
    const cards = document.querySelectorAll('.route-card[data-route]');

    // Open modal on card click
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open if user was dragging
            if (card.dataset.dragging === 'true') return;

            const routeKey = card.getAttribute('data-route');
            const data = routeData[routeKey];
            if (!data) return;

            populateModal(data, routeKey);
            openModal();
        });
    });

    // Prevent drag-scroll from triggering click
    const container = document.querySelector('.routes-scroll-container');
    let dragStartX = 0;
    container.addEventListener('mousedown', (e) => {
        dragStartX = e.pageX;
        cards.forEach(c => c.dataset.dragging = 'false');
    });
    container.addEventListener('mousemove', (e) => {
        if (Math.abs(e.pageX - dragStartX) > 10) {
            cards.forEach(c => c.dataset.dragging = 'true');
        }
    });

    // Close
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // Plan Route / Booking Button Click Handler
    const bookBtn = document.getElementById('route-modal-book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const href = bookBtn.href || 'https://www.booking.com';
            console.log("Plan Route button clicked. Navigating to:", href);
            window.open(href, '_blank', 'noopener,noreferrer');
        });
    }

    function openModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        modalContainer.scrollTop = 0;

        // Animate in
        const tl = gsap.timeline();
        tl.fromTo('.route-modal-hero-content',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 }
        );
        tl.fromTo('.route-modal-intro',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
            '-=0.3'
        );
        tl.fromTo('.route-modal-schedule-title',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.2'
        );
        tl.fromTo('.modal-time-block',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' },
            '-=0.2'
        );
        tl.fromTo('.modal-activity-card',
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
            '-=0.3'
        );
        tl.fromTo('.route-modal-tips',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.2'
        );
        tl.fromTo('.route-modal-cta',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
            '-=0.1'
        );
    }

    function closeModal() {
        gsap.to('.route-modal-container', {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('open');
                document.body.style.overflow = '';
                if (lenis) lenis.start();
                gsap.set('.route-modal-container', { opacity: 1 });
            }
        });
    }

    function populateModal(data, routeKey) {
        // Set search query for booking redirection href natively
        const bookBtn = document.getElementById('route-modal-book-btn');
        if (bookBtn) {
            const searchDestinations = {
                kapadokya: 'Nevşehir, Göreme, Kapadokya',
                ege: 'Bodrum, Muğla',
                karadeniz: 'Rize, Fırtına Vadisi',
                istanbul: 'İstanbul'
            };
            const dest = searchDestinations[routeKey] || data.title;
            bookBtn.href = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}`;
        }

        // Hero
        document.getElementById('route-modal-hero-img').src = data.image;
        document.getElementById('route-modal-hero-img').alt = data.title;
        document.getElementById('route-modal-season').textContent = data.season;
        document.getElementById('route-modal-title').textContent = data.title;

        // Meta
        const metaEl = document.getElementById('route-modal-meta');
        metaEl.innerHTML = `
            <div class="route-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>${data.duration}</span>
            </div>
            <div class="route-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                <span>${data.difficulty}</span>
            </div>
        `;

        // Intro
        document.getElementById('route-modal-intro-text').textContent = data.intro;

        // Activities
        renderActivities('modal-morning-activities', data.morning);
        renderActivities('modal-noon-activities', data.noon);
        renderActivities('modal-evening-activities', data.evening);

        // Tips
        const tipsList = document.getElementById('route-modal-tips-list');
        tipsList.innerHTML = data.tips.map(tip => `<li>${tip}</li>`).join('');
    }

    function renderActivities(containerId, activities) {
        const container = document.getElementById(containerId);
        container.innerHTML = activities.map(act => `
            <div class="modal-activity-card">
                <h5>${act.title}</h5>
                <p>${act.desc}</p>
                <div class="modal-activity-tags">
                    ${act.tags.map(tag => `<span class="modal-activity-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }
}

// =========================================
// CITY DETAIL MODAL — Data & Logic
// =========================================
const cityData = {
    istanbul: {
        title: 'İstanbul',
        country: 'Türkiye',
        image: 'images/istanbul_panorama.jpg',
        description: 'Tarih boyunca imparatorluklara başkentlik yapmış, kültürel zenginliği ve muhteşem Boğaz manzarasıyla büyüleyen dünya metropolü.',
        see: [
            { name: 'Tarihi Yarımada', desc: 'Ayasofya Camii, Sultanahmet Camii ve Topkapı Sarayı gibi eşsiz tarihi yapıları ziyaret edin.' },
            { name: 'Boğaz Hattı & Adalar', desc: 'Eminönü\'nden kalkan vapurlarla Boğaz turu yapın veya Büyükada\'da begonviller arasında yürüyün.' },
            { name: 'Galata Kulesi & Karaköy', desc: 'Tarihi Galata Kulesi\'ne çıkıp İstanbul panoramasına tanıklık edin ve Karaköy sokaklarında kahve için.' }
        ],
        eat: [
            { name: 'Tarihi Sultanahmet Köftesi', desc: 'Yarım asırlık tarihi tarifle hazırlanan köftelerin yanında piyaz ve köpüklü ayran tercih edin.' },
            { name: 'Boğaz\'da Taze Balık & Meze', desc: 'Boğaz kıyısındaki restoranlarda taze mevsim balıklarının ve yerel mezelerin tadını çıkarın.' },
            { name: 'Sokak Lezzetleri', desc: 'Ortaköy\'de kumpir, Eminönü\'nde balık-ekmek ve sokak tezgahlarından çıtır çıtır simit deneyin.' }
        ]
    },
    kyoto: {
        title: 'Kyoto',
        country: 'Japonya',
        image: 'images/kyoto_temple.jpg',
        description: 'Budist tapınakları, Shinto tapınakları, geleneksel ahşap evleri ve huzur veren bambu ormanlarıyla Japonya\'nın kültürel kalbi.',
        see: [
            { name: 'Kinkaku-ji (Altın Köşk)', desc: 'Gölün üzerine yansıyan altın kaplama bu görkemli Zen tapınağını ve etrafındaki taş bahçelerini keşfedin.' },
            { name: 'Arashiyama Bambu Ormanı', desc: 'Göğe uzanan bambular arasında yürürken rüzgarın yapraklarda çıkardığı huzur veren sesleri dinleyin.' },
            { name: 'Fushimi Inari Tapınağı', desc: 'Dağın zirvesine doğru uzanan binlerce parlak turuncu Torii kapısının altından geçerek yürüyüş yapın.' }
        ],
        eat: [
            { name: 'Kaiseki Ryori', desc: 'Japon mutfağının zirvesi kabul edilen, mevsimsel malzemelerle hazırlanan çok kaplı geleneksel akşam yemeği.' },
            { name: 'Matcha Çay & Tatlıları', desc: 'Uji bölgesinde yetiştirilen kaliteli matchalardan yapılan yeşil çaylı dondurma ve mochi tatlıları.' },
            { name: 'Yudofu (Sıcak Tofu)', desc: 'Kyoto\'nun temiz su kaynaklarıyla yapılan taze tofunun, kelp suyunda pişirilerek özel soslarla sunumu.' }
        ]
    },
    paris: {
        title: 'Paris',
        country: 'Fransa',
        image: 'images/paris_cityscape.jpg',
        description: 'Sanatın, modanın ve romantizmin dünya başkenti. Seine Nehri kıyısındaki tarihi mimarisi ve bohem kafeleriyle büyüleyici bir şehir.',
        see: [
            { name: 'Eyfel Kulesi & Champ de Mars', desc: 'Paris\'in simgesini yakından görün; akşam saatlerinde kulede gerçekleşen ışık gösterisini izleyin.' },
            { name: 'Louvre Müzesi', desc: 'Mona Lisa, Milo Venüsü gibi tarihin en büyük sanat eserlerine ev sahipliği yapan dünyanın en büyük müzesi.' },
            { name: 'Ressamlar Tepesi (Montmartre)', desc: 'Sacre-Coeur Bazilikası\'nı gezin ve dar sokaklardaki sokak ressamlarına portrenizi çizdirin.' }
        ],
        eat: [
            { name: 'Kruvasan & Baget Ekmek', desc: 'Güne fırından yeni çıkmış, tereyağlı çıtır kruvasanlar ve taze baget ekmeklerle klasik bir Parisli gibi başlayın.' },
            { name: 'Fransız Makaronları', desc: 'Fıstıklı, güllü, çikolatalı gibi onlarca çeşidi bulunan renkli ve ağızda dağılan meşhur Fransız tatlısı.' },
            { name: 'Ördek Konfi (Confit de Canard)', desc: 'Kendi yağında yavaşça pişirilerek hazırlanan, dışı çıtır içi lokum kıvamında geleneksel bir et yemeği.' }
        ]
    },
    reykjavik: {
        title: 'Reykjavik',
        country: 'İzlanda',
        image: 'images/reykjavik_nature.jpg',
        description: 'Buzullar, volkanlar ve jeotermal kaplıcaların ortasında yer alan, İskandinav esintili renkli evleriyle dünyanın en kuzeydeki başkenti.',
        see: [
            { name: 'Kuzey Işıkları (Aurora)', desc: 'Eylül-Nisan ayları arasında gökyüzünü yeşil ve mor renklere boyayan doğa mucizesini şehir dışından izleyin.' },
            { name: 'Hallgrimskirkja Kilisesi', desc: 'Bazalt sütunlardan ilham alınarak tasarlanan bu devasa modern kilisenin tepesinden renkli Reykjavik evlerini izleyin.' },
            { name: 'Blue Lagoon Kaplıcası', desc: 'Şehrin yakınlarındaki bu ünlü jeotermal kaplıcanın şifalı mineral sularında sıcak bir banyo yapın.' }
        ],
        eat: [
            { name: 'Kjötsúpa (Kuzu Çorbası)', desc: 'Soğuk İzlanda günlerinde içinizi ısıtacak, kuzu eti ve kök sebzelerle hazırlanan geleneksel koyu çorba.' },
            { name: 'İzlanda Sosislisi (Pylsur)', desc: 'Kuzu eti karışımıyla yapılan, çıtır soğan ve özel hardalla sunulan ülkenin en ünlü sokak lezzeti.' },
            { name: 'Skyr (İzlanda Yoğurdu)', desc: 'Yüksek proteinli, az yağlı, peynir altı suyundan elde edilen yoğun kıvamlı geleneksel İzlanda yoğurdu.' }
        ]
    },
    santorini: {
        title: 'Santorini',
        country: 'Yunanistan',
        image: 'images/santorini_view.jpg',
        description: 'Ege Denizi\'nin ortasında, sarp volkanik kayalıklara dizilmiş mavi kubbeli beyaz evleri ve kartpostal gibi gün batımlarıyla ünlü ada.',
        see: [
            { name: 'Oia Gün Batımı', desc: 'Dünyanın en meşhur gün batımını izlemek için akşamüstü Oia kasabasının yel değirmenli teraslarında yerinizi alın.' },
            { name: 'Kırmızı ve Siyah Plajlar', desc: 'Volkanik lav kalıntılarından oluşan kırmızı ve siyah renkli sıra dışı kumsallarda Ege\'nin tadını çıkarın.' },
            { name: 'Fira Kasabası', desc: 'Adanın hareketli merkezi Fira\'da yamaçlardaki dar sokaklarda alışveriş yapın ve deniz manzarasını izleyin.' }
        ],
        eat: [
            { name: 'Taze Deniz Ürünleri', desc: 'Amoudi Koyu\'ndaki sahil tavernalarında ahtapot ızgara, kalamar dolması ve taze deniz balıkları tüketin.' },
            { name: 'Domatokeftedes (Domates Mücveri)', desc: 'Adanın susuz yetişen lezzetli domatesleri ve taze otlarla hazırlanan çıtır mücver çeşidi.' },
            { name: 'Vinsanto Şarabı', desc: 'Santorini\'nin volkanik topraklarında yetişen Assyrtiko üzümlerinden yapılan ödüllü tatlı beyaz şarap.' }
        ]
    },
    marrakech: {
        title: 'Marrakech',
        country: 'Fas',
        image: 'images/marrakech_market.jpg',
        description: 'Tarihi Medina surları, baharat kokulu dar sokakları ve binbir gece masallarını andıran avlulu evleriyle Fas\'ın kızıl egzotik kalbi.',
        see: [
            { name: 'Jemaa el-Fnaa Meydanı', desc: 'Akşam saatlerinde seyyar yemek tezgahları, hikaye anlatıcıları, müzisyenler ve akrobatlarla şenlenen devasa meydan.' },
            { name: 'Bahia Sarayı', desc: '19. yüzyıl Fas mimarisinin en güzel örneklerini barındıran, el işi çiniler ve ahşap oymalarla süslü saray odaları.' },
            { name: 'Majorelle Bahçesi', desc: 'Fransız sanatçı Jacques Majorelle tarafından tasarlanan, kobalt mavisi binalar ve dev kaktüslerle bezeli ünlü bahçe.' }
        ],
        eat: [
            { name: 'Fas Tajini', desc: 'Kuzu veya tavuk etinin, kayısı, kuru üzüm ve baharatlarla konik toprak kapta yavaşça pişirilmesiyle yapılan ana yemek.' },
            { name: 'Kuskus (Couscous)', desc: 'İrmik tanelerinin buharda pişirilip, üzerinde et ve bol sebze ile servis edildiği geleneksel Fas lezzeti.' },
            { name: 'Nane Çayı (Fas Viskisi)', desc: 'Taze nane yaprakları ve şekerle demlenen, yüksekten bardağa köpürtülerek servis edilen geleneksel ikram çayı.' }
        ]
    },
    cappadocia: {
        title: 'Kapadokya',
        country: 'Türkiye',
        image: 'images/cappadocia.jpg',
        description: 'Milyonlarca yıllık lav akıntılarının oluşturduğu peri bacaları, yeraltı şehirleri ve mağara otelleriyle benzersiz bir doğal harika.',
        see: [
            { name: 'Sıcak Hava Balonu', desc: 'Gündoğumuyla birlikte yüzlerce balonla beraber peri bacalarının üzerinden uçarak manzarayı izleyin.' },
            { name: 'Göreme Açık Hava Müzesi', desc: 'Kayalara oyulmuş erken dönem Hristiyan kiliseleri ve etkileyici freskleri keşfedin.' }
        ],
        eat: [
            { name: 'Testi Kebabı', desc: 'Kuzu eti ve sebzelerin toprak testide odun ateşinde pişirilmesiyle yapılan yöresel lezzet.' },
            { name: 'Avanos Şarapları', desc: 'Volkanik tüflü topraklarda yetişen üzümlerden yapılan yerel şarapları tadın.' }
        ]
    },
    izmir: {
        title: 'İzmir',
        country: 'Türkiye',
        image: 'images/aegean_coast.jpg',
        description: 'Ege\'nin incisi, palmiyelerle süslü kordon boyu, tarihi çarşıları ve rahat yaşam tarzıyla Türkiye\'nin en batılı şehri.',
        see: [
            { name: 'Efes Antik Kenti', desc: 'Roma döneminin en önemli liman şehirlerinden olan, devasa amfitiyatrosu ve Celsus Kütüphanesi ile ünlü antik kent.' },
            { name: 'Kemeraltı Çarşısı', desc: 'Dar sokaklarında kaybolabileceğiniz, tarihi hanlar, baharatçılar ve kafelerle dolu tarihi çarşı.' }
        ],
        eat: [
            { name: 'Boyoz & Yumurta', desc: 'Sadece İzmir\'de bulabileceğiniz, fırınlanmış yumurta eşliğinde yenen ince hamurlu yağlı çörektir.' },
            { name: 'İzmir Kumrusu', desc: 'Özel susamlı ekmeği arasına sucuk, sosis ve sayas peyniri konularak yapılan sıcak sandviç.' }
        ]
    },
    rize: {
        title: 'Rize',
        country: 'Türkiye',
        image: 'images/blacksea_highlands.jpg',
        description: 'Karadeniz\'in hırçın dalgalarının yeşilin her tonuna sahip sarp dağlarla buluştuğu çay diyarı.',
        see: [
            { name: 'Ayder Yaylası', desc: 'Bulutların üzerinde yer alan, ahşap yayla evleri ve şifalı kaplıcalarıyla meşhur doğa harikası.' },
            { name: 'Fırtına Deresi', desc: 'Tarihi taş kemer köprüleri görebileceğiniz ve rafting yapabileceğiniz coşkun Karadeniz deresi.' }
        ],
        eat: [
            { name: 'Muhlama (Mıhlama)', desc: 'Trabzon tereyağı, mısır unu ve eriyen kolot peyniriyle yapılan, uzadıkça uzayan kahvaltı efsanesi.' },
            { name: 'Laz Böreği', desc: 'İsmine aldanmayın, yufka arasına konan özel muhallebisiyle yapılan şerbetli ve karabiberli tatlıdır.' }
        ]
    },
    fethiye: {
        title: 'Fethiye',
        country: 'Türkiye',
        image: 'images/parasut.jpg',
        description: 'Turkuaz renkli koyları, antik Likya yolu kalıntıları ve Babadağ\'ın eteklerinde doğayla iç içe bir Akdeniz cenneti.',
        see: [
            { name: 'Ölüdeniz & Belcekız', desc: 'Dünyanın en güzel kumsallarından biri olan, durgun suyu ve çam ormanlarıyla çevrili mavi bayraklı plaj.' },
            { name: 'Saklıkent Kanyonu', desc: 'Buz gibi suyu ve yüzlerce metre yüksekliğindeki dik kayalıklarıyla macera dolu bir doğa yürüyüşü rotası.' }
        ],
        eat: [
            { name: 'Balık Pazarı', desc: 'Ortadaki tezgahlardan seçtiğiniz taze deniz ürünlerini, çevredeki restoranlarda anında pişirterek yiyin.' },
            { name: 'Gözleme', desc: 'Yol kenarındaki yörük çadırlarında saç üzerinde pişen patatesli veya peynirli ince hamur işi.' }
        ]
    },
    kars: {
        title: 'Kars',
        country: 'Türkiye',
        image: 'images/kars.jpg',
        description: 'Rus işgali döneminden kalan Baltık mimarisi, karlı kış manzaraları ve eşsiz mutfağıyla farklı bir Anadolu deneyimi.',
        see: [
            { name: 'Ani Harabeleri', desc: 'Farklı medeniyetlerin izlerini taşıyan, Arpaçay kenarına kurulmuş geniş ve etkileyici antik kent.' },
            { name: 'Çıldır Gölü', desc: 'Kış aylarında tamamen donan, üzerinde atlı kızaklarla gezilen ve buz kırılarak balık tutulan göl.' }
        ],
        eat: [
            { name: 'Kars Kazı', desc: 'Bulgur pilavı üzerinde servis edilen, yöreye özgü kurutulmuş ve fırınlanmış meşhur kaz eti.' },
            { name: 'Kars Gravyeri', desc: 'İsviçre kökenli tekniklerle yüksek rakımlı yaylalardaki inek sütünden üretilen delikli, olgun sarı peynir.' }
        ]
    },
    rome: {
        title: 'Roma',
        country: 'İtalya',
        image: 'images/rome.jpg',
        description: 'Binlerce yıllık imparatorluğun başkenti; tarihi meydanları, çeşmeleri ve dünyaca ünlü mutfağıyla İtalya\'nın kalbi.',
        see: [
            { name: 'Kolezyum', desc: 'Roma İmparatorluğu\'nun en büyük amfitiyatrosu, gladyatör dövüşlerinin antik merkezi.' },
            { name: 'Vatikan Müzeleri', desc: 'Michelangelo\'nun Sistina Şapeli tavanı başta olmak üzere dünyanın en değerli sanat eserleri koleksiyonu.' }
        ],
        eat: [
            { name: 'Pizza al Taglio', desc: 'Dikdörtgen tepsilerde pişip dilimle (kare) satılan, pratik ve lezzetli Roma usulü sokak pizzası.' },
            { name: 'Carbonara', desc: 'Gerçek İtalyan usulü guanciale (domuz yanağı), pecorino peyniri ve yumurta sarısıyla yapılan kremasız makarna.' }
        ]
    }
};

function initCityModal() {
    const modal = document.getElementById('city-side-panel');
    const modalOverlay = document.getElementById('city-side-panel-overlay');
    const closeBtn = document.getElementById('city-side-panel-close');
    const modalContainer = document.querySelector('.city-side-panel-container');
    const cards = document.querySelectorAll('.city-card');

    if (!modal || !modalContainer) return;

    // Open modal on card click
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cityKey = card.id.replace('city-', '');
            console.log("City card clicked:", card.id, "cityKey:", cityKey);
            const data = cityData[cityKey];
            if (!data) {
                console.warn("No data found for cityKey:", cityKey);
                return;
            }

            populateCityModal(data);
            openCityModal();
        });
    });

    // Close Modal Events
    if (closeBtn) closeBtn.addEventListener('click', closeCityModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeCityModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeCityModal();
        }
    });

    function openCityModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        modalContainer.scrollTop = 0;

        // Animate in using GSAP
        const tl = gsap.timeline();
        tl.fromTo('.city-side-panel-header',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.25 }
        );
        tl.fromTo('.city-side-panel-hero img',
            { scale: 1.15 },
            { scale: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
        );
        tl.fromTo('.city-side-panel-intro',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.4'
        );
        tl.fromTo('.city-side-panel-section-title',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.1 },
            '-=0.3'
        );
        tl.fromTo('.city-detail-item-card',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
            '-=0.3'
        );
    }

    function closeCityModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
    }

    function populateCityModal(data) {
        // Hero Elements
        const imgEl = document.getElementById('city-side-panel-hero-img');
        const countryEl = document.getElementById('city-side-panel-country');
        const titleEl = document.getElementById('city-side-panel-title');
        const introEl = document.getElementById('city-side-panel-intro-text');

        // List Elements
        const seeListEl = document.getElementById('city-side-panel-see-list');
        const eatListEl = document.getElementById('city-side-panel-eat-list');

        if (imgEl) {
            imgEl.src = data.image;
            imgEl.alt = data.title;
        }
        if (countryEl) countryEl.textContent = data.country;
        if (titleEl) titleEl.textContent = data.title;
        if (introEl) introEl.textContent = data.description;

        // Render "Görülmesi Gereken Yerler"
        if (seeListEl) {
            seeListEl.innerHTML = data.see.map(item => `
                <div class="city-detail-item-card">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
        }

        // Render "Yenmesi Gereken Lezzetler"
        if (eatListEl) {
            eatListEl.innerHTML = data.eat.map(item => `
                <div class="city-detail-item-card">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
        }
    }
}

// =========================================
// EXPERIENCE DETAIL PANEL — Data & Logic
// =========================================
const experienceData = {
    trekking: {
        title: 'Trekking',
        category: 'Macera',
        image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
        description: 'Doğanın kalbinde, belirlenmiş patikalarda yürüyerek hem bedeninizi hem de ruhunuzu dinlendireceğiniz harika bir outdoor aktivitesi.',
        location: 'Likya Yolu (Antalya), Kaçkar Dağları (Rize), Kapadokya Vadileri.',
        season: 'İlkbahar (Nisan-Mayıs) ve Sonbahar (Eylül-Ekim) ayları yürüyüş için en ideal zamanlardır.',
        difficulty: 'Orta — Zor (Rotaya göre değişir)',
        tips: 'Bileği saran kaymaz tabanlı yürüyüş ayakkabıları tercih edilmeli, sırt çantasında bol su ve enerji veren atıştırmalıklar bulundurulmalıdır.'
    },
    dalis: {
        title: 'Dalış',
        category: 'Macera',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        description: 'Deniz altındaki zengin yaşamı, mercan resiflerini ve batıkları keşfetmek için yapılan büyüleyici bir su altı sporu.',
        location: 'Kaş (Antalya) - özellikle Uçanbalık Bankosu, Bodrum, Fethiye.',
        season: 'Haziran — Eylül ayları su sıcaklığı ve görüş mesafesi açısından en uygun dönemdir.',
        difficulty: 'Orta (Sertifika durumuna göre değişir)',
        tips: 'Profesyonel eğitmen eşliğinde dalınmalı, dalış öncesi güvenlik brifinglerine ve talimatlara harfiyen uyulmalıdır.'
    },
    parasut: {
        title: 'Paraşüt (Yamaç Paraşütü)',
        category: 'Macera',
        image: 'images/parasut.jpg',
        description: 'Yüksek bir tepeden rüzgarın gücünü arkaya alarak süzülme ve gökyüzünden yeryüzünü kuş bakışı izleme deneyimi.',
        location: 'Fethiye Babadağ (Ölüdeniz manzaralı), Pamukkale, Kaş.',
        season: 'Nisan — Ekim ayları rüzgar koşulları açısından en kararlı dönemdir.',
        difficulty: 'Kolay (Tandem/Pilot eşliğinde) / Zor (Solo)',
        tips: 'Tandem uçuşlarında pilotun tüm yönlendirmelerine dikkat edilmeli, kalkış esnasında koşma talimatı unutulmamalıdır.'
    },
    safari: {
        title: 'Safari',
        category: 'Macera',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
        description: 'Off-road araçlarıyla veya ATV\'lerle doğanın zorlu koşullarında yapılan heyecan dolu bir keşif turu.',
        location: 'Kapadokya Vadileri, Toros Dağları (Antalya), Kaz Dağları.',
        season: 'Yılın her mevsimi yapılabilir; ilkbahar ve sonbahar çamur ve toz dengesi açısından en eğlenceli zamanlardır.',
        difficulty: 'Kolay — Orta',
        tips: 'Tozdan korunmak için güneş gözlüğü ve bandana kullanılmalı, rahat ve kirlenmesinde sakınca olmayan kıyafetler seçilmelidir.'
    },
    muze: {
        title: 'Müze Ziyareti',
        category: 'Kültür',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        description: 'Tarihin ve sanatın korunmuş yapıtlarını görerek insanlık geçmişine ve kültürel mirasa yakından tanıklık etme etkinliği.',
        location: 'İstanbul Arkeoloji Müzeleri, Göreme Açık Hava Müzesi, Efes Müzesi (İzmir).',
        season: 'Yılın 12 ayı boyunca ziyaret edilebilir; kapalı alan olması sebebiyle kışın veya sıcak yaz günlerinde harikadır.',
        difficulty: 'Kolay',
        tips: 'Müze Kart edinmek girişlerde sıra beklemeyi önler. Sergi detaylarını kaçırmamak için sesli rehber (audio guide) kullanılması önerilir.'
    },
    festival: {
        title: 'Festivaller',
        category: 'Kültür',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        description: 'Yerel halkın kültürünü, müziğini, hasat zamanını ve sanatsal üretimini topluca kutladığı coşkulu organizasyonlar.',
        location: 'Alaçatı Ot Festivali (İzmir), Altın Portakal Film Festivali (Antalya), Isparta Gül Festivali.',
        season: 'Genellikle İlkbahar ve Yaz aylarında hasat ve sıcak hava avantajıyla yoğunlaşır.',
        difficulty: 'Kolay',
        tips: 'Popüler festivaller için konaklama ve ulaşım rezervasyonları aylar öncesinden yapılmalıdır.'
    },
    arkeoloji: {
        title: 'Arkeoloji Turları',
        category: 'Kültür',
        image: 'https://images.unsplash.com/photo-1608976478549-b58cbbfd5f7b?auto=format&fit=crop&w=800&q=80',
        description: 'Binlerce yıl öncesine ait antik kent kalıntılarını, tiyatroları ve tapınakları yerinde inceleyerek geçmişe yolculuk.',
        location: 'Efes Antik Kenti (Selçuk), Göbeklitepe (Şanlıurfa), Troya (Çanakkale).',
        season: 'İlkbahar ve Sonbahar ayları aşırı sıcaklardan kaçınmak ve rahatça yürümek için idealdir.',
        difficulty: 'Kolay — Orta (Engebeli arazilere göre)',
        tips: 'Açık alanda uzun yürüyüşler yapılacağı için güneş kremi, şapka, güneş gözlüğü ve bol su bulundurulmalıdır.'
    },
    mimari: {
        title: 'Mimari Keşifler',
        category: 'Kültür',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        description: 'Tarihi ve modern binaların yapım tekniklerini, estetik detaylarını ve kültürel yansımalarını yerinde inceleme sanatı.',
        location: 'Tarihi Yarımada (İstanbul), Safranbolu Evleri, Mardin Taş Konakları.',
        season: 'Yılın her ayı uygundur; fotoğrafçılık için berrak gökyüzünün olduğu mevsimler tercih edilmelidir.',
        difficulty: 'Kolay',
        tips: 'Binaların detaylarını ve tavan süslemelerini görebilmek için geniş açılı lensler ve rahat yürüyüş ayakkabıları tercih edilmelidir.'
    },
    ['street food']: {
        title: 'Sokak Lezzetleri',
        category: 'Lezzet',
        image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=800&q=80',
        description: 'Şehrin ritmini yakalayan, hızlı, lezzetli ve yerel halkın günlük yaşam kültürünü yansıtan gurme sokak yemekleri.',
        location: 'Eminönü ve Kadıköy (İstanbul), Alsancak (İzmir) - Boyoz & Kumru, Adana - Sokak Kebapçıları.',
        season: 'Her mevsim keyiflidir; serin akşam turlarında sıcak sokak lezzetleri ayrı bir keyif verir.',
        difficulty: 'Kolay',
        tips: 'Sirkülasyonu yüksek ve yerel halkın kuyruk oluşturduğu tezgahlar her zaman en taze ve lezzetli yemekleri sunar.'
    },
    sarap: {
        title: 'Şarap & Bağ Rotası',
        category: 'Lezzet',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        description: 'Bağ bozumu dönemlerinde bağları gezerek üzümün şaraba dönüşüm hikayesini dinleme ve yerel şarapları tadım deneyimi.',
        location: 'Urla Bağ Yolu (İzmir), Bozcaada, Kapadokya.',
        season: 'Bağ bozumu dönemi olan Eylül ve Ekim ayları en büyüleyici zamanlardır.',
        difficulty: 'Kolay',
        tips: 'Rezervasyonlu butik tadım turları tercih edilmeli, peynir ve yerel meze eşleşmelerine dikkat edilmelidir.'
    },
    yoresel: {
        title: 'Yöresel Mutfaklar',
        category: 'Lezzet',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        description: 'Bölgenin coğrafyasından ve tarihinden süzülen geleneksel ev yemekleri ve tescilli yerel restoran menüleri.',
        location: 'Gaziantep (UNESCO tescilli), Antakya (Hatay), Trabzon (Karadeniz mutfağı).',
        season: 'Her mevsim farklı mevsimsel sebze ve yemeklerle harikadır.',
        difficulty: 'Kolay',
        tips: 'Zincir restoranlar yerine esnaf lokantaları ve tescilli yerel işletmeler tercih edilmelidir.'
    },
    workshop: {
        title: 'Gastronomi Workshopları',
        category: 'Lezzet',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
        description: 'Yerel şeflerden veya zanaatkarlardan yöresel yemeklerin yapımını uygulamalı olarak öğrenme ve tatma deneyimi.',
        location: 'Urla Gastronomi Atölyeleri, Avanos Çömlek Atölyeleri (Kapadokya), Gaziantep Yemek Kursları.',
        season: 'Yılın her döneminde kapalı atölye ortamında yapılabilir.',
        difficulty: 'Kolay',
        tips: 'Uygulamalı dersler için rahat, leke tutmayan giysiler giyilmeli ve tarifleri kaydetmek için not defteri bulundurulmalıdır.'
    },
    kamp: {
        title: 'Kampçılık',
        category: 'Doğa',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
        description: 'Şehir hayatının gürültüsünden uzakta, çadır kurarak yıldızların altında doğayla baş başa uyuma deneyimi.',
        location: 'Kelebekler Vadisi (Muğla), Yedigöller (Bolu), Kaçkar Yaylaları.',
        season: 'Haziran — Eylül ayları arası en rahat dönemdir; deneyimli kampçılar sonbaharı da tercih eder.',
        difficulty: 'Orta — Zor (Hava durumuna ve konuma göre)',
        tips: 'Yaban hayatına saygı gösterilmeli, çöpler kesinlikle doğada bırakılmamalı ve mevsime uygun uyku tulumu seçilmelidir.'
    },
    yuruyus: {
        title: 'Doğa Yürüyüşleri',
        category: 'Doğa',
        image: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=800&q=80',
        description: 'Günübirlik, patika ve orman yollarında doğayı gözlemleyerek yapılan hafif tempolu yürüyüşler.',
        location: 'Belgrad Ormanı (İstanbul), Kaz Dağları Millî Parkı, Urla Bağ Yolu Patikaları.',
        season: 'İlkbahar ve Sonbahar doğanın renk cümbüşünü izlemek için mükemmeldir.',
        difficulty: 'Kolay',
        tips: 'Yumuşak tabanlı spor ayakkabılar yeterlidir. Hafif bir yağmurluk ve yedek çorap bulundurmak faydalıdır.'
    },
    ['kus gozlemi']: {
        title: 'Kuş Gözlemciliği',
        category: 'Doğa',
        image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=800&q=80',
        description: 'Doğal yaşam alanlarında kuş türlerini seslerinden ve görünüşlerinden tanımak için sabırla yapılan huzurlu bir aktivite.',
        location: 'Kızılırmak Deltası Kuş Cenneti (Samsun), Manyas Kuş Cenneti (Balıkesir), Göksu Deltası (Mersin).',
        season: 'İlkbahar ve Sonbahar göç dönemleri en çok türün görülebildiği zamanlardır.',
        difficulty: 'Kolay',
        tips: 'Dürbün veya zoom lensli fotoğraf makinesi şarttır. Doğada göze batmamak için toprak tonlarında kıyafetler seçilmelidir.'
    },
    kayak: {
        title: 'Kayak & Snowboard',
        category: 'Doğa',
        image: 'https://images.unsplash.com/photo-1551698618-1ffd0197e2b6?auto=format&fit=crop&w=800&q=80',
        description: 'Karlı dağ yamaçlarında hızın, adrenalin ve kış doğasının tadını çıkararak kayma sporu.',
        location: 'Uludağ (Bursa), Erciyes (Kayseri), Palandöken (Erzurum) - gece kayağı dahil.',
        season: 'Aralık ortasından Mart sonuna kadar olan kış dönemi idealdir.',
        difficulty: 'Orta — Zor (Piste göre değişir)',
        tips: 'Hava durumuna ve kar kalınlığına bakılmalı, koruyucu gözlük ve kask kesinlikle ihmal edilmemelidir.'
    },
    galeri: {
        title: 'Sanat Galerileri',
        category: 'Sanat',
        image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80',
        description: 'Modern ve klasik güzel sanatlar eserlerini, resim ve heykelleri sakin bir ortamda inceleme gezisi.',
        location: 'İstanbul Modern, Arter, Pilevneli Galeri.',
        season: 'Yılın her günü ziyaret edilebilir.',
        difficulty: 'Kolay',
        tips: 'Sergi açılış tarihleri ve küratör söyleşileri takip edilerek ziyaret kalitesi artırılabilir.'
    },
    ['sokak sanati']: {
        title: 'Sokak Sanatı & Mural',
        category: 'Sanat',
        image: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=800&q=80',
        description: 'Şehir duvarlarını devasa tuvale dönüştüren graffiti ve muralları açık havada keşfetme turu.',
        location: 'Karaköy ve Kadıköy sokakları (İstanbul), Alsancak (İzmir).',
        season: 'Havanın güzel olduğu ilkbahar, yaz ve sonbahar günlerinde yürüyerek gezmek harikadır.',
        difficulty: 'Kolay',
        tips: 'Kameranızı hazır tutun ve sokak sanatı haritalarını internetten indirerek kendi rotanızı çizin.'
    },
    atolye: {
        title: 'Sanat Atölyeleri',
        category: 'Sanat',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
        description: 'Sanatçılar eşliğinde ebru sanatı, heykel yapımı, resim veya seramik atölyelerinde kendi eserinizi üretme.',
        location: 'Beyoğlu Sanat Atölyeleri (İstanbul), Bodrum Sanat Köyü.',
        season: 'Yılın her dönemi yapılabilir.',
        difficulty: 'Kolay',
        tips: 'Önceden randevu alınmalı, kıyafetlerin kirlenme ihtimaline karşı önlük kullanılmalıdır.'
    },
    tiyatro: {
        title: 'Tiyatro & Performans',
        category: 'Sanat',
        image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
        description: 'Sahne sanatlarının, drama ve komedilerin canlı performansını tarihi veya modern tiyatro salonlarında izleme.',
        location: 'Harbiye Muhsin Ertuğrul Sahnesi, Kadıköy Haldun Taner Sahnesi, Aspendos Antik Tiyatrosu (Yaz festivalleri).',
        season: 'Eylül — Mayıs ayları arası tiyatro sezonudur; antik tiyatro gösterileri ise yazın gerçekleşir.',
        difficulty: 'Kolay',
        tips: 'Biletler genellikle satışa çıktığı ilk günlerde tükendiği için sezon programları yakından izlenmelidir.'
    },
    spa: {
        title: 'Spa & Türk Hamamı',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        description: 'Suyla gelen sağlık ve rahatlama hissini masajlar, buhar odaları ve aromatik yağlarla yaşama seansı.',
        location: 'Tarihi Türk Hamamları (Kılıç Ali Paşa, Cağaloğlu - İstanbul), Kapadokya Mağara Spaları.',
        season: 'Soğuk kış günlerinde ve yorucu gezilerin son gününde vücudu dinlendirmek için mükemmeldir.',
        difficulty: 'Kolay',
        tips: 'Rezervasyon yaptırılmalı, en az 15 dakika öncesinde gidilerek buhar banyosu ile vücut gevşetilmelidir.'
    },
    yoga: {
        title: 'Yoga Retreat',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
        description: 'Nefes egzersizleri ve esneme duruşları ile zihinsel berraklık ve bedensel esneklik kazanma pratikleri.',
        location: 'Kabak Vadisi (Fethiye), Kaz Dağları yoga kampları, Gökova Körfezi.',
        season: 'Açık havada güneş doğumu yogası için yaz ve bahar ayları idealdir.',
        difficulty: 'Kolay — Orta (Seviyeye göre)',
        tips: 'Rahat ve esnek giysiler tercih edilmeli, yoga seansı öncesi ağır yemekler yemekten kaçınılmalıdır.'
    },
    termal: {
        title: 'Termal Kaplıcalar',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
        description: 'Yer altından çıkan şifalı sıcak suların bulunduğu havuzlarda banyo yaparak romatizma ve yorgunluk giderme.',
        location: 'Pamukkale Travertenleri (Denizli), Afyonkarahisar Termal Otelleri, Bursa Oylat Kaplıcaları.',
        season: 'Sonbahar ve kış ayları kaplıca sıcaklığının tadını çıkarmak için en popüler dönemdir.',
        difficulty: 'Kolay',
        tips: 'Sıcak termal havuzlarda 20 dakikadan fazla kalınmamalı, aralarda bol bol su tüketilmelidir.'
    },
    meditasyon: {
        title: 'Meditasyon Kampları',
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        description: 'Zihni sakinleştirmek, farkındalık kazanmak ve içsel dengeyi bulmak için yapılan sessizlik ve odaklanma seansları.',
        location: 'Kabak Koyu (Fethiye), Kaz Dağları ormanlık alanları, Assos sahil şeridi.',
        season: 'Yılın her dönemi uygulanabilir; doğadaki kamplar ilkbahar-yaz aylarında açılır.',
        difficulty: 'Kolay',
        tips: 'Sessiz, dikkatin dağılmayacağı bir köşe seçilmeli, rahat bir oturuş pozisyonu korunmalıdır.'
    }
};

function initExperiencePanel() {
    const panel = document.getElementById('experience-side-panel');
    const panelOverlay = document.getElementById('experience-side-panel-overlay');
    const closeBtn = document.getElementById('experience-side-panel-close');
    const panelContainer = document.querySelector('.experience-side-panel-container');
    const planBtn = document.getElementById('experience-side-panel-plan-btn');
    const tags = document.querySelectorAll('.experience-tags span');

    if (!panel || !panelContainer) return;

    const categoryColors = {
        'MACERA': '#D68A53',
        'KÜLTÜR': '#A8C08F',
        'LEZZET': '#D68A53',
        'DOĞA': '#A8C08F',
        'SANAT': '#D68A53',
        'WELLNESS': '#A8C08F'
    };

    function normalizeKey(str) {
        return str.toLowerCase()
            .trim()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c');
    }

    // Open panel on tag click
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const rawText = tag.textContent.trim();
            const expKey = normalizeKey(rawText);
            const data = experienceData[expKey];

            if (!data) {
                console.warn("No experience data found for key:", expKey);
                return;
            }

            populatePanel(data);
            openPanel();
        });
    });

    // Close Events
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (panelOverlay) panelOverlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            closePanel();
        }
    });

    // Plan button chatbot integration
    if (planBtn) {
        planBtn.addEventListener('click', () => {
            closePanel();

            // Open chatbot automatically
            const chatBubble = document.getElementById('chat-bubble');
            const chatWindow = document.getElementById('chat-window');
            const chatInput = document.getElementById('chat-input');

            if (chatBubble && chatWindow && chatInput) {
                const titleText = document.getElementById('experience-side-panel-title').textContent;

                // If chatbot is closed, open it
                if (!chatWindow.classList.contains('open')) {
                    chatBubble.click();
                }

                // Prefill input and focus
                setTimeout(() => {
                    chatInput.value = `Merhaba, ${titleText} deneyimi hakkında detaylı planlama yapmak istiyorum.`;
                    chatInput.focus();
                }, 400);
            }
        });
    }

    function openPanel() {
        panel.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        panelContainer.scrollTop = 0;

        // GSAP entrance animations
        const tl = gsap.timeline();
        tl.fromTo('.experience-side-panel-header',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.25 }
        );
        tl.fromTo('.experience-side-panel-hero img',
            { scale: 1.15 },
            { scale: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
        );
        tl.fromTo('.experience-side-panel-intro',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.4'
        );
        tl.fromTo('.experience-info-card',
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
            '-=0.3'
        );
        tl.fromTo('.experience-side-panel-cta',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.2'
        );
    }

    function closePanel() {
        panel.classList.remove('open');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
    }

    function populatePanel(data) {
        const catEl = document.getElementById('experience-side-panel-category');
        const titleEl = document.getElementById('experience-side-panel-title');
        const introEl = document.getElementById('experience-side-panel-intro-text');
        const imgEl = document.getElementById('experience-side-panel-hero-img');

        const locEl = document.getElementById('experience-side-panel-location');
        const seasonEl = document.getElementById('experience-side-panel-season');
        const diffEl = document.getElementById('experience-side-panel-difficulty');
        const tipsEl = document.getElementById('experience-side-panel-tips');

        if (catEl) {
            catEl.textContent = data.category;
            const categoryUpper = data.category.toUpperCase();
            const color = categoryColors[categoryUpper] || '#D68A53';
            catEl.style.color = color;
        }

        if (titleEl) titleEl.textContent = data.title;
        if (introEl) introEl.textContent = data.description;

        if (imgEl) {
            imgEl.src = data.image;
            imgEl.alt = data.title;
        }

        if (locEl) locEl.textContent = data.location;
        if (seasonEl) seasonEl.textContent = data.season;
        if (diffEl) diffEl.textContent = data.difficulty;
        if (tipsEl) tipsEl.textContent = data.tips;
    }
}

// =========================================
// SEYAHAT REHBERI CHATBOT
// =========================================
function initChatbot() {
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    const badge = document.getElementById('chat-badge');

    if (!chatBubble || !chatWindow) return;

    let isOpen = false;

    // Toggle Chat Panel
    function toggleChat() {
        isOpen = !isOpen;

        if (badge) {
            badge.style.opacity = '0';
            badge.style.pointerEvents = 'none';
        }

        if (isOpen) {
            chatBubble.classList.add('active');
            chatWindow.classList.add('open');
            // Scale and bounce in using GSAP
            gsap.fromTo(chatWindow,
                { scale: 0.8, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)', display: 'flex' }
            );
            setTimeout(() => {
                chatInput.focus();
            }, 300);
        } else {
            chatBubble.classList.remove('active');
            // Fade out and scale down
            gsap.to(chatWindow, {
                scale: 0.8,
                opacity: 0,
                y: 30,
                duration: 0.4,
                ease: 'power3.inOut',
                onComplete: () => {
                    chatWindow.classList.remove('open');
                }
            });
        }
    }

    chatBubble.addEventListener('click', toggleChat);
    if (chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChat);

    // Trigger chat from footer links
    const chatTriggerLinks = document.querySelectorAll('.chat-trigger-link');
    chatTriggerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to top
            if (!isOpen) {
                toggleChat();
            } else {
                gsap.fromTo(chatWindow, { y: 10 }, { y: 0, duration: 0.3, ease: 'bounce.out' });
                if (chatInput) chatInput.focus();
            }
        });
    });

    // Send Message Logic
    function sendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;

        // Append user message
        appendMessage(query, 'user');
        chatInput.value = '';

        if (badge) {
            badge.style.opacity = '0';
        }

        // Show typing indicator and generate bot reply
        showTypingIndicatorAndReply(query);
    }

    if (chatSendBtn) chatSendBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Handle suggestion chips click
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.textContent.trim().replace(/^[^\s]+\s+/, '');
            const keyword = chip.getAttribute('data-keyword') || query;

            // Append user representation
            appendMessage(chip.textContent.trim(), 'user');

            if (badge) {
                badge.style.opacity = '0';
            }

            // Trigger typing response
            showTypingIndicatorAndReply(keyword);
        });
    });

    // Helper: Append Message Bubble
    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}-msg`;

        const avatar = sender === 'bot' ? '🧭' : '👤';
        msgDiv.innerHTML = `
            <div class="chat-msg-avatar">${avatar}</div>
            <div class="chat-msg-text">${text}</div>
        `;

        chatMessages.appendChild(msgDiv);

        // Scroll to bottom smoothly
        gsap.to(chatMessages, {
            scrollTop: chatMessages.scrollHeight,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    // Helper: Typing Animation & Bot Response Trigger
    function showTypingIndicatorAndReply(query) {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg bot-msg typing-indicator-msg';
        typingDiv.innerHTML = `
            <div class="chat-msg-avatar">🧭</div>
            <div class="chat-msg-text">
                <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);

        // Scroll to bottom for indicator
        gsap.to(chatMessages, {
            scrollTop: chatMessages.scrollHeight,
            duration: 0.3
        });

        // Wait 1.2s to simulate thinking
        setTimeout(() => {
            const indicator = chatMessages.querySelector('.typing-indicator-msg');
            if (indicator) {
                indicator.remove();
            }

            const response = getBotResponse(query);
            appendMessage(response, 'bot');
        }, 1200);
    }

    // Keyword reply router
    function getBotResponse(query) {
        const text = query.toLowerCase()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c');

        if (text.includes('merhaba') || text.includes('selam') || text.includes('hello') || text.includes('hey')) {
            return "Merhaba! Harika bir gün dilerim. Size Türkiye'nin eşsiz köşelerini keşfetmenizde nasıl yardımcı olabilirim? Keşfetmek istediğiniz rotayı yazabilirsiniz.";
        }
        if (text.includes('kapadokya') || text.includes('peri baca')) {
            return "🎈 <strong>Kapadokya Macerası Rotalarımız:</strong><br>- Sabah erken saatte <em>Sıcak Hava Balonu Turu</em> ile gün doğumunu izleyebilirsiniz.<br>- Günün devamında <em>Göreme Açık Hava Müzesi</em> ve devasa <em>Derinkuyu Yeraltı Şehri</em>'ni keşfedebilirsiniz.<br>- Akşamüstü ise <em>Kızılçukur Vadisi</em>'nde gün batımının tadını çıkarabilirsiniz.<br><br>Detaylı program için Rotalar kısmından 'Kapadokya'yı Keşfet'e tıklayabilirsiniz!";
        }
        if (text.includes('ege') || text.includes('izmir') || text.includes('mugla') || text.includes('bodrum') || text.includes('deniz') || text.includes('koy')) {
            return "🌊 <strong>Ege Kıyıları Keşif Rotalarımız:</strong><br>- Güne el değmemiş gizli koylarda tekne turları ve taze bir köy kahvaltısı ile başlayın.<br>- Öğlen sıcağında muhteşem <em>Efes Antik Kenti</em>'ni veya yerel zeytinyağı tadım atölyelerini ziyaret edin.<br>- Akşam ise Alaçatı'nın taş sokaklarında yerel deniz ürünleri eşliğinde gurme deneyim yaşayın.<br><br>Detaylı program için Rotalar bölümümüzden 'Ege Kıyıları' kartını inceleyebilirsiniz.";
        }
        if (text.includes('karadeniz') || text.includes('rize') || text.includes('trabzon') || text.includes('yayla') || text.includes('doga')) {
            return "🌲 <strong>Karadeniz Rüyası Rotalarımız:</strong><br>- Sisli yaylalarda (Pokut, Fırtına Vadisi) yöresel kahvaltı ve doğa yürüyüşü ile güne başlayın.<br>- Öğle vaktinde <em>Sümela Manastırı</em>'nın büyüleyici kayalık mimarisini keşfedin.<br>- Akşam ise ahşap dağ evlerinde yerel tulum dinletisi eşliğinde dinlenin.<br><br>Detaylı plan için Rotalar bölümünde 'Karadeniz Rüyası'nı seçebilirsiniz.";
        }
        if (text.includes('istanbul') || text.includes('bogaz') || text.includes('tarihi yariada') || text.includes('galata')) {
            return "🕌 <strong>İstanbul Gezi Rotalarımız:</strong><br>- Sabah tarihi yarımadada <em>Ayasofya</em> ve <em>Topkapı Sarayı</em> ile başlayın.<br>- Öğleden sonra büyüleyici bir <em>Boğaz Tekne Turu</em> yapıp Karaköy sokaklarında kahve keyfi yapabilirsiniz.<br>- Akşam ise Galata Kulesi manzaralı premium bir restoranda günü tamamlayabilirsiniz.<br><br>Detaylı program için Rotalar bölümünde 'İstanbul Gezisi'ne göz atın.";
        }
        if (text.includes('aktivite') || text.includes('ne yapabilirim') || text.includes('macera') || text.includes('deneyim')) {
            return "⛰️ <strong>Popüler Deneyimlerimiz:</strong><br>1. Kapadokya'da Balon Turu ve Çömlek Atölyesi.<br>2. Ege'de Efes Antik Kent Turu ve Zeytinyağı Atölyesi.<br>3. Karadeniz Yayla Yürüyüşleri ve Fırtına Deresi'nde Zipline/Rafting.<br>4. İstanbul Boğazı'nda gün batımı tekne turları.<br><br>Detaylı sabah-öğle-akşam aktivite listeleri için rotaların üzerindeki 'Rotayı Keşfet' butonunu kullanabilirsiniz.";
        }
        if (text.includes('rehber') || text.includes('guide') || text.includes('kimler')) {
            return "🧭 <strong>Uzman Yerel Rehberlerimiz:</strong><br>Turlarımızda alanında uzman, tarihçi, doğa sporcusu ve gurme yerel rehberlerimiz size eşlik ediyor. Rehberlerimizin portfolyolarını, uzmanlık alanlarını ve kullanıcı yorumlarını sitemizin alt kısmındaki 'Rehberler' bölümünden inceleyebilirsiniz.";
        }
        if (text.includes('fiyat') || text.includes('ucret') || text.includes('rezervasyon') || text.includes('kayit') || text.includes('satin al') || text.includes('bilet') || text.includes('rezerv')) {
            return "✉️ <strong>Rezervasyon ve Detaylar:</strong><br>Rezervasyon taleplerinizi, rota modalının altındaki <em>'Bu Rotayı Planla'</em> butonu aracılığıyla veya ana sayfamızın en altındaki iletişim formunu doldurarak anında yapabilirsiniz. Seyahat planlama danışmanlarımız talebiniz doğrultusunda 24 saat içinde sizinle iletişime geçecektir.";
        }
        if (text.includes('iletisim') || text.includes('telefon') || text.includes('adres') || text.includes('eposta') || text.includes('mail') || text.includes('konum')) {
            return "📞 <strong>Bize Ulaşın:</strong><br>E-posta: explore@platform.com<br>Telefon: +90 (212) 555 0199<br>Adres: Bebek, Cevdet Paşa Cd. No:80, Beşiktaş / İstanbul<br><br>Dilerseniz sayfa sonundaki formu kullanarak mesaj bırakabilirsiniz.";
        }
        if (text.includes('tesekkur') || text.includes('sagol') || text.includes('harika') || text.includes('iyi gunler') || text.includes('ok') || text.includes('tamam')) {
            return "Rica ederim! Keşfetmek bir tutkudur, sormak istediğiniz başka bir şey olursa her zaman buradayım. İyi seyahatler! 🧭✨";
        }

        return "Anlayamadım ama size seyahat konusunda yardımcı olmak çok isterim! 😊<br><br>Şu konuları sormayı deneyebilirsiniz:<br>- <strong>Kapadokya</strong>, <strong>Ege</strong>, <strong>Karadeniz</strong> veya <strong>İstanbul</strong> rotaları.<br>- Yapılacak <strong>aktiviteler</strong> veya yerel <strong>rehberler</strong>.<br>- <strong>Rezervasyon</strong> ve fiyatlandırma süreci.<br><br>Hızlı bilgi almak için sohbet alanının üzerindeki öneri çiplerine de tıklayabilirsiniz.";
    }

    // Register Custom Cursor hover states for chatbot elements
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        const hoverElements = [chatBubble, chatCloseBtn, chatSendBtn, chatInput, ...suggestionChips];
        hoverElements.forEach(el => {
            if (el) {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            }
        });
    }
}

// =========================================
// TAG INFO PANEL — Yurtiçi / Yurtdışı Data & Logic
// =========================================

function initTagInfoPanel() {
    const panel = document.getElementById('tag-info-panel');
    const overlay = document.getElementById('tag-info-panel-overlay');
    const closeBtn = document.getElementById('tag-info-panel-close');
    const container = document.querySelector('.tag-info-panel-container');
    const exploreBtn = document.getElementById('tag-info-panel-explore-btn');

    if (!panel || !container) return;

    // Find all span tags inside .experience-tags
    const expTags = document.querySelectorAll('.experience-tags span');

    expTags.forEach(span => {
        // Add cursor pointer so it's obviously clickable
        span.style.cursor = 'pointer';

        // Add hover effects
        span.addEventListener('mouseenter', () => {
            span.style.background = 'var(--color-primary)';
            span.style.color = '#fff';
            span.style.transform = 'translateY(-2px)';
            span.style.transition = 'all 0.3s ease';
            span.style.borderColor = 'var(--color-primary)';
        });
        span.addEventListener('mouseleave', () => {
            span.style.background = '';
            span.style.color = '';
            span.style.transform = '';
            span.style.borderColor = '';
        });

        span.addEventListener('click', (e) => {
            e.stopPropagation(); // Don't trigger accordion toggle

            const rawText = span.textContent.trim();
            // Normalize key
            const dataKey = rawText.toLowerCase()
                .replace(/ç/g, 'c')
                .replace(/ğ/g, 'g')
                .replace(/ı/g, 'i')
                .replace(/ö/g, 'o')
                .replace(/ş/g, 's')
                .replace(/ü/g, 'u')
                .replace(/[^a-z0-9]/g, '');

            // Ensure tagInfoData is loaded (from tagData.js)
            if (typeof tagInfoData === 'undefined') {
                console.error('tagInfoData is not defined. Did tagData.js load correctly?');
                return;
            }

            const data = tagInfoData[dataKey];

            if (!data) {
                console.warn('No tag info data for key:', dataKey, 'Original:', rawText);
                return;
            }

            populateTagPanel(data, dataKey);
            openTagPanel();
        });
    });

    // Close events
    if (closeBtn) closeBtn.addEventListener('click', closeTagPanel);
    if (overlay) overlay.addEventListener('click', closeTagPanel);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('open')) {
            closeTagPanel();
        }
    });

    // Explore CTA button — scroll to routes section
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            closeTagPanel();
            setTimeout(() => {
                const routesSection = document.getElementById('routes');
                if (routesSection && lenis) {
                    lenis.scrollTo(routesSection, { offset: -80 });
                }
            }, 400);
        });
    }

    function openTagPanel() {
        panel.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
        container.scrollTop = 0;

        // GSAP entrance animations
        const tl = gsap.timeline();
        tl.fromTo('.tag-info-panel-header',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.25 }
        );
        tl.fromTo('.tag-info-panel-hero',
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
        );
        tl.fromTo('.tag-info-panel-intro',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.3'
        );
        tl.fromTo('.tag-info-stat-item',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.08, ease: 'power3.out' },
            '-=0.2'
        );
        tl.fromTo('.tag-info-highlight-card',
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
            '-=0.2'
        );
        tl.fromTo('.tag-info-destination-chip',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'power3.out' },
            '-=0.2'
        );
        tl.fromTo('.tag-info-tip-item',
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power3.out' },
            '-=0.2'
        );
        tl.fromTo('.tag-info-panel-cta',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.1'
        );
    }

    function closeTagPanel() {
        panel.classList.remove('open');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
    }

    function populateTagPanel(data, tagId) {
        // Badge
        const badgeEl = document.getElementById('tag-info-panel-badge');
        if (badgeEl) {
            badgeEl.textContent = data.badge;
            badgeEl.className = 'tag-info-panel-badge ' + (data.type === 'domestic' ? 'domestic' : 'international');
        }

        // Title
        const titleEl = document.getElementById('tag-info-panel-title');
        if (titleEl) titleEl.textContent = data.title;

        // Hero Image
        const tagImages = {
            'fethiyeparasut': 'images/parasut.jpg',
            'kasdalis': 'images/scuba_diving.jpg',
            'kackartrekking': 'images/blacksea_highlands.jpg',
            'isvicrealplertrekking': 'images/swiss.jpg',
            'misircolsafari': 'images/desert_safari.jpg',
            'kapadokyayeraltisehirleri': 'images/cappadocia_underground.jpg',
            'efesantikkenti': 'images/ephesus.jpg',
            'gobeklitepe': 'images/gobeklitepe.jpg',
            'romakolezyum': 'images/rome.jpg',
            'parislouvre': 'images/louvre.jpg',
            'misirpiramitleri': 'images/egypt.jpg',
            'gaziantepsokaklezzetleri': 'images/gaziantep_food.jpg',
            'urlasarapbaglari': 'images/urla_wine.jpg',
            'karadenizmuhlama': 'images/karadeniz_muhlama.jpg',
            'romapizzaaltaglio': 'images/roma_pizza.jpg',
            'pariskruvasan': 'images/paris_croissant.jpg',
            'fastajini': 'images/fas_tajin.jpg',
            'rizeyaylakampi': 'images/rize_yayla.jpg',
            'karscildirgolu': 'images/kars_cildir.jpg',
            'yedigollersonbahar': 'images/yedigoller_sonbahar.jpg',
            'izlandakuzeyisiklari': 'images/iceland_aurora.jpg',
            'isvicrebuzulgolleri': 'images/swiss_lake.jpg',
            'santorinigunbatimi': 'images/santorini_view.jpg',
            'istanbulmodernsanat': 'images/istanbul_modern.jpg',
            'karakoysokaksanati': 'images/karakoy_streetart.jpg',
            'ebruatolyesi': 'images/ebru_art.jpg',
            'parismontmartre': 'images/montmartre.jpg',
            'floransaronesansturu': 'images/florence_art.jpg',
            'vatikanmuzeleri': 'images/vatican_museum.jpg'
        };

        const heroEl = document.getElementById('tag-info-panel-hero');
        if (heroEl) {
            const imageUrl = tagImages[tagId] || 'images/hero_landscape.jpg';
            heroEl.style.backgroundImage = `url('${imageUrl}')`;
        }

        const subtitleEl = document.getElementById('tag-info-panel-hero-subtitle');
        if (subtitleEl) subtitleEl.textContent = data.subtitle;

        // Description
        const descEl = document.getElementById('tag-info-panel-description');
        if (descEl) descEl.textContent = data.description;

        // Stats
        const statsEl = document.getElementById('tag-info-panel-stats');
        if (statsEl) {
            statsEl.innerHTML = data.stats.map(s => `
                <div class="tag-info-stat-item">
                    <span class="stat-val">${s.value}</span>
                    <span class="stat-lbl">${s.label}</span>
                </div>
            `).join('');
        }

        // Highlights
        const highlightsEl = document.getElementById('tag-info-panel-highlights');
        if (highlightsEl) {
            highlightsEl.innerHTML = data.highlights.map(h => `
                <div class="tag-info-highlight-card">
                    <h4>${h.icon} ${h.title}</h4>
                    <p>${h.desc}</p>
                </div>
            `).join('');
        }

        // Destinations
        const destEl = document.getElementById('tag-info-panel-destinations');
        if (destEl) {
            const chipClass = data.type === 'international' ? 'tag-info-destination-chip international' : 'tag-info-destination-chip';
            destEl.innerHTML = data.destinations.map(d => `
                <span class="${chipClass}">${d}</span>
            `).join('');
        }

        // Tips
        const tipsEl = document.getElementById('tag-info-panel-tips');
        if (tipsEl) {
            tipsEl.innerHTML = data.tips.map(t => `
                <div class="tag-info-tip-item">${t}</div>
            `).join('');
        }

        // Explore button text
        const exploreBtn = document.getElementById('tag-info-panel-explore-btn');
        if (exploreBtn) {
            const btnText = data.type === 'domestic' ? 'Yurtiçi Rotaları Keşfet' : 'Yurtdışı Rotaları Keşfet';
            exploreBtn.querySelector('span').textContent = btnText;
        }
    }
}

// =========================================
// TABS INITIALIZATION
// =========================================
function initTabs() {
    // Routes Tabs
    const routesTabs = document.querySelectorAll('#routes-tabs .tab-btn');
    routesTabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all tabs
            routesTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            e.target.classList.add('active');

            const targetId = e.target.getAttribute('data-target');

            // Hide all tracks
            document.querySelectorAll('.routes-track').forEach(track => {
                if (track.id === targetId) {
                    track.style.display = 'flex';
                    setTimeout(() => {
                        track.style.opacity = '1';
                        track.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    track.style.opacity = '0';
                    track.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        track.style.display = 'none';
                    }, 400); // Wait for transition
                }
            });

            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
    });

    // Cities Tabs
    const citiesTabs = document.querySelectorAll('#cities-tabs .tab-btn');
    citiesTabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all tabs
            citiesTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            e.target.classList.add('active');

            const targetId = e.target.getAttribute('data-target');

            // Hide all grids
            document.querySelectorAll('.cities-grid').forEach(grid => {
                if (grid.id === targetId) {
                    grid.style.display = 'grid';
                    setTimeout(() => {
                        grid.style.opacity = '1';
                        grid.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    grid.style.opacity = '0';
                    grid.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        grid.style.display = 'none';
                    }, 400); // Wait for transition
                }
            });

            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
    });
}

// =========================================
// FOOTER INFO MODAL
// =========================================
function initFooterInfoModal() {
    const infoLinks = document.querySelectorAll('.footer-info-link');
    const modal = document.getElementById('info-modal');
    const overlay = document.getElementById('info-modal-overlay');
    const closeBtn = document.getElementById('info-modal-close');
    const titleEl = document.getElementById('info-modal-title');
    const textEl = document.getElementById('info-modal-text');

    if (!modal) return;

    const data = {
        story: {
            title: "Hikâyemiz",
            text: "<p>EXPLORE, seyahat tutkunlarının dünyayı keşfederken ihtiyaç duyduğu ilhamı ve rehberliği sunmak için doğdu. Geleneksel tur rotalarının dışına çıkmayı hedefleyen ekibimiz, yerel rehberlerin deneyimleriyle dijital dünyayı birleştirerek yepyeni bir seyahat platformu inşa etti.</p><br><p>Amacımız sadece yeni yerler göstermek değil, aynı zamanda o mekanların ruhunu ve hikayesini hissettirebilmek. Yola çıkmak için ihtiyacınız olan her şey artık tek bir yerde.</p>"
        },
        blog: {
            title: "Blog",
            text: "<p><strong>Biz Kimiz?</strong><br>Seyahat etmeyi sadece bir yerden bir yere gitmek değil, bir yaşam tarzı olarak benimsemiş bir ekibiz.</p><br><p><strong>Ne Yapıyoruz?</strong><br>Blogumuzda dünyanın dört bir yanından gizli kalmış rotaları, seyahat ipuçlarını, gastronomi keşiflerini ve doğa harikalarını paylaşıyoruz. Okurlarımıza 'Bir sonraki maceram neresi olmalı?' sorusunun cevabını ilham verici makalelerle sunuyoruz.</p>"
        }
    };

    function openModal(type) {
        if (!data[type]) return;

        titleEl.innerHTML = data[type].title;
        textEl.innerHTML = data[type].text;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        gsap.fromTo(modal.querySelector('.info-modal-content'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }

    function closeModal() {
        gsap.to(overlay, { opacity: 0, duration: 0.3 });
        gsap.to(modal.querySelector('.info-modal-content'), {
            y: 30, opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    infoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-type');
            openModal(type);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
}

// =========================================
// MAIN INITIALIZATION
// =========================================
function initMainAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    initTabs();
    initSmoothScroll();
    initCustomCursor();
    initNavigation();
    initHero();
    initSectionHeaders();
    initRoutes();
    initRouteModal();
    initCities();
    initCityModal();
    initExperiencePanel();
    initTagInfoPanel();
    initExperiences();
    initStories();
    initGuides();
    initStats();
    initQuote();
    initCTA();
    initSearchEngine();
    initMouseParallax();
    initFooterInfoModal();
    initChatbot();

    // Refresh ScrollTrigger after all content loaded
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);
}

// =========================================
// DOM READY
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Reset scroll to top immediately on refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';

    // Start preloader
    initPreloader();

    // Handle images loaded
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
});

// =========================================
// HANDLE RESIZE
// =========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
