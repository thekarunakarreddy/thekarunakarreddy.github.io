// ===================================
// CONTACT SECTION FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add input validation and enhancement
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    
    // Show loading state
    showLoadingState(submitBtn);
    
    // Validate form
    if (!validateForm(form)) {
        hideLoadingState(submitBtn);
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Submit form to Formspree or other service
    submitFormData(form, formData, submitBtn);
}

async function submitFormData(form, formData, submitBtn) {
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        hideLoadingState(submitBtn);
        
        if (response.ok) {
            showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        hideLoadingState(submitBtn);
        showMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email.', 'error');
        console.error('Form submission error:', error);
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type || field.tagName.toLowerCase();
    
    // Remove existing validation classes
    field.classList.remove('valid', 'invalid');
    
    // Skip validation if field is empty and not required
    if (!value && !field.required) {
        return true;
    }
    
    let isValid = true;
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    // Name validation (no numbers or special characters)
    if (field.name === 'name' && value) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        isValid = nameRegex.test(value);
    }
    
    // Subject minimum length
    if (field.name === 'subject' && value && value.length < 3) {
        isValid = false;
    }
    
    // Message minimum length
    if (field.name === 'message' && value && value.length < 10) {
        isValid = false;
    }
    
    // Apply validation classes
    if (value) {
        field.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    return isValid;
}

function clearValidation(e) {
    const field = e.target;
    field.classList.remove('invalid');
}

function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.dataset.originalText = originalText;
    button.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
}

function hideLoadingState(button) {
    button.innerHTML = button.dataset.originalText;
    button.disabled = false;
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================================
// CONTACT ANIMATIONS
// ===================================

// Animate contact cards on scroll
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactAnimations);
} else {
    initContactAnimations();
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add proper ARIA labels and descriptions
function enhanceAccessibility() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Add ARIA labels
    form.setAttribute('aria-label', 'Contact form');
    
    const submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.setAttribute('aria-describedby', 'submit-help');
        
        // Add hidden help text
        const helpText = document.createElement('div');
        helpText.id = 'submit-help';
        helpText.className = 'sr-only';
        helpText.textContent = 'Submit the contact form to send your message';
        form.appendChild(helpText);
    }
    
    // Add input descriptions
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label && input.required) {
            label.innerHTML += ' <span aria-label="required">*</span>';
        }
    });
}

// Screen reader only class for accessibility
const srOnlyStyle = document.createElement('style');
srOnlyStyle.textContent = `
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
`;
document.head.appendChild(srOnlyStyle);

// Initialize accessibility enhancements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceAccessibility);
} else {
    enhanceAccessibility();
}