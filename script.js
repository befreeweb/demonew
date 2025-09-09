// Sample token data
const sampleTokens = [
    {
        id: 1,
        name: "Taylor Swift",
        symbol: "TAYLOR",
        avatar: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        category: "music",
        description: "Official fan token for Taylor Swift with exclusive access to concerts and merchandise.",
        price: 12.50,
        change: 8.5,
        volume: 125000,
        marketCap: 2500000,
        holders: 15420
    },
    {
        id: 2,
        name: "MrBeast",
        symbol: "BEAST",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        category: "creators",
        description: "Join MrBeast's community with exclusive challenges and behind-the-scenes content.",
        price: 8.75,
        change: -2.3,
        volume: 89000,
        marketCap: 1750000,
        holders: 12890
    },
    {
        id: 3,
        name: "PewDiePie",
        symbol: "PEWDS",
        avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        category: "gaming",
        description: "Gaming content creator token with access to exclusive streams and gaming sessions.",
        price: 15.20,
        change: 12.1,
        volume: 156000,
        marketCap: 3040000,
        holders: 18750
    },
    {
        id: 4,
        name: "Dwayne Johnson",
        symbol: "ROCK",
        avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        category: "movies",
        description: "The Rock's official token with movie premieres and fitness content access.",
        price: 22.80,
        change: 5.7,
        volume: 203000,
        marketCap: 4560000,
        holders: 22100
    },
    {
        id: 5,
        name: "Ariana Grande",
        symbol: "ARI",
        avatar: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        category: "music",
        description: "Pop sensation token with concert access and exclusive music releases.",
        price: 18.90,
        change: 15.2,
        volume: 178000,
        marketCap: 3780000,
        holders: 19850
    },
    {
        id: 6,
        name: "Kevin Hart",
        symbol: "HART",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        category: "comedy",
        description: "Comedy king token with stand-up show access and exclusive comedy content.",
        price: 9.45,
        change: -1.8,
        volume: 67000,
        marketCap: 1890000,
        holders: 11200
    }
];

let currentTokens = [...sampleTokens];
let currentCategory = 'all';
let currentSort = 'volume';

// DOM Elements
const tokensContainer = document.getElementById('tokensContainer');
const categoryTabs = document.querySelectorAll('.category-tab');
const sortSelect = document.getElementById('sortBy');
const searchInput = document.getElementById('searchInput');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderTokens();
    setupEventListeners();
    startCharityTimer();
    updateSwapCalculation();
});

// Event Listeners
function setupEventListeners() {
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            setActiveCategory(category);
            filterTokens();
        });
    });

    // Sort dropdown
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            sortTokens();
            renderTokens();
        });
    }

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterTokens();
        });
    }

    // Swap inputs
    const fromAmountInput = document.getElementById('fromAmount');
    const toAmountInput = document.getElementById('toAmount');
    
    if (fromAmountInput) {
        fromAmountInput.addEventListener('input', updateSwapCalculation);
    }
}

// Category filtering
function setActiveCategory(category) {
    currentCategory = category;
    categoryTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
}

function filterTokens() {
    let filtered = [...sampleTokens];

    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(token => token.category === currentCategory);
    }

    // Filter by search
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    if (searchTerm) {
        filtered = filtered.filter(token => 
            token.name.toLowerCase().includes(searchTerm) ||
            token.symbol.toLowerCase().includes(searchTerm)
        );
    }

    currentTokens = filtered;
    sortTokens();
    renderTokens();
}

// Sorting
function sortTokens() {
    currentTokens.sort((a, b) => {
        switch (currentSort) {
            case 'price':
                return b.price - a.price;
            case 'change':
                return b.change - a.change;
            case 'marketcap':
                return b.marketCap - a.marketCap;
            case 'volume':
            default:
                return b.volume - a.volume;
        }
    });
}

// Render tokens
function renderTokens() {
    if (!tokensContainer) return;

    tokensContainer.innerHTML = currentTokens.map(token => `
        <div class="token-card" onclick="openTokenDetail(${token.id})">
            <div class="token-card-category">${getCategoryEmoji(token.category)} ${token.category}</div>
            <div class="token-card-header">
                <img src="${token.avatar}" alt="${token.name}" class="token-card-avatar">
                <div class="token-card-info">
                    <h3>${token.name}</h3>
                    <div class="token-card-symbol">$${token.symbol}</div>
                </div>
            </div>
            <p class="token-card-description">${token.description}</p>
            <div class="token-card-stats">
                <div class="token-stat">
                    <span class="token-stat-value">${formatNumber(token.volume)}</span>
                    <span class="token-stat-label">Volume</span>
                </div>
                <div class="token-stat">
                    <span class="token-stat-value">${formatNumber(token.holders)}</span>
                    <span class="token-stat-label">Holders</span>
                </div>
            </div>
            <div class="token-card-footer">
                <div class="token-price-info">
                    <span class="token-current-price">$${token.price.toFixed(2)}</span>
                    <span class="token-price-change ${token.change >= 0 ? 'positive' : 'negative'}">
                        ${token.change >= 0 ? '+' : ''}${token.change.toFixed(1)}%
                    </span>
                </div>
                <div class="token-actions">
                    <button class="btn-primary btn-small" onclick="event.stopPropagation(); buyToken(${token.id})">Buy</button>
                    <button class="btn-secondary btn-small" onclick="event.stopPropagation(); sellToken(${token.id})">Sell</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Utility functions
function getCategoryEmoji(category) {
    const emojis = {
        music: '🎵',
        creators: '📹',
        gaming: '🎮',
        sports: '⚽',
        movies: '🎬',
        comedy: '😂'
    };
    return emojis[category] || '🎭';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Modal functions
function openWallet() {
    const modal = document.getElementById('walletModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        populateWalletContent();
    }
}

function closeWalletModal() {
    const modal = document.getElementById('walletModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openCharityBidModal() {
    const modal = document.getElementById('charityBidModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCharityBidModal() {
    const modal = document.getElementById('charityBidModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openTokenSelector(type) {
    const modal = document.getElementById('tokenSelectorModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        populateTokenSelector(type);
    }
}

function closeTokenSelector() {
    const modal = document.getElementById('tokenSelectorModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Navigation functions
function scrollToTrending() {
    const trendingSection = document.getElementById('trending');
    if (trendingSection) {
        trendingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Wallet functions
function populateWalletContent() {
    const walletContent = document.getElementById('walletContent');
    if (!walletContent) return;

    const walletTokens = [
        { name: 'FanKoin', symbol: 'FAN', amount: 1000, value: 1000, avatar: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
        { name: 'Taylor Swift', symbol: 'TAYLOR', amount: 25, value: 312.50, avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
        { name: 'MrBeast', symbol: 'BEAST', amount: 50, value: 437.50, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' }
    ];

    const totalValue = walletTokens.reduce((sum, token) => sum + token.value, 0);

    walletContent.innerHTML = `
        <div class="wallet-header">
            <div class="wallet-address">
                <span class="wallet-address-text">0x742d...4e8f</span>
                <button class="copy-btn" onclick="copyAddress()">Copy</button>
            </div>
            <div class="wallet-balance">
                <span class="balance-amount">$${totalValue.toFixed(2)}</span>
                <span class="balance-label">Total Balance</span>
            </div>
        </div>
        <div class="wallet-tokens">
            <h4>Your Tokens</h4>
            <div class="token-list-wallet">
                ${walletTokens.map(token => `
                    <div class="wallet-token-item">
                        <img src="${token.avatar}" alt="${token.name}" class="wallet-token-avatar">
                        <div class="wallet-token-info">
                            <div class="wallet-token-name">${token.name}</div>
                            <div class="wallet-token-symbol">$${token.symbol}</div>
                        </div>
                        <div class="wallet-token-balance">
                            <span class="token-amount">${token.amount}</span>
                            <span class="token-value">$${token.value.toFixed(2)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Token selector functions
function populateTokenSelector(type) {
    const tokenList = document.getElementById('tokenList');
    if (!tokenList) return;

    const tokens = [
        { name: 'FanKoin', symbol: 'FAN', balance: 1000, avatar: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
        { name: 'Taylor Swift', symbol: 'TAYLOR', balance: 25, avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
        { name: 'MrBeast', symbol: 'BEAST', balance: 50, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' }
    ];

    tokenList.innerHTML = tokens.map(token => `
        <div class="token-option" onclick="selectToken('${type}', '${token.symbol}', '${token.name}', '${token.avatar}', ${token.balance})">
            <img src="${token.avatar}" alt="${token.name}" class="token-option-avatar">
            <div class="token-option-info">
                <div class="token-option-name">${token.name}</div>
                <div class="token-option-symbol">$${token.symbol}</div>
            </div>
            <div class="token-option-balance">${token.balance}</div>
        </div>
    `).join('');
}

function selectToken(type, symbol, name, avatar, balance) {
    const tokenElement = document.getElementById(`${type}Token`);
    const balanceElement = document.getElementById(`${type}Balance`);
    const iconElement = document.querySelector(`#${type}Token`).parentElement.querySelector('.token-icon');
    
    if (tokenElement) tokenElement.textContent = symbol;
    if (balanceElement) balanceElement.textContent = balance.toLocaleString();
    if (iconElement) iconElement.src = avatar;
    
    closeTokenSelector();
    updateSwapCalculation();
}

// Swap functions
function swapTokens() {
    const fromToken = document.getElementById('fromToken').textContent;
    const toToken = document.getElementById('toToken').textContent;
    const fromBalance = document.getElementById('fromBalance').textContent;
    const toBalance = document.getElementById('toBalance').textContent;
    const fromAmount = document.getElementById('fromAmount').value;
    const toAmount = document.getElementById('toAmount').value;
    
    // Swap the tokens
    document.getElementById('fromToken').textContent = toToken;
    document.getElementById('toToken').textContent = fromToken;
    document.getElementById('fromBalance').textContent = toBalance;
    document.getElementById('toBalance').textContent = fromBalance;
    document.getElementById('fromAmount').value = toAmount;
    document.getElementById('toAmount').value = fromAmount;
    
    // Swap the icons
    const fromIcon = document.querySelector('#fromToken').parentElement.querySelector('.token-icon');
    const toIcon = document.querySelector('#toToken').parentElement.querySelector('.token-icon');
    const tempSrc = fromIcon.src;
    fromIcon.src = toIcon.src;
    toIcon.src = tempSrc;
    
    updateSwapCalculation();
}

function updateSwapCalculation() {
    const fromAmount = parseFloat(document.getElementById('fromAmount')?.value || 0);
    const toAmountInput = document.getElementById('toAmount');
    const exchangeRateElement = document.getElementById('exchangeRate');
    const priceImpactElement = document.getElementById('priceImpact');
    
    if (fromAmount > 0) {
        const rate = 0.8; // Example exchange rate
        const toAmount = fromAmount * rate;
        
        if (toAmountInput) toAmountInput.value = toAmount.toFixed(4);
        if (exchangeRateElement) exchangeRateElement.textContent = `1 FanKoin = ${rate.toFixed(4)} TAYLOR`;
        if (priceImpactElement) priceImpactElement.textContent = '< 0.01%';
    } else {
        if (toAmountInput) toAmountInput.value = '';
    }
}

function executeSwap() {
    const fromAmount = document.getElementById('fromAmount').value;
    const fromToken = document.getElementById('fromToken').textContent;
    const toToken = document.getElementById('toToken').textContent;
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
        alert('Please enter a valid amount to swap');
        return;
    }
    
    alert(`Swapping ${fromAmount} ${fromToken} for ${toToken}...`);
    // Here you would implement the actual swap logic
}

// Charity auction functions
function placeCharityBid() {
    const bidAmount = document.getElementById('charityBidAmount').value;
    if (!bidAmount || parseFloat(bidAmount) < 1) {
        alert('Please enter a valid bid amount (minimum $1)');
        return;
    }
    
    alert(`Placing bid of $${bidAmount} for Golshifteh Farahani charity auction...`);
    closeCharityBidModal();
}

// Timer functions
function startCharityTimer() {
    const hoursElement = document.getElementById('charityHours');
    const minutesElement = document.getElementById('charityMinutes');
    const secondsElement = document.getElementById('charitySeconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    let totalSeconds = 2 * 3600 + 45 * 60 + 23; // 2h 45m 23s
    
    const timer = setInterval(() => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        totalSeconds--;
        
        if (totalSeconds < 0) {
            clearInterval(timer);
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
        }
    }, 1000);
}

// Trading functions
function openTokenDetail(tokenId) {
    const token = sampleTokens.find(t => t.id === tokenId);
    if (!token) return;
    
    alert(`Opening details for ${token.name} (${token.symbol})`);
    // Here you would open a detailed token modal
}

function buyToken(tokenId) {
    const token = sampleTokens.find(t => t.id === tokenId);
    if (!token) return;
    
    alert(`Buying ${token.symbol} at $${token.price.toFixed(2)}`);
}

function sellToken(tokenId) {
    const token = sampleTokens.find(t => t.id === tokenId);
    if (!token) return;
    
    alert(`Selling ${token.symbol} at $${token.price.toFixed(2)}`);
}

function loadMoreTokens() {
    alert('Loading more tokens...');
    // Here you would load additional tokens
}

// Utility functions
function copyAddress() {
    navigator.clipboard.writeText('0x742d35Cc6C4C0532E3a0532E3a0532E3a04e8f').then(() => {
        alert('Address copied to clipboard!');
    });
}

// Connect wallet function
document.getElementById('connectWallet')?.addEventListener('click', function() {
    alert('Connecting wallet...');
    // Here you would implement wallet connection logic
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        const activeModal = e.target;
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});