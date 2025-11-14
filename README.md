# Stock Management System - Admin Panel

A comprehensive admin panel for managing stock market operations, built with HTML and CSS.

## Features

### 1. **Login System**
- Secure login page with username and password authentication
- Session management using localStorage
- Automatic redirect to dashboard after login
- Logout button on all pages that clears session and returns to login page
- Protected pages that redirect to login if not authenticated

### 2. **Dashboard (Analytics)**
- Real-time statistics cards showing:
  - Total Companies
  - Active Investors
  - Total Trades
  - Fraud Alerts
- Interactive charts and graphs:
  - Stock Price Trends (Line Chart)
  - Transaction Volume (Bar Chart)
  - Sector Distribution (Pie Chart)
  - Recent Activity Feed

### 3. **Database Table Management**
The system includes dedicated pages for managing all 12 database tables:

1. **Companies** - Company details, sectors, and registration information
2. **Investors** - Investor accounts and contact information
3. **Stocks** - Stock details, shares, and current prices
4. **Stock Transactions** - Buy/sell transactions tracking
5. **Audit Reports** - Audit reports linked to companies
6. **Institutions** - Financial institutions data
7. **Trades** - Inter-institution trade management
8. **Users** - User accounts and access permissions
9. **Fraud Alerts** - AI-based fraud detection alerts
10. **Price History** - Historical stock price data
11. **Predictions** - AI-generated stock price predictions
12. **Logs** - System activity and audit logs

### 4. **Table Features**
Each table page includes:
- **Search** - Search functionality for filtering records
- **Add** - Button to add new records
- **Edit** - Button to modify existing records
- **Remove** - Button to delete selected records
- **Checkbox Selection** - Select multiple records for batch operations

## File Structure

```
admin-panel/
├── login.html              # Login page
├── dashboard.html          # Main dashboard with analytics
├── companies.html          # Companies management
├── investors.html          # Investors management
├── stocks.html            # Stocks management
├── transactions.html      # Stock transactions
├── audit-reports.html     # Audit reports
├── institutions.html      # Financial institutions
├── trades.html           # Trade management
├── users.html            # User management
├── fraud-alerts.html     # Fraud detection alerts
├── price-history.html    # Stock price history
├── predictions.html      # AI predictions
├── logs.html            # System logs
├── css/
│   ├── login.css        # Login page styles
│   ├── dashboard.css    # Dashboard and navigation styles
│   └── table.css        # Table management styles
├── js/
│   ├── login.js         # Login functionality
│   └── logout.js        # Logout and session management
└── README.md            # This file
```

## Getting Started

1. **Open the Application**
   - Open `login.html` in your web browser

2. **Login**
   - Enter any username and password (basic frontend validation only)
   - Click "Login" to access the dashboard

3. **Navigate**
   - Use the navigation bar to switch between different sections
   - Click on any table management page to view and manage data

## Design Features

- **Modern UI** - Clean, professional interface with gradient backgrounds
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Color-Coded Badges** - Visual status indicators for records
- **Interactive Elements** - Hover effects and smooth transitions
- **Consistent Navigation** - Sticky navbar across all pages

## Color Scheme

- Primary: Purple gradient (#667eea to #764ba2)
- Success: Green (#38ef7d)
- Warning: Orange/Yellow (#f5576c)
- Danger: Red (#fa709a)
- Neutral: Gray (#e2e3e5)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- This is a **frontend-only** implementation
- No backend or database connection is included
- Sample data is hardcoded for demonstration purposes
- For production use, integrate with a backend API and database

## Future Enhancements

- Backend API integration
- Real database connectivity
- User authentication with JWT tokens
- Real-time data updates
- Export functionality (CSV, PDF)
- Advanced filtering and sorting
- Data visualization libraries (Chart.js, D3.js)
- Form validation and modals for Add/Edit operations

## License

This project is created for educational purposes.
