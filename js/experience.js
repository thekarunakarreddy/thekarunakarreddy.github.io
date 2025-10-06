// Experience Section Interactive Features
class ExperienceManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTimelineAnimations();
        this.setupStatCounters();
        this.setupExperienceHovers();
        this.setupProgressiveDisclosure();
    }

    // Timeline progressive reveal animation
    setupTimelineAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        this.animateTimelinePoint(entry.target);
                    }, index * 200);
                }
            });
        }, observerOptions);

        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Animate timeline point with ripple effect
    animateTimelinePoint(item) {
        const point = item.querySelector('::before');
        if (point) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: 14px;
                top: 22px;
                width: 30px;
                height: 30px;
                border: 2px solid rgba(29, 185, 84, 0.6);
                border-radius: 50%;
                animation: timelineRipple 1s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            item.appendChild(ripple);

            setTimeout(() => ripple.remove(), 1000);
        }
    }

    // Animated stat counters
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.summary-stats .stat-number');
        const countersObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => countersObserver.observe(stat));
    }

    // Counter animation
    animateCounter(element) {
        const target = element.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (isNumber) {
            const finalValue = parseInt(target);
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(easeOutQuart * finalValue);
                
                element.textContent = currentValue.toString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target; // Ensure final value is exact
                }
            };
            
            requestAnimationFrame(updateCounter);
        } else {
            // For non-numeric values like "24/7", animate character by character
            element.textContent = '';
            const chars = target.split('');
            chars.forEach((char, index) => {
                setTimeout(() => {
                    element.textContent += char;
                }, index * 100);
            });
        }
    }

    // Enhanced hover effects for experience items
    setupExperienceHovers() {
        const experienceItems = document.querySelectorAll('.experience-item');
        
        experienceItems.forEach(item => {
            const achievements = item.querySelectorAll('.achievement-list li');
            const techTags = item.querySelectorAll('.tech-tag');
            
            // Stagger animation for achievements on hover
            item.addEventListener('mouseenter', () => {
                achievements.forEach((achievement, index) => {
                    setTimeout(() => {
                        achievement.style.transform = 'translateX(10px)';
                        achievement.style.transition = 'transform 0.3s ease';
                    }, index * 50);
                });
                
                // Animate tech tags
                techTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-3px) scale(1.05)';
                    }, index * 30);
                });
            });
            
            item.addEventListener('mouseleave', () => {
                achievements.forEach(achievement => {
                    achievement.style.transform = 'translateX(0)';
                });
                
                techTags.forEach(tag => {
                    tag.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    }

    // Progressive disclosure for experience details
    setupProgressiveDisclosure() {
        const experienceItems = document.querySelectorAll('.experience-item');
        
        experienceItems.forEach(item => {
            const achievements = item.querySelector('.achievements');
            const techSection = item.querySelector('.technologies-used');
            
            // Create toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'details-toggle';
            toggleButton.innerHTML = `
                <span class="toggle-text">Show Details</span>
                <i class="fas fa-chevron-down toggle-icon"></i>
            `;
            
            // Insert toggle button after job description
            const jobDescription = item.querySelector('.job-description');
            jobDescription.parentNode.insertBefore(toggleButton, achievements);
            
            // Initially hide detailed sections on mobile
            if (window.innerWidth <= 768) {
                achievements.style.display = 'none';
                techSection.style.display = 'none';
                toggleButton.style.display = 'flex';
            } else {
                toggleButton.style.display = 'none';
            }
            
            // Toggle functionality
            toggleButton.addEventListener('click', () => {
                const isExpanded = achievements.style.display !== 'none';
                const toggleText = toggleButton.querySelector('.toggle-text');
                const toggleIcon = toggleButton.querySelector('.toggle-icon');
                
                if (isExpanded) {
                    achievements.style.display = 'none';
                    techSection.style.display = 'none';
                    toggleText.textContent = 'Show Details';
                    toggleIcon.style.transform = 'rotate(0deg)';
                } else {
                    achievements.style.display = 'block';
                    techSection.style.display = 'block';
                    toggleText.textContent = 'Hide Details';
                    toggleIcon.style.transform = 'rotate(180deg)';
                }
                
                // Animate the expansion
                achievements.style.animation = 'slideIn 0.3s ease-out';
                techSection.style.animation = 'slideIn 0.3s ease-out';
            });
        });
    }

    // Smooth scroll to experience section with timeline highlight
    static scrollToExperience() {
        const experienceSection = document.getElementById('experience');
        if (experienceSection) {
            experienceSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight timeline after scroll
            setTimeout(() => {
                const timeline = document.querySelector('.experience-timeline');
                if (timeline) {
                    timeline.classList.add('highlight-timeline');
                    setTimeout(() => {
                        timeline.classList.remove('highlight-timeline');
                    }, 2000);
                }
            }, 1000);
        }
    }

    // Update experience section based on scroll position
    updateActiveExperience() {
        const experienceItems = document.querySelectorAll('.experience-item');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        experienceItems.forEach(item => {
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;
            
            if (scrollPosition >= itemTop && scrollPosition <= itemBottom) {
                item.classList.add('active-experience');
            } else {
                item.classList.remove('active-experience');
            }
        });
    }
}

// Initialize experience manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ExperienceManager();
    
    // Update active experience on scroll
    const experienceManager = new ExperienceManager();
    window.addEventListener('scroll', () => {
        experienceManager.updateActiveExperience();
    });
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => {
        const toggleButtons = document.querySelectorAll('.details-toggle');
        toggleButtons.forEach(button => {
            if (window.innerWidth <= 768) {
                button.style.display = 'flex';
            } else {
                button.style.display = 'none';
                // Show all content on desktop
                const item = button.closest('.experience-item');
                const achievements = item.querySelector('.achievements');
                const techSection = item.querySelector('.technologies-used');
                achievements.style.display = 'block';
                techSection.style.display = 'block';
            }
        });
    });
});

// Add CSS for animations and toggle button
const experienceStyles = document.createElement('style');
experienceStyles.textContent = `
    .details-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        background: rgba(29, 185, 84, 0.1);
        border: 1px solid rgba(29, 185, 84, 0.3);
        border-radius: var(--radius-lg);
        padding: var(--spacing-sm) var(--spacing-md);
        color: var(--spotify-green);
        font-size: var(--font-size-sm);
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition-normal);
        margin: var(--spacing-md) 0;
        width: 100%;
    }
    
    .details-toggle:hover {
        background: rgba(29, 185, 84, 0.2);
        border-color: var(--spotify-green);
    }
    
    .toggle-icon {
        transition: transform var(--transition-normal);
    }
    
    @keyframes timelineRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .active-experience {
        border-color: rgba(29, 185, 84, 0.4) !important;
        box-shadow: 0 0 30px rgba(29, 185, 84, 0.2) !important;
    }
    
    .highlight-timeline::before {
        background: linear-gradient(to bottom, 
            var(--spotify-green), 
            var(--spotify-green-hover), 
            var(--spotify-green)
        ) !important;
        animation: pulseTimeline 2s ease-in-out;
    }
    
    @keyframes pulseTimeline {
        0%, 100% { 
            box-shadow: 0 0 10px rgba(29, 185, 84, 0.5);
        }
        50% { 
            box-shadow: 0 0 25px rgba(29, 185, 84, 0.8);
        }
    }
`;

document.head.appendChild(experienceStyles);

// Export for potential use in other modules
window.ExperienceManager = ExperienceManager;