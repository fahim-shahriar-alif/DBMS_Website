# Setup Guide - Stock Management System

## Prerequisites

1. **XAMPP** or **WAMP** or **MAMP** (includes Apache, MySQL, PHP)
2. Web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

### Step 1: Install XAMPP (if not already installed)

1. Download XAMPP from: https://www.apachefriends.org/
2. Install XAMPP to default location
3. Start Apache and MySQL from XAMPP Control Panel

### Step 2: Setup Database

1. Open phpMyAdmin in your browser: `http://localhost/phpmyadmin`
2. Click on "SQL" tab
3. Copy the entire content from `database/schema.sql`
4. Paste it in the SQL tab and click "Go"
5. This will create the database and all tables with sample data

### Step 3: Configure Database Connection

1. Open `config/database.php`
2. Update the database credentials if needed:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');
   define('DB_PASS', '');  // Your MySQL password (default is empty)
   define('DB_NAME', 'stock_management');
   ```

### Step 4: Move Project to Web Server

1. Copy the entire `admin-panel` folder to your web server directory:
   - **XAMPP**: `C:\xampp\htdocs\admin-panel`
   - **WAMP**: `C:\wamp64\www\admin-panel`
   - **MAMP**: `/Applications/MAMP/htdocs/admin-panel`

### Step 5: Access the Application

1. Open your browser
2. Navigate to: `http://localhost/admin-panel/login.html`
3. Login with any username and password (frontend validation only)
4. You'll be redirected to the dashboard

### Step 6: Test Functional Pages

The fully functional page with working CRUD operations:
- **Companies**: `http://localhost/admin-panel/companies-functional.html`

## Features Available

### ✅ Companies Page (Fully Functional)
- **Search**: Type in search box and click Search or press Enter
- **Add**: Click "+ Add" button to add new company
- **Edit**: Select one company (checkbox) and click "✏️ Edit"
- **Delete**: Select one or more companies and click "🗑️ Remove"

### Database Tables Created

1. ✅ companies
2. ✅ investors
3. ✅ stocks
4. ✅ stock_transactions
5. ✅ audit_reports
6. ✅ institutions
7. ✅ trades
8. ✅ users
9. ✅ fraud_alerts
10. ✅ price_history
11. ✅ predictions
12. ✅ logs

## Creating More Functional Pages

To create functional pages for other tables, follow this pattern:

1. Create API endpoint: `api/[table-name].php` (copy from `api/companies.php`)
2. Create HTML page: `[table-name]-functional.html` (copy from `companies-functional.html`)
3. Update the API endpoint and field names in the JavaScript
4. Update the form fields in the modal

## Troubleshooting

### Database Connection Error
- Make sure MySQL is running in XAMPP
- Check database credentials in `config/database.php`
- Verify database exists in phpMyAdmin

### 404 Not Found on API Calls
- Ensure project is in correct web server directory
- Check that Apache is running
- Verify file paths are correct

### CORS Errors
- Make sure you're accessing via `http://localhost` not `file://`
- Check that headers are set in PHP files

## Default Login Credentials

For testing the Users table:
- Username: `admin`
- Password: `password` (hashed in database)

## Sample Data

The database includes sample data for:
- 5 Companies
- 5 Investors  
- 5 Stocks
- 3 Users

You can add, edit, or delete these records using the functional interface.

## Next Steps

1. Create API endpoints for remaining tables
2. Create functional HTML pages for each table
3. Implement proper authentication
4. Add data validation
5. Implement user permissions
6. Add export functionality (CSV, PDF)

## Support

For issues or questions:
1. Check that all services are running in XAMPP
2. Verify database connection
3. Check browser console for JavaScript errors
4. Check PHP error logs in XAMPP

## Security Notes

⚠️ **Important**: This is a development setup. For production:
- Use proper password hashing
- Implement JWT authentication
- Add input validation and sanitization
- Use prepared statements (already implemented)
- Enable HTTPS
- Set proper CORS policies
- Add rate limiting
- Implement proper error handling
