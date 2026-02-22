// Countdown Timer Logic with LocalStorage persistence
function initCountdown() {
    const timerElement = document.getElementById('timer');
    const storageKey = 'espacomulher_countdown';
    
    // Check if there's a saved countdown
    let endTime = localStorage.getItem(storageKey);
    
    if (!endTime) {
        // Set 15 minutes from now
        endTime = new Date().getTime() + (15 * 60 * 1000);
        localStorage.setItem(storageKey, endTime);
    } else {
        endTime = parseInt(endTime);
    }
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Reset timer if expired (for demo purposes reset to 15 min)
            endTime = new Date().getTime() + (15 * 60 * 1000);
            localStorage.setItem(storageKey, endTime);
            return;
        }
        
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        timerElement.textContent = 
            String(minutes).padStart(2, '0') + ':' + 
            String(seconds).padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(interval);
    });
}

// Progress Bar on Scroll
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Sticky CTA hide/show on scroll direction
function initStickyCTA() {
    const stickyCta = document.getElementById('stickyCta');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Hide when scrolling down, show when scrolling up
        if (currentScroll > lastScroll && currentScroll > 200) {
            stickyCta.style.transform = 'translateY(100%)';
        } else {
            stickyCta.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Smooth reveal on scroll
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.testimonial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Prevent double submission and add loading state
function initButtonFeedback() {
    const buttons = document.querySelectorAll('a[href="LINK_DO_WHATSAPP"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add clicked effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // If it's the placeholder link, show alert (for testing)
            if (this.getAttribute('href') === 'LINK_DO_WHATSAPP') {
                console.log('Facebook Pixel event: Lead');
                // Uncomment below to show alert during testing
                // alert('Substitua LINK_DO_WHATSAPP pelo link real do grupo!');
            }
        });
    });
}

// Confetti effect on CTA hover (optional enhancement)
function initConfetti() {
    const ctas = document.querySelectorAll('.group');
    
    ctas.forEach(cta => {
        cta.addEventListener('mouseenter', function() {
            if (Math.random() > 0.7) { // 30% chance to show hearts
                createHeart(this);
            }
        });
    });
}

function createHeart(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="#e75480" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
    heart.style.position = 'absolute';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'float 1s ease-out forwards';
    heart.style.opacity = '0.6';
    
    const rect = element.getBoundingClientRect();
    heart.style.left = (rect.width / 2) + 'px';
    heart.style.top = '0px';
    
    element.style.position = 'relative';
    element.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initProgressBar();
    initStickyCTA();
    initScrollReveal();
    initButtonFeedback();
    initConfetti();
    
    // Refresh Lucide icons if dynamically added
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Handle visibility change (pause timer when tab is inactive)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.setAttribute('data-paused', 'true');
    } else {
        document.body.removeAttribute('data-paused');
    }
});