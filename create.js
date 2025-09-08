// Global variables
let walletConnected = false;
let selectedCategory = '';
let selectedBenefits = [];
let createdTokenData = null;

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const tokenCreationForm = document.getElementById('tokenCreationForm');
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const categoryOptions = document.querySelectorAll('.category-option');
const benefitCheckboxes = document.querySelectorAll('.benefit-checkbox input[type="checkbox"]');
const successModal = document.getElementById('successModal');

// Form inputs
const tokenNameInput = document.getElementById('tokenName');
const tokenSymbolInput = document.getElementById('tokenSymbol');
const tokenDescriptionInput = document.getElementById('tokenDescription');
const initialSupplyInput = document.getElementById('initialSupply');
const initialPriceInput = document.getElementById('initialPrice');

// Preview elements
const previewCard = document.getElementById('previewCard');
const previewCategory = document.getElementById('previewCategory');
const previewAvatar = document.getElementById('previewAvatar');
const previewName = document.getElementById('previewName');
const previewSymbol = document.getElementById('previewSymbol');
const previewDescription = document.getElementById('previewDescription');
const previewPrice = document.getElementById('previewPrice');
const previewSupply = document.getElementById('previewSupply');
const previewMarketCap = document.getElementById('previewMarketCap');
const benefitsList = document.getElementById('benefitsList');

// Cost elements
const liquidityCost = document.getElementById('liquidityCost');
const totalCost = document.getElementById('totalCost');

// Character counter
const charCount = document.getElementById('charCount');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updatePreview();
    updateCosts();
});

// Event Listeners
function setupEventListeners() {
    // Connect wallet
    connectWalletBtn.addEventListener('click', connectWallet);
    
    // Avatar upload
    avatarInput.addEventListener('change', handleAvatarUpload);
    
    // Category selection
    categoryOptions.forEach(option => {
        option.addEventListener('click', () => selectCategory(option.dataset.category));
    });
    
    // Form inputs for live preview
    tokenNameInput.addEventListener('input', updatePreview);
    tokenSymbolInput.addEventListener('input', updatePreview);
    tokenDescriptionInput.addEventListener('input', updatePreview);
    initialSupplyInput.addEventListener('input', () => {
        updatePreview();
        updateCosts();
    });
    initialPriceInput.addEventListener('input', () => {
        updatePreview();
        updateCosts();
    });
    
    // Character counter for description
    tokenDescriptionInput.addEventListener('input', updateCharCounter);
    
    // Benefits selection
    benefitCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBenefits);
    });
    
    // Form submission
    tokenCreationForm.addEventListener('submit', handleTokenCreation);
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Wallet Connection
function connectWallet() {
    if (!walletConnected) {
        // Simulate wallet connection
        walletConnected = true;
        connectWalletBtn.innerHTML = '<i class="fas fa-check"></i> Wallet Connected';
        connectWalletBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        showNotification('Wallet connected successfully!', 'success');
    }
}

// Avatar Upload
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showNotification('Image size must be less than 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            avatarPreview.innerHTML = `<img src="${e.target.result}" alt="Token Avatar">`;
            previewAvatar.innerHTML = `<img src="${e.target.result}" alt="Token Avatar">`;
        };
        reader.readAsDataURL(file);
    }
}

// Category Selection
function selectCategory(category) {
    selectedCategory = category;
    
    // Update UI
    categoryOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`[data-category="${category}"]`);
    selectedOption.classList.add('selected');
    
    // Update hidden input
    document.getElementById('selectedCategory').value = category;
    
    updatePreview();
}

// Benefits Selection
function updateBenefits() {
    selectedBenefits = [];
    benefitCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedBenefits.push(checkbox.value);
        }
    });
    
    updatePreview();
}

// Live Preview Updates
function updatePreview() {
    // Update name and symbol
    const name = tokenNameInput.value || 'Token Name';
    const symbol = tokenSymbolInput.value || 'SYMBOL';
    const description = tokenDescriptionInput.value || 'Token description will appear here...';
    const supply = initialSupplyInput.value || '1000000';
    const price = parseFloat(initialPriceInput.value) || 0.001;
    
    previewName.textContent = name;
    previewSymbol.textContent = `$${symbol.toUpperCase()}`;
    previewDescription.textContent = description;
    previewPrice.textContent = `$${price.toFixed(4)}`;
    previewSupply.textContent = formatNumber(parseInt(supply));
    previewMarketCap.textContent = `$${formatNumber(parseInt(supply) * price)}`;
    
    // Update category
    if (selectedCategory) {
        const categoryEmojis = {
            music: '🎵',
            creators: '📹',
            gaming: '🎮',
            sports: '⚽',
            movies: '🎬',
            comedy: '😂'
        };
        previewCategory.textContent = `${categoryEmojis[selectedCategory]} ${selectedCategory}`;
    }
    
    // Update benefits
    if (selectedBenefits.length > 0) {
        const benefitNames = {
            'exclusive-content': 'Exclusive Content',
            'meet-greet': 'Meet & Greets',
            'merchandise': 'Exclusive Merch',
            'events': 'VIP Events',
            'voting': 'Fan Voting',
            'discord': 'VIP Discord'
        };
        
        const benefitText = selectedBenefits.map(benefit => benefitNames[benefit]).join(', ');
        benefitsList.textContent = benefitText;
    } else {
        benefitsList.textContent = 'Select benefits above';
    }
}

// Character Counter
function updateCharCounter() {
    const count = tokenDescriptionInput.value.length;
    charCount.textContent = count;
    
    if (count > 500) {
        charCount.style.color = '#f87171';
        tokenDescriptionInput.value = tokenDescriptionInput.value.substring(0, 500);
        charCount.textContent = '500';
    } else if (count > 450) {
        charCount.style.color = '#fbbf24';
    } else {
        charCount.style.color = '#999';
    }
}

// Cost Calculation
function updateCosts() {
    const supply = parseInt(initialSupplyInput.value) || 1000000;
    const price = parseFloat(initialPriceInput.value) || 0.001;
    const liquidity = supply * price * 0.1; // 10% of market cap for initial liquidity
    const liquidityETH = liquidity * 0.0003; // Assume ETH price conversion
    
    liquidityCost.textContent = `${liquidityETH.toFixed(4)} ETH`;
    
    const total = 0.01 + liquidityETH + 0.005; // Platform fee + liquidity + gas
    totalCost.textContent = `~${total.toFixed(4)} ETH`;
}

// Token Creation
function handleTokenCreation(e) {
    e.preventDefault();
    
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    if (!selectedCategory) {
        showNotification('Please select a category', 'error');
        return;
    }
    
    if (selectedBenefits.length === 0) {
        showNotification('Please select at least one fan benefit', 'error');
        return;
    }
    
    // Validate form
    const formData = new FormData(tokenCreationForm);
    const tokenData = {
        name: tokenNameInput.value,
        symbol: tokenSymbolInput.value.toUpperCase(),
        category: selectedCategory,
        description: tokenDescriptionInput.value,
        initialSupply: parseInt(initialSupplyInput.value),
        initialPrice: parseFloat(initialPriceInput.value),
        benefits: selectedBenefits,
        social: {
            twitter: document.getElementById('twitterLink').value,
            instagram: document.getElementById('instagramLink').value,
            youtube: document.getElementById('youtubeLink').value,
            website: document.getElementById('websiteLink').value
        }
    };
    
    // Validate required fields
    if (!tokenData.name || !tokenData.symbol || !tokenData.description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (tokenData.initialSupply < 1000 || tokenData.initialSupply > 1000000000) {
        showNotification('Initial supply must be between 1,000 and 1,000,000,000', 'error');
        return;
    }
    
    if (tokenData.initialPrice < 0.0001 || tokenData.initialPrice > 1) {
        showNotification('Initial price must be between 0.0001 and 1 ETH', 'error');
        return;
    }
    
    // Start creation process
    startTokenCreation(tokenData);
}

function startTokenCreation(tokenData) {
    const createBtn = document.getElementById('createTokenBtn');
    createBtn.classList.add('loading');
    createBtn.disabled = true;
    
    showNotification('Creating your fan token...', 'info');
    
    // Simulate blockchain transaction
    setTimeout(() => {
        showNotification('Deploying smart contract...', 'info');
        
        setTimeout(() => {
            showNotification('Adding initial liquidity...', 'info');
            
            setTimeout(() => {
                // Token creation successful
                createdTokenData = {
                    ...tokenData,
                    id: Date.now(),
                    contractAddress: generateContractAddress(),
                    transactionHash: generateTransactionHash(),
                    marketCap: tokenData.initialSupply * tokenData.initialPrice,
                    holders: 1,
                    volume24h: 0,
                    created: new Date().toISOString()
                };
                
                showTokenCreationSuccess();
                createBtn.classList.remove('loading');
                createBtn.disabled = false;
                
            }, 2000);
        }, 2000);
    }, 3000);
}

function showTokenCreationSuccess() {
    // Populate success modal
    const tokenDetails = document.getElementById('createdTokenDetails');
    tokenDetails.innerHTML = `
        <div class="token-success-info">
            <div class="token-success-header">
                <div class="token-success-avatar">
                    ${previewAvatar.innerHTML}
                </div>
                <div>
                    <h4>${createdTokenData.name}</h4>
                    <div class="token-success-symbol">$${createdTokenData.symbol}</div>
                </div>
            </div>
            <div class="token-success-details">
                <div class="detail-row">
                    <span>Contract Address:</span>
                    <span class="contract-address">${createdTokenData.contractAddress}</span>
                </div>
                <div class="detail-row">
                    <span>Transaction Hash:</span>
                    <span class="tx-hash">${createdTokenData.transactionHash}</span>
                </div>
                <div class="detail-row">
                    <span>Initial Price:</span>
                    <span>$${createdTokenData.initialPrice.toFixed(4)}</span>
                </div>
                <div class="detail-row">
                    <span>Market Cap:</span>
                    <span>$${formatNumber(createdTokenData.marketCap)}</span>
                </div>
            </div>
        </div>
    `;
    
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    showNotification('Token created successfully!', 'success');
}

// Modal Actions
function viewToken() {
    // In a real app, this would navigate to the token page
    showNotification('Redirecting to token page...', 'info');
    setTimeout(() => {
        window.location.href = `index.html?token=${createdTokenData.symbol}`;
    }, 1000);
}

function createAnother() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    tokenCreationForm.reset();
    selectedCategory = '';
    selectedBenefits = [];
    
    // Reset UI
    categoryOptions.forEach(option => option.classList.remove('selected'));
    benefitCheckboxes.forEach(checkbox => checkbox.checked = false);
    
    avatarPreview.innerHTML = `
        <i class="fas fa-camera"></i>
        <span>Upload Image</span>
        <small>Recommended: 400x400px</small>
    `;
    
    previewAvatar.innerHTML = '<i class="fas fa-image"></i>';
    
    updatePreview();
    updateCosts();
    
    showNotification('Ready to create another token!', 'success');
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function generateContractAddress() {
    return '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function generateTransactionHash() {
    return '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#f87171' : '#e91e63'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
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
    
    .token-success-info {
        text-align: left;
    }
    
    .token-success-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .token-success-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
    }
    
    .token-success-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .token-success-header h4 {
        color: #fff;
        margin: 0;
        font-size: 1.1rem;
    }
    
    .token-success-symbol {
        color: #e91e63;
        font-weight: 600;
        font-size: 0.9rem;
    }
    
    .token-success-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }
    
    .detail-row span:first-child {
        color: #ccc;
    }
    
    .detail-row span:last-child {
        color: #fff;
        font-weight: 500;
    }
    
    .contract-address,
    .tx-hash {
        font-family: 'Courier New', monospace;
        font-size: 0.8rem !important;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
document.head.appendChild(style);