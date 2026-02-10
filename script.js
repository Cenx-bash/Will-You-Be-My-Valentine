// ===========================================
// VALENTINE'S DAY WEBSITE - WORKING SCRIPT
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('💘 Valentine Website Loaded Successfully');

    // Initialize all features
    initializeWebsite();
});

function initializeWebsite() {
    try {
        // 1. Create floating hearts
        createFloatingHearts();

        // 2. Setup music player
        setupMusicPlayer();

        // 3. Setup response buttons
        setupResponseButtons();

        // 4. Add scroll animations
        setupScrollAnimations();

        // 5. Add hover effects
        setupHoverEffects();

        // 6. Setup confetti canvas
        setupConfettiCanvas();

        console.log('✅ All features initialized successfully');

    } catch (error) {
        console.error('❌ Initialization error:', error);
        showErrorMessage('There was an issue loading the page. Please refresh.');
    }
}

// ===========================================
// 1. FLOATING HEARTS
// ===========================================
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    // Create 20 floating hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: floatHeart ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                z-index: 1;
            `;

            // Add float animation
            const style = document.createElement('style');
            if (!document.querySelector('#floatHeartAnimation')) {
                style.id = 'floatHeartAnimation';
                style.textContent = `
                    @keyframes floatHeart {
                        0% {
                            transform: translateY(100vh) rotate(0deg);
                            opacity: 0;
                        }
                        10% {
                            opacity: 0.5;
                        }
                        90% {
                            opacity: 0.5;
                        }
                        100% {
                            transform: translateY(-100px) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            container.appendChild(heart);
        }, i * 300);
    }
}

// ===========================================
// 2. MUSIC PLAYER
// ===========================================
function setupMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeControl = document.getElementById('volumeControl');

    if (!audio || !playBtn) {
        console.warn('Music player elements not found');
        return;
    }

    // Set initial volume
    audio.volume = 0.5;
    if (volumeControl) volumeControl.value = 50;

    // Play/Pause functionality
    playBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                console.log('Music started');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                this.classList.add('playing');
            }).catch(error => {
                console.log('Play failed - user interaction required:', error);
                // Ask user to click to enable audio
                showMessage('Click anywhere on the page first, then try playing the music.');
            });
        } else {
            audio.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            this.classList.remove('playing');
        }
    });

    // Volume control
    if (volumeControl) {
        volumeControl.addEventListener('input', function() {
            audio.volume = this.value / 100;
        });
    }

    // Mute button
    if (volumeBtn && volumeIcon) {
        volumeBtn.addEventListener('click', function() {
            audio.muted = !audio.muted;
            volumeIcon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            this.classList.toggle('muted', audio.muted);
        });
    }

    // Auto-play on first user interaction
    const enableAudio = () => {
        audio.play().then(() => {
            console.log('Auto-play successful');
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            playBtn.classList.add('playing');
        }).catch(e => {
            console.log('Auto-play prevented, waiting for manual play');
        });

        // Remove listeners after first interaction
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
    };

    // Add interaction listeners
    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });
}

// ===========================================
// 3. RESPONSE BUTTONS (MAIN FEATURE)
// ===========================================
function setupResponseButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const maybeBtn = document.getElementById('maybeBtn');
    const friendsBtn = document.getElementById('friendsBtn');
    const responseDisplay = document.getElementById('responseDisplay');
    const displayContent = document.getElementById('displayContent');

    if (!yesBtn || !responseDisplay || !displayContent) {
        console.error('Response elements not found');
        return;
    }

    // YES Button - Celebration!
    yesBtn.addEventListener('click', function() {
        console.log('💝 YES button clicked!');

        // Disable all buttons
        disableAllResponseButtons();

        // Show celebration message
        displayContent.innerHTML = createYesResponse();
        responseDisplay.style.display = 'block';

        // Start celebrations
        startConfettiCelebration();
        playCelebrationSound();
        createHeartExplosion();
        animateYesCard();

        // Update button
        this.innerHTML = '<span>🎉 YOU SAID YES! 🎉</span><i class="fas fa-heart-pulse"></i>';
        this.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.5)';
    });

    // MAYBE Button
    maybeBtn.addEventListener('click', function() {
        console.log('🤔 MAYBE button clicked');

        const responses = [
            "I completely understand. Maybe we could start with coffee or lunch instead?",
            "Thank you for considering. If you change your mind, the invitation is always open.",
            "No pressure at all. I appreciate your honesty. Let's keep getting to know each other."
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        displayContent.innerHTML = createMaybeResponse(response);
        responseDisplay.style.display = 'block';

        // Button animation
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => this.style.animation = '', 500);
    });

    // FRIENDS Button
    friendsBtn.addEventListener('click', function() {
        console.log('🤝 FRIENDS button clicked');

        displayContent.innerHTML = createFriendsResponse();
        responseDisplay.style.display = 'block';
    });
}

function createYesResponse() {
    return `
        <div class="celebration-response">
            <div class="celebration-icon" style="font-size: 4rem; margin-bottom: 20px; animation: heartbeat 1s infinite;">
                💝🎉
            </div>
            <h3 style="color: #e91e63; margin-bottom: 15px; font-family: 'Dancing Script', cursive; font-size: 2.5rem;">
                You Made My Day!
            </h3>
            <p style="font-size: 1.2rem; margin-bottom: 15px; line-height: 1.6;">
                I'm absolutely thrilled! This is the best Valentine's Day gift I could ask for. 💖
            </p>
            <p style="margin-bottom: 20px; font-size: 1.1rem;">
                I'll contact you soon to plan all the wonderful details for our special evening.
            </p>
            <div style="background: linear-gradient(135deg, rgba(255,64,129,0.1), rgba(255,128,171,0.1)); 
                       padding: 15px; border-radius: 10px; margin-top: 20px;">
                <p style="margin: 0; color: #e91e63; font-weight: bold;">
                    <i class="fas fa-star" style="color: #ffd700;"></i> 
                    Get ready for an unforgettable Valentine's Day!
                </p>
            </div>
        </div>
    `;
}

function createMaybeResponse(response) {
    return `
        <div class="maybe-response">
            <div style="font-size: 3rem; margin-bottom: 15px; color: #ff9800;">
                ☕💭
            </div>
            <h4 style="color: #ff9800; margin-bottom: 15px; font-size: 1.8rem;">
                Thank You for Considering
            </h4>
            <p style="font-size: 1.1rem; margin-bottom: 15px; line-height: 1.6;">
                ${response}
            </p>
            <p style="font-style: italic; color: #666; font-size: 1rem;">
                I genuinely appreciate your thoughtful response.
            </p>
        </div>
    `;
}

function createFriendsResponse() {
    return `
        <div class="friends-response">
            <div style="font-size: 3rem; margin-bottom: 15px; color: #e8b4b8;">
                🤝💖
            </div>
            <h4 style="color: #e8b4b8; margin-bottom: 15px; font-size: 1.8rem;">
                Friendship is Precious
            </h4>
            <p style="font-size: 1.1rem; margin-bottom: 15px; line-height: 1.6;">
                I truly value our connection and I'm glad we can be friends.
            </p>
            <p style="margin-bottom: 15px; font-size: 1.1rem;">
                Thank you for being honest with me. You're an amazing person.
            </p>
            <div style="background: rgba(232, 180, 184, 0.1); 
                       padding: 15px; border-radius: 10px; margin-top: 15px;">
                <p style="margin: 0; color: #e8b4b8; font-weight: bold;">
                    <i class="fas fa-handshake"></i> 
                    Respect and appreciation always
                </p>
            </div>
        </div>
    `;
}

function disableAllResponseButtons() {
    const buttons = ['yesBtn', 'maybeBtn', 'friendsBtn'];
    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'not-allowed';
            btn.style.pointerEvents = 'none';
        }
    });
}

function animateYesCard() {
    const yesCard = document.getElementById('yesOption');
    if (!yesCard) return;

    yesCard.style.animation = 'pulse 0.5s ease 3';
    yesCard.style.boxShadow = '0 0 40px rgba(255, 64, 129, 0.6)';

    // Add glow effect
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%);
        border-radius: 20px;
        animation: glowPulse 2s linear infinite;
        pointer-events: none;
        z-index: 0;
    `;

    // Add glow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glowPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);

    yesCard.appendChild(glow);
}

// ===========================================
// 4. CONFETTI CELEBRATION
// ===========================================
function setupConfettiCanvas() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function startConfettiCelebration() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const confettiParticles = [];
    const colors = ['#ff4081', '#e91e63', '#ff80ab', '#ffd700', '#e8b4b8'];

    // Create 200 confetti pieces
    for (let i = 0; i < 200; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 12 + 6,
            speed: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: Math.random() > 0.5 ? 'heart' : 'circle',
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            sway: Math.random() * 2 - 1
        });
    }

    let animationId;

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let particlesAlive = 0;

        confettiParticles.forEach(p => {
            // Update position
            p.y += p.speed;
            p.x += p.sway;
            p.rotation += p.rotationSpeed;

            // Draw particle
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);

            if (p.shape === 'heart') {
                // Draw heart
                ctx.fillStyle = p.color;
                ctx.beginPath();
                const topCurveHeight = p.size * 0.3;
                ctx.moveTo(0, p.size / 4);
                ctx.bezierCurveTo(0, -topCurveHeight, p.size / 2, -topCurveHeight, p.size / 2, p.size / 4);
                ctx.bezierCurveTo(p.size / 2, p.size, 0, p.size, 0, p.size / 2);
                ctx.bezierCurveTo(0, p.size, -p.size / 2, p.size, -p.size / 2, p.size / 4);
                ctx.bezierCurveTo(-p.size / 2, -topCurveHeight, 0, -topCurveHeight, 0, p.size / 4);
                ctx.closePath();
                ctx.fill();
            } else {
                // Draw circle
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();

            // Check if still on screen
            if (p.y < canvas.height + 100) {
                particlesAlive++;
            }
        });

        // Continue or stop
        if (particlesAlive > 0) {
            animationId = requestAnimationFrame(drawConfetti);
        } else {
            cancelAnimationFrame(animationId);
        }
    }

    // Start animation
    drawConfetti();

    // Stop after 10 seconds
    setTimeout(() => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 10000);
}

// ===========================================
// 5. HEART EXPLOSION EFFECT
// ===========================================
function createHeartExplosion() {
    const explosionCount = 30;

    for (let i = 0; i < explosionCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 30 + 20}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 9999;
                pointer-events: none;
                opacity: 1;
                transform: scale(0);
                transition: all 1s ease-out;
            `;

            // Random color
            const colors = ['#ff4081', '#e91e63', '#ff80ab', '#ffd700'];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(heart);

            // Animate
            setTimeout(() => {
                heart.style.transform = 'scale(1.5)';
                heart.style.opacity = '0';
            }, 10);

            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1000);
        }, i * 50);
    }
}

// ===========================================
// 6. CELEBRATION SOUND
// ===========================================
function playCelebrationSound() {
    try {
        // Use Web Audio API for celebration sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Play a happy melody
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);

        // Second note
        setTimeout(() => {
            const oscillator2 = audioContext.createOscillator();
            const gainNode2 = audioContext.createGain();

            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext.destination);

            oscillator2.frequency.value = 659.25; // E5
            oscillator2.type = 'sine';

            gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator2.start(audioContext.currentTime);
            oscillator2.stop(audioContext.currentTime + 0.5);
        }, 100);

        // Third note
        setTimeout(() => {
            const oscillator3 = audioContext.createOscillator();
            const gainNode3 = audioContext.createGain();

            oscillator3.connect(gainNode3);
            gainNode3.connect(audioContext.destination);

            oscillator3.frequency.value = 783.99; // G5
            oscillator3.type = 'sine';

            gainNode3.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator3.start(audioContext.currentTime);
            oscillator3.stop(audioContext.currentTime + 0.5);
        }, 200);

    } catch (error) {
        console.log('Web Audio API not available, using fallback');
        // Fallback to simple beep
        try {
            const audio = new Audio();
            audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
            audio.volume = 0.1;
            audio.play();
        } catch (e) {
            console.log('Audio fallback also failed');
        }
    }
}

// ===========================================
// 7. ANIMATIONS & EFFECTS
// ===========================================
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function setupHoverEffects() {
    // Add hover effect to envelope
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        envelope.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Add heartbeat to title heart
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        setInterval(() => {
            highlight.style.transform = 'scale(1.1)';
            setTimeout(() => {
                highlight.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }
}

// ===========================================
// 8. HELPER FUNCTIONS
// ===========================================
function showMessage(message) {
    const display = document.getElementById('responseDisplay');
    const content = document.getElementById('displayContent');

    if (display && content) {
        content.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                <p>${message}</p>
            </div>
        `;
        display.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            display.style.display = 'none';
        }, 5000);
    }
}

function showErrorMessage(message) {
    const display = document.getElementById('responseDisplay');
    const content = document.getElementById('displayContent');

    if (display && content) {
        content.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #e91e63;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <p>${message}</p>
                <button onclick="location.reload()" 
                        style="margin-top: 15px; padding: 8px 16px; 
                               background: #ff4081; color: white; 
                               border: none; border-radius: 5px; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `;
        display.style.display = 'block';
    }
}

// ===========================================
// 9. INITIAL LOAD EFFECTS
// ===========================================
window.addEventListener('load', function() {
    // Add fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add welcome message to console
    console.log('%c 💘 Happy Valentine\'s Day! 💘',
        'color: #e91e63; font-size: 16px; font-weight: bold; background: #ffebee; padding: 10px; border-radius: 5px;');
    console.log('%c May your courage be rewarded with love!',
        'color: #ff4081; font-size: 14px;');
});

// ===========================================
// 10. GLOBAL FUNCTIONS FOR HTML BUTTONS
// ===========================================
// Make refresh function available globally
window.refreshPage = function() {
    location.reload();
};

// Make sure all functions are properly exported
window.startConfettiCelebration = startConfettiCelebration;
window.playCelebrationSound = playCelebrationSound;
