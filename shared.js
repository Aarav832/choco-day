// shared.js

// Heart & Chocolate Rain Effect
class ParticleEffect {
    constructor(options = {}) {
        this.options = {
            particleCount: options.particleCount || 50,
            sprites: options.sprites || ['❤️', '🍫'],
            speed: options.speed || { min: 2, max: 5 },
            container: options.container || document.body
        };
        
        this.particles = [];
        this.isActive = false;
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.top = '-20px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        particle.style.transition = 'transform 0.3s ease';
        particle.innerHTML = this.options.sprites[Math.floor(Math.random() * this.options.sprites.length)];
        
        const speed = Math.random() * (this.options.speed.max - this.options.speed.min) + this.options.speed.min;
        
        this.options.container.appendChild(particle);
        
        return {
            element: particle,
            speed: speed,
            rotate: Math.random() * 360,
            x: parseFloat(particle.style.left),
            y: parseFloat(particle.style.top)
        };
    }
    
    animate() {
        if (!this.isActive) return;
        
        this.particles.forEach((particle, index) => {
            particle.y += particle.speed;
            particle.rotate += 2;
            
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotate}deg)`;
            
            if (particle.y > window.innerHeight) {
                particle.element.remove();
                this.particles.splice(index, 1);
            }
        });
        
        while (this.particles.length < this.options.particleCount) {
            this.particles.push(this.createParticle());
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    start() {
        this.isActive = true;
        this.animate();
    }
    
    stop() {
        this.isActive = false;
        this.particles.forEach(particle => particle.element.remove());
        this.particles = [];
    }
}

// Love Messages System
class LoveMessages {
    constructor() {
        this.messages = [
            "You're sweeter than chocolate! 💝",
            "My heart beats for you! ❤️",
            "You make my world beautiful! 🌹",
            "Forever yours! 💑",
            "You're my sweetest dream! 🍫",
            "My love grows stronger each day! 💕"
        ];
    }
    
    showRandomMessage(element) {
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        
        const messageElement = document.createElement('div');
        messageElement.className = 'love-message absolute text-pink-200 text-xl font-bold';
        messageElement.textContent = message;
        
        element.appendChild(messageElement);
        
        gsap.to(messageElement, {
            opacity: 0,
            y: -50,
            duration: 2,
            onComplete: () => messageElement.remove()
        });
    }
}

// Sound Effects Manager
class SoundEffects {
    constructor() {
        this.sounds = {
            click: new Audio('data:audio/wav;base64,...'), // Base64 encoded small click sound
            success: new Audio('data:audio/wav;base64,...'), // Base64 encoded success sound
            background: new Audio('data:audio/wav;base64,...') // Base64 encoded background music
        };
        
        this.sounds.background.loop = true;
    }
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
            // shared.js

// Background Music Controller
class BackgroundMusic {
    constructor() {
        this.audio = new Audio('https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js');
        this.audio.src = 'path-to-your-music.mp3'; // You'll need to add your own music file
        this.audio.loop = true;
        
        // Create music control button
        this.createMusicControl();
        
        // Try to restore music state
        const musicState = localStorage.getItem('musicPlaying');
        if (musicState === 'true') {
            this.playMusic();
        }
    }
    
    createMusicControl() {
        const control = document.createElement('div');
        control.innerHTML = `
            <button id="musicToggle" class="fixed bottom-4 right-4 bg-pink-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-pink-700">
                <span id="musicIcon">🎵</span>
            </button>
        `;
        document.body.appendChild(control);
        
        document.getElementById('musicToggle').addEventListener('click', () => {
            if (this.audio.paused) {
                this.playMusic();
            } else {
                this.pauseMusic();
            }
        });
    }
    
    playMusic() {
        this.audio.play();
        document.getElementById('musicIcon').textContent = '🔇';
        localStorage.setItem('musicPlaying', 'true');
    }
    
    pauseMusic() {
        this.audio.pause();
        document.getElementById('musicIcon').textContent = '🎵';
        localStorage.setItem('musicPlaying', 'false');
    }
}

// Initialize music when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = new BackgroundMusic();
});

// Rest of your shared.js code remains the same.