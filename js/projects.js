/* Projects Section JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Projects Section
    initProjectsAnimations();
    initProjectCardEffects();
    initGitHubCardEffects();
    
    // Projects Section Animations
    function initProjectsAnimations() {
        const projectsSection = document.querySelector('.projects-section');
        if (!projectsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProjectsElements();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(projectsSection);
    }
    
    // Animate Projects Elements
    function animateProjectsElements() {
        const elements = [
            { selector: '.section-subtitle', delay: 0 },
            { selector: '.section-title', delay: 200 },
            { selector: '.section-description', delay: 400 }
        ];
        
        elements.forEach(({ selector, delay }) => {
            const element = document.querySelector(`.projects-section ${selector}`);
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
        
        // Animate project cards with stagger
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px) scale(0.9)';
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                });
            }, 600 + (index * 150));
        });
        
        // Animate GitHub card
        const githubCard = document.querySelector('.github-card');
        if (githubCard) {
            setTimeout(() => {
                githubCard.style.opacity = '0';
                githubCard.style.transform = 'translateY(30px)';
                githubCard.style.transition = 'opacity 1s ease, transform 1s ease';
                
                requestAnimationFrame(() => {
                    githubCard.style.opacity = '1';
                    githubCard.style.transform = 'translateY(0)';
                });
            }, 1200);
        }
    }
    
    // Project Card Effects
    function initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Hover effect for project icon
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.project-icon');
                const techTags = this.querySelectorAll('.tech-tag');
                
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }
                
                // Animate tech tags
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-3px)';
                        tag.style.background = 'rgba(29, 185, 84, 0.15)';
                        tag.style.borderColor = 'rgba(29, 185, 84, 0.4)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.project-icon');
                const techTags = this.querySelectorAll('.tech-tag');
                
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Reset tech tags
                techTags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.background = 'rgba(255, 255, 255, 0.05)';
                    tag.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                });
            });
            
            // Click animation for project links
            const projectLinks = card.querySelectorAll('.project-link');
            projectLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('project-ripple');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        });
        
        // Intersection Observer for individual cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        projectCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
    
    // GitHub Card Effects
    function initGitHubCardEffects() {
        const githubCard = document.querySelector('.github-card');
        const githubIcon = document.querySelector('.github-icon');
        const githubLink = document.querySelector('.github-link');
        
        if (githubCard && githubIcon) {
            githubCard.addEventListener('mouseenter', function() {
                githubIcon.style.transform = 'scale(1.2) rotate(15deg)';
                githubIcon.style.boxShadow = '0 10px 30px rgba(29, 185, 84, 0.4)';
            });
            
            githubCard.addEventListener('mouseleave', function() {
                githubIcon.style.transform = 'scale(1) rotate(0deg)';
                githubIcon.style.boxShadow = 'none';
            });
        }
        
        if (githubLink) {
            githubLink.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('github-ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    }
    
    // Tech Tag Animation on Scroll
    function initTechTagAnimations() {
        const techTags = document.querySelectorAll('.tech-tag');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const parentCard = entry.target.closest('.project-card');
                    const allTags = parentCard.querySelectorAll('.tech-tag');
                    const tagIndex = Array.from(allTags).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px) scale(0.8)';
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        
                        requestAnimationFrame(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        });
                    }, tagIndex * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        techTags.forEach(tag => {
            observer.observe(tag);
        });
    }
    
    initTechTagAnimations();
    
    // Featured Project Highlight
    function initFeaturedProjectEffect() {
        const featuredProject = document.querySelector('.project-card.featured');
        
        if (featuredProject) {
            // Add periodic glow effect
            setInterval(() => {
                featuredProject.style.boxShadow = '0 0 30px rgba(29, 185, 84, 0.3)';
                setTimeout(() => {
                    featuredProject.style.boxShadow = 'var(--shadow-xl)';
                }, 1000);
            }, 5000);
        }
    }
    
    initFeaturedProjectEffect();
    
    // Parallax Effect for Project Icons
    function initProjectParallax() {
        const projectIcons = document.querySelectorAll('.project-icon');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            projectIcons.forEach((icon, index) => {
                const iconRect = icon.getBoundingClientRect();
                const iconCenter = iconRect.top + iconRect.height / 2;
                const windowCenter = window.innerHeight / 2;
                const distance = iconCenter - windowCenter;
                const movement = distance * 0.02; // Subtle parallax
                
                icon.style.transform = `translateY(${movement}px)`;
            });
        });
    }
    
    initProjectParallax();
    
    // Responsive adjustments
    function handleProjectsResponsive() {
        const isMobile = window.innerWidth <= 768;
        const projectCards = document.querySelectorAll('.project-card');
        
        if (isMobile) {
            // Reduce animation delays on mobile
            projectCards.forEach((card, index) => {
                if (card.style.animationDelay) {
                    card.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }
    }
    
    window.addEventListener('resize', handleProjectsResponsive);
    handleProjectsResponsive();
});

// CSS for ripple effects
const projectsRippleCSS = `
.project-link,
.github-link {
    position: relative;
    overflow: hidden;
}

.project-ripple,
.github-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: projectRipple 0.6s linear;
    pointer-events: none;
}

@keyframes projectRipple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.project-card {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.project-card.visible {
    opacity: 1;
    transform: translateY(0);
}

.tech-tag {
    transition: all 0.3s ease;
}

.project-icon {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.github-icon {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
`;

// Inject CSS
const projectsStyle = document.createElement('style');
projectsStyle.textContent = projectsRippleCSS;
document.head.appendChild(projectsStyle);