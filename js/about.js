/* About Section JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize About Section
    initAboutAnimations();
    initScrollAnimations();
    initHighlightCards();
    
    // About Section Animations
    function initAboutAnimations() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateAboutElements();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(aboutSection);
    }
    
    // Animate About Elements
    function animateAboutElements() {
        const elements = [
            { selector: '.section-subtitle', delay: 0 },
            { selector: '.section-title', delay: 200 },
            { selector: '.section-description', delay: 400 },
            { selector: '.about-intro', delay: 600 },
            { selector: '.detail-group', delay: 800 },
            { selector: '.about-cta', delay: 1000 },
            { selector: '.about-visual', delay: 400 }
        ];
        
        elements.forEach(({ selector, delay }) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    requestAnimationFrame(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                }, delay);
            }
        });
        
        // Animate detail groups with stagger
        const detailGroups = document.querySelectorAll('.detail-group');
        detailGroups.forEach((group, index) => {
            setTimeout(() => {
                group.style.opacity = '0';
                group.style.transform = 'translateX(-30px)';
                group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                requestAnimationFrame(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateX(0)';
                });
            }, 800 + (index * 200));
        });
    }
    
    // Scroll Animations for List Items
    function initScrollAnimations() {
        const listItems = document.querySelectorAll('.detail-list li');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, Math.random() * 300);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        listItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Highlight Cards Animation
    function initHighlightCards() {
        const highlightCards = document.querySelectorAll('.highlight-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(highlightCards).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(30px) scale(0.9)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        requestAnimationFrame(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        });
                    }, index * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        highlightCards.forEach(card => {
            observer.observe(card);
        });
        
        // Add hover effects
        highlightCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.highlight-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.highlight-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // Button Effects
    const buttons = document.querySelectorAll('.btn-outline, .btn-text');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Parallax Effect for About Image
    function initParallaxEffect() {
        const aboutImage = document.querySelector('.about-image');
        if (!aboutImage) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const imageOffset = aboutImage.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > imageOffset && scrolled < imageOffset + aboutImage.offsetHeight) {
                const yPos = -(scrolled - imageOffset) * 0.1;
                aboutImage.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    initParallaxEffect();
    
    // Counter Animation for Highlights
    function animateCounters() {
        const highlightNumbers = document.querySelectorAll('.highlight-number');
        
        highlightNumbers.forEach(number => {
            const text = number.textContent;
            
            if (text === '24/7') {
                // Special animation for 24/7
                let current = 0;
                const target = 24;
                const increment = target / 30;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        number.textContent = '24/7';
                        clearInterval(timer);
                    } else {
                        number.textContent = Math.floor(current) + '/7';
                    }
                }, 50);
            }
        });
    }
    
    // Initialize counter animation when section is visible
    const highlightSection = document.querySelector('.about-highlights');
    if (highlightSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(highlightSection);
    }
    
    // Responsive adjustments
    function handleResponsiveAdjustments() {
        const isMobile = window.innerWidth <= 768;
        const aboutContent = document.querySelector('.about-content');
        
        if (isMobile && aboutContent) {
            // Adjust animations for mobile
            const animatedElements = document.querySelectorAll('.about-text > *');
            animatedElements.forEach((element, index) => {
                if (element.style.animationDelay) {
                    element.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }
    }
    
    window.addEventListener('resize', handleResponsiveAdjustments);
    handleResponsiveAdjustments();
});

// CSS for ripple effect
const aboutRippleCSS = `
.btn-outline,
.btn-text {
    position: relative;
    overflow: hidden;
}

.btn-outline .ripple,
.btn-text .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(29, 185, 84, 0.3);
    transform: scale(0);
    animation: aboutRipple 0.6s linear;
    pointer-events: none;
}

@keyframes aboutRipple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject CSS
const aboutStyle = document.createElement('style');
aboutStyle.textContent = aboutRippleCSS;
document.head.appendChild(aboutStyle);