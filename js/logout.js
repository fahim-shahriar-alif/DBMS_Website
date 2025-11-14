function handleLogout() {
    // Clear login state
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
    
    // If not logged in, redirect to login page
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
});
