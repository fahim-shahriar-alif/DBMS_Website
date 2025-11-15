function handleLogout() {
    // Clear login state from both storage types
    sessionStorage.clear();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    // Skip check if we're on the login page
    if (window.location.pathname.includes('login.html')) {
        return;
    }
    
    // Check both sessionStorage (new) and localStorage (old) for compatibility
    const isLoggedInSession = sessionStorage.getItem('isLoggedIn') === 'true';
    const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
    
    // If not logged in either way, redirect to login page
    if (!isLoggedInSession && !isLoggedInLocal) {
        window.location.href = 'login.html';
    }
});
