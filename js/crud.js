// Generic CRUD operations handler
class CRUDManager {
    constructor(apiEndpoint, tableName) {
        this.apiEndpoint = apiEndpoint;
        this.tableName = tableName;
        this.selectedRows = new Set();
    }

    // Fetch all records
    async fetchAll() {
        try {
            const response = await fetch(this.apiEndpoint);
            const result = await response.json();
            if (result.success) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error loading data: ' + error.message);
            return [];
        }
    }

    // Search records
    async search(query) {
        try {
            const response = await fetch(`${this.apiEndpoint}?search=${encodeURIComponent(query)}`);
            const result = await response.json();
            if (result.success) {
                return result.data;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error searching:', error);
            alert('Error searching: ' + error.message);
            return [];
        }
    }

    // Add new record
    async add(data) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert('Record added successfully!');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error adding record:', error);
            alert('Error adding record: ' + error.message);
            return false;
        }
    }

    // Update record
    async update(data) {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert('Record updated successfully!');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error updating record:', error);
            alert('Error updating record: ' + error.message);
            return false;
        }
    }

    // Delete record
    async delete(id) {
        if (!confirm('Are you sure you want to delete this record?')) {
            return false;
        }
        
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            const result = await response.json();
            if (result.success) {
                alert('Record deleted successfully!');
                return true;
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error deleting record:', error);
            alert('Error deleting record: ' + error.message);
            return false;
        }
    }

    // Delete multiple records
    async deleteMultiple(ids) {
        if (!confirm(`Are you sure you want to delete ${ids.length} record(s)?`)) {
            return false;
        }
        
        let successCount = 0;
        for (const id of ids) {
            const success = await this.delete(id);
            if (success) successCount++;
        }
        
        if (successCount > 0) {
            alert(`${successCount} record(s) deleted successfully!`);
            return true;
        }
        return false;
    }

    // Toggle row selection
    toggleRowSelection(id, checkbox) {
        if (checkbox.checked) {
            this.selectedRows.add(id);
        } else {
            this.selectedRows.delete(id);
        }
    }

    // Get selected row IDs
    getSelectedRows() {
        return Array.from(this.selectedRows);
    }

    // Clear selections
    clearSelections() {
        this.selectedRows.clear();
        document.querySelectorAll('input[type="checkbox"][data-id]').forEach(cb => {
            cb.checked = false;
        });
    }
}

// Modal management
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
