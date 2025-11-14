function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Get users from database
    const usersDb = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching credentials
    const user = usersDb.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store login state with role information
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.username);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userFullName', user.full_name);
        
        // Redirect based on role
        switch(user.role) {
            case 'Admin':
                window.location.href = 'dashboard-asa.html';
                break;
            case 'Investor':
                window.location.href = 'dashboard-investor.html';
                break;
            case 'Manager':
                window.location.href = 'dashboard-manager.html';
                break;
            case 'Stock Manager':
                window.location.href = 'dashboard-stock-manager.html';
                break;
            case 'Auditor':
                window.location.href = 'dashboard-auditor.html';
                break;
            case 'Analyst':
                window.location.href = 'dashboard-analyst.html';
                break;
            default:
                window.location.href = 'dashboard-asa.html';
        }
    } else {
        alert('Invalid username or password');
    }
}

// Check if already logged in
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const role = localStorage.getItem('userRole');
        
        // Redirect based on role
        switch(role) {
            case 'Admin':
                window.location.href = 'dashboard-asa.html';
                break;
            case 'Investor':
                window.location.href = 'dashboard-investor.html';
                break;
            case 'Manager':
                window.location.href = 'dashboard-manager.html';
                break;
            case 'Stock Manager':
                window.location.href = 'dashboard-stock-manager.html';
                break;
            case 'Auditor':
                window.location.href = 'dashboard-auditor.html';
                break;
            case 'Analyst':
                window.location.href = 'dashboard-analyst.html';
                break;
            default:
                window.location.href = 'dashboard-asa.html';
        }
    }
});
