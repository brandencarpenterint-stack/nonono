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
});
