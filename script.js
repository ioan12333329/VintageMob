/**
 * VintageMob - Interactivitate Site
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EFECT DE APARIȚIE LA SCROLL (FADE-IN)
    // Face pozele și textul să "alunece" în ecran când ajungi la ele
    const elementeAnimate = document.querySelectorAll('.rand, .foto-item, .container-text');

    const observerOptions = {
        threshold: 0.15, // Pornește când 15% din element e vizibil
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vizibil');
                observer.unobserve(entry.target); // Animăm o singură dată
            }
        });
    }, observerOptions);

    elementeAnimate.forEach(el => {
        // Pregătim elementele pentru animație (le facem invizibile inițial)
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // 2. NAVIGARE ACTIVĂ
    // Marchează în meniu pagina pe care te afli (Acasă, Portofoliu, etc.)
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // 3. VALIDARE FORMULAR CONTACT (Simplă)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nume = this.querySelector('input[name="nume"]').value;
            if (nume.length < 3) {
                alert("Te rugăm să introduci un nume valid.");
                e.preventDefault(); // Oprește trimiterea dacă numele e prea scurt
            }
        });
    }
});

// Adăugăm clasa vizibil în JavaScript pentru a declanșa animația CSS
// (Aceasta este o mică scurtătură logică)
document.head.insertAdjacentHTML('beforeend', `
<style>
    .vizibil {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .nav-links a.active {
        border-bottom: 2px solid #D2B48C;
        color: #D2B48C !important;
    }
</style>
`);

const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        const count = 0;
        const speed = 2000 / target; // Durata totală 2 secunde

        const updateCount = () => {
            const current = parseInt(stat.innerText);
            if (current < target) {
                stat.innerText = Math.ceil(current + (target / 100));
                setTimeout(updateCount, 20);
            } else {
                // În loc de: stat.innerText = target + suffix; 
// Folosește:
stat.innerText = (stat.innerText.includes('+') ? '+' : '') + target + (stat.innerText.includes('%') ? '%' : '');
            }
        };
        
        
    });
};

// Pornim animația (putem folosi un IntersectionObserver dacă vrem să pornească doar când dăm scroll la ele)
animateStats();
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    const statItems = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Funcția care animă cifrele (numărătoarea)
    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.innerText.replace(/[0-9]/g, ''); // Salvăm + sau %
        let current = 0;
        const duration = 2000; // 2 secunde
        const increment = target / (duration / 16); // 60 FPS aprox

        const update = () => {
            current += increment;
            if (current < target) {
                el.innerText = Math.ceil(current) + suffix;
                requestAnimationFrame(update);
            } else {
                el.innerText = target + suffix;
            }
        };
        update();
    };

    // Observer-ul care "pândește" secțiunea
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Adăugăm clasa pentru animația de reveal (CSS)
                statItems.forEach(item => item.classList.add('visible'));
                
                // 2. Pornim numărătoarea pentru fiecare cifră
                statNumbers.forEach(num => {
                    // Stocăm valoarea țintă într-un atribut dacă nu e deja
                    if(!num.getAttribute('data-target')) {
                        num.setAttribute('data-target', num.innerText.replace(/[^0-9]/g, ''));
                    }
                    countUp(num);
                });

                // Oprim observarea după ce s-a declanșat o dată
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Declanșează când 20% din secțiune e vizibilă

    observer.observe(statsSection);
});




document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.v-step');

    const observerOptions = {
        threshold: 0.25 // Pasul apare când 25% din el este vizibil
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Putem opri observarea dacă vrem să rămână afișat permanent
                // stepObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    steps.forEach(step => {
        stepObserver.observe(step);
    });
});


