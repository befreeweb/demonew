// Celebrity auction data
const celebrityAuctions = [
    {
        id: 1,
        name: "Taylor Swift",
        symbol: "TAYLOR",
        category: "music",
        description: "Official Taylor Swift fan token. Get exclusive access to concerts, backstage passes, limited edition merchandise, and voting rights on setlists. Join the Swiftie community!",
        avatar: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        currentBid: 1250,
        bidders: 47,
        bidsCount: 156,
        timeLeft: 9933, // seconds
        status: "live",
        benefits: [
            "🎤 Exclusive concert access",
            "🎵 Early song releases",
            "👕 Limited edition merchandise",
            "🗳️ Vote on setlists",
            "📱 Private fan community"
        ]
    },
    {
        id: 2,
        name: "MrBeast",
        symbol: "BEAST",
        category: "creators",
        description: "MrBeast fan token for the ultimate YouTube experience. Participate in challenges, get exclusive content access, and support philanthropic missions worldwide.",
        avatar: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        currentBid: 2100,
        bidders: 63,
        bidsCount: 234,
        timeLeft: 18000,
        status: "live",
        benefits: [
            "🎬 Behind-the-scenes content",
            "🎮 Challenge participation",
            "💰 Charity voting rights",
            "🎁 Exclusive giveaways",
            "📺 Early video access"
        ]
    },
    {
        id: 3,
        name: "Dwayne 'The Rock' Johnson",
        symbol: "ROCK",
        category: "movies",
        description: "The Rock's official fan token. Get movie premiere access, workout content, motivational messages, and exclusive merchandise from Hollywood's hardest worker.",
        avatar: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        currentBid: 3500,
        bidders: 89,
        bidsCount: 312,
        timeLeft: 3600,
        status: "live",
        benefits: [
            "🎬 Movie premiere invites",
            "💪 Exclusive workout content",
            "🎯 Personal motivation messages",
            "👕 Rock merchandise",
            "🤝 Meet & greet opportunities"
        ]
    },
    {
        id: 4,
        name: "PewDiePie",
        symbol: "PEWDS",
        category: "creators",
        description: "PewDiePie fan token for the ultimate gaming experience. Join exclusive gaming sessions, get early access to content, and be part of the bro army community.",
        avatar: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        currentBid: 1850,
        bidders: 52,
        bidsCount: 187,
        timeLeft: 25200,
        status: "live",
        benefits: [
            "🎮 Gaming session access",
            "📺 Early video releases",
            "🎪 Exclusive meme content",
            "🏆 Gaming tournaments",
            "💬 Private Discord access"
        ]
    },
    {
        id: 5,
        name: "Kevin Hart",
        symbol: "HART",
        category: "comedy",
        description: "Kevin Hart's comedy fan token. Get access to exclusive stand-up shows, behind-the-scenes content, and VIP comedy club experiences.",
        avatar: "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        currentBid: 2750,
        bidders: 34,
        bidsCount: 98,
        timeLeft: 43200,
        status: "live",
        benefits: [
            "🎭 Exclusive comedy shows",
            "🎬 Behind-the-scenes access",
            "🎪 VIP club experiences",
            "📱 Personal comedy content",
            "🤝 Meet & greet events"
        ]
    },
    {
        id: 6,
        name: "Cristiano Ronaldo",
        symbol: "CR7",
        category: "sports",
        description: "CR7 official fan token. Get exclusive football content, training videos, match predictions, and access to Ronaldo's personal journey.",
        avatar: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        currentBid: 4200,
        bidders: 127,
        bidsCount: 445,
        timeLeft: 7200,
        status: "live",
        benefits: [
            "⚽ Exclusive training content",
            "🏆 Match predictions",
            "📱 Personal journey updates",
            "👕 Signed merchandise",
            "🎫 VIP match experiences"
        ]
    }
];

const upcomingAuctions = [
    {
        id: 7,
        name: "Ariana Grande",
        symbol: "ARI",
        category: "music",
        description: "Ariana Grande fan token launching soon. Get ready for exclusive music content and concert experiences.",
        avatar: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        startingBid: 1000,
        startsIn: 86400, // 24 hours
        status: "upcoming"
    },
    {
        id: 8,
        name: "Gordon Ramsay",
        symbol: "CHEF",
        category: "creators",
        description: "Gordon Ramsay's cooking empire token. Access exclusive recipes, cooking masterclasses, and restaurant experiences.",
        avatar: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        startingBid: 1500,
        startsIn: 172800, // 48 hours
        status: "upcoming"
    },
    {
        id: 9,
        name: "Serena Williams",
        symbol: "SERENA",
        category: "sports",
        description: "Tennis legend Serena Williams fan token. Get exclusive tennis content, training tips, and championship insights.",
        avatar: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop",
        startingBid: 2000,
        startsIn: 259200, // 72 hours
        status: "upcoming"
    }
];

// Global variables
let walletConnected = false;
let walletBalance = 0;
let currentFilter = 'all';
let selectedAuction = null;
let bidTimers = {};

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletBalance_display = document.getElementById('walletBalance');
const auctionsGrid = document.getElementById('auctionsGrid');
const upcomingGrid = document.getElementById('upcomingGrid');
const auctionModal = document.getElementById('auctionModal');
const walletModal = document.getElementById('walletModal');
const successModal = document.getElementById('successModal');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    renderAuctions();
    renderUpcomingAuctions();
    setupEventListeners();
    startTimers();
    simulateRealTimeUpdates();
});

// Event Listeners
function setupEventListeners() {
    // Connect wallet
    connectWalletBtn.addEventListener('click', openWalletModal);
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderAuctions();
        });
    });
    
    // Mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Quick bid input
    const quickBidInput = document.getElementById('quickBidAmount');
    if (quickBidInput) {
        quickBidInput.addEventListener('input', validateQuickBid);
    }
    
    // Modal bid input
    const bidAmountInput = document.getElementById('bidAmount');
    if (bidAmountInput) {
        bidAmountInput.addEventListener('input', validateBidAmount);
    }
}

// Wallet Functions
function openWalletModal() {
    walletModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWalletModal() {
    walletModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function connectWalletType(type) {
    // Simulate wallet connection
    walletConnected = true;
    walletBalance = Math.floor(Math.random() * 10000) + 5000; // Random balance between 5000-15000
    
    // Update UI
    connectWalletBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
    connectWalletBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    connectWalletBtn.onclick = null;
    
    document.querySelector('.balance-display').classList.remove('hidden');
    walletBalance_display.textContent = walletBalance.toLocaleString();
    
    closeWalletModal();
    showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} wallet connected successfully!`, 'success');
}

// Auction Rendering
function renderAuctions() {
    auctionsGrid.innerHTML = '';
    
    const filteredAuctions = currentFilter === 'all' 
        ? celebrityAuctions 
        : celebrityAuctions.filter(auction => auction.category === currentFilter);
    
    filteredAuctions.forEach(auction => {
        const auctionCard = createAuctionCard(auction);
        auctionsGrid.appendChild(auctionCard);
    });
}

function createAuctionCard(auction) {
    const card = document.createElement('div');
    card.className = 'auction-grid-card';
    card.onclick = () => openAuctionModal(auction);
    
    const timeLeft = formatTimeLeft(auction.timeLeft);
    
    card.innerHTML = `
        <div class="auction-card-header">
            <div class="auction-card-info">
                <img src="${auction.avatar}" alt="${auction.name}" class="auction-card-avatar">
                <div class="auction-card-details">
                    <h3>${auction.name}</h3>
                    <div class="auction-card-symbol">$${auction.symbol}</div>
                </div>
            </div>
            <div class="auction-card-timer" data-auction-id="${auction.id}">
                ${timeLeft}
            </div>
        </div>
        
        <div class="auction-card-bid">
            <div class="current-bid-info">
                <div class="current-bid-label">Current Bid</div>
                <div class="current-bid-amount">${auction.currentBid.toLocaleString()} FanKoin</div>
            </div>
            <div class="bid-stats">
                <div>${auction.bidders} bidders</div>
                <div>${auction.bidsCount} bids</div>
            </div>
        </div>
        
        <div class="auction-card-actions">
            <button class="btn-primary btn-small" onclick="event.stopPropagation(); quickBidAction('${auction.symbol}')">
                <i class="fas fa-gavel"></i> Quick Bid
            </button>
            <button class="btn-secondary btn-small" onclick="event.stopPropagation(); addToWatchlist('${auction.symbol}')">
                <i class="fas fa-eye"></i> Watch
            </button>
        </div>
    `;
    
    return card;
}

function renderUpcomingAuctions() {
    upcomingGrid.innerHTML = '';
    
    upcomingAuctions.forEach(auction => {
        const upcomingCard = createUpcomingCard(auction);
        upcomingGrid.appendChild(upcomingCard);
    });
}

function createUpcomingCard(auction) {
    const card = document.createElement('div');
    card.className = 'upcoming-card';
    
    const startsIn = formatTimeLeft(auction.startsIn);
    
    card.innerHTML = `
        <div class="upcoming-status">⏰ UPCOMING</div>
        <img src="${auction.avatar}" alt="${auction.name}" class="upcoming-avatar">
        <h3>${auction.name}</h3>
        <div class="upcoming-symbol">$${auction.symbol}</div>
        <div class="starting-bid">Starting bid: ${auction.startingBid.toLocaleString()} FanKoin</div>
        <div class="starts-in">Starts in: ${startsIn}</div>
        <button class="notify-btn" onclick="setNotification('${auction.symbol}')">
            <i class="fas fa-bell"></i> Notify Me
        </button>
    `;
    
    return card;
}

// Modal Functions
function openAuctionModal(auction) {
    selectedAuction = auction;
    
    // Populate modal data
    document.getElementById('modalAvatar').src = auction.avatar;
    document.getElementById('modalName').textContent = auction.name;
    document.getElementById('modalSymbol').textContent = `$${auction.symbol}`;
    document.getElementById('modalCategory').textContent = getCategoryName(auction.category);
    document.getElementById('modalCurrentBid').textContent = auction.currentBid.toLocaleString();
    document.getElementById('modalBidders').textContent = auction.bidders;
    document.getElementById('modalBidsCount').textContent = auction.bidsCount;
    document.getElementById('minimumBid').textContent = (auction.currentBid + 1).toLocaleString();
    document.getElementById('bidAmount').min = auction.currentBid + 1;
    document.getElementById('bidAmount').placeholder = auction.currentBid + 50;
    
    // Populate benefits
    const benefitsList = document.getElementById('tokenBenefits');
    benefitsList.innerHTML = '';
    auction.benefits.forEach(benefit => {
        const benefitItem = document.createElement('div');
        benefitItem.className = 'benefit-item';
        benefitItem.innerHTML = `<i class="fas fa-check"></i> <span>${benefit}</span>`;
        benefitsList.appendChild(benefitItem);
    });
    
    // Populate description
    document.getElementById('celebrityDescription').textContent = auction.description;
    
    // Generate bid history
    generateBidHistory(auction);
    
    // Start modal timer
    startModalTimer(auction.timeLeft);
    
    auctionModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuctionModal() {
    auctionModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedAuction = null;
}

function generateBidHistory(auction) {
    const bidHistory = document.getElementById('bidHistory');
    bidHistory.innerHTML = '';
    
    // Generate fake bid history
    const bidders = ['CryptoFan123', 'TokenCollector', 'FanBoy2024', 'CelebLover', 'AuctionKing'];
    const bids = [];
    
    for (let i = 0; i < 8; i++) {
        const bidAmount = auction.currentBid - (i * 25) - Math.floor(Math.random() * 50);
        const bidder = bidders[Math.floor(Math.random() * bidders.length)];
        const timeAgo = `${Math.floor(Math.random() * 30) + 1}m ago`;
        
        bids.push({ bidder, amount: bidAmount, time: timeAgo });
    }
    
    bids.forEach(bid => {
        const bidItem = document.createElement('div');
        bidItem.className = 'bid-item';
        bidItem.innerHTML = `
            <div class="bid-user">${bid.bidder}</div>
            <div class="bid-amount-small">${bid.amount.toLocaleString()} FanKoin</div>
            <div class="bid-time">${bid.time}</div>
        `;
        bidHistory.appendChild(bidItem);
    });
}

// Bidding Functions
function validateQuickBid() {
    const input = document.getElementById('quickBidAmount');
    const value = parseInt(input.value);
    const minBid = 1251; // Featured auction minimum
    
    if (value && value < minBid) {
        input.style.borderColor = '#f87171';
    } else {
        input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
}

function validateBidAmount() {
    const input = document.getElementById('bidAmount');
    const value = parseInt(input.value);
    const minBid = selectedAuction ? selectedAuction.currentBid + 1 : 1;
    
    const placeBidBtn = document.getElementById('placeBidBtn');
    
    if (value && value >= minBid && walletConnected && walletBalance >= value) {
        placeBidBtn.disabled = false;
        input.style.borderColor = '#ff6b35';
    } else {
        placeBidBtn.disabled = true;
        input.style.borderColor = value < minBid ? '#f87171' : 'rgba(255, 255, 255, 0.1)';
    }
}

function setQuickBid(amount) {
    if (!selectedAuction) return;
    
    const input = document.getElementById('bidAmount');
    const currentValue = parseInt(input.value) || selectedAuction.currentBid;
    input.value = currentValue + amount;
    validateBidAmount();
}

function placeBid(symbol, inputId) {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const input = document.getElementById(inputId);
    const bidAmount = parseInt(input.value);
    
    if (!bidAmount || bidAmount <= 0) {
        showNotification('Please enter a valid bid amount', 'error');
        return;
    }
    
    if (bidAmount > walletBalance) {
        showNotification('Insufficient FanKoin balance', 'error');
        return;
    }
    
    // Simulate bid placement
    showNotification('Placing bid...', 'info');
    
    setTimeout(() => {
        // Update wallet balance
        walletBalance -= bidAmount;
        walletBalance_display.textContent = walletBalance.toLocaleString();
        
        // Update auction data
        const auction = celebrityAuctions.find(a => a.symbol === symbol);
        if (auction) {
            auction.currentBid = bidAmount;
            auction.bidders += 1;
            auction.bidsCount += 1;
        }
        
        // Show success
        showSuccessModal(symbol, bidAmount);
        
        // Clear input
        input.value = '';
        
        // Re-render auctions
        renderAuctions();
    }, 2000);
}

function submitBid() {
    if (!selectedAuction) return;
    placeBid(selectedAuction.symbol, 'bidAmount');
}

function quickBidAction(symbol) {
    if (!walletConnected) {
        showNotification('Please connect your wallet first', 'error');
        return;
    }
    
    const auction = celebrityAuctions.find(a => a.symbol === symbol);
    if (!auction) return;
    
    const quickBidAmount = auction.currentBid + 50;
    
    if (quickBidAmount > walletBalance) {
        showNotification('Insufficient FanKoin balance', 'error');
        return;
    }
    
    // Simulate quick bid
    showNotification('Placing quick bid...', 'info');
    
    setTimeout(() => {
        walletBalance -= quickBidAmount;
        walletBalance_display.textContent = walletBalance.toLocaleString();
        
        auction.currentBid = quickBidAmount;
        auction.bidders += 1;
        auction.bidsCount += 1;
        
        showSuccessModal(symbol, quickBidAmount);
        renderAuctions();
    }, 1500);
}

// Success Modal
function showSuccessModal(symbol, amount) {
    document.getElementById('successTitle').textContent = 'Bid Placed Successfully!';
    document.getElementById('successMessage').textContent = `Your bid for $${symbol} has been placed and is now the highest bid.`;
    
    const successDetails = document.getElementById('successDetails');
    successDetails.innerHTML = `
        <div class="success-detail-row">
            <span class="label">Token:</span>
            <span class="value">$${symbol}</span>
        </div>
        <div class="success-detail-row">
            <span class="label">Bid Amount:</span>
            <span class="value">${amount.toLocaleString()} FanKoin</span>
        </div>
        <div class="success-detail-row">
            <span class="label">Status:</span>
            <span class="value">Highest Bidder</span>
        </div>
        <div class="success-detail-row">
            <span class="label">Remaining Balance:</span>
            <span class="value">${walletBalance.toLocaleString()} FanKoin</span>
        </div>
    `;
    
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Timer Functions
function startTimers() {
    // Featured auction timer
    const featuredTimer = document.getElementById('featuredTimer');
    if (featuredTimer) {
        setInterval(() => {
            const timeLeft = formatTimeLeft(9933 - Math.floor(Date.now() / 1000) % 10000);
            featuredTimer.textContent = timeLeft;
        }, 1000);
    }
    
    // Grid auction timers
    celebrityAuctions.forEach(auction => {
        bidTimers[auction.id] = setInterval(() => {
            auction.timeLeft = Math.max(0, auction.timeLeft - 1);
            const timerElement = document.querySelector(`[data-auction-id="${auction.id}"]`);
            if (timerElement) {
                timerElement.textContent = formatTimeLeft(auction.timeLeft);
            }
        }, 1000);
    });
}

function startModalTimer(initialTime) {
    let timeLeft = initialTime;
    
    const modalTimer = setInterval(() => {
        timeLeft = Math.max(0, timeLeft - 1);
        
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        document.getElementById('modalHours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('modalMinutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('modalSeconds').textContent = seconds.toString().padStart(2, '0');
        
        if (timeLeft === 0) {
            clearInterval(modalTimer);
            showNotification('Auction ended!', 'info');
        }
    }, 1000);
    
    // Clear timer when modal closes
    const originalClose = closeAuctionModal;
    closeAuctionModal = function() {
        clearInterval(modalTimer);
        originalClose();
    };
}

function formatTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// Utility Functions
function getCategoryName(category) {
    const names = {
        music: '🎵 Music Artist',
        creators: '📹 Content Creator',
        sports: '⚽ Sports Star',
        movies: '🎬 Movie Star',
        comedy: '😂 Comedian'
    };
    return names[category] || category;
}

function addToWatchlist(symbol) {
    showNotification(`$${symbol} added to watchlist!`, 'success');
}

function setNotification(symbol) {
    showNotification(`You'll be notified when $${symbol} auction starts!`, 'success');
}

function scrollToAuctions() {
    document.getElementById('live-auctions').scrollIntoView({ behavior: 'smooth' });
}

function downloadWallet() {
    showNotification('Redirecting to FanKoin wallet download...', 'info');
    // In real app, would redirect to wallet download page
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#f87171' : '#ff6b35'};
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

// Real-time Updates Simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update bid amounts and bidder counts
        celebrityAuctions.forEach(auction => {
            if (Math.random() < 0.3) { // 30% chance of update
                const increase = Math.floor(Math.random() * 100) + 25;
                auction.currentBid += increase;
                auction.bidders += Math.floor(Math.random() * 3) + 1;
                auction.bidsCount += Math.floor(Math.random() * 5) + 1;
            }
        });
        
        // Re-render if not in modal
        if (!auctionModal.classList.contains('active')) {
            renderAuctions();
        }
        
        // Update featured auction
        const taylorBid = document.getElementById('taylorBid');
        const taylorBidders = document.getElementById('taylorBidders');
        if (taylorBid && taylorBidders) {
            const taylor = celebrityAuctions.find(a => a.symbol === 'TAYLOR');
            if (taylor) {
                taylorBid.textContent = taylor.currentBid.toLocaleString();
                taylorBidders.textContent = taylor.bidders;
            }
        }
    }, 15000); // Update every 15 seconds
}

// Initialize balance display as hidden
document.addEventListener('DOMContentLoaded', function() {
    const balanceDisplay = document.querySelector('.balance-display');
    if (balanceDisplay) {
        balanceDisplay.classList.add('hidden');
    }
});