document.addEventListener('DOMContentLoaded', function () {
    const slide = document.querySelector('.testimonial-slide');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.nav-dots');

    let currentIndex = 0;
    let testimonialCount = testimonials.length;
    let viewportWidth = window.innerWidth;
    let itemsPerView = getItemsPerView();

    // Inicializar o carrossel
    init();

    // Funções
    function getItemsPerView() {
        if (viewportWidth <= 480) return 1;
        if (viewportWidth <= 768) return 2;
        if (viewportWidth <= 1024) return 3;
        return 4;
    }

    function init() {
        // Clonar os primeiros testimonials para smooth infinite scroll (opcional)
        for (let i = 0; i < itemsPerView && i < testimonialCount; i++) {
            const clone = testimonials[i].cloneNode(true);
            slide.appendChild(clone);
        }

        createDots();
        updateCarousel();
        setActiveTestimonial(currentIndex);

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        window.addEventListener('resize', handleResize);
    }

    function createDots() {
        const pageCount = Math.ceil(testimonialCount / itemsPerView);

        for (let i = 0; i < pageCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');

            dot.addEventListener('click', function () {
                goToSlide(i * itemsPerView);
            });

            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        const activeDotIndex = Math.floor(currentIndex / itemsPerView);

        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === activeDotIndex % dots.length) {
                dot.classList.add('active');
            }
        });
    }

    function setActiveTestimonial(index) {
        testimonials.forEach(item => item.classList.remove('active'));

        const activeIndex = index % testimonialCount;
        testimonials[activeIndex].classList.add('active');

        if (itemsPerView > 1) {
            const nextActiveIndex = (activeIndex + 1) % testimonialCount;
            testimonials[nextActiveIndex].classList.add('active');
        }

        updateDots();
    }

    function updateCarousel() {
        const testimonialWidth = 100 / itemsPerView;

        testimonials.forEach(item => {
            item.style.flex = `0 0 ${testimonialWidth}%`; // ✅ Usar crase
        });

        slide.style.transform = `translateX(-${currentIndex * testimonialWidth}%)`; // ✅ Corrigido
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = testimonialCount - 1;
        }

        updateCarousel();
        setActiveTestimonial(currentIndex);
    }

    function nextSlide() {
        if (currentIndex < testimonialCount - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        updateCarousel();
        setActiveTestimonial(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index % testimonialCount;
        updateCarousel();
        setActiveTestimonial(currentIndex);
    }

    function handleResize() {
        viewportWidth = window.innerWidth;
        const newItemsPerView = getItemsPerView();

        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            dotsContainer.innerHTML = '';
            createDots();
            updateCarousel();
            setActiveTestimonial(currentIndex);
        }
    }

    // Auto-rotação do carrossel
    setInterval(nextSlide, 5000);
});
