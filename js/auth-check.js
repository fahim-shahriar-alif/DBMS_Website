// Authentication and Authorization Check
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userRole = sessionStorage.getItem('userRole');
    
    // Allow access if logged in (both admin and investor)
    if (!isLoggedIn) {
        // Only redirect to login if not on login page
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return null;
    }
    
    return {
        isLoggedIn: true,
        role: userRole,
        isAdmin: userRole === 'admin',
        isInvestor: userRole === 'investor',
        isAuditor: userRole === 'auditor',
        isAnalyst: userRole === 'analyst',
        isStockTeam: userRole === 'stock-team',
        isTradeTeam: userRole === 'trade-team',
        isMarketData: userRole === 'market-data',
        isTopManagement: userRole === 'top-management',
        isBoardDirectors: userRole === 'board-directors',
        username: sessionStorage.getItem('username'),
        fullName: sessionStorage.getItem('userFullName'),
        investorId: sessionStorage.getItem('investorId')
    };
}

// Apply role-specific access controls
function applyInvestorReadOnlyMode() {
    const auth = checkAuth();
    
    if (auth && auth.isInvestor) {
        // Hide all add, edit, remove buttons
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables (edit/remove in rows)
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Update page title to show "View Only"
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(View Only)')) {
            pageHeader.textContent += ' (View Only)';
        }
        
        // Update navbar to show investor portal branding
        const navBrand = document.querySelector('.nav-brand h2');
        if (navBrand) {
            navBrand.textContent = '🏛️ ASA Investor Portal';
        }
        
        const navSubtitle = document.querySelector('.nav-brand p');
        if (navSubtitle) {
            navSubtitle.textContent = auth.fullName;
        }
        
        // Update navigation menu for investor
        updateInvestorNavigation();
    }
    
    if (auth && auth.isAuditor) {
        // Apply auditor-specific controls
        applyAuditorMode();
    }
    
    if (auth && auth.isAnalyst) {
        // Apply analyst-specific controls
        applyAnalystMode();
    }
    
    if (auth && auth.isStockTeam) {
        // Apply stock team-specific controls
        applyStockTeamMode();
    }
    
    if (auth && auth.isTradeTeam) {
        // Apply trade team-specific controls
        applyTradeTeamMode();
    }
    
    if (auth && auth.isMarketData) {
        // Apply market data provider-specific controls
        applyMarketDataMode();
    }
    
    if (auth && auth.isTopManagement) {
        // Apply top management-specific controls
        applyTopManagementMode();
    }
    
    if (auth && auth.isBoardDirectors) {
        // Apply board of directors-specific controls
        applyBoardDirectorsMode();
    }
}

// Update navigation menu for investor portal
function updateInvestorNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="investor-dashboard.html">📊 Dashboard</a></li>
            <li><a href="stocks-functional.html">📈 Stocks</a></li>
            <li><a href="companies-functional.html">🏢 Companies</a></li>
            <li><a href="price-history-functional.html">📊 Price History</a></li>
            <li><a href="predictions-functional.html">🔮 Predictions</a></li>
            <li><a href="investor-transactions.html">💰 My Transactions</a></li>
            <li><a href="investor-trades.html">🔄 My Trades</a></li>
            <li><a href="investor-profile.html">👤 My Profile</a></li>
            <li><a href="#" class="logout" onclick="handleInvestorLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Apply auditor mode
function applyAuditorMode() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages where auditor has full edit access
    const fullAccessPages = ['audit-reports-functional.html', 'fraud-alerts-functional.html'];
    
    // If not on full access page, make it read-only
    if (!fullAccessPages.includes(currentPage)) {
        // Hide add, edit, remove buttons on read-only pages
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Add "(View Only)" to page title
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(View Only)')) {
            pageHeader.textContent += ' (View Only)';
        }
    }
    
    // Update navbar branding
    const navBrand = document.querySelector('.nav-brand h2');
    if (navBrand) {
        navBrand.textContent = '🏛️ ASA Auditor Portal';
    }
    
    const navSubtitle = document.querySelector('.nav-brand p');
    if (navSubtitle) {
        const auth = checkAuth();
        navSubtitle.textContent = auth.fullName;
    }
    
    // Update navigation menu for auditor
    updateAuditorNavigation();
}

// Update navigation menu for auditor portal
function updateAuditorNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="auditor-dashboard.html">📊 Dashboard</a></li>
            <li><a href="audit-reports-functional.html">📋 Audit Reports</a></li>
            <li><a href="fraud-alerts-functional.html">⚠️ Fraud Alerts</a></li>
            <li><a href="companies-functional.html">🏢 Companies</a></li>
            <li><a href="transactions-functional.html">💰 Transactions</a></li>
            <li><a href="trades-functional.html">🔄 Trades</a></li>
            <li><a href="stocks-functional.html">📈 Stocks</a></li>
            <li><a href="investors-functional.html">👤 Investors</a></li>
            <li><a href="institutions-functional.html">🏛️ Institutions</a></li>
            <li><a href="#" class="logout" onclick="handleLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Apply analyst mode
function applyAnalystMode() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages where analyst has full edit access
    const fullAccessPages = ['predictions-functional.html', 'price-history-functional.html', 'fraud-alerts-functional.html'];
    
    // If not on full access page, make it read-only
    if (!fullAccessPages.includes(currentPage)) {
        // Hide add, edit, remove buttons on read-only pages
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Add "(View Only)" to page title
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(View Only)')) {
            pageHeader.textContent += ' (View Only)';
        }
    }
    
    // Update navbar branding
    const navBrand = document.querySelector('.nav-brand h2');
    if (navBrand) {
        navBrand.textContent = '🏛️ ASA Analytics Portal';
    }
    
    const navSubtitle = document.querySelector('.nav-brand p');
    if (navSubtitle) {
        const auth = checkAuth();
        navSubtitle.textContent = auth.fullName;
    }
    
    // Update navigation menu for analyst
    updateAnalystNavigation();
}

// Update navigation menu for analyst portal
function updateAnalystNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="analyst-dashboard.html">📊 Dashboard</a></li>
            <li><a href="predictions-functional.html">🔮 Predictions</a></li>
            <li><a href="price-history-functional.html">📊 Price History</a></li>
            <li><a href="fraud-alerts-functional.html">⚠️ Fraud Alerts</a></li>
            <li><a href="stocks-functional.html">📈 Stocks</a></li>
            <li><a href="companies-functional.html">🏢 Companies</a></li>
            <li><a href="transactions-functional.html">💰 Transactions</a></li>
            <li><a href="trades-functional.html">🔄 Trades</a></li>
            <li><a href="investors-functional.html">👤 Investors</a></li>
            <li><a href="#" class="logout" onclick="handleLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Apply stock team mode
function applyStockTeamMode() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages where stock team has full edit access
    const fullAccessPages = ['stocks-functional.html', 'price-history-functional.html', 'companies-functional.html'];
    
    // If not on full access page, make it read-only
    if (!fullAccessPages.includes(currentPage)) {
        // Hide add, edit, remove buttons on read-only pages
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Add "(View Only)" to page title
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(View Only)')) {
            pageHeader.textContent += ' (View Only)';
        }
    }
    
    // Update navbar branding
    const navBrand = document.querySelector('.nav-brand h2');
    if (navBrand) {
        navBrand.textContent = '🏛️ ASA Stock Management Portal';
    }
    
    const navSubtitle = document.querySelector('.nav-brand p');
    if (navSubtitle) {
        const auth = checkAuth();
        navSubtitle.textContent = auth.fullName;
    }
    
    // Update navigation menu for stock team
    updateStockTeamNavigation();
}

// Update navigation menu for stock team portal
function updateStockTeamNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="stock-team-dashboard.html">📊 Dashboard</a></li>
            <li><a href="stocks-functional.html">📈 Stocks</a></li>
            <li><a href="price-history-functional.html">📊 Price History</a></li>
            <li><a href="companies-functional.html">🏢 Companies</a></li>
            <li><a href="transactions-functional.html">💰 Transactions</a></li>
            <li><a href="trades-functional.html">🔄 Trades</a></li>
            <li><a href="investors-functional.html">👤 Investors</a></li>
            <li><a href="#" class="logout" onclick="handleLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Apply trade team mode
function applyTradeTeamMode() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages where trade team has full edit access
    const fullAccessPages = ['trades-functional.html', 'transactions-functional.html', 'investors-functional.html'];
    
    // If not on full access page, make it read-only
    if (!fullAccessPages.includes(currentPage)) {
        // Hide add, edit, remove buttons on read-only pages
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Add "(View Only)" to page title
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(View Only)')) {
            pageHeader.textContent += ' (View Only)';
        }
    }
    
    // Update navbar branding
    const navBrand = document.querySelector('.nav-brand h2');
    if (navBrand) {
        navBrand.textContent = '🏛️ ASA Trade Management Portal';
    }
    
    const navSubtitle = document.querySelector('.nav-brand p');
    if (navSubtitle) {
        const auth = checkAuth();
        navSubtitle.textContent = auth.fullName;
    }
    
    // Update navigation menu for trade team
    updateTradeTeamNavigation();
}

// Update navigation menu for trade team portal
function updateTradeTeamNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="trade-team-dashboard.html">📊 Dashboard</a></li>
            <li><a href="trades-functional.html">🔄 Trades</a></li>
            <li><a href="transactions-functional.html">💰 Transactions</a></li>
            <li><a href="investors-functional.html">👤 Investors</a></li>
            <li><a href="stocks-functional.html">📈 Stocks</a></li>
            <li><a href="companies-functional.html">🏢 Companies</a></li>
            <li><a href="price-history-functional.html">📊 Price History</a></li>
            <li><a href="institutions-functional.html">🏛️ Institutions</a></li>
            <li><a href="#" class="logout" onclick="handleLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Apply market data provider mode
function applyMarketDataMode() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages where market data provider has full edit access
    const fullAccessPages = ['price-history-functional.html', 'stocks-functional.html', 'companies-functional.html'];
    
    // If not on full access page, make it read-only
    if (!fullAccessPages.includes(currentPage)) {
        // Hide add, edit, remove buttons on read-only pages
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Add "(View Only)" to page title
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(View Only)')) {
            pageHeader.textContent += ' (View Only)';
        }
    }
    
    // Update navbar branding
    const navBrand = document.querySelector('.nav-brand h2');
    if (navBrand) {
        navBrand.textContent = '🏛️ ASA Market Data Portal';
    }
    
    const navSubtitle = document.querySelector('.nav-brand p');
    if (navSubtitle) {
        const auth = checkAuth();
        navSubtitle.textContent = auth.fullName;
    }
    
    // Update navigation menu for market data provider
    updateMarketDataNavigation();
}

// Update navigation menu for market data provider portal
function updateMarketDataNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="market-data-dashboard.html">📊 Dashboard</a></li>
            <li><a href="price-history-functional.html">📊 Price History</a></li>
            <li><a href="stocks-functional.html">📈 Stocks</a></li>
            <li><a href="companies-functional.html">🏢 Companies</a></li>
            <li><a href="transactions-functional.html">💰 Transactions</a></li>
            <li><a href="trades-functional.html">🔄 Trades</a></li>
            <li><a href="investors-functional.html">👤 Investors</a></li>
            <li><a href="institutions-functional.html">🏛️ Institutions</a></li>
            <li><a href="#" class="logout" onclick="handleLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Apply top management mode
function applyTopManagementMode() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages where top management has full edit access
    const fullAccessPages = ['companies-functional.html', 'institutions-functional.html', 'audit-reports-functional.html'];
    
    // Pages that top management cannot access
    const noAccessPages = ['users-functional.html'];
    
    // Redirect if trying to access restricted page
    if (noAccessPages.includes(currentPage)) {
        alert('Access Denied: This page is restricted to administrators only.');
        window.location.href = 'top-management-dashboard.html';
        return;
    }
    
    // If not on full access page, make it read-only
    if (!fullAccessPages.includes(currentPage)) {
        // Hide add, edit, remove buttons on read-only pages
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Add "(View Only)" to page title
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(View Only)')) {
            pageHeader.textContent += ' (View Only)';
        }
    }
    
    // Update navbar branding
    const navBrand = document.querySelector('.nav-brand h2');
    if (navBrand) {
        navBrand.textContent = '🏛️ ASA Executive Portal';
    }
    
    const navSubtitle = document.querySelector('.nav-brand p');
    if (navSubtitle) {
        const auth = checkAuth();
        navSubtitle.textContent = auth.fullName;
    }
    
    // Update navigation menu for top management
    updateTopManagementNavigation();
}

// Update navigation menu for top management portal
function updateTopManagementNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="top-management-dashboard.html">📊 Dashboard</a></li>
            <li><a href="companies-functional.html">🏢 Companies</a></li>
            <li><a href="institutions-functional.html">🏛️ Institutions</a></li>
            <li><a href="audit-reports-functional.html">📋 Audit Reports</a></li>
            <li><a href="stocks-functional.html">📈 Stocks</a></li>
            <li><a href="transactions-functional.html">💰 Transactions</a></li>
            <li><a href="trades-functional.html">🔄 Trades</a></li>
            <li><a href="investors-functional.html">👤 Investors</a></li>
            <li><a href="price-history-functional.html">📊 Price History</a></li>
            <li><a href="fraud-alerts-functional.html">⚠️ Fraud Alerts</a></li>
            <li><a href="predictions-functional.html">🔮 Predictions</a></li>
            <li><a href="#" class="logout" onclick="handleLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Apply board of directors mode
function applyBoardDirectorsMode() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages where board of directors has full edit access (governance level)
    const fullAccessPages = ['companies-functional.html', 'institutions-functional.html', 'audit-reports-functional.html'];
    
    // Pages that board of directors cannot access
    const noAccessPages = ['users-functional.html'];
    
    // Redirect if trying to access restricted page
    if (noAccessPages.includes(currentPage)) {
        alert('Access Denied: User management is restricted to system administrators only.');
        window.location.href = 'board-directors-dashboard.html';
        return;
    }
    
    // If not on full access page, make it read-only (governance oversight)
    if (!fullAccessPages.includes(currentPage)) {
        // Hide add, edit, remove buttons on read-only pages
        const addButtons = document.querySelectorAll('.btn-add, .btn-edit, .btn-remove');
        addButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.style.display = 'none';
        });
        
        // Hide action buttons in tables
        const actionButtons = document.querySelectorAll('.action-buttons-inline');
        actionButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Add "(Governance View)" to page title
        const pageHeader = document.querySelector('.page-header h1');
        if (pageHeader && !pageHeader.textContent.includes('(Governance View)')) {
            pageHeader.textContent += ' (Governance View)';
        }
    }
    
    // Update navbar branding
    const navBrand = document.querySelector('.nav-brand h2');
    if (navBrand) {
        navBrand.textContent = '🏛️ ASA Board Portal';
    }
    
    const navSubtitle = document.querySelector('.nav-brand p');
    if (navSubtitle) {
        const auth = checkAuth();
        navSubtitle.textContent = auth.fullName;
    }
    
    // Update navigation menu for board of directors
    updateBoardDirectorsNavigation();
}

// Update navigation menu for board of directors portal
function updateBoardDirectorsNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <li><a href="board-directors-dashboard.html">📊 Board Dashboard</a></li>
            <li><a href="companies-functional.html">🏢 Corporate Governance</a></li>
            <li><a href="institutions-functional.html">🏛️ Strategic Partners</a></li>
            <li><a href="audit-reports-functional.html">📋 Audit Oversight</a></li>
            <li><a href="fraud-alerts-functional.html">⚠️ Risk Monitoring</a></li>
            <li><a href="predictions-functional.html">🔮 Strategic Forecasts</a></li>
            <li><a href="transactions-functional.html">💰 Financial Overview</a></li>
            <li><a href="trades-functional.html">🔄 Trading Activity</a></li>
            <li><a href="investors-functional.html">👤 Investor Relations</a></li>
            <li><a href="stocks-functional.html">📈 Market Performance</a></li>
            <li><a href="price-history-functional.html">📊 Market Trends</a></li>
            <li><a href="#" class="logout" onclick="handleLogout(); return false;">🚪 Logout</a></li>
        `;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Logout function for investor
function handleInvestorLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Run auth check and apply role-specific mode when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure page elements are loaded
    setTimeout(() => {
        const auth = checkAuth();
        if (auth && auth.isInvestor) {
            applyInvestorReadOnlyMode();
        } else if (auth && auth.isAuditor) {
            applyAuditorMode();
        } else if (auth && auth.isAnalyst) {
            applyAnalystMode();
        } else if (auth && auth.isStockTeam) {
            applyStockTeamMode();
        } else if (auth && auth.isTradeTeam) {
            applyTradeTeamMode();
        } else if (auth && auth.isMarketData) {
            applyMarketDataMode();
        } else if (auth && auth.isTopManagement) {
            applyTopManagementMode();
        } else if (auth && auth.isBoardDirectors) {
            applyBoardDirectorsMode();
        }
    }, 100);
});
