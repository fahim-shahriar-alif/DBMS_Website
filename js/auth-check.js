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
        }
    }, 100);
});
