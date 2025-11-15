# ASA Data Server - Login Credentials

## Default User Accounts

### 🔐 Administrator Account
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin
- **Access:** Full system access - All tables, users, and management features
- **Dashboard:** dashboard-asa.html

---

### 👤 Investor Account
- **Username:** `investor`
- **Password:** `investor123`
- **Role:** Investor
- **Access:** 
  - Submit Buy/Sell requests to Manager
  - Request stock information from Stock Management Team
  - View personal portfolio and transactions
  - Browse available stocks
- **Dashboard:** dashboard-investor.html

---

### 👨‍💼 Manager Account
- **Username:** `jsmith`
- **Password:** `password123`
- **Role:** Manager
- **Full Name:** John Smith
- **Department:** Finance
- **Dashboard:** dashboard-manager.html (to be created)

---

### 📊 Data Analyst Account
- **Username:** `mjohnson`
- **Password:** `password123`
- **Role:** Data Analyst
- **Full Name:** Mary Johnson
- **Department:** Risk Management
- **Dashboard:** dashboard-analyst.html (to be created)

---

### 📋 Auditor Account
- **Username:** `rbrown`
- **Password:** `password123`
- **Role:** Auditor
- **Full Name:** Robert Brown
- **Department:** Audit
- **Dashboard:** dashboard-auditor.html (to be created)

---

### 📈 Stock Management Team Account
- **Username:** `stockteam`
- **Password:** `stockteam123`
- **Role:** Stock Management Team
- **Access:**
  - Full Edit: Stocks, Price History, Companies
  - View Only: Transactions, Trades, Investors
  - No Access: Audit Reports, Fraud Alerts, Predictions, Users
- **Dashboard:** stock-team-dashboard.html

---

### 🔄 Trade Management Team Account
- **Username:** `tradeteam`
- **Password:** `tradeteam123`
- **Role:** Trade Management Team
- **Access:**
  - Full Edit: Trades, Transactions, Investors
  - View Only: Stocks, Companies, Price History, Institutions
  - No Access: Audit Reports, Fraud Alerts, Predictions, Users
- **Dashboard:** trade-team-dashboard.html

---

### 📊 Market Data Provider Account
- **Username:** `marketdata`
- **Password:** `marketdata123`
- **Role:** Market Data Provider
- **Access:**
  - Full Edit: Price History, Stocks (price updates), Companies (market data)
  - View Only: Transactions, Trades, Investors, Institutions
  - No Access: Audit Reports, Fraud Alerts, Predictions, Users
- **Dashboard:** market-data-dashboard.html

---

### 👔 Top Management Account
- **Username:** `topmgmt`
- **Password:** `topmgmt123`
- **Role:** Top Management
- **Access:**
  - Full Edit: Companies, Institutions, Audit Reports
  - View Only: Stocks, Transactions, Trades, Investors, Price History, Fraud Alerts, Predictions
  - No Access: Users Management (Admin only)
- **Dashboard:** top-management-dashboard.html
- **Description:** Executive-level access with strategic oversight capabilities

---

### 🏛️ Board of Directors Account
- **Username:** `board`
- **Password:** `board123`
- **Role:** Board of Directors
- **Access:**
  - Full Edit: Companies (governance), Institutions (strategic partnerships), Audit Reports (oversight)
  - Governance View: All operational data for fiduciary oversight
  - No Access: Users Management (Admin only), operational controls
- **Dashboard:** board-directors-dashboard.html
- **Description:** Highest governance level with fiduciary responsibilities and strategic oversight

---

## How to Login

1. Open `login.html` in your browser
2. Enter username and password
3. Click "Login"
4. You will be redirected to your role-specific dashboard

## Testing the Investor Portal

1. **Login as Investor:**
   - Username: `investor`
   - Password: `investor123`

2. **Features Available:**
   - View portfolio value and holdings
   - Submit Buy/Sell requests
   - Request stock information
   - View recent transaction activity

3. **Test Workflow:**
   - Submit a Buy request for any stock
   - Request stock information (Price History, Market Analysis, etc.)
   - View your recent activity

---

## Notes

- All passwords are stored in plain text for demo purposes
- In production, passwords should be hashed
- Users are stored in browser's localStorage
- To reset users, clear localStorage or delete the 'users' key

---

## Creating New Users

1. Login as Admin
2. Go to Users Management
3. Click "+ Add User"
4. Select "Investor" from Role dropdown
5. Fill in details and save

