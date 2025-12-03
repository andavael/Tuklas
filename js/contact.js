// ========================================
// CONTACT FORM VALIDATION & INTERACTION - REVISED
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // FORM ELEMENTS
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = contactForm?.querySelector('.btn-submit');
    
    // Error Message Elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Check if form exists (for pages without contact form)
    if (!contactForm) return;
    
    // ========================================
    // VALIDATION FUNCTIONS
    // ========================================
    
    /**
     * Validate name field
     * @param {string} name - The name to validate
     * @returns {string|null} - Error message or null if valid
     */
    function validateName(name) {
        const trimmedName = name.trim();
        
        if (trimmedName === '') {
            return 'Name is required';
        }
        
        if (trimmedName.length < 2) {
            return 'Name must be at least 2 characters';
        }
        
        if (trimmedName.length > 50) {
            return 'Name must not exceed 50 characters';
        }
        
        // Check for valid characters (letters, spaces, hyphens, apostrophes)
        const nameRegex = /^[a-zA-Z\s\-']+$/;
        if (!nameRegex.test(trimmedName)) {
            return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        
        return null;
    }
    
    /**
     * Validate email field
     * @param {string} email - The email to validate
     * @returns {string|null} - Error message or null if valid
     */
    function validateEmail(email) {
        const trimmedEmail = email.trim();
        
        if (trimmedEmail === '') {
            return 'Email is required';
        }
        
        // More comprehensive email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmedEmail)) {
            return 'Please enter a valid email address';
        }
        
        // Check email length
        if (trimmedEmail.length > 100) {
            return 'Email must not exceed 100 characters';
        }
        
        return null;
    }
    
    /**
     * Validate message field
     * @param {string} message - The message to validate
     * @returns {string|null} - Error message or null if valid
     */
    function validateMessage(message) {
        const trimmedMessage = message.trim();
        
        if (trimmedMessage === '') {
            return 'Message is required';
        }
        
        if (trimmedMessage.length < 10) {
            return 'Message must be at least 10 characters';
        }
        
        if (trimmedMessage.length > 1000) {
            return 'Message must not exceed 1000 characters';
        }
        
        return null;
    }
    
    // ========================================
    // ERROR DISPLAY FUNCTION
    // ========================================
    
    /**
     * Display or clear error message for an input field
     * @param {HTMLElement} input - The input element
     * @param {HTMLElement} errorElement - The error message element
     * @param {string|null} errorMessage - The error message to display
     */
    function displayError(input, errorElement, errorMessage) {
        if (errorMessage) {
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        } else {
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    // ========================================
    // REAL-TIME VALIDATION
    // ========================================
    
    // Validate on blur (when user leaves the field)
    nameInput.addEventListener('blur', function() {
        const error = validateName(this.value);
        displayError(nameInput, nameError, error);
    });
    
    emailInput.addEventListener('blur', function() {
        const error = validateEmail(this.value);
        displayError(emailInput, emailError, error);
    });
    
    messageInput.addEventListener('blur', function() {
        const error = validateMessage(this.value);
        displayError(messageInput, messageError, error);
    });
    
    // Clear errors on input (immediate feedback when user corrects)
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            const error = validateName(this.value);
            if (!error) {
                displayError(nameInput, nameError, null);
            }
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            const error = validateEmail(this.value);
            if (!error) {
                displayError(emailInput, emailError, null);
            }
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            const error = validateMessage(this.value);
            if (!error) {
                displayError(messageInput, messageError, null);
            }
        }
    });
    
    // ========================================
    // FORM SUBMISSION
    // ========================================
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide success message if visible
        formSuccess.classList.remove('show');
        
        // Validate all fields
        const nameValidation = validateName(nameInput.value);
        const emailValidation = validateEmail(emailInput.value);
        const messageValidation = validateMessage(messageInput.value);
        
        // Display all errors
        displayError(nameInput, nameError, nameValidation);
        displayError(emailInput, emailError, emailValidation);
        displayError(messageInput, messageError, messageValidation);
        
        // Check if form is valid
        if (!nameValidation && !emailValidation && !messageValidation) {
            // Form is valid - show loading state
            showLoadingState();
            
            // Simulate API call (replace with actual submission)
            setTimeout(function() {
                handleSuccessfulSubmission();
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                firstError.focus();
            }
        }
    });
    
    /**
     * Show loading state on submit button
     */
    function showLoadingState() {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
            </svg>
        `;
    }
    
    /**
     * Handle successful form submission
     */
    function handleSuccessfulSubmission() {
        // Log form data (replace with actual API call)
        console.log('Form submitted successfully!');
        console.log({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        });
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <span class="btn-text">Send Message</span>
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
        `;
        
        // Show success message
        formSuccess.classList.add('show');
        formSuccess.setAttribute('role', 'alert');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form after delay
        setTimeout(function() {
            contactForm.reset();
            formSuccess.classList.remove('show');
            
            // Clear any aria-invalid attributes
            nameInput.setAttribute('aria-invalid', 'false');
            emailInput.setAttribute('aria-invalid', 'false');
            messageInput.setAttribute('aria-invalid', 'false');
        }, 5000);
    }
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.addEventListener('click', function() {
            toggleFAQ(item);
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item);
            }
        });
    });
    
    /**
     * Toggle FAQ item open/closed
     * @param {HTMLElement} item - The FAQ item to toggle
     */
    function toggleFAQ(item) {
        const question = item.querySelector('.faq-question');
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(function(faq) {
            faq.classList.remove('active');
            const faqQuestion = faq.querySelector('.faq-question');
            if (faqQuestion) {
                faqQuestion.setAttribute('aria-expanded', 'false');
            }
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    }
    
    // ========================================
    // SMOOTH SCROLL FOR CONTACT LINKS
    // ========================================
    
    const contactLinks = document.querySelectorAll('a[href="#contact"], a[href="contact.html#contact"]');
    
    contactLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle hash links on same page
            if (href === '#contact') {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active navigation state
                    updateActiveNav(this);
                    
                    // Focus on first form input for accessibility
                    setTimeout(function() {
                        nameInput.focus();
                    }, 500);
                }
            }
        });
    });
    
    /**
     * Update active navigation link
     * @param {HTMLElement} activeLink - The link to mark as active
     */
    function updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(function(navLink) {
            navLink.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    
    // Only run animations if user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);
        
        // Observe info cards for staggered animation
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
            observer.observe(card);
        });
        
        // Observe FAQ items
        const faqItemsObserve = document.querySelectorAll('.faq-item');
        faqItemsObserve.forEach(function(item, index) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }
    
    // ========================================
    // FORM AUTO-SAVE (Optional Enhancement)
    // ========================================
    
    // Save form data to localStorage as user types
    const STORAGE_KEY = 'tuklas_contact_form_draft';
    
    /**
     * Save form data to localStorage
     */
    function saveFormDraft() {
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
            timestamp: Date.now()
        };
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        } catch (e) {
            console.warn('Could not save form draft:', e);
        }
    }
    
    /**
     * Load form data from localStorage
     */
    function loadFormDraft() {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            
            if (savedData) {
                const formData = JSON.parse(savedData);
                
                // Only restore if data is less than 24 hours old
                const hoursSinceLastSave = (Date.now() - formData.timestamp) / (1000 * 60 * 60);
                
                if (hoursSinceLastSave < 24) {
                    nameInput.value = formData.name || '';
                    emailInput.value = formData.email || '';
                    messageInput.value = formData.message || '';
                }
            }
        } catch (e) {
            console.warn('Could not load form draft:', e);
        }
    }
    
    /**
     * Clear form draft from localStorage
     */
    function clearFormDraft() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('Could not clear form draft:', e);
        }
    }
    
    // Load saved draft on page load
    loadFormDraft();
    
    // Save draft as user types (with debouncing)
    let saveTimeout;
    const formInputs = [nameInput, emailInput, messageInput];
    
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveFormDraft, 1000); // Save after 1 second of inactivity
        });
    });
    
    // Clear draft on successful submission
    const originalHandleSuccess = handleSuccessfulSubmission;
    handleSuccessfulSubmission = function() {
        originalHandleSuccess();
        clearFormDraft();
    };
    
    // ========================================
    // SOCIAL LINK TRACKING (Optional)
    // ========================================
    
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(function(icon) {
        icon.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label');
            console.log(`Social link clicked: ${platform}`);
            
            // Add your analytics tracking here
            // Example: gtag('event', 'social_click', { platform: platform });
        });
    });
    
    // ========================================
    // SCROLL TO CONTACT ON PAGE LOAD (if hash present)
    // ========================================
    
    if (window.location.hash === '#contact') {
        setTimeout(function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
    
    // ========================================
    // FORM FIELD CHARACTER COUNTERS (Optional)
    // ========================================
    
    /**
     * Add character counter to textarea
     */
    function addCharacterCounter() {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.875rem; color: #666; margin-top: 4px;';
        counter.textContent = `0 / ${maxLength}`;
        
        messageInput.parentNode.appendChild(counter);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} / ${maxLength}`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#D49B15';
            } else {
                counter.style.color = '#666';
            }
        });
    }
    
    // Uncomment to enable character counter
    // addCharacterCounter();
    
});