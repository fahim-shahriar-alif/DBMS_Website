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
        username: sessionStorage.getItem('username'),
        fullName: sessionStorage.getItem('userFullName'),
        investorId: sessionStorage.getItem('investorId')
    };
}

// Hide edit controls for investors (read-only mode)
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

// Logout function for investor
function handleInvestorLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Run auth check and apply read-only mode when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure page elements are loaded
    setTimeout(() => {
        const auth = checkAuth();
        if (auth && auth.isInvestor) {
            applyInvestorReadOnlyMode();
        }
    }, 100);
});
