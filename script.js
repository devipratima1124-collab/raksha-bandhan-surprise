// Stage navigation
let currentStage = 1;

function showStage(stageNumber) {
    document.querySelectorAll('.stage').forEach(stage => stage.classList.add('hidden'));
    document.getElementById(`stage${stageNumber}`).classList.remove('hidden');
}

// Gift Box Click Handler
const giftBox = document.getElementById('giftBox');
if (giftBox) {
    giftBox.addEventListener('click', function() {
        if (!this.classList.contains('open')) {
            this.classList.add('open');
            setTimeout(() => {
                currentStage = 2;
                showStage(2);
            }, 1000);
        }
    });
}

// Envelope Click Handler
const envelope = document.getElementById('envelope');
if (envelope) {
    envelope.addEventListener('click', function() {
        if (!this.classList.contains('open')) {
            this.classList.add('open');
            setTimeout(() => {
                currentStage = 3;
                showStage(3);
                setTimeout(() => {
                    currentStage = 4;
                    showStage(4);
                }, 3000);
            }, 1000);
        }
    });
}

// Share Button Handler
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', function() {
        const currentURL = window.location.href;
        const shareUrl = document.getElementById('shareUrl');
        shareUrl.textContent = currentURL;
        shareUrl.classList.add('show');
        
        // Copy to clipboard
        navigator.clipboard.writeText(currentURL).then(() => {
            this.textContent = '✓ Copied to Clipboard!';
            setTimeout(() => {
                this.textContent = '📤 Share Link';
            }, 2000);
        }).catch(() => {
            alert('Link: ' + currentURL);
        });
    });
}

// Restart Button Handler
const restartBtn = document.getElementById('restartBtn');
if (restartBtn) {
    restartBtn.addEventListener('click', function() {
        currentStage = 1;
        giftBox.classList.remove('open');
        envelope.classList.remove('open');
        document.getElementById('shareUrl').classList.remove('show');
        showStage(1);
    });
}

// Web Share API for Instagram/Social Media
function shareToSocial() {
    const shareData = {
        title: '💝 Surprise 💕',
        text: 'Check out this beautiful Raksha Bandhan surprise for my brother!',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(err => console.log('Share failed:', err));
    }
}

// Mobile-friendly touch events
if (giftBox) {
    giftBox.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    giftBox.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

if (envelope) {
    envelope.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    envelope.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

// Confetti effect on celebration
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ffd700'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '999';
        document.body.appendChild(confetti);
        
        let top = -10;
        const speed = Math.random() * 3 + 2;
        
        const fall = setInterval(() => {
            top += speed;
            confetti.style.top = top + 'px';
            if (top > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 20);
    }
}

// Trigger confetti on stage 4
const observer = new MutationObserver((mutations) => {
    const stage4 = document.getElementById('stage4');
    if (stage4 && !stage4.classList.contains('hidden')) {
        createConfetti();
    }
});

observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

// Instagram Share metadata
if (document.head) {
    const metaOG = document.createElement('meta');
    metaOG.property = 'og:title';
    metaOG.content = '💝 Surprise 💕 - Raksha Bandhan Special';
    document.head.appendChild(metaOG);
    
    const metaDesc = document.createElement('meta');
    metaDesc.property = 'og:description';
    metaDesc.content = 'A cute interactive Raksha Bandhan surprise webpage with animations!';
    document.head.appendChild(metaDesc);
}
