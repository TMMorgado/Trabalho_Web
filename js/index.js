
// menu hamburguer // 

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
}


document.addEventListener('DOMContentLoaded', function () {

    const testimonialSlide = document.querySelector('.testimonial-slide');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.nav-dots');


    let currentIndex = 0;
    let totalSlides = testimonials.length;
    let autoplayInterval;


    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoplay(); // 
            });
            dotsContainer.appendChild(dot);
        }
        updateActiveDot();
    }


    function updateActiveDot() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }


    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        updateActiveDot();
    }


    function updateCarousel() {

        const slideWidth = getSlideWidth();


        const translateValue = -currentIndex * slideWidth;


        testimonialSlide.style.transform = `translateX(${translateValue}%)`;


        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentIndex);
        });
    }


    function getSlideWidth() {


        if (window.innerWidth <= 768) {
            return 100;
        } else if (window.innerWidth <= 1024) {
            return 50;
        } else {
            return 33.333;
        }
    }


    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
        updateActiveDot();
    }


    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1;
        }
        updateCarousel();
        updateActiveDot();
    }


    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }


    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }


    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Pausar autoplay quando o mouse estiver sobre o carrossel
    testimonialSlide.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // Retomar autoplay quando o mouse sair do carrossel
    testimonialSlide.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Inicialização
    createDots();
    updateCarousel();
    startAutoplay(); // Iniciar o autoplay

    // Atualizar carrossel quando a janela for redimensionada
    window.addEventListener('resize', updateCarousel);
});

// Botão de voltar ao topo
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('button');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});