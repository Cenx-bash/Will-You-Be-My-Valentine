/**
 * TOKYO NIGHT VALENTINE'S WEBSITE
 * Enhanced Interactions & Animations - COMPLETE FIXED
 */

// DOM Elements
const elements = {
    // Buttons
    yesBtn: document.getElementById('yesBtn'),
    maybeBtn: document.getElementById('maybeBtn'),
    friendsBtn: document.getElementById('friendsBtn'),

    // Cards
    yesCard: document.getElementById('yesCard'),
    maybeCard: document.getElementById('maybeCard'),
    friendsCard: document.getElementById('friendsCard'),

    // Display
    responseDisplay: document.getElementById('responseDisplay'),
    responseContent: document.getElementById('responseContent'),

    // Containers
    floatingHearts: document.getElementById('floatingHearts'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    envelopeWrapper: document.querySelector('.envelope-wrapper'),
    envelope: document.querySelector('.envelope')
};

// Configuration
const config = {
    hearts: {
        count: 35,
        symbols: ['❤️', '💖', '💗', '💓', '💕', '💞', '💝'],
        minSize: 15,
        maxSize: 40,
        minDuration: 8,
        maxDuration: 18
    },
    confetti: {
        count: 250,
        colors: ['#ff9acb', '#bb9af7', '#7dcfff', '#9ece6a', '#ff9e64'],
        shapes: ['heart', 'circle'],
        minSize: 5,
        maxSize: 18
    },
    messages: {
        maybe: [
            "Take your time! Coffee sounds lovely ☕",
            "No pressure at all! Let's start with coffee ✨",
            "Coffee date it is! Can't wait ☕💕",
            "Your honesty means so much! Coffee soon? ☕"
        ]
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌃 Tokyo Night Valentine\'s initialized');
    init();
});

function init() {
    createFloatingHearts();
    setupEventListeners();
    setupAnimations();
    setupCanvas();

    // Auto-open envelope after 1 second
    setTimeout(() => {
        if (elements.envelopeWrapper) {
            elements.envelopeWrapper.classList.add('open');
        }
    }, 1000);
}

// Event Listeners
function setupEventListeners() {
    if (elements.yesBtn) elements.yesBtn.addEventListener('click', handleYes);
    if (elements.maybeBtn) elements.maybeBtn.addEventListener('click', handleMaybe);
    if (elements.friendsBtn) elements.friendsBtn.addEventListener('click', handleFriends);

    // Fixed envelope toggle on click
    if (elements.envelopeWrapper) {
        elements.envelopeWrapper.addEventListener('click', function(e) {
            // Don't toggle if clicking inside buttons
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            this.classList.toggle('open');
        });
    }

    // Add hover effects for envelope
    if (elements.envelopeWrapper) {
        elements.envelopeWrapper.addEventListener('mouseenter', () => {
            if (!elements.envelopeWrapper.classList.contains('open')) {
                const letter = document.querySelector('.letter');
                if (letter) {
                    letter.style.transform = 'translateY(-5px)';
                }
            }
        });

        elements.envelopeWrapper.addEventListener('mouseleave', () => {
            if (!elements.envelopeWrapper.classList.contains('open')) {
                const letter = document.querySelector('.letter');
                if (letter) {
                    letter.style.transform = 'translateY(0)';
                }
            }
        });
    }
}

// Response Handlers
function handleYes(e) {
    const btn = e.currentTarget;
    disableAllButtons();
    showResponse(createYesResponse());
    startCelebration();
    animateCard(elements.yesCard);

    btn.innerHTML = '<span>Yay! ありがとう 💕</span><i class="fas fa-heart"></i>';
    btn.style.background = 'linear-gradient(135deg, #ff9acb, #bb9af7)';
    btn.style.color = '#1a1b26';
}

function handleMaybe(e) {
    const btn = e.currentTarget;
    const randomMsg = config.messages.maybe[Math.floor(Math.random() * config.messages.maybe.length)];
    showResponse(createMaybeResponse(randomMsg));
    animateButton(btn);
}

function handleFriends(e) {
    const btn = e.currentTarget;
    showResponse(createFriendsResponse());
    animateButton(btn);
}

// Response Templates
function createYesResponse() {
    return `
        <div style="text-align: center;">
            <div style="font-size: 5rem; margin-bottom: 20px; animation: bounce 1s infinite;">💖✨🎉</div>
            <h3 style="color: #ff9acb; margin-bottom: 15px; font-size: 2.5rem;">ありがとう!</h3>
            <p style="font-size: 1.2rem; margin-bottom: 15px; color: #c0caf5;">You've made me so happy! 💕</p>
            <p style="font-size: 1.1rem; color: #9aa5ce;">Can't wait for our special night under the Tokyo stars 🌃</p>
        </div>
    `;
}

function createMaybeResponse(msg) {
    return `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px; animation: float 3s infinite;">☕✨💭</div>
            <h4 style="color: #ff9e64; margin-bottom: 15px; font-size: 2rem;">That's okay!</h4>
            <p style="font-size: 1.2rem; color: #c0caf5;">${msg}</p>
        </div>
    `;
}

function createFriendsResponse() {
    return `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px; animation: bounce 2s infinite;">🤝🌸💕</div>
            <h4 style="color: #7dcfff; margin-bottom: 15px; font-size: 2rem;">Friendship is beautiful!</h4>
            <p style="font-size: 1.2rem; color: #c0caf5;">I'm grateful to have you in my life! ヽ(♡‿♡)ノ</p>
        </div>
    `;
}

// Display Response
function showResponse(content) {
    if (!elements.responseContent || !elements.responseDisplay) return;

    elements.responseContent.innerHTML = content;
    elements.responseDisplay.style.display = 'block';
    elements.responseDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Disable Buttons
function disableAllButtons() {
    [elements.yesBtn, elements.maybeBtn, elements.friendsBtn].forEach(btn => {
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.style.pointerEvents = 'none';
        }
    });
}

// Animations
function animateButton(btn) {
    if (!btn) return;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

function animateCard(card) {
    if (!card) return;

    card.style.animation = 'pulse 0.5s ease 3';
    card.style.boxShadow = '0 0 60px #ff9acb';

    // Add floating hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: absolute;
                font-size: ${getRandom(20, 40)}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatUp 1s ease-out forwards;
                pointer-events: none;
                z-index: 10;
            `;
            card.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }, i * 80);
    }
}

// Floating Hearts
function createFloatingHearts() {
    if (!elements.floatingHearts) return;

    addHeartAnimation();

    for (let i = 0; i < config.hearts.count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = config.hearts.symbols[Math.floor(Math.random() * config.hearts.symbols.length)];

            const size = getRandom(config.hearts.minSize, config.hearts.maxSize);
            const duration = getRandom(config.hearts.minDuration, config.hearts.maxDuration, true);
            const left = Math.random() * 100;
            const delay = Math.random() * 5;

            heart.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${left}%;
                bottom: -50px;
                opacity: 0;
                animation: heartFloat ${duration}s linear infinite;
                animation-delay: ${delay}s;
                filter: drop-shadow(0 0 12px rgba(187, 154, 247, 0.6));
                z-index: 1;
            `;

            elements.floatingHearts.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) heart.remove();
            }, (duration + delay) * 1000);
        }, i * 120);
    }
}

function addHeartAnimation() {
    if (document.querySelector('#heartStyle')) return;

    const style = document.createElement('style');
    style.id = 'heartStyle';
    style.textContent = `
        @keyframes heartFloat {
            0% { transform: translateY(100vh) rotate(0deg) scale(0); opacity: 0; }
            10% { opacity: 0.7; transform: translateY(80vh) rotate(36deg) scale(0.4); }
            30% { opacity: 1; transform: translateY(60vh) rotate(108deg) scale(0.7); }
            50% { opacity: 0.9; transform: translateY(40vh) rotate(180deg) scale(1); }
            70% { opacity: 0.7; transform: translateY(20vh) rotate(252deg) scale(0.7); }
            90% { opacity: 0.4; transform: translateY(10vh) rotate(324deg) scale(0.4); }
            100% { transform: translateY(-100px) rotate(360deg) scale(0); opacity: 0; }
        }
        @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Celebration Effects
function startCelebration() {
    startConfetti();
    createHeartExplosion();
    playMelody();
}

function startConfetti() {
    if (!elements.confettiCanvas) return;

    const ctx = elements.confettiCanvas.getContext('2d');
    elements.confettiCanvas.width = window.innerWidth;
    elements.confettiCanvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < config.confetti.count; i++) {
        particles.push({
            x: Math.random() * elements.confettiCanvas.width,
            y: Math.random() * elements.confettiCanvas.height - elements.confettiCanvas.height,
            size: getRandom(config.confetti.minSize, config.confetti.maxSize),
            speedY: getRandom(2, 8, true),
            speedX: getRandom(-2, 2, true),
            color: config.confetti.colors[Math.floor(Math.random() * config.confetti.colors.length)],
            shape: config.confetti.shapes[Math.floor(Math.random() * config.confetti.shapes.length)],
            rotation: Math.random() * 360,
            rotationSpeed: getRandom(-6, 6, true)
        });
    }

    let animationId;

    function draw() {
        ctx.clearRect(0, 0, elements.confettiCanvas.width, elements.confettiCanvas.height);

        let active = 0;
        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;

            if (p.y < elements.confettiCanvas.height + 100) {
                active++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);

                ctx.fillStyle = p.color;
                if (p.shape === 'heart') {
                    drawHeart(ctx, p.size);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        });

        if (active > 0) {
            animationId = requestAnimationFrame(draw);
        } else {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, elements.confettiCanvas.width, elements.confettiCanvas.height);
        }
    }

    draw();
    setTimeout(() => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, elements.confettiCanvas.width, elements.confettiCanvas.height);
        }
    }, 7000);
}

function drawHeart(ctx, size) {
    ctx.beginPath();
    ctx.moveTo(0, size / 4);
    ctx.bezierCurveTo(0, -size / 3, size / 2, -size / 3, size / 2, size / 4);
    ctx.bezierCurveTo(size / 2, size, 0, size, 0, size / 2);
    ctx.bezierCurveTo(0, size, -size / 2, size, -size / 2, size / 4);
    ctx.bezierCurveTo(-size / 2, -size / 3, 0, -size / 3, 0, size / 4);
    ctx.closePath();
    ctx.fill();
}

function createHeartExplosion() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const symbols = ['❤️', '💖', '💗', '💓', '💕', '💞', '💝'];
            heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

            heart.style.cssText = `
                position: fixed;
                font-size: ${getRandom(25, 55)}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transform: scale(0);
                z-index: 9999;
                pointer-events: none;
                transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
                filter: drop-shadow(0 0 20px #ff9acb);
            `;

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = `scale(2.5) translate(${getRandom(-120, 120)}px, ${getRandom(-120, 120)}px)`;
                heart.style.opacity = '0';
            }, 20);

            setTimeout(() => heart.remove(), 1200);
        }, i * 60);
    }
}

function playMelody() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99, 1046.5];
        const times = [0, 0.15, 0.3, 0.6];

        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();

                osc.connect(gain);
                gain.connect(audioContext.destination);

                osc.frequency.value = freq;
                osc.type = 'sine';

                gain.gain.setValueAtTime(0.15, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

                osc.start();
                osc.stop(audioContext.currentTime + 0.4);
            }, times[i] * 1000);
        });
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Scroll Animations
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .reason-item, .response-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Canvas Setup
function setupCanvas() {
    if (!elements.confettiCanvas) return;

    window.addEventListener('resize', () => {
        elements.confettiCanvas.width = window.innerWidth;
        elements.confettiCanvas.height = window.innerHeight;
    });
}

// Utility Functions
function getRandom(min, max, isFloat = false) {
    if (isFloat) {
        return Math.random() * (max - min) + min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Window Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.2s ease';
    setTimeout(() => document.body.style.opacity = '1', 100);
    setTimeout(createHeartExplosion, 800);
});
