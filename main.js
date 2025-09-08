// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // Countdown Timer
    function updateCountdown() {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 45); // 45 days from now
        
        function tick() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                document.querySelector('.status-badge').textContent = '🔴 SALE ENDED';
            }
        }
        
        tick(); // Run immediately
        const countdownInterval = setInterval(tick, 1000);
    }
    
    updateCountdown();
    
    // Token amount calculator
    const amountInput = document.querySelector('.amount-input');
    const tokenEstimate = document.querySelector('.token-estimate');
    const ownershipInfo = document.querySelector('.ownership-info');
    const currentPrice = 250; // Current token price
    
    if (amountInput && tokenEstimate) {
        amountInput.addEventListener('input', function() {
            const tokenCount = parseInt(this.value) || 0;
            const totalCost = tokenCount * currentPrice;
            const ownershipPercent = (tokenCount / 400000) * 100;
            const estimatedDividend = tokenCount * 12.5; // Estimated $12.5 per token annually
            
            tokenEstimate.textContent = `Total: $${totalCost.toLocaleString()}`;
            
            if (ownershipInfo) {
                ownershipInfo.innerHTML = `
                    <p>≈ ${ownershipPercent.toFixed(4)}% Platform Ownership</p>
                    <p>Est. Annual Dividend: $${estimatedDividend.toLocaleString()}</p>
                `;
            }
        });
    }
    
    // Dividend calculator
    const tokenCountInput = document.getElementById('token-count');
    const ownershipPercentEl = document.getElementById('ownership-percent');
    const dividend2025El = document.getElementById('dividend-2025');
    const dividend2028El = document.getElementById('dividend-2028');
    
    function updateDividendCalculator() {
        const tokens = parseInt(tokenCountInput.value) || 0;
        const ownershipPercent = (tokens / 400000) * 100;
        const dividend2025 = tokens * 20.5; // $20.5 per token in 2025
        const dividend2028 = tokens * 132; // $132 per token in 2028
        
        if (ownershipPercentEl) ownershipPercentEl.textContent = `${ownershipPercent.toFixed(4)}%`;
        if (dividend2025El) dividend2025El.textContent = `$${dividend2025.toLocaleString()}`;
        if (dividend2028El) dividend2028El.textContent = `$${dividend2028.toLocaleString()}`;
    }
    
    if (tokenCountInput) {
        tokenCountInput.addEventListener('input', updateDividendCalculator);
        updateDividendCalculator(); // Initial calculation
    }
    
    // Animate progress bar on scroll
    const progressBar = document.querySelector('.progress-fill');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '39%';
            }
        });
    }, observerOptions);
    
    if (progressBar) {
        progressObserver.observe(progressBar);
    }
    
    // Animate counters
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        updateCounter();
    }
    
    // Animate stats on scroll
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('156,000')) {
                        animateCounter(stat, 156000, 2000);
                    } else if (text.includes('2,847')) {
                        animateCounter(stat, 2847, 2000);
                    } else if (text.includes('39%')) {
                        stat.textContent = '0%';
                        setTimeout(() => {
                            let current = 0;
                            const interval = setInterval(() => {
                                current++;
                                stat.textContent = `${current}%`;
                                if (current >= 39) {
                                    clearInterval(interval);
                                }
                            }, 50);
                        }, 500);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Particle effect for hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }
    
    // Add CSS for particle animation and mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.benefit-card, .feature-card, .timeline-content, .tier-card, .faq-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Tier card animations
    const tierObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.tier-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        tierObserver.observe(card);
    });
    
    // Animate revenue chart bars
    const chartBars = document.querySelectorAll('.bar');
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chartBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transform = 'scaleY(1)';
                    }, index * 200);
                });
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const chartContainer = document.querySelector('.chart-bars');
    if (chartContainer) {
        chartBars.forEach(bar => {
            bar.style.transform = 'scaleY(0)';
            bar.style.transformOrigin = 'bottom';
            bar.style.transition = 'transform 0.8s ease';
        });
        chartObserver.observe(chartContainer);
    }
});

// Token purchase functionality
function openTokenPurchase() {
    const amount = document.querySelector('.amount-input').value;
    const tokenCount = parseInt(amount) || 0;
    
    if (!tokenCount || tokenCount < 1) {
        alert('Please enter a valid number of tokens (minimum 1)');
        return;
    }
    
    if (tokenCount > 100) {
        alert('Maximum purchase limit is 100 tokens per wallet');
        return;
    }
    
    const totalCost = tokenCount * 250;
    const ownershipPercent = (tokenCount / 400000) * 100;
    
    // In a real implementation, this would integrate with Web3 wallet
    alert(`Ownership Token Purchase Summary:

Tokens: ${tokenCount.toLocaleString()}
Total Cost: $${totalCost.toLocaleString()}
Ownership: ${ownershipPercent.toFixed(4)}%
Est. Annual Dividend: $${(tokenCount * 12.5).toLocaleString()}

This would connect to your Web3 wallet to complete the purchase. You'll receive ownership tokens that entitle you to quarterly dividend payments and governance voting rights.`);
}

// Add click handlers for purchase buttons
document.addEventListener('DOMContentLoaded', function() {
    const purchaseButtons = document.querySelectorAll('.btn-primary');
    purchaseButtons.forEach(button => {
        if (button.textContent.includes('Buy') || button.textContent.includes('Purchase')) {
            button.addEventListener('click', openTokenPurchase);
        }
    });
    
    // Prospectus download
    const prospectusButtons = document.querySelectorAll('.btn-secondary');
    prospectusButtons.forEach(button => {
        if (button.textContent.includes('Prospectus') || button.textContent.includes('Projections')) {
            button.addEventListener('click', function() {
                alert('Investment prospectus download would be available here. This would include detailed financial projections, risk analysis, legal structure, and complete business plan documentation.');
            });
        }
    });
});

// Real-time token count updates (demo)
function updateTokenStats() {
    // Simulate token sales
    const tokensSoldEl = document.querySelector('.stat-number');
    if (tokensSoldEl && tokensSoldEl.textContent.includes('156,000')) {
        const currentSold = 156000;
        const newSold = currentSold + Math.floor(Math.random() * 10);
        tokensSoldEl.textContent = newSold.toLocaleString();
        
        // Update progress
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const newProgress = (newSold / 400000) * 100;
            progressFill.style.width = `${newProgress}%`;
        }
    }
}

// Update stats every 30 seconds (demo)
setInterval(updateTokenStats, 30000);