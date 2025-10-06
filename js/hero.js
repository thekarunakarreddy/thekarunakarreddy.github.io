/* Hero Section JavaScript
   Interactive Elements & Animations */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // HERO SECTION INITIALIZATION
    // ===================================
    
    initHeroAnimations();
    initTypingEffect();
    initCounterAnimations();
    initParallaxEffects();
    initScrollIndicator();
    
    // ===================================
    // TYPING EFFECT FOR ROLE TEXT
    // ===================================
    
    function initTypingEffect() {
        const roleText = document.querySelector('.role-text');
        if (!roleText) return;
        
        const roles = [
            'Security Operations Center Analyst',
            'Cybersecurity Professional',
            'Threat Hunter',
            'Security Specialist',
            'Incident Response Analyst'
        ];
        
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeRole() {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                currentCharIndex--;
                roleText.textContent = currentRole.substring(0, currentCharIndex);
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    setTimeout(typeRole, 500); // Pause before typing next role
                } else {
                    setTimeout(typeRole, 50); // Deleting speed
                }
            } else {
                currentCharIndex++;
                roleText.textContent = currentRole.substring(0, currentCharIndex);
                
                if (currentCharIndex === currentRole.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeRole();
                    }, 2000); // Pause before deleting
                } else {
                    setTimeout(typeRole, 100); // Typing speed
                }
            }
        }
        
        // Start typing effect after initial load
        setTimeout(() => {
            typeRole();
        }, 2000);
    }
    
    // ===================================
    // COUNTER ANIMATIONS FOR STATS
    // ===================================
    
    function initCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasSlash = text.includes('/');
        
        let targetValue;
        let suffix = '';
        
        if (hasSlash) {
            // Handle "24/7" case
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }, 500);
            return;
        }
        
        if (hasPercent) {
            targetValue = parseFloat(text.replace('%', ''));
            suffix = '%';
        } else if (hasPlus) {
            targetValue = parseInt(text.replace('+', ''));
            suffix = '+';
        } else {
            targetValue = parseInt(text);
        }
        
        let currentValue = 0;
        const increment = targetValue / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const frameTime = duration / 60;
        
        element.textContent = '0' + suffix;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                element.textContent = targetValue + suffix;
                clearInterval(timer);
                
                // Add a scale effect when animation completes
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            } else {
                element.textContent = Math.floor(currentValue) + suffix;
            }
        }, frameTime);
    }
    
    // ===================================
    // PARALLAX EFFECTS
    // ===================================
    
    function initParallaxEffects() {
        const heroSection = document.querySelector('.hero-section');
        const heroGlow = document.querySelector('.hero-glow');
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            // Parallax effect for glow
            if (heroGlow) {
                heroGlow.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
            
            // Parallax effect for floating icons
            floatingIcons.forEach((icon, index) => {
                const speed = 0.3 + (index * 0.1);
                icon.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Fade out hero content on scroll
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
                heroContent.style.opacity = opacity;
            }
        });
    }
    
    // ===================================
    // HERO SECTION ANIMATIONS
    // ===================================
    
    function initHeroAnimations() {
        // Animate elements on load
        const animatedElements = [
            { selector: '.hero-greeting', delay: 300 },
            { selector: '.hero-title', delay: 600 },
            { selector: '.hero-role', delay: 900 },
            { selector: '.hero-description', delay: 1200 },
            { selector: '.hero-cta', delay: 1500 },
            { selector: '.hero-social', delay: 1800 },
            { selector: '.hero-visual', delay: 1000 }
        ];
        
        animatedElements.forEach(({ selector, delay }) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
        
        // Add hover effects to CTA buttons
        initCTAEffects();
        
        // Add floating animation to social links
        initSocialEffects();
    }
    
    // ===================================
    // CTA BUTTON EFFECTS
    // ===================================
    
    function initCTAEffects() {
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
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
    }
    
    // ===================================
    // SOCIAL LINKS EFFECTS
    // ===================================
    
    function initSocialEffects() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach((link, index) => {
            // Staggered animation on load
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0) scale(1)';
            }, 2000 + (index * 150));
            
            // Hover effects
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                
                // Add glow effect
                this.style.boxShadow = `0 10px 25px rgba(29, 185, 84, 0.3)`;
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-lg)';
            });
        });
    }
    
    // ===================================
    // SCROLL INDICATOR
    // ===================================
    
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start' 
                });
            }
        });
        
        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const opacity = Math.max(0, 1 - (scrolled / 200));
            scrollIndicator.style.opacity = opacity;
        });
    }
    
    // ===================================
    // RESPONSIVE ADJUSTMENTS
    // ===================================
    
    function handleResponsiveAdjustments() {
        const heroContent = document.querySelector('.hero-content');
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reduce animation delays on mobile
            const animatedElements = document.querySelectorAll('.hero-text > *');
            animatedElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.1}s`;
            });
        }
    }
    
    // ===================================
    // RESIZE EVENT LISTENER
    // ===================================
    
    window.addEventListener('resize', handleResponsiveAdjustments);
    handleResponsiveAdjustments(); // Initial call
    
    // ===================================
    // INTERSECTION OBSERVER FOR HERO
    // ===================================
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add('hero-visible');
            } else {
                document.body.classList.remove('hero-visible');
            }
        });
    }, { threshold: 0.1 });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// ===================================
// CSS FOR RIPPLE EFFECT
// ===================================

const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: rippleAnimation 0.6s linear;
    pointer-events: none;
}

@keyframes rippleAnimation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);