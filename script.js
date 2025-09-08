// Global variables
let walletConnected = false;
let currentCategory = 'all';
let currentSort = 'volume';

// Wallet simulation
let userWallet = {
    address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e',
    balance: 1000, // FanKoin balance
    tokens: []
};

// Available tokens for swapping
const availableTokens = [
    {
        symbol: 'FanKoin',
        name: 'FanKoin',
        avatar: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        price: 1.0,
        balance: 1000
    },
    {
        symbol: 'TAYLOR',
        name: 'Taylor Swift',
        avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        price: 1.25,
        balance: 0
    },
    {
        symbol: 'BEAST',
        name: 'MrBeast',
        avatar: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        price: 2.10,
        balance: 0
    },
    {
        symbol: 'ROCK',
        name: 'Dwayne Johnson',
        avatar: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        price: 3.50,
        balance: 0
    },
    {
        symbol: 'GOLSHI',
        name: 'Golshifteh Farahani',
        avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        price: 50000,
        balance: 0
    }
];

let fromToken = availableTokens[0]; // FanKoin
let toToken = availableTokens[1]; // TAYLOR
let currentSwapDirection = 'from';

// Sample tokens data
const tokensData = [
    {
        id: 1,
        name: 'Taylor Swift',
        symbol: 'TAYLOR',
        avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        category: 'music',
        description: 'Official fan token for Taylor Swift. Get exclusive access to concerts, merchandise, and behind-the-scenes content.',
        price: 1.25,
        change: '+12.5%',
        volume: '$2.4M',
        marketCap: '$125M',
        holders: '45.2K'
    },
    {
        id: 2,
        name: 'MrBeast',
        symbol: 'BEAST',
        avatar: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        category: 'creators',
        description: 'Join MrBeast\'s community with exclusive challenges, giveaways, and early access to videos.',
        price: 2.10,
        change: '+8.3%',
        volume: '$1.8M',
        marketCap: '$210M',
        holders: '38.7K'
    },
    {
        id: 3,
        name: 'Dwayne Johnson',
        symbol: 'ROCK',
        avatar: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        category: 'movies',
        description: 'The Rock\'s official fan token with movie premieres, gym sessions, and motivational content.',
        price: 3.50,
        change: '+15.2%',
        volume: '$3.2M',
        marketCap: '$350M',
        holders: '52.1K'
    },
    {
        id: 4,
        name: 'Ninja',
        symbol: 'NINJA',
        avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        category: 'gaming',
        description: 'Gaming with Ninja! Exclusive tournaments, gaming tips, and subscriber-only streams.',
        price: 0.95,
        change: '-2.1%',
        volume: '$890K',
        marketCap: '$95M',
        holders: '28.3K'
    },
    {
        id: 5,
        name: 'Kevin Hart',
        symbol: 'HART',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        category: 'comedy',
        description: 'Laugh with Kevin Hart! Exclusive comedy shows, behind-the-scenes, and meet & greets.',
        price: 1.80,
        change: '+5.7%',
        volume: '$1.2M',
        marketCap: '$180M',
        holders: '31.5K'
    },
    {
        id: 6,
        name: 'Serena Williams',
        symbol: 'SERENA',
        avatar: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        category: 'sports',
        description: 'Tennis legend Serena Williams. Training sessions, tournaments, and fitness programs.',
        price: 2.75,
        change: '+9.4%',
        volume: '$1.5M',
        marketCap: '$275M',
        holders: '22.8K'
    }
];

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const tokensContainer = document.getElementById('tokensContainer');
const categoryTabs = document.querySelectorAll('.category-tab');
const sortSelect = document.getElementById('sortBy');
const searchInput = document.getElementById('searchInput');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderTokens();
    setupEventListeners();
    startCharityTimer();
    setupSwapCalculator();
});

// Event Listeners
function setupEventListeners() {
    // Connect wallet
    connectWalletBtn.addEventListener('click', connectWallet);
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderTokens();
        });
    });
    
    // Sort and search
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderTokens();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', renderTokens);
    }
    
    // Swap form inputs
    const fromAmountInput = document.getElementById('fromAmount');
    if (fromAmountInput) {
        fromAmountInput.addEventListener('input', calculateSwapAmount);
    }
}

// Wallet Connection
function connectWallet() {
    if (!walletConnected) {
        walletConnected = true;
        connectWalletBtn.innerHTML = '<i class="fas fa-check"></i> Wallet Connected';
        connectWalletBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        showNotification('Wallet connected successfully!', 'success');
    }
}

// Wallet Functions
function openWallet() {
    if (!walletConnected) {
        connectWallet();
        setTimeout(() => {
            showWalletModal();
        }, 1000);
    } else {
        showWalletModal();
    }
}

function showWalletModal() {
    const walletContent = document.getElementById('walletContent');
    
    if (userWallet.tokens.length === 0) {
        walletContent.innerHTML = `
            <div class="wallet-header">
                <div class="wallet-address">
                    <span class="wallet-address-text">${userWallet.address}</span>
                    <button class="copy-btn" onclick="copyAddress()">Copy</button>
                </div>
                <div class="wallet-balance">
                    <span class="balance-amount">${userWallet.balance.toLocaleString()}</span>
                    <span class="balance-label">FanKoin</span>
                </div>
            </div>
            
            <div class="empty-wallet">
                <i class="fas fa-wallet"></i>
                <h4>No Tokens Yet</h4>
                <p>Start bidding on celebrity tokens to build your portfolio!</p>
            </div>
        `;
    } else {
        walletContent.innerHTML = `
            <div class="wallet-header">
                <div class="wallet-address">
                    <span class="wallet-address-text">${userWallet.address}</span>
                    <button class="copy-btn" onclick="copyAddress()">Copy</button>
                </div>
                <div class="wallet-balance">
                    <span class="balance-amount">${userWallet.balance.toLocaleString()}</span>
                    <span class="balance-label">FanKoin</span>
                </div>
            </div>
            
            <div class="wallet-tokens">
                <h4>Your Tokens (${userWallet.tokens.length})</h4>
                <div class="token-list-wallet">
                    ${userWallet.tokens.map(token => `
                        <div class="wallet-token-item">
                            <img src="${token.avatar}" alt="${token.name}" class="wallet-token-avatar">
                            <div class="wallet-token-info">
                                <div class="wallet-token-name">${token.name}</div>
                                <div class="wallet-token-symbol">$${token.symbol}</div>
                            </div>
                            <div class="wallet-token-balance">
                                <span class="token-amount">${token.amount.toLocaleString()}</span>
                                <span class="token-value">$${(token.amount * token.price).toLocaleString()}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    document.getElementById('walletModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWalletModal() {
    document.getElementById('walletModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function copyAddress() {
    navigator.clipboard.writeText(userWallet.address);
    showNotification('Address copied to clipboard!', 'success');
}

// Charity Auction Functions
function openCharityBidModal() {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    document.getElementById('charityBidModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCharityBidModal() {
    document.getElementById('charityBidModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function placeCharityBid() {
    const bidAmount = parseFloat(document.getElementById('charityBidAmount').value);
    
    if (!bidAmount || bidAmount <= 50000) {
        showNotification('Minimum bid is $50,001', 'error');
        return;
    }
    
    if (bidAmount > userWallet.balance) {
        showNotification('Insufficient FanKoin balance', 'error');
        return;
    }
    
    // Simulate bid placement
    userWallet.balance -= bidAmount;
    
    // Add token to wallet
    const existingToken = userWallet.tokens.find(t => t.symbol === 'GOLSHI');
    if (existingToken) {
        existingToken.amount += 1;
    } else {
        userWallet.tokens.push({
            symbol: 'GOLSHI',
            name: 'Golshifteh Farahani',
            avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
            price: bidAmount,
            amount: 1
        });
    }
    
    // Update available token balance
    const golshiToken = availableTokens.find(t => t.symbol === 'GOLSHI');
    if (golshiToken) {
        golshiToken.balance = 1;
    }
    
    closeCharityBidModal();
    showNotification(`Charity bid of $${bidAmount.toLocaleString()} placed successfully!`, 'success');
}

function startCharityTimer() {
    let timeLeft = 2 * 3600 + 45 * 60 + 23; // 2:45:23 in seconds
    
    function updateTimer() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        // Update hero timer
        const heroHours = document.getElementById('charityHours');
        const heroMinutes = document.getElementById('charityMinutes');
        const heroSeconds = document.getElementById('charitySeconds');
        
        if (heroHours) heroHours.textContent = hours.toString().padStart(2, '0');
        if (heroMinutes) heroMinutes.textContent = minutes.toString().padStart(2, '0');
        if (heroSeconds) heroSeconds.textContent = seconds.toString().padStart(2, '0');
        
        timeLeft--;
        if (timeLeft < 0) {
            timeLeft = 24 * 3600; // Reset to 24 hours
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Token Swap Functions
function setupSwapCalculator() {
    updateSwapDisplay();
}

function openTokenSelector(direction) {
    currentSwapDirection = direction;
    const tokenList = document.getElementById('tokenList');
    
    tokenList.innerHTML = availableTokens.map(token => `
        <div class="token-option" onclick="selectToken('${token.symbol}')">
            <img src="${token.avatar}" alt="${token.name}" class="token-option-avatar">
            <div class="token-option-info">
                <div class="token-option-name">${token.name}</div>
                <div class="token-option-symbol">$${token.symbol}</div>
            </div>
            <div class="token-option-balance">${token.balance.toLocaleString()}</div>
        </div>
    `).join('');
    
    document.getElementById('tokenSelectorModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTokenSelector() {
    document.getElementById('tokenSelectorModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function selectToken(symbol) {
    const token = availableTokens.find(t => t.symbol === symbol);
    
    if (currentSwapDirection === 'from') {
        fromToken = token;
        document.getElementById('fromToken').textContent = token.symbol;
        document.querySelector('#fromToken').previousElementSibling.src = token.avatar;
        document.getElementById('fromBalance').textContent = token.balance.toLocaleString();
    } else {
        toToken = token;
        document.getElementById('toToken').textContent = token.symbol;
        document.querySelector('#toToken').previousElementSibling.src = token.avatar;
        document.getElementById('toBalance').textContent = token.balance.toLocaleString();
    }
    
    updateSwapDisplay();
    calculateSwapAmount();
    closeTokenSelector();
}

function swapTokens() {
    const temp = fromToken;
    fromToken = toToken;
    toToken = temp;
    
    document.getElementById('fromToken').textContent = fromToken.symbol;
    document.querySelector('#fromToken').previousElementSibling.src = fromToken.avatar;
    document.getElementById('fromBalance').textContent = fromToken.balance.toLocaleString();
    
    document.getElementById('toToken').textContent = toToken.symbol;
    document.querySelector('#toToken').previousElementSibling.src = toToken.avatar;
    document.getElementById('toBalance').textContent = toToken.balance.toLocaleString();
    
    updateSwapDisplay();
    calculateSwapAmount();
}

function updateSwapDisplay() {
    const exchangeRate = fromToken.price / toToken.price;
    document.getElementById('exchangeRate').textContent = `1 ${fromToken.symbol} = ${exchangeRate.toFixed(4)} ${toToken.symbol}`;
}

function calculateSwapAmount() {
    const fromAmount = parseFloat(document.getElementById('fromAmount').value) || 0;
    const exchangeRate = fromToken.price / toToken.price;
    const toAmount = fromAmount * exchangeRate;
    
    document.getElementById('toAmount').value = toAmount.toFixed(6);
    
    // Update price impact (simulate)
    const priceImpact = fromAmount > 100 ? (fromAmount / 1000).toFixed(2) : '< 0.01';
    document.getElementById('priceImpact').textContent = `${priceImpact}%`;
}

function setMaxSwap() {
    document.getElementById('fromAmount').value = fromToken.balance;
    calculateSwapAmount();
}

function executeSwap() {
    const fromAmount = parseFloat(document.getElementById('fromAmount').value);
    
    if (!fromAmount || fromAmount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (fromAmount > fromToken.balance) {
        showNotification(`Insufficient ${fromToken.symbol} balance`, 'error');
        return;
    }
    
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    // Execute swap
    const exchangeRate = fromToken.price / toToken.price;
    const toAmount = fromAmount * exchangeRate;
    
    // Update balances
    fromToken.balance -= fromAmount;
    toToken.balance += toAmount;
    
    // Update wallet if it's FanKoin
    if (fromToken.symbol === 'FanKoin') {
        userWallet.balance -= fromAmount;
    }
    if (toToken.symbol === 'FanKoin') {
        userWallet.balance += toAmount;
    }
    
    // Update display
    document.getElementById('fromBalance').textContent = fromToken.balance.toLocaleString();
    document.getElementById('toBalance').textContent = toToken.balance.toLocaleString();
    document.getElementById('fromAmount').value = '';
    document.getElementById('toAmount').value = '';
    
    showNotification(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount.toFixed(6)} ${toToken.symbol}!`, 'success');
}

// Token rendering
function renderTokens() {
    let filteredTokens = tokensData;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredTokens = filteredTokens.filter(token => token.category === currentCategory);
    }
    
    // Filter by search
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    if (searchTerm) {
        filteredTokens = filteredTokens.filter(token => 
            token.name.toLowerCase().includes(searchTerm) || 
            token.symbol.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort tokens
    filteredTokens.sort((a, b) => {
        switch (currentSort) {
            case 'price':
                return b.price - a.price;
            case 'change':
                return parseFloat(b.change) - parseFloat(a.change);
            case 'marketcap':
                return parseFloat(b.marketCap.replace(/[$M]/g, '')) - parseFloat(a.marketCap.replace(/[$M]/g, ''));
            case 'volume':
            default:
                return parseFloat(b.volume.replace(/[$MK]/g, '')) - parseFloat(a.volume.replace(/[$MK]/g, ''));
        }
    });
    
    if (tokensContainer) {
        tokensContainer.innerHTML = filteredTokens.map(token => `
            <div class="token-card" onclick="openTokenModal(${token.id})">
                <div class="token-card-category">${getCategoryEmoji(token.category)} ${token.category}</div>
                <div class="token-card-header">
                    <img src="${token.avatar}" alt="${token.name}" class="token-card-avatar">
                    <div class="token-card-info">
                        <h3>${token.name}</h3>
                        <div class="token-card-symbol">$${token.symbol}</div>
                    </div>
                </div>
                <div class="token-card-description">${token.description}</div>
                <div class="token-card-stats">
                    <div class="token-stat">
                        <span class="token-stat-value">${token.volume}</span>
                        <span class="token-stat-label">24h Volume</span>
                    </div>
                    <div class="token-stat">
                        <span class="token-stat-value">${token.holders}</span>
                        <span class="token-stat-label">Holders</span>
                    </div>
                </div>
                <div class="token-card-footer">
                    <div class="token-price-info">
                        <span class="token-current-price">$${token.price}</span>
                        <span class="token-price-change ${token.change.startsWith('+') ? 'positive' : 'negative'}">${token.change}</span>
                    </div>
                    <div class="token-actions">
                        <button class="btn-primary btn-small" onclick="event.stopPropagation(); buyToken(${token.id})">Buy</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function getCategoryEmoji(category) {
    const emojis = {
        music: '🎵',
        creators: '📹',
        gaming: '🎮',
        sports: '⚽',
        movies: '🎬',
        comedy: '😂'
    };
    return emojis[category] || '⭐';
}

function buyToken(tokenId) {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const token = tokensData.find(t => t.id === tokenId);
    if (!token) return;
    
    if (userWallet.balance < token.price) {
        showNotification('Insufficient FanKoin balance', 'error');
        return;
    }
    
    // Simulate purchase
    userWallet.balance -= token.price;
    
    // Add to wallet
    const existingToken = userWallet.tokens.find(t => t.symbol === token.symbol);
    if (existingToken) {
        existingToken.amount += 1;
    } else {
        userWallet.tokens.push({
            symbol: token.symbol,
            name: token.name,
            avatar: token.avatar,
            price: token.price,
            amount: 1
        });
    }
    
    // Update available token balance
    const availableToken = availableTokens.find(t => t.symbol === token.symbol);
    if (availableToken) {
        availableToken.balance += 1;
    }
    
    showNotification(`Purchased 1 ${token.symbol} token for $${token.price}!`, 'success');
}

function loadMoreTokens() {
    showNotification('All tokens loaded!', 'info');
}

function scrollToTrending() {
    document.querySelector('.token-grid').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function showNotification(message, type = 'info') {
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
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}