document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    
    // Configuration
    const images = [
        'images/headline-home.jpg', // Placeholder 1
        'images/coffee1.jpg',       // Placeholder 2
        'images/coffee2.jpg'        // Placeholder 3
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
