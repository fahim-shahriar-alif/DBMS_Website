# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install XAMPP
Download and install from: https://www.apachefriends.org/

### 2. Start Services
Open XAMPP Control Panel and start:
- ✅ Apache
- ✅ MySQL

### 3. Create Database
1. Open browser: `http://localhost/phpmyadmin`
2. Click "SQL" tab
3. Copy all content from `database/schema.sql`
4. Paste and click "Go"

### 4. Move Project
Copy `admin-panel` folder to:
- Windows: `C:\xampp\htdocs\`
- Mac: `/Applications/MAMP/htdocs/`

### 5. Open Application
Browser: `http://localhost/admin-panel/login.html`

## 📋 Test the Functional Page

**Companies Management (Fully Working)**
URL: `http://localhost/admin-panel/companies-functional.html`

### What Works:
✅ **Search** - Type and click Search  
✅ **Add** - Click "+ Add" button, fill form, save  
✅ **Edit** - Select row (checkbox), click "✏️ Edit", modify, save  
✅ **Delete** - Select row(s), click "🗑️ Remove", confirm  

## 🎯 Quick Test

1. Login to the system
2. Go to Companies page
3. Click "+ Add"
4. Fill in:
   - Company Name: "Test Company"
   - Sector: "Technology"
   - Status: "Active"
5. Click "Save"
6. See new company in table!

## 📁 File Structure

```
admin-panel/
├── api/
│   └── companies.php          ← Backend API
├── config/
│   └── database.php           ← Database connection
├── database/
│   └── schema.sql             ← Database setup
├── js/
│   ├── crud.js                ← CRUD operations
│   └── logout.js              ← Session management
├── css/
│   ├── modal.css              ← Modal styles
│   ├── dashboard.css          ← Main styles
│   └── table.css              ← Table styles
├── companies-functional.html  ← Working page!
└── login.html                 ← Start here
```

## 🔧 Database Config

File: `config/database.php`

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');           // Change if you set MySQL password
define('DB_NAME', 'stock_management');
```

## ⚡ Common Issues

### "Database connection failed"
- ✅ Start MySQL in XAMPP
- ✅ Run schema.sql in phpMyAdmin

### "404 Not Found" on API
- ✅ Project must be in `htdocs` folder
- ✅ Access via `http://localhost` not `file://`

### "No data showing"
- ✅ Check browser console (F12)
- ✅ Verify database has data
- ✅ Check API endpoint URL

## 📊 Sample Data Included

- 5 Companies
- 5 Investors
- 5 Stocks
- 3 Users

## 🎨 How to Create More Functional Pages

### For Investors Table:

1. **Create API**: Copy `api/companies.php` → `api/investors.php`
   - Change table name to `investors`
   - Update field names

2. **Create Page**: Copy `companies-functional.html` → `investors-functional.html`
   - Update API endpoint: `api/investors.php`
   - Update form fields
   - Update table columns

3. **Test**: `http://localhost/admin-panel/investors-functional.html`

## 🔐 Security Note

⚠️ This is for **development/learning** only!

For production, add:
- Real authentication
- Input validation
- HTTPS
- User permissions
- Error handling

## 💡 Tips

1. **Always check browser console** (F12) for errors
2. **Use phpMyAdmin** to verify database changes
3. **Test one feature at a time**
4. **Clear browser cache** if changes don't appear

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Verify XAMPP services are running
3. Check database connection in phpMyAdmin
4. Look at browser console for errors

---

**Ready to go!** 🎉

Start with: `http://localhost/admin-panel/login.html`
