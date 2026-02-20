document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    
    // Configuration
    const images = [
        'images/headline-home.jpg', // Placeholder 1
        'images/coffee1.jpg',       // Placeholder 2
        'images/coffee6.jpg'        // Placeholder 3
    ];
    const intervalTime = 5000; // 5 seconds

    if (!heroSection) return;

    // Create Carousel Container
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('hero-carousel');
    
    // Create Image Slides
    images.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('hero-slide');
        if (index === 0) slide.classList.add('active');
        
        slide.style.backgroundImage = `url('${src}')`;
        carouselContainer.appendChild(slide);
    });

    // Insert carousel as the first child of hero section (behind content)
    heroSection.insertBefore(carouselContainer, heroSection.firstChild);

    // Carousel Logic
    const slides = carouselContainer.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, intervalTime);
});

// =========================================
// MERGED: NEW INTERACTIONS (Phase 3)
// Used by: programs.html, book.html, etc.
// =========================================

    // --- Mobile Menu Toggle ---
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu'); // Use ID selector
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.kk-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Premium Scroll Animations (IntersectionObserver) ---
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Slightly higher threshold for better "pop"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, observerOptions);

        // Select specific elements for different animation styles
        // We use querySelectorAll to find elements and add reveal classes if they don't have them
        const animatedElements = document.querySelectorAll('.program-card, .skill-card, .about-card, .section-heading, .hero-text, .contact-item');
        
        animatedElements.forEach((el, index) => {
            // Add base reveal class if missing
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
                // Alternating animations for variety
                if (el.classList.contains('section-heading')) {
                     el.classList.add('fade-up');
                } else if (el.classList.contains('program-card') || el.classList.contains('skill-card')) {
                    el.classList.add('fade-scale');
                } else {
                    el.classList.add('fade-up');
                }
            }
            // Add stagger delays dynamically based on position in grid
            // This is a simple heuristic: index % 3 * 0.1s
            const delay = (index % 3) * 0.15; 
            el.style.transitionDelay = `${delay}s`;

            observer.observe(el);
        });
    }

    // --- Glassmorphism Navbar ---
    const navbar = document.querySelector('.navbar') || document.querySelector('.kk-nav').closest('header'); // Support both new and old nav
    
if (navbar) {
        navbar.classList.add('glass-nav');
        window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('glass-nav');
        } else {
            navbar.classList.add('glass-nav');
        }
        });
    }
    
    // --- Booking Form Handling ---
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = bookingForm.querySelector('button[type="submit"]');
            
            // Loading State
            btn.innerText = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Simulate API Call
            setTimeout(() => {
                // Success State
                btn.innerText = '🎉 Booking Received!';
                btn.style.backgroundColor = '#10b981'; // Success Green
                btn.style.color = '#fff';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.innerText = "Thanks! We'll contact you within 24 hours to confirm your session.";
                successMsg.style.padding = '16px';
                successMsg.style.marginTop = '20px';
                successMsg.style.backgroundColor = '#ecfdf5';
                successMsg.style.color = '#065f46';
                successMsg.style.borderRadius = '8px';
                successMsg.style.textAlign = 'center';
                
                bookingForm.appendChild(successMsg);
                bookingForm.reset();
            }, 1500);
        });
    }
