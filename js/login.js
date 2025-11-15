function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Demo credentials
    if (username === 'admin' && password === 'admin123') {
        // Admin login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', 'admin');
        sessionStorage.setItem('userRole', 'admin');
        sessionStorage.setItem('userFullName', 'Administrator');
        window.location.href = 'dashboard-asa.html';
        return;
    }
    
    if (username === 'investor' && password === 'investor123') {
        // Investor login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', 'investor');
        sessionStorage.setItem('userRole', 'investor');
        sessionStorage.setItem('userFullName', 'Demo Investor');
        sessionStorage.setItem('investorId', '20001'); // Demo investor ID
        window.location.href = 'investor-dashboard.html';
        return;
    }
    
    if (username === 'auditor' && password === 'auditor123') {
        // Auditor login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', 'auditor');
        sessionStorage.setItem('userRole', 'auditor');
        sessionStorage.setItem('userFullName', 'Demo Auditor');
        window.location.href = 'auditor-dashboard.html';
        return;
    }
    
    if (username === 'analyst' && password === 'analyst123') {
        // Data Analyst login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', 'analyst');
        sessionStorage.setItem('userRole', 'analyst');
        sessionStorage.setItem('userFullName', 'Demo Data Analyst');
        window.location.href = 'analyst-dashboard.html';
        return;
    }
    
    if (username === 'stockteam' && password === 'stockteam123') {
        // Stock Management Team login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', 'stockteam');
        sessionStorage.setItem('userRole', 'stock-team');
        sessionStorage.setItem('userFullName', 'Stock Management Team');
        window.location.href = 'stock-team-dashboard.html';
        return;
    }
    
    // If not demo credentials, check database
    const usersDb = JSON.parse(localStorage.getItem('users') || '[]');
    const user = usersDb.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store login state with role information
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('userRole', user.role);
        sessionStorage.setItem('userId', user.id);
        sessionStorage.setItem('userFullName', user.full_name);
        
        // Redirect based on role
        if (user.role === 'Investor') {
            window.location.href = 'investor-dashboard.html';
        } else {
            window.location.href = 'dashboard-asa.html';
        }
    } else {
        alert('Invalid username or password');
    }
}

// Check if already logged in
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const role = sessionStorage.getItem('userRole');
        
        // Redirect based on role
        if (role === 'investor') {
            window.location.href = 'investor-dashboard.html';
        } else if (role === 'auditor') {
            window.location.href = 'auditor-dashboard.html';
        } else if (role === 'analyst') {
            window.location.href = 'analyst-dashboard.html';
        } else if (role === 'stock-team') {
            window.location.href = 'stock-team-dashboard.html';
        } else {
            window.location.href = 'dashboard-asa.html';
        }
    }
});
