// Certifications Section Interactive Features
class CertificationsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressAnimations();
        this.setupCertificationHovers();
        this.setupJourneyAnimations();
        this.setupStatsCounters();
    }

    // Animate progress bars when they come into view
    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const targetWidth = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                        entry.target.classList.add('animated');
                        this.animateProgressText(entry.target);
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // Animate progress text counter
    animateProgressText(progressBar) {
        const progressText = progressBar.parentElement.nextElementSibling;
        if (progressText && progressText.classList.contains('progress-text')) {
            const targetValue = parseInt(progressBar.style.width);
            const duration = 1500;
            const startTime = performance.now();
            
            const updateProgress = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(progress * targetValue);
                
                progressText.textContent = `${currentValue}% Complete`;
                
                if (progress < 1) {
                    requestAnimationFrame(updateProgress);
                }
            };
            
            requestAnimationFrame(updateProgress);
        }
    }

    // Enhanced effects for certification cards (removed hover animations)
    setupCertificationHovers() {
        const certCards = document.querySelectorAll('.cert-card, .certification-featured');
        
        certCards.forEach(card => {
            const skillTags = card.querySelectorAll('.skill-tag, .platform-tag');
            
            // Simple click effect for skill tags
            skillTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    tag.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        tag.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        });
    }

    // Create floating particles effect
    createFloatingParticles(container) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--spotify-green);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle 2s ease-out forwards;
            `;
            
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }
    }

    // Journey timeline progressive animation
    setupJourneyAnimations() {
        const journeyItems = document.querySelectorAll('.journey-item');
        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-journey');
                        this.animateJourneyPoint(entry.target);
                    }, index * 300);
                }
            });
        }, { threshold: 0.3 });

        journeyItems.forEach(item => journeyObserver.observe(item));
    }

    // Animate journey timeline points
    animateJourneyPoint(item) {
        const point = item.querySelector('::before');
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: 14px;
            top: 2px;
            width: 30px;
            height: 30px;
            border: 2px solid rgba(29, 185, 84, 0.6);
            border-radius: 50%;
            animation: journeyRipple 1.5s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        item.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1500);
    }

    // Animated stats counters
    setupStatsCounters() {
        const statNumbers = document.querySelectorAll('.development-stats .stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateStatCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // Counter animation for stats
    animateStatCounter(element) {
        const target = element.textContent;
        const numericValue = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/\d/g, '');
        
        if (numericValue) {
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(easeOutQuart * numericValue);
                
                element.textContent = currentValue + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target; // Ensure final value is exact
                }
            };
            
            requestAnimationFrame(updateCounter);
        }
    }





    // Certificate verification modal
    static showVerificationModal(certTitle, verificationUrl) {
        const modal = document.createElement('div');
        modal.className = 'verification-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Verify Certification</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>You are about to verify the certification:</p>
                    <h4>${certTitle}</h4>
                    <p>This will open the official verification page in a new tab.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary close-modal">Cancel</button>
                    <a href="${verificationUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                        Verify Certificate
                    </a>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }


}

// Initialize certifications manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CertificationsManager();
    
    // Add verification button handlers
    const verifyButtons = document.querySelectorAll('.verify-btn');
    verifyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const certTitle = btn.closest('.cert-content').querySelector('.cert-title').textContent;
            CertificationsManager.showVerificationModal(certTitle, btn.href);
        });
    });
});

// Add CSS for animations and modal
const certificationStyles = document.createElement('style');
certificationStyles.textContent = `
    @keyframes floatParticle {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
    
    @keyframes journeyRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
    
    .animate-journey {
        animation: slideInFromLeft 0.8s ease-out forwards;
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    

    
    .verification-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        animation: modalFadeIn 0.3s ease-out forwards;
    }
    
    @keyframes modalFadeIn {
        to { opacity: 1; }
    }
    
    .modal-content {
        background: var(--bg-secondary);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-xl);
        padding: var(--spacing-xl);
        max-width: 500px;
        width: 90%;
        animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
        from {
            transform: translateY(-50px) scale(0.9);
        }
        to {
            transform: translateY(0) scale(1);
        }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-lg);
        padding-bottom: var(--spacing-md);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .modal-header h3 {
        color: var(--text-primary);
        font-family: var(--font-secondary);
    }
    
    .close-modal {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: var(--font-size-xl);
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        transition: var(--transition-fast);
    }
    
    .close-modal:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
    }
    
    .modal-body {
        margin-bottom: var(--spacing-xl);
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .modal-body h4 {
        color: var(--spotify-green);
        margin: var(--spacing-md) 0;
    }
    
    .modal-footer {
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-end;
    }
    
    .btn-secondary {
        padding: var(--spacing-sm) var(--spacing-lg);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition-normal);
    }
    
    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .btn-primary {
        padding: var(--spacing-sm) var(--spacing-lg);
        background: var(--spotify-gradient);
        border: none;
        border-radius: var(--radius-md);
        color: var(--spotify-black);
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-normal);
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
`;

document.head.appendChild(certificationStyles);

// Export for potential use in other modules
window.CertificationsManager = CertificationsManager;