// Local Database Manager - Stores data in browser's localStorage
class LocalDatabase {
    constructor(tableName) {
        this.tableName = tableName;
        this.initializeDatabase();
    }

    // Initialize database - starts empty like a real database
    initializeDatabase() {
        if (!localStorage.getItem(this.tableName)) {
            // Start with empty array - no sample data
            localStorage.setItem(this.tableName, JSON.stringify([]));
            localStorage.setItem(`${this.tableName}_next_id`, '1');
        } else {
            // Ensure next_id is set even if table exists
            if (!localStorage.getItem(`${this.tableName}_next_id`)) {
                const records = this.getAll();
                const maxId = records.length > 0 ? Math.max(...records.map(r => r.id)) : 0;
                localStorage.setItem(`${this.tableName}_next_id`, maxId + 1);
            }
        }
    }


    // Get all records
    getAll() {
        const data = localStorage.getItem(this.tableName);
        return data ? JSON.parse(data) : [];
    }

    // Get record by ID
    getById(id) {
        const records = this.getAll();
        return records.find(record => record.id == id);
    }

    // Search records
    search(query) {
        const records = this.getAll();
        const searchLower = query.toLowerCase();
        
        return records.filter(record => {
            return Object.values(record).some(value => 
                String(value).toLowerCase().includes(searchLower)
            );
        });
    }

    // Add new record
    add(data) {
        const records = this.getAll();
        const nextId = parseInt(localStorage.getItem(`${this.tableName}_next_id`) || 1);
        
        // Format ID based on table type
        let formattedId = nextId;
        if (this.tableName === 'companies') {
            formattedId = 10000 + nextId; // Start from 10001
        } else if (this.tableName === 'investors') {
            formattedId = 20000 + nextId; // Start from 20001
        } else if (this.tableName === 'stocks') {
            formattedId = 30000 + nextId; // Start from 30001
        }
        
        const newRecord = {
            id: formattedId,
            ...data
        };
        
        records.push(newRecord);
        localStorage.setItem(this.tableName, JSON.stringify(records));
        localStorage.setItem(`${this.tableName}_next_id`, nextId + 1);
        
        return newRecord;
    }

    // Update record
    update(id, data) {
        const records = this.getAll();
        const index = records.findIndex(record => record.id == id);
        
        if (index !== -1) {
            records[index] = {
                id: records[index].id,
                ...data
            };
            localStorage.setItem(this.tableName, JSON.stringify(records));
            return true;
        }
        return false;
    }

    // Delete record
    delete(id) {
        const records = this.getAll();
        const filtered = records.filter(record => record.id != id);
        
        if (filtered.length < records.length) {
            localStorage.setItem(this.tableName, JSON.stringify(filtered));
            return true;
        }
        return false;
    }

    // Delete multiple records
    deleteMultiple(ids) {
        const records = this.getAll();
        const filtered = records.filter(record => !ids.includes(record.id));
        localStorage.setItem(this.tableName, JSON.stringify(filtered));
        return records.length - filtered.length;
    }

    // Clear all data
    clear() {
        localStorage.removeItem(this.tableName);
        localStorage.removeItem(`${this.tableName}_next_id`);
    }

    // Reset to sample data
    reset() {
        this.clear();
        this.initializeDatabase();
    }

    // Export data as JSON
    export() {
        return JSON.stringify(this.getAll(), null, 2);
    }

    // Import data from JSON
    import(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            localStorage.setItem(this.tableName, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }

    // Get database statistics
    getStats() {
        const records = this.getAll();
        return {
            totalRecords: records.length,
            storageUsed: new Blob([JSON.stringify(records)]).size,
            lastModified: new Date().toISOString()
        };
    }
}
