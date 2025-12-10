const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Mock Data
const kpis = {
    users: 12500,
    activeNow: 120,
    newThisMonth: 450,
    openTickets: 12
};

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const xlsx = require('xlsx');

// Configure Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

const EMPLOYEES_FILE = path.join(__dirname, 'data', 'employees.json');

// Helper to read data
const getEmployees = () => {
    try {
        if (!fs.existsSync(EMPLOYEES_FILE)) {
            // Initialize if not exists
            fs.writeFileSync(EMPLOYEES_FILE, '[]');
            return [];
        }
        const data = fs.readFileSync(EMPLOYEES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading employees file:", err);
        return [];
    }
};

// Helper to write data
const saveEmployees = (data) => {
    try {
        fs.writeFileSync(EMPLOYEES_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing employees file:", err);
    }
};

const ROLES_FILE = path.join(__dirname, 'data', 'roles.json');

const getRoles = () => {
    try {
        if (!fs.existsSync(ROLES_FILE)) {
            fs.writeFileSync(ROLES_FILE, '[]');
            return [];
        }
        const data = fs.readFileSync(ROLES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading roles file:", err);
        return [];
    }
};

const saveRoles = (data) => {
    try {
        fs.writeFileSync(ROLES_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing roles file:", err);
    }
};

const DEPARTMENTS_FILE = path.join(__dirname, 'data', 'departments.json');

const getDepartments = () => {
    try {
        if (!fs.existsSync(DEPARTMENTS_FILE)) {
            fs.writeFileSync(DEPARTMENTS_FILE, '[]');
            return [];
        }
        const data = fs.readFileSync(DEPARTMENTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading departments file:", err);
        return [];
    }
};

const saveDepartments = (data) => {
    try {
        fs.writeFileSync(DEPARTMENTS_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing departments file:", err);
    }
};

// Endpoints

// 1. KPIs
app.get('/api/kpis', (req, res) => {
    const { range } = req.query;
    res.json(kpis);
});

// 2. Metrics (TimeSeries)
app.get('/api/metrics', (req, res) => {
    const { metric, range } = req.query;
    // Mock data points
    const data = Array.from({ length: 30 }, (_, i) => ({
        time: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: Math.floor(Math.random() * 1000) + 500
    }));
    res.json(data);
});

// 3. Employees (Pagination)
app.get('/api/employees', (req, res) => {
    let employees = getEmployees();

    // Filtering
    const { department, search } = req.query;

    if (department) {
        employees = employees.filter(e => e.department === department);
    }

    if (search) {
        const lowerSearch = search.toLowerCase();
        employees = employees.filter(e =>
            e.firstName.toLowerCase().includes(lowerSearch) ||
            e.lastName.toLowerCase().includes(lowerSearch) ||
            e.role.toLowerCase().includes(lowerSearch)
        );
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    const results = employees.slice(start, end);
    res.json({
        data: results,
        total: employees.length,
        page,
        totalPages: Math.ceil(employees.length / limit)
    });
});

app.post('/api/employees', (req, res) => {
    const employees = getEmployees();
    const newEmployee = {
        id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        ...req.body,
        status: req.body.status || 'Active',
        role: req.body.role || 'User'
    };
    employees.push(newEmployee);
    saveEmployees(employees);
    res.status(201).json(newEmployee);
});

app.post('/api/employees/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const employees = getEmployees();
        let maxId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) : 0;

        const newEmployees = data.map(row => ({
            id: ++maxId,
            firstName: row['First Name'] || row.firstName || 'Unknown',
            lastName: row['Last Name'] || row.lastName || 'User',
            role: row.Role || row.role || 'User',
            department: row.Department || row.department || 'Engineering',
            status: row.Status || row.status || 'Active'
        }));

        const updatedEmployees = [...employees, ...newEmployees];
        saveEmployees(updatedEmployees);

        res.status(201).json({ message: `Successfully imported ${newEmployees.length} employees`, count: newEmployees.length });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to process file" });
    }
});

app.get('/api/employees/:id', (req, res) => {
    const employees = getEmployees();
    const emp = employees.find(e => e.id == req.params.id);
    if (emp) res.json(emp);
    else res.status(404).json({ error: 'Not found' });
});

app.get('/api/employees/:id/activity', (req, res) => {
    // Mock activity
    res.json([
        { date: '2023-10-01', action: 'Login' },
        { date: '2023-10-02', action: 'Update Profile' }
    ]);
});

// 4. Realtime Metrics (SSE)
app.get('/api/realtime/metrics', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = () => {
        const data = {
            timestamp: new Date().toISOString(),
            value: Math.floor(Math.random() * 100)
        };
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const intervalId = setInterval(sendEvent, 2000); // Every 2 seconds

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

// 5. New Analytics Endpoints
app.get('/api/users/growth', (req, res) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map(month => ({
        name: month,
        users: Math.floor(Math.random() * 500) + 1000,
        active: Math.floor(Math.random() * 300) + 500
    }));
    res.json(data);
});

app.get('/api/tickets/status', (req, res) => {
    res.json([
        { name: 'Open', value: 45, color: '#0088FE' },
        { name: 'In Progress', value: 25, color: '#00C49F' },
        { name: 'Resolved', value: 85, color: '#FFBB28' },
        { name: 'Closed', value: 120, color: '#FF8042' },
    ]);
});

app.get('/api/departments/distribution', (req, res) => {
    // Dynamically map department names to their employee counts
    // Note: In a real DB, we would join tables. Here we use the 'employeeCount' from the departments data.
    const departments = getDepartments();
    const distribution = departments.map(dept => ({
        name: dept.name,
        count: dept.employeeCount || 0
    }));
    res.json(distribution);
});

app.get('/api/activity/recent', (req, res) => {
    res.json([
        { id: 1, user: 'Alice Smith', action: 'Logged In', time: '2 mins ago', status: 'success' },
        { id: 2, user: 'Bob Jones', action: 'Updated Ticket #1234', time: '15 mins ago', status: 'info' },
        { id: 3, user: 'Charlie Day', action: 'Failed Login Attempt', time: '1 hour ago', status: 'error' },
        { id: 4, user: 'Diana Prince', action: 'New User Registration', time: '3 hours ago', status: 'success' },
        { id: 5, user: 'Evan Wright', action: 'Exported Report', time: '5 hours ago', status: 'warning' },
    ]);
});



app.get('/api/roles', (req, res) => {
    const roles = getRoles();
    res.json(roles);
});

app.post('/api/roles', (req, res) => {
    const roles = getRoles();
    const newRole = {
        id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1,
        ...req.body,
        usersCount: 0
    };
    roles.push(newRole);
    saveRoles(roles);
    res.status(201).json(newRole);
});

// 7. Departments
app.get('/api/departments', (req, res) => {
    const departments = getDepartments();
    res.json(departments);
});

app.post('/api/departments', (req, res) => {
    const departments = getDepartments();
    const newDept = {
        id: departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1,
        ...req.body,
        employeeCount: 0
    };
    departments.push(newDept);
    saveDepartments(departments);
    res.status(201).json(newDept);
});

app.put('/api/departments/:id', (req, res) => {
    const departments = getDepartments();
    const id = parseInt(req.params.id);
    const index = departments.findIndex(d => d.id === id);
    if (index !== -1) {
        departments[index] = { ...departments[index], ...req.body };
        saveDepartments(departments);
        res.json(departments[index]);
    } else {
        res.status(404).json({ error: "Department not found" });
    }
});

app.delete('/api/departments/:id', (req, res) => {
    const departments = getDepartments();
    const id = parseInt(req.params.id);
    const index = departments.findIndex(d => d.id === id);
    if (index !== -1) {
        departments.splice(index, 1);
        saveDepartments(departments);
        res.json({ message: "Department deleted" });
    } else {
        res.status(404).json({ error: "Department not found" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:4000`);
});
