// Parallax and Animation Effects Manager
class ParallaxManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupMouseParallax();
        this.setupScrollParallax();
        this.setupParticles();
        this.setupTypewriter();
        this.setupTextReveal();
    }

    // Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Handle staggered animations
                    if (entry.target.classList.contains('stagger-container')) {
                        entry.target.classList.add('animate');
                    }
                    
                    // Handle text reveals
                    if (entry.target.classList.contains('text-reveal')) {
                        entry.target.classList.add('animate');
                    }
                }
            });
        }, observerOptions);

        // Observe all animation elements
        const animatedElements = document.querySelectorAll(
            '.section-entrance, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-container, .text-reveal'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Mouse movement parallax
    setupMouseParallax() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;

            // Parallax text elements
            const parallaxTexts = document.querySelectorAll('.parallax-text');
            parallaxTexts.forEach(text => {
                const intensity = text.dataset.intensity || 20;
                const x = mouseX * intensity;
                const y = mouseY * intensity;
                text.style.transform = `translate(${x}px, ${y}px)`;
            });

            // Mouse parallax elements
            const mouseParallax = document.querySelectorAll('.mouse-parallax');
            mouseParallax.forEach(element => {
                const intensity = element.dataset.intensity || 30;
                const x = mouseX * intensity;
                const y = mouseY * intensity;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });

            // Geometric shapes
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const intensity = 10 + (index * 5);
                const x = mouseX * intensity;
                const y = mouseY * intensity;
                shape.style.transform += ` translate(${x}px, ${y}px)`;
            });
        });
    }

    // Scroll-based parallax
    setupScrollParallax() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-bg');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Parallax layers
            const layers = document.querySelectorAll('.parallax-layer');
            layers.forEach((layer, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = scrolled * speed;
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Particle system
    setupParticles() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const particleContainers = document.querySelectorAll('.particle-background');
        
        particleContainers.forEach(container => {
            this.createParticles(container, 15);
        });
    }

    createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            
            container.appendChild(particle);
        }
    }

    // Typewriter effect
    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const computedStyle = window.getComputedStyle(element);
            
            // Create a temporary element to measure the full text width
            const tempElement = document.createElement('span');
            tempElement.style.cssText = `
                font-family: ${computedStyle.fontFamily};
                font-size: ${computedStyle.fontSize};
                font-weight: ${computedStyle.fontWeight};
                letter-spacing: ${computedStyle.letterSpacing};
                text-transform: ${computedStyle.textTransform};
                position: absolute;
                visibility: hidden;
                white-space: nowrap;
                top: -9999px;
            `;
            tempElement.textContent = text;
            document.body.appendChild(tempElement);
            
            const fullWidth = tempElement.offsetWidth;
            document.body.removeChild(tempElement);
            
            // Set the element to the full width immediately to prevent layout shift
            element.style.width = fullWidth + 'px';
            element.textContent = '';
            element.classList.add('typing');
            
            setTimeout(() => {
                let i = 0;
                const timer = setInterval(() => {
                    element.textContent = text.slice(0, i + 1);
                    i++;
                    
                    if (i === text.length) {
                        clearInterval(timer);
                        // Remove blinking cursor after typing is complete
                        setTimeout(() => {
                            element.style.borderRight = 'none';
                            element.classList.remove('typing');
                        }, 2000);
                    }
                }, 100);
            }, 1000);
        });
    }

    // Text reveal animation
    setupTextReveal() {
        const textRevealElements = document.querySelectorAll('.text-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        textRevealElements.forEach(el => observer.observe(el));
    }

    // 3D tilt effect for cards
    static setup3DTilt() {
        const tiltElements = document.querySelectorAll('.hover-3d');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // Ripple effect for buttons
    static createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Smooth scroll with easing
    static smoothScrollTo(targetId, offset = 80) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Performance optimization: disable animations on low-end devices
    static checkPerformance() {
        const isLowEndDevice = navigator.hardwareConcurrency < 4 || 
                             navigator.deviceMemory < 4 ||
                             /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isLowEndDevice) {
            document.body.classList.add('reduced-motion');
            // Disable heavy animations
            const heavyAnimations = document.querySelectorAll('.particle-background, .parallax-bg, .geometric-shapes');
            heavyAnimations.forEach(el => el.style.display = 'none');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check device performance
    ParallaxManager.checkPerformance();
    
    // Initialize parallax manager
    new ParallaxManager();
    
    // Setup 3D tilt effects
    ParallaxManager.setup3DTilt();
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .nav-link, .project-card');
    buttons.forEach(button => {
        button.addEventListener('click', ParallaxManager.createRipple);
    });
    
    // Add geometric shapes to hero section
    const heroSection = document.querySelector('#hero');
    if (heroSection && window.innerWidth > 768) {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'geometric-shapes';
        
        // Create shapes
        const shapes = [
            { type: 'circle', class: 'circle' },
            { type: 'square', class: 'square' },
            { type: 'triangle', class: 'triangle' }
        ];
        
        shapes.forEach(shape => {
            const shapeElement = document.createElement('div');
            shapeElement.className = `shape ${shape.class}`;
            shapesContainer.appendChild(shapeElement);
        });
        
        heroSection.appendChild(shapesContainer);
    }
    
    // Add parallax background to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (window.innerWidth > 768 && index % 2 === 0) {
            section.classList.add('parallax-container');
            const parallaxBg = document.createElement('div');
            parallaxBg.className = 'parallax-bg';
            parallaxBg.dataset.speed = '0.3';
            section.insertBefore(parallaxBg, section.firstChild);
        }
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(29, 185, 84, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(rippleStyle);

// Export for use in other modules
window.ParallaxManager = ParallaxManager;