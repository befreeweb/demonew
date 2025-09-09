// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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

// Category tabs functionality
const categoryTabs = document.querySelectorAll('.category-tab');
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Here you would filter tokens based on category
        console.log('Selected category:', tab.textContent);
    });
});

// View toggle functionality
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Here you would change the view layout
        console.log('Selected view:', btn.dataset.view);
    });
});

// Token search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Here you would filter tokens based on search term
        console.log('Search term:', searchTerm);
    });
}

// Modal functionality
const modals = document.querySelectorAll('.modal-overlay');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloses = document.querySelectorAll('.modal-close');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => modal.classList.remove('active'));
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Swap functionality
const swapArrowBtn = document.querySelector('.swap-arrow-btn');
if (swapArrowBtn) {
    swapArrowBtn.addEventListener('click', () => {
        const fromInput = document.querySelector('#fromAmount');
        const toInput = document.querySelector('#toAmount');
        const fromToken = document.querySelector('#fromToken');
        const toToken = document.querySelector('#toToken');
        
        // Swap values
        if (fromInput && toInput) {
            const tempValue = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = tempValue;
        }
        
        // Swap tokens
        if (fromToken && toToken) {
            const tempToken = fromToken.textContent;
            fromToken.textContent = toToken.textContent;
            toToken.textContent = tempToken;
        }
    });
}

// Token amount calculation
const fromAmountInput = document.querySelector('#fromAmount');
const toAmountInput = document.querySelector('#toAmount');

if (fromAmountInput && toAmountInput) {
    fromAmountInput.addEventListener('input', (e) => {
        const amount = parseFloat(e.target.value) || 0;
        // Simple conversion rate for demo (1:1.05)
        const convertedAmount = amount * 1.05;
        toAmountInput.value = convertedAmount.toFixed(6);
        
        // Update swap details
        updateSwapDetails(amount, convertedAmount);
    });
}

function updateSwapDetails(fromAmount, toAmount) {
    const priceImpact = document.getElementById('priceImpact');
    const minimumReceived = document.getElementById('minimumReceived');
    const networkFee = document.getElementById('networkFee');
    
    if (priceImpact) {
        const impact = Math.random() * 0.1; // Random impact for demo
        priceImpact.textContent = `${impact.toFixed(2)}%`;
        priceImpact.className = impact > 0.05 ? 'negative' : 'positive';
    }
    
    if (minimumReceived) {
        const minimum = toAmount * 0.995; // 0.5% slippage
        minimumReceived.textContent = `${minimum.toFixed(6)} ETH`;
    }
    
    if (networkFee) {
        const fee = Math.random() * 0.01 + 0.005; // Random fee for demo
        networkFee.textContent = `$${fee.toFixed(3)}`;
    }
}

// Wallet sidebar functionality
const walletToggle = document.querySelector('.btn-connect-wallet');
const walletSidebar = document.querySelector('.wallet-sidebar');
const walletClose = document.querySelector('.wallet-close-btn');

if (walletToggle && walletSidebar) {
    walletToggle.addEventListener('click', (e) => {
        e.preventDefault();
        walletSidebar.classList.toggle('hidden');
    });
}

if (walletClose && walletSidebar) {
    walletClose.addEventListener('click', () => {
        walletSidebar.classList.add('hidden');
    });
}

// Close wallet sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (walletSidebar && !walletSidebar.contains(e.target) && !walletToggle.contains(e.target)) {
        walletSidebar.classList.add('hidden');
    }
});

// Charity auction timer
function updateCharityTimer() {
    const timerElements = document.querySelectorAll('.charity-timer .time-value');
    const endTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000); // 2 days from now
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (timerElements.length >= 4) {
            timerElements[0].textContent = days.toString().padStart(2, '0');
            timerElements[1].textContent = hours.toString().padStart(2, '0');
            timerElements[2].textContent = minutes.toString().padStart(2, '0');
            timerElements[3].textContent = seconds.toString().padStart(2, '0');
        }
        
        if (distance < 0) {
            timerElements.forEach(el => el.textContent = '00');
        }
    }, 1000);
}

// Initialize charity timer
updateCharityTimer();

// Token card interactions
document.querySelectorAll('.token-card').forEach(card => {
    card.addEventListener('click', () => {
        const tokenName = card.querySelector('.token-card-info h3').textContent;
        console.log('Selected token:', tokenName);
        // Here you would open token details modal
    });
});

// Balance click to max functionality
document.querySelectorAll('.balance').forEach(balance => {
    balance.addEventListener('click', (e) => {
        const input = e.target.closest('.swap-input-group').querySelector('.swap-input');
        if (input) {
            input.value = '1000.0'; // Demo max balance
            input.dispatchEvent(new Event('input'));
        }
    });
});

// Copy wallet address functionality
const copyBtns = document.querySelectorAll('.copy-btn');
copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const address = '0x742d35Cc6634C0532925a3b8D';
        navigator.clipboard.writeText(address).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = 'Copy';
            }, 2000);
        });
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('TokenSwap DApp initialized');
    
    // Set initial active states
    const firstCategoryTab = document.querySelector('.category-tab');
    if (firstCategoryTab) {
        firstCategoryTab.classList.add('active');
    }
    
    const firstViewBtn = document.querySelector('.view-btn');
    if (firstViewBtn) {
        firstViewBtn.classList.add('active');
    }
    
    // Hide wallet sidebar initially
    if (walletSidebar) {
        walletSidebar.classList.add('hidden');
    }
});