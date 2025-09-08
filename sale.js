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
        targetDate.setDate(targetDate.getDate() + 15); // 15 days from now
        
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
                document.querySelector('.sale-badge span').textContent = 'SALE ENDED';
            }
        }
        
        tick(); // Run immediately
        const countdownInterval = setInterval(tick, 1000);
    }
    
    updateCountdown();
    
    // Progress bar animation
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        const targetProgress = progressBar.getAttribute('data-progress');
        setTimeout(() => {
            progressBar.style.width = targetProgress + '%';
        }, 500);
    }
    
    // Payment method selection
    const methodButtons = document.querySelectorAll('.method-btn');
    methodButtons.forEach(button => {
        button.addEventListener('click', function() {
            methodButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Token amount calculator
    const usdAmountInput = document.getElementById('usd-amount');
    const tokenAmountDisplay = document.getElementById('token-amount');
    const bonusAmountDisplay = document.getElementById('bonus-amount');
    const currentPrice = 0.15; // Current BOC price
    const bonusPercentage = 0.10; // 10% bonus
    
    function updateTokenCalculation() {
        const usdAmount = parseFloat(usdAmountInput.value) || 0;
        const tokenAmount = usdAmount / currentPrice;
        const bonusAmount = tokenAmount * bonusPercentage;
        
        if (tokenAmountDisplay) {
            tokenAmountDisplay.textContent = `${tokenAmount.toLocaleString(undefined, {maximumFractionDigits: 2})} BOC`;
        }
        
        if (bonusAmountDisplay) {
            bonusAmountDisplay.textContent = `${bonusAmount.toLocaleString(undefined, {maximumFractionDigits: 2})} BOC (10%)`;
        }
        
        // Enable/disable purchase button based on minimum amount
        const purchaseBtn = document.querySelector('.btn-purchase');
        if (purchaseBtn) {
            if (usdAmount >= 50) {
                purchaseBtn.disabled = false;
                purchaseBtn.textContent = `Purchase ${tokenAmount.toLocaleString(undefined, {maximumFractionDigits: 0})} BOC Tokens`;
            } else {
                purchaseBtn.disabled = true;
                purchaseBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Purchase BOC Tokens';
            }
        }
    }
    
    if (usdAmountInput) {
        usdAmountInput.addEventListener('input', updateTokenCalculation);
        updateTokenCalculation(); // Initial calculation
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Wallet connection simulation
    const connectWalletBtn = document.querySelector('.btn-connect-wallet');
    const purchaseBtn = document.querySelector('.btn-purchase');
    let walletConnected = false;
    
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', function() {
            if (!walletConnected) {
                // Simulate wallet connection
                this.innerHTML = '<i class="fas fa-check"></i> Wallet Connected';
                this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                walletConnected = true;
                
                // Enable purchase button if amount is valid
                const usdAmount = parseFloat(usdAmountInput.value) || 0;
                if (usdAmount >= 50) {
                    purchaseBtn.disabled = false;
                }
            }
        });
    }
    
    // Purchase button functionality
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', function() {
            if (!walletConnected) {
                alert('Please connect your wallet first.');
                return;
            }
            
            const usdAmount = parseFloat(usdAmountInput.value) || 0;
            if (usdAmount < 50) {
                alert('Minimum purchase amount is $50 USD.');
                return;
            }
            
            // Simulate purchase process
            const tokenAmount = usdAmount / currentPrice;
            const bonusAmount = tokenAmount * bonusPercentage;
            const totalTokens = tokenAmount + bonusAmount;
            
            alert(`Purchase initiated!\n\nAmount: $${usdAmount}\nTokens: ${tokenAmount.toFixed(2)} BOC\nBonus: ${bonusAmount.toFixed(2)} BOC\nTotal: ${totalTokens.toFixed(2)} BOC\n\nIn a real implementation, this would connect to your Web3 wallet and execute the smart contract transaction.`);
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.phase-card, .feature-item, .step-item, .stat-card, .utility-item, .timeline-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
    
    // Create tokenomics chart
    function createTokenomicsChart() {
        const canvas = document.getElementById('tokenomicsChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150;
        
        const data = [
            { label: 'Token Sale', value: 40, color: '#6366f1' },
            { label: 'Ecosystem', value: 25, color: '#8b5cf6' },
            { label: 'Team', value: 15, color: '#ec4899' },
            { label: 'Marketing', value: 10, color: '#f59e0b' },
            { label: 'Reserve', value: 10, color: '#10b981' }
        ];
        
        let currentAngle = -Math.PI / 2; // Start from top
        
        data.forEach(segment => {
            const sliceAngle = (segment.value / 100) * 2 * Math.PI;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = segment.color;
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = '#0a0a0a';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            currentAngle += sliceAngle;
        });
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
        ctx.fillStyle = '#111';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Create chart when page loads
    setTimeout(createTokenomicsChart, 500);
    
    // Add particle effect to hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: rgba(99, 102, 241, 0.6);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${4 + Math.random() * 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            hero.appendChild(particle);
        }
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0; 
            }
            50% { 
                transform: translateY(-30px) rotate(180deg); 
                opacity: 1; 
            }
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
            backdrop-filter: blur(20px);
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
        
        .hero {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.phase-card, .feature-item, .step-content, .stat-card, .utility-item, .faq-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.style.transform.includes('translateY')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.style.transform.includes('translateY(-5px)')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Real-time price simulation (demo)
    function simulatePriceUpdates() {
        const priceElements = document.querySelectorAll('.phase-price');
        const basePrice = 0.18;
        
        setInterval(() => {
            const fluctuation = (Math.random() - 0.5) * 0.002; // ±0.1 cent
            const newPrice = basePrice + fluctuation;
            
            priceElements.forEach(element => {
                if (element.textContent.includes('BOC')) {
                    element.textContent = `1 BOC = $${newPrice.toFixed(3)}`;
                }
            });
        }, 30000); // Update every 30 seconds
    }
    
    simulatePriceUpdates();
    
    // Add loading states for buttons
    function addLoadingState(button, originalText, loadingText) {
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }
    
    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn-primary, .cta-buttons .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent.includes('Buy')) {
                // Scroll to purchase widget
                const purchaseWidget = document.querySelector('.purchase-widget');
                if (purchaseWidget) {
                    purchaseWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else if (this.textContent.includes('Community')) {
                alert('Join our Telegram community at t.me/bocchain for the latest updates and discussions!');
            }
        });
    });
    
    // Add success/error states for form validation
    function showValidationMessage(input, message, isError = false) {
        const existingMessage = input.parentNode.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = `validation-message ${isError ? 'error' : 'success'}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            font-size: 0.8rem;
            margin-top: 0.5rem;
            color: ${isError ? '#ef4444' : '#10b981'};
        `;
        
        input.parentNode.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
    
    // Enhanced form validation
    if (usdAmountInput) {
        usdAmountInput.addEventListener('blur', function() {
            const value = parseFloat(this.value);
            if (value && value < 50) {
                showValidationMessage(this, 'Minimum purchase amount is $50 USD', true);
            } else if (value >= 50) {
                showValidationMessage(this, 'Valid purchase amount');
            }
        });
    }
});

// Utility functions
function formatNumber(num, decimals = 2) {
    return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Export functions for potential external use
window.BOCTokenSale = {
    formatNumber,
    formatCurrency
};