// ========== OPTIMISATION SCRIPT CFE LOME ==========

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for anchor links
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    };

    // Navbar scroll effect
    const setupNavbarScrollEffect = () => {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (!navbar) return;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop <= 0) {
                navbar.classList.remove('scrolled', 'hidden');
                return;
            }
            navbar.classList.add('scrolled');
            if (scrollTop > lastScrollTop) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            lastScrollTop = scrollTop;
        });
    };

    // Hamburger menu toggle
    const setupHamburgerMenu = () => {
        const hamburger = document.querySelector('.navbar-toggler');
        const navMenu = document.querySelector('.navbar-collapse');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('collapsed');
                navMenu.classList.toggle('show');
            });
            document.querySelectorAll('.navbar-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.add('collapsed');
                    navMenu.classList.remove('show');
                });
            });
        }
    };

    // Scroll-triggered animations
    const setupScrollAnimations = () => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-item, .stat-card, .module-card').forEach(el => {
            observer.observe(el);
        });
    };

    // Contact form handling
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const errors = [];
                for (const [key, value] of formData.entries()) {
                    if (!value.trim() && key !== 'objet') {
                        errors.push(`Le champ ${key} est requis.`);
                    }
                }
                if (errors.length > 0) {
                    alert(errors.join('\n'));
                    return;
                }
                contactForm.classList.add('submitted');
                setTimeout(() => {
                    alert('Votre message a été envoyé avec succès !');
                    contactForm.reset();
                    contactForm.classList.remove('submitted');
                }, 1000);
            });
        }
    };

    // Newsletter form handling
    const setupNewsletterForm = () => {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                if (!email || !email.includes('@')) {
                    alert('Veuillez entrer une adresse email valide.');
                    return;
                }
                newsletterForm.classList.add('submitted');
                setTimeout(() => {
                    alert('Merci pour votre inscription à la newsletter !');
                    emailInput.value = '';
                    newsletterForm.classList.remove('submitted');
                }, 1000);
            });
        }
    };

    // Hover animation on cards
    const setupCardHoverAnimations = () => {
        document.querySelectorAll('.feature-item, .stat-card, .module-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    };

    // External link confirmation
    const setupExternalLinkConfirmation = () => {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.href.includes(window.location.hostname)) {
                    e.preventDefault();
                    if (confirm('Voulez-vous quitter le site ?')) {
                        window.open(link.href, '_blank');
                    }
                }
            });
        });
    };

    // Initialize all functions
    setupSmoothScrolling();
    setupNavbarScrollEffect();
    setupHamburgerMenu();
    setupScrollAnimations();
    setupContactForm();
    setupNewsletterForm();
    setupCardHoverAnimations();
    setupExternalLinkConfirmation();

    // Effet d'apparition sur les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-hidden');
    });
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // DOM loaded animation trigger
    document.body.classList.add('loaded');
});
const navbar = document.querySelector('.navbar');
const floatingBtn = document.getElementById('floatingCtaBtn');

function checkNavbarVisibility() {
    const rect = navbar.getBoundingClientRect();
    if (rect.bottom < 0) {
        floatingBtn.classList.add('show');
    } else {
        floatingBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', checkNavbarVisibility);
document.addEventListener('DOMContentLoaded', checkNavbarVisibility);

