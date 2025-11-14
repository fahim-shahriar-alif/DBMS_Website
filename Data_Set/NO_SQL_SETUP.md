# No-SQL Setup Guide - Temporary Database

## ✅ No MySQL Required!

This version uses **PHP Sessions** as a temporary database. Data is stored in memory and persists during your browser session.

## 🚀 Quick Setup (3 Steps)

### Step 1: Install XAMPP
Download and install from: https://www.apachefriends.org/
- You only need **Apache** (PHP included)
- **MySQL is NOT required** ❌

### Step 2: Start Apache
Open XAMPP Control Panel and start:
- ✅ Apache only

### Step 3: Move Project
Copy `admin-panel` folder to:
- **Windows**: `C:\xampp\htdocs\`
- **Mac**: `/Applications/MAMP/htdocs/`

## 🎯 Access the Application

1. Open browser: `http://localhost/admin-panel/login.html`
2. Login with any credentials
3. Go to: `http://localhost/admin-panel/companies-functional.html`

## ✨ What Works

### All Buttons Are Functional:

**🔍 Search Button**
- Type company name, sector, or registration number
- Click "Search" or press Enter
- Results filter instantly

**➕ Add Button**
- Click "+ Add"
- Fill in the form fields
- Click "Save"
- New record appears immediately

**✏️ Edit Button**
- Select ONE company (checkbox)
- Click "✏️ Edit"
- Modify the data
- Click "Save"
- Changes appear immediately

**🗑️ Remove Button**
- Select one or more companies (checkboxes)
- Click "🗑️ Remove"
- Confirm deletion
- Records removed instantly

## 💾 How Data is Stored

- **Storage**: PHP Session (temporary)
- **Persistence**: Lasts during browser session
- **Reset**: Close browser or clear session to reset data
- **No Database**: No MySQL, no SQL files needed

## 📊 Sample Data Included

The temporary database starts with 5 sample companies:
1. TechCorp Ltd. (Technology)
2. FinanceX Inc. (Finance)
3. HealthPlus Corp. (Healthcare)
4. Energy Solutions (Energy)
5. Retail Giants (Retail)

## 🔄 How It Works

```
User Action → JavaScript → PHP API → Session Storage → Response
```

1. You click a button (Search, Add, Edit, Delete)
2. JavaScript sends request to PHP
3. PHP reads/writes to `$_SESSION` array
4. PHP sends response back
5. JavaScript updates the page

## 📁 Files Used

```
api/temp-companies.php    ← Temporary database API
companies-functional.html ← Functional page
js/crud.js               ← CRUD operations
css/modal.css            ← Modal styling
```

## 🎨 Advantages

✅ **No Database Setup** - No MySQL installation or configuration  
✅ **Instant Start** - Just start Apache and go  
✅ **Simple** - Perfect for learning and testing  
✅ **Fast** - No database queries, all in memory  

## ⚠️ Limitations

❌ **Not Persistent** - Data resets when session ends  
❌ **Single User** - Each browser session has own data  
❌ **No Relationships** - Tables are independent  
❌ **Memory Only** - Limited by server memory  

## 🔧 Troubleshooting

### "Cannot modify header information"
- Make sure there's no output before `<?php` in API files
- Check for spaces or BOM before `<?php` tag

### "Session not working"
- Ensure Apache is running
- Access via `http://localhost` not `file://`
- Check PHP session is enabled in php.ini

### "Data disappears"
- This is normal - data is temporary
- Closing browser clears the session
- Use browser's "Keep session" to maintain data longer

## 🎓 Perfect For

- ✅ Learning CRUD operations
- ✅ Testing UI/UX
- ✅ Prototyping
- ✅ Demonstrations
- ✅ Quick development

## 🚀 To Make Data Persistent

If you need permanent storage later:
1. Install MySQL
2. Run `database/schema.sql`
3. Change API endpoint from `temp-companies.php` to `companies.php`
4. Update `config/database.php` with credentials

## 💡 Tips

1. **Keep browser open** to maintain session
2. **Use incognito mode** for fresh start
3. **Refresh page** to reload data
4. **Check browser console** (F12) for errors

---

**You're ready to go!** 🎉

No database setup needed - just start Apache and test the buttons!

URL: `http://localhost/admin-panel/companies-functional.html`
