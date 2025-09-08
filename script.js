// Sample token data
const sampleTokens = [
    {
        id: 1,
        name: "Taylor Swift Fan Token",
        symbol: "TAYLOR",
        category: "music",
        description: "Official fan token for Taylor Swift supporters. Get exclusive access to concerts, merchandise, and fan experiences.",
        avatar: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        price: 0.45,
        change: 24.5,
        volume: 125000,
        marketCap: 2250000,
        holders: 1847,
        created: "2024-01-15",
        social: {
            twitter: "https://twitter.com/taylorswift13",
            instagram: "https://instagram.com/taylorswift",
            website: "https://taylorswift.com"
        }
    },
    {
        id: 2,
        name: "MrBeast Creator Token",
        symbol: "BEAST",
        category: "creators",
        description: "Support MrBeast's philanthropic missions and get early access to challenge participation and exclusive content.",
        avatar: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        price: 1.23,
        change: 18.2,
        volume: 89000,
        marketCap: 1845000,
        holders: 2341,
        created: "2024-01-20",
        social: {
            twitter: "https://twitter.com/mrbeast",
            instagram: "https://instagram.com/mrbeast",
            website: "https://mrbeast.com"
        }
    },
    {
        id: 3,
        name: "Rock Band Collective",
        symbol: "ROCK",
        category: "music",
        description: "A collective token representing multiple rock bands. Holders get access to exclusive concerts and backstage passes.",
        avatar: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        price: 0.78,
        change: 12.8,
        volume: 67000,
        marketCap: 890000,
        holders: 1234,
        created: "2024-01-25",
        social: {
            twitter: "https://twitter.com/rockbandcollective",
            website: "https://rockbandcollective.com"
        }
    },
    {
        id: 4,
        name: "Gaming Streamer Alliance",
        symbol: "GAME",
        category: "gaming",
        description: "Token for top gaming streamers. Get access to exclusive gaming sessions, tournaments, and early game releases.",
        avatar: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        price: 0.92,
        change: -5.3,
        volume: 45000,
        marketCap: 1120000,
        holders: 987,
        created: "2024-02-01",
        social: {
            twitter: "https://twitter.com/gamestreameralliance",
            website: "https://gamestreameralliance.com"
        }
    },
    {
        id: 5,
        name: "Comedy Central Token",
        symbol: "LAUGH",
        category: "comedy",
        description: "Official token for comedy content creators. Access exclusive stand-up shows, comedy specials, and meet & greets.",
        avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        price: 0.34,
        change: 8.7,
        volume: 32000,
        marketCap: 456000,
        holders: 678,
        created: "2024-02-05",
        social: {
            twitter: "https://twitter.com/comedycentral",
            instagram: "https://instagram.com/comedycentral"
        }
    },
    {
        id: 6,
        name: "Sports Fan United",
        symbol: "SPORT",
        category: "sports",
        description: "Multi-sport fan token giving access to exclusive sports content, athlete meet & greets, and VIP game experiences.",
        avatar: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        price: 1.56,
        change: 15.4,
        volume: 78000,
        marketCap: 1890000,
        holders: 1456,
        created: "2024-02-10",
        social: {
            twitter: "https://twitter.com/sportsfanunited",
            website: "https://sportsfanunited.com"
        }
    }
];

let currentTokens = [...sampleTokens];
let currentCategory = 'all';
let currentSort = 'volume';
let walletConnected = false;

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const tokensContainer = document.getElementById('tokensContainer');
const categoryTabs = document.querySelectorAll('.category-tab');
const sortSelect = document.getElementById('sortBy');
const searchInput = document.getElementById('searchInput');
const createModal = document.getElementById('createModal');
const tokenModal = document.getElementById('tokenModal');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderTokens();
    setupEventListeners();
    updateStats();
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
            filterTokens();
        });
    });
    
    // Sort dropdown
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        sortTokens();
    });
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        filterTokens(e.target.value);
    });
    
    // Create token form
    const createForm = document.getElementById('createTokenForm');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateToken);
    }
    
    // Avatar upload
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarInput = document.getElementById('avatarInput');
    
    if (avatarPreview && avatarInput) {
        avatarPreview.addEventListener('click', () => avatarInput.click());
        avatarInput.addEventListener('change', handleAvatarUpload);
    }
    
    // Trade tabs
    const tradeTabs = document.querySelectorAll('.trade-tab');
    tradeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tradeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const buyForm = document.getElementById('buyForm');
            const sellForm = document.getElementById('sellForm');
            
            if (tab.dataset.tab === 'buy') {
                buyForm.classList.remove('hidden');
                sellForm.classList.add('hidden');
            } else {
                buyForm.classList.add('hidden');
                sellForm.classList.remove('hidden');
            }
        });
    });
    
    // Price calculation
    const buyAmountInput = document.getElementById('buyAmount');
    const sellAmountInput = document.getElementById('sellAmount');
    
    if (buyAmountInput) {
        buyAmountInput.addEventListener('input', calculateBuyEstimate);
    }
    
    if (sellAmountInput) {
        sellAmountInput.addEventListener('input', calculateSellEstimate);
    }
}

// Wallet Connection
function connectWallet() {
    if (!walletConnected) {
        // Simulate wallet connection
        walletConnected = true;
        connectWalletBtn.innerHTML = '<i class="fas fa-check"></i> Wallet Connected';
        connectWalletBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        
        // Show success message
        showNotification('Wallet connected successfully!', 'success');
    }
}

// Token Rendering
function renderTokens() {
    tokensContainer.innerHTML = '';
    
    currentTokens.forEach(token => {
        const tokenCard = createTokenCard(token);
        tokensContainer.appendChild(tokenCard);
    });
}

function createTokenCard(token) {
    const card = document.createElement('div');
    card.className = 'token-card';
    card.onclick = () => openTokenModal(token);
    
    const changeClass = token.change >= 0 ? 'positive' : 'negative';
    const changeSymbol = token.change >= 0 ? '+' : '';
    
    card.innerHTML = `
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
                <span class="token-stat-value">$${formatNumber(token.volume)}</span>
                <span class="token-stat-label">24h Volume</span>
            </div>
            <div class="token-stat">
                <span class="token-stat-value">${token.holders}</span>
                <span class="token-stat-label">Holders</span>
            </div>
        </div>
        <div class="token-card-footer">
            <div class="token-price-info">
                <div class="token-current-price">$${token.price.toFixed(3)}</div>
                <div class="token-price-change ${changeClass}">${changeSymbol}${token.change.toFixed(1)}%</div>
            </div>
            <div class="token-actions">
                <button class="btn-primary btn-small" onclick="event.stopPropagation(); quickBuy('${token.symbol}')">Buy</button>
                <button class="btn-secondary btn-small" onclick="event.stopPropagation(); addToWatchlist('${token.symbol}')">Watch</button>
            </div>
        </div>
    `;
    
    return card;
}

// Token Filtering and Sorting
function filterTokens(searchTerm = '') {
    let filtered = [...sampleTokens];
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(token => token.category === currentCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(token => 
            token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    currentTokens = filtered;
    sortTokens();
}

function sortTokens() {
    currentTokens.sort((a, b) => {
        switch (currentSort) {
            case 'volume':
                return b.volume - a.volume;
            case 'price':
                return b.price - a.price;
            case 'change':
                return b.change - a.change;
            case 'marketcap':
                return b.marketCap - a.marketCap;
            case 'created':
                return new Date(b.created) - new Date(a.created);
            default:
                return 0;
        }
    });
    
    renderTokens();
}

// Modal Functions
function openCreateModal() {
    createModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCreateModal() {
    createModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openTokenModal(token) {
    // Populate modal with token data
    document.getElementById('modalTokenAvatar').src = token.avatar;
    document.getElementById('modalTokenName').textContent = token.name;
    document.getElementById('modalTokenSymbol').textContent = `$${token.symbol}`;
    document.getElementById('modalTokenPrice').textContent = `$${token.price.toFixed(3)}`;
    
    const changeClass = token.change >= 0 ? 'positive' : 'negative';
    const changeSymbol = token.change >= 0 ? '+' : '';
    const changeElement = document.getElementById('modalTokenChange');
    changeElement.textContent = `${changeSymbol}${token.change.toFixed(1)}%`;
    changeElement.className = `price-change ${changeClass}`;
    
    document.getElementById('modalMarketCap').textContent = `$${formatNumber(token.marketCap)}`;
    document.getElementById('modalVolume').textContent = `$${formatNumber(token.volume)}`;
    document.getElementById('modalHolders').textContent = token.holders.toLocaleString();
    document.getElementById('modalTokenDescription').textContent = token.description;
    
    // Populate social links
    const socialLinksContainer = document.getElementById('modalSocialLinks');
    socialLinksContainer.innerHTML = '';
    
    if (token.social) {
        Object.entries(token.social).forEach(([platform, url]) => {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.className = 'social-link';
            link.innerHTML = `<i class="fab fa-${platform}"></i>`;
            socialLinksContainer.appendChild(link);
        });
    }
    
    // Draw simple price chart
    drawPriceChart(token);
    
    tokenModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTokenModal() {
    tokenModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Create Token Form
function handleCreateToken(e) {
    e.preventDefault();
    
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const tokenData = {
        name: document.getElementById('tokenName').value,
        symbol: document.getElementById('tokenSymbol').value.toUpperCase(),
        category: document.getElementById('tokenCategory').value,
        description: document.getElementById('tokenDescription').value,
        initialSupply: parseInt(document.getElementById('initialSupply').value),
        initialPrice: parseFloat(document.getElementById('initialPrice').value),
        social: {
            twitter: document.getElementById('twitterLink').value,
            instagram: document.getElementById('instagramLink').value,
            website: document.getElementById('websiteLink').value
        }
    };
    
    // Simulate token creation
    setTimeout(() => {
        showNotification(`Token $${tokenData.symbol} created successfully!`, 'success');
        closeCreateModal();
        
        // Add to sample tokens (in real app, this would be handled by smart contract)
        const newToken = {
            id: sampleTokens.length + 1,
            name: tokenData.name,
            symbol: tokenData.symbol,
            category: tokenData.category,
            description: tokenData.description,
            avatar: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            price: tokenData.initialPrice,
            change: 0,
            volume: 0,
            marketCap: tokenData.initialSupply * tokenData.initialPrice,
            holders: 1,
            created: new Date().toISOString().split('T')[0],
            social: tokenData.social
        };
        
        sampleTokens.unshift(newToken);
        filterTokens();
    }, 2000);
}

function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('avatarPreview');
            preview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        };
        reader.readAsDataURL(file);
    }
}

// Trading Functions
function calculateBuyEstimate() {
    const amount = parseFloat(document.getElementById('buyAmount').value) || 0;
    const currentPrice = 0.45; // This would come from the selected token
    const tokens = amount / currentPrice;
    const priceImpact = Math.min(amount * 0.1, 5); // Simple price impact calculation
    
    document.getElementById('buyEstimate').textContent = `${tokens.toFixed(0)} tokens`;
    document.getElementById('buyPriceImpact').textContent = `${priceImpact.toFixed(2)}%`;
}

function calculateSellEstimate() {
    const tokens = parseFloat(document.getElementById('sellAmount').value) || 0;
    const currentPrice = 0.45; // This would come from the selected token
    const ethAmount = tokens * currentPrice;
    const priceImpact = Math.min(tokens * 0.0001, 5); // Simple price impact calculation
    
    document.getElementById('sellEstimate').textContent = `${ethAmount.toFixed(4)} ETH`;
    document.getElementById('sellPriceImpact').textContent = `${priceImpact.toFixed(2)}%`;
}

function setMaxBuy() {
    // Simulate max wallet balance
    document.getElementById('buyAmount').value = '1.0';
    calculateBuyEstimate();
}

function setMaxSell() {
    // Simulate max token balance
    document.getElementById('sellAmount').value = '1000';
    calculateSellEstimate();
}

function executeBuy() {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const amount = document.getElementById('buyAmount').value;
    if (!amount || parseFloat(amount) <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    showNotification('Buy order submitted! Waiting for confirmation...', 'info');
    
    // Simulate transaction
    setTimeout(() => {
        showNotification('Purchase successful!', 'success');
        document.getElementById('buyAmount').value = '';
        calculateBuyEstimate();
    }, 3000);
}

function executeSell() {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const amount = document.getElementById('sellAmount').value;
    if (!amount || parseFloat(amount) <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    showNotification('Sell order submitted! Waiting for confirmation...', 'info');
    
    // Simulate transaction
    setTimeout(() => {
        showNotification('Sale successful!', 'success');
        document.getElementById('sellAmount').value = '';
        calculateSellEstimate();
    }, 3000);
}

// Quick Actions
function quickBuy(symbol) {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    showNotification(`Quick buy for $${symbol} initiated!`, 'info');
}

function addToWatchlist(symbol) {
    showNotification(`$${symbol} added to watchlist!`, 'success');
}

// Utility Functions
function getCategoryEmoji(category) {
    const emojis = {
        music: '🎵',
        creators: '📹',
        gaming: '🎮',
        sports: '⚽',
        movies: '🎬',
        comedy: '😂'
    };
    return emojis[category] || '🎯';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function drawPriceChart(token) {
    const canvas = document.getElementById('priceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample price data
    const dataPoints = 20;
    const prices = [];
    let currentPrice = token.price;
    
    for (let i = 0; i < dataPoints; i++) {
        const change = (Math.random() - 0.5) * 0.1;
        currentPrice += change;
        prices.push(Math.max(0.01, currentPrice));
    }
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 4; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Draw price line
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    prices.forEach((price, index) => {
        const x = (width / (dataPoints - 1)) * index;
        const y = height - ((price - minPrice) / priceRange) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Fill area under curve
    ctx.fillStyle = 'rgba(255, 107, 107, 0.1)';
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
}

function updateStats() {
    // Simulate real-time stats updates
    setInterval(() => {
        const volumeElement = document.querySelector('.stat-number');
        if (volumeElement && volumeElement.textContent.includes('$')) {
            const currentVolume = parseFloat(volumeElement.textContent.replace('$', '').replace('M', '')) * 1000000;
            const newVolume = currentVolume + Math.random() * 10000;
            volumeElement.textContent = `$${(newVolume / 1000000).toFixed(1)}M`;
        }
    }, 5000);
}

function scrollToTrending() {
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}

function loadMoreTokens() {
    // Simulate loading more tokens
    showNotification('Loading more tokens...', 'info');
    
    setTimeout(() => {
        showNotification('All tokens loaded!', 'success');
    }, 1500);
}

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
});

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
`;
document.head.appendChild(style);