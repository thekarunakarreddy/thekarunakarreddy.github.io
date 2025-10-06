/* Skills Section JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Skills Section
    initSkillsAnimations();
    initProgressBars();
    initAchievementCounters();
    
    // Skills Section Animations
    function initSkillsAnimations() {
        const skillsSection = document.querySelector('.skills-section');
        if (!skillsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillsElements();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(skillsSection);
    }
    
    // Animate Skills Elements
    function animateSkillsElements() {
        const elements = [
            { selector: '.section-subtitle', delay: 0 },
            { selector: '.section-title', delay: 200 },
            { selector: '.section-description', delay: 400 },
            { selector: '.skill-category', delay: 600 }
        ];
        
        elements.forEach(({ selector, delay }) => {
            const items = document.querySelectorAll(selector);
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }, delay + (index * 150));
            });
        });
    }
    
    // Progress Bar Animations
    function initProgressBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.getAttribute('data-level');
                    const progressBar = entry.target.querySelector('.skill-progress');
                    
                    if (progressBar && skillLevel) {
                        // Reset width and animate
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = skillLevel + '%';
                        }, 300);
                        
                        // Add animation class
                        entry.target.classList.add('animate');
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Achievement Counter Animations
    function initAchievementCounters() {
        const achievementNumbers = document.querySelectorAll('.achievement-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        achievementNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // Counter Animation Function
    function animateCounter(element) {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const hasDecimal = text.includes('.');
        
        let targetValue;
        let suffix = '';
        
        if (isPercentage) {
            targetValue = parseFloat(text.replace('%', ''));
            suffix = '%';
        } else if (hasDecimal) {
            targetValue = parseFloat(text);
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
                if (hasDecimal) {
                    element.textContent = targetValue.toFixed(1) + suffix;
                } else {
                    element.textContent = Math.floor(targetValue) + suffix;
                }
                clearInterval(timer);
                
                // Add completion effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            } else {
                if (hasDecimal) {
                    element.textContent = currentValue.toFixed(1) + suffix;
                } else {
                    element.textContent = Math.floor(currentValue) + suffix;
                }
            }
        }, frameTime);
    }
    
    // Skill Category Hover Effects
    function initSkillCategoryEffects() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
                
                // Highlight all skill bars in this category
                const skillBars = this.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.boxShadow = '0 0 10px rgba(29, 185, 84, 0.5)';
                });
            });
            
            category.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Remove highlight from skill bars
                const skillBars = this.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.boxShadow = 'none';
                });
            });
        });
    }
    
    initSkillCategoryEffects();
    
    // Individual Skill Item Effects
    function initSkillItemEffects() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const progressBar = this.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.background = 'linear-gradient(90deg, var(--spotify-green), var(--spotify-green-hover), #ffffff)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const progressBar = this.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.background = 'linear-gradient(90deg, var(--spotify-green), var(--spotify-green-hover))';
                }
            });
        });
    }
    
    initSkillItemEffects();
    
    // Achievement Item Effects
    function initAchievementEffects() {
        const achievementItems = document.querySelectorAll('.achievement-item');
        
        achievementItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const number = this.querySelector('.achievement-number');
                if (number) {
                    number.style.textShadow = '0 0 20px var(--spotify-green)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const number = this.querySelector('.achievement-number');
                if (number) {
                    number.style.textShadow = 'none';
                }
            });
        });
    }
    
    initAchievementEffects();
    
    // Staggered Animation for Skills on Scroll
    function initStaggeredSkillAnimation() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateX(-30px)';
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        
                        requestAnimationFrame(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        });
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        skillItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    initStaggeredSkillAnimation();
    
    // Responsive adjustments
    function handleSkillsResponsive() {
        const isMobile = window.innerWidth <= 768;
        const skillCategories = document.querySelectorAll('.skill-category');
        
        if (isMobile) {
            // Reduce animation delays on mobile
            skillCategories.forEach((category, index) => {
                if (category.style.animationDelay) {
                    category.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }
    }
    
    window.addEventListener('resize', handleSkillsResponsive);
    handleSkillsResponsive();
});

// CSS for additional animations
const skillsAnimationCSS = `
.skill-category {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.skill-category.animate {
    opacity: 1;
    transform: translateY(0);
}

.achievement-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.achievement-item.animate {
    opacity: 1;
    transform: translateY(0);
}

.category-icon {
    transition: transform 0.3s ease;
}

.achievement-number {
    transition: text-shadow 0.3s ease;
}
`;

// Inject CSS
const skillsStyle = document.createElement('style');
skillsStyle.textContent = skillsAnimationCSS;
document.head.appendChild(skillsStyle);