document.addEventListener('DOMContentLoaded', () => {
    const coinContainer = document.querySelector('.coin-container');
    const coinImage = document.querySelector('.coin-image');

    if (coinContainer && coinImage) {
        coinContainer.addEventListener('mousemove', (e) => {
            const rect = coinContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on cursor position relative to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -20; // max 20 deg rotation
            const rotateY = ((x - centerX) / centerX) * 20;

            coinImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            coinImage.style.transition = 'transform 0.1s ease';
        });

        coinContainer.addEventListener('mouseleave', () => {
            coinImage.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
            coinImage.style.transition = 'transform 0.5s ease';
        });
    }

    // Add glitch text duplication for the effect
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        const text = glitchElement.getAttribute('data-text');
        
        const span1 = document.createElement('span');
        span1.textContent = text;
        span1.style.animationDelay = '-0.1s';
        
        const span2 = document.createElement('span');
        span2.textContent = text;
        span2.style.animationDelay = '-0.2s';
        
        glitchElement.appendChild(span1);
        glitchElement.appendChild(span2);
    }

    // Copy Contract Address Logic
    const copyBtn = document.getElementById('copy-btn');
    const caText = document.getElementById('ca-text');
    const copyMsg = document.getElementById('copy-msg');

    if (copyBtn && caText) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(caText.textContent);
                copyMsg.classList.add('show');
                setTimeout(() => {
                    copyMsg.classList.remove('show');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    }

    // Falling Emojis Chaos Logic
    const emojis = ['📉', '🔥', '💸', '🚨', '💀'];
    const emojiContainer = document.createElement('div');
    emojiContainer.style.position = 'fixed';
    emojiContainer.style.top = '0';
    emojiContainer.style.left = '0';
    emojiContainer.style.width = '100vw';
    emojiContainer.style.height = '100vh';
    emojiContainer.style.pointerEvents = 'none';
    emojiContainer.style.zIndex = '0';
    emojiContainer.style.overflow = 'hidden';
    document.body.appendChild(emojiContainer);

    function createFallingEmoji() {
        const emoji = document.createElement('div');
        emoji.classList.add('falling-emoji');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Randomize start position, size, and animation duration
        const leftPos = Math.random() * 100;
        const animDuration = Math.random() * 6 + 4; // 4s to 10s
        const size = Math.random() * 1.5 + 1; // 1rem to 2.5rem
        const opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4

        emoji.style.left = `${leftPos}vw`;
        emoji.style.animationDuration = `${animDuration}s`;
        emoji.style.fontSize = `${size}rem`;
        emoji.style.opacity = opacity;

        emojiContainer.appendChild(emoji);

        // Remove element after it falls
        setTimeout(() => {
            emoji.remove();
        }, animDuration * 1000);
    }

    // Create an emoji every 300ms
    setInterval(createFallingEmoji, 300);
});
