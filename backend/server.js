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

const employees = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    firstName: `First${i}`,
    lastName: `Last${i}`,
    role: i % 3 === 0 ? 'Admin' : 'User',
    department: i % 2 === 0 ? 'Engineering' : 'Sales',
    status: i % 4 === 0 ? 'Inactive' : 'Active',
}));

// Endpoints

// 1. KPIs
app.get('/api/kpis', (req, res) => {
    const { range } = req.query; // '1h', '24h', '7d', '30d'
    // In a real app, filtering logic would go here
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
    const newEmployee = {
        id: employees.length + 1,
        ...req.body,
        // Default values if missing
        status: req.body.status || 'Active',
        role: req.body.role || 'User'
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

app.get('/api/employees/:id', (req, res) => {
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

// 6. Roles (RBAC)
const roles = [
    { id: 1, name: 'Admin', permissions: ['manageUsers', 'viewReports', 'editSettings', 'manageRoles'], usersCount: 2 },
    { id: 2, name: 'Manager', permissions: ['manageUsers', 'viewReports'], usersCount: 5 },
    { id: 3, name: 'User', permissions: ['viewReports'], usersCount: 42 },
];

app.get('/api/roles', (req, res) => {
    res.json(roles);
});

app.post('/api/roles', (req, res) => {
    const newRole = {
        id: roles.length + 1,
        ...req.body,
        usersCount: 0
    };
    roles.push(newRole);
    res.status(201).json(newRole);
});

// 7. Departments
const departments = [
    { id: 1, name: 'Engineering', head: 'Alice Smith', location: 'Floor 3', employeeCount: 45 },
    { id: 2, name: 'Sales', head: 'Bob Jones', location: 'Floor 2', employeeCount: 32 },
    { id: 3, name: 'Marketing', head: 'Charlie Day', location: 'Floor 2', employeeCount: 28 },
    { id: 4, name: 'HR', head: 'Diana Prince', location: 'Floor 1', employeeCount: 12 },
];

app.get('/api/departments', (req, res) => {
    res.json(departments);
});

app.post('/api/departments', (req, res) => {
    const newDept = {
        id: departments.length + 1,
        ...req.body,
        employeeCount: 0
    };
    departments.push(newDept);
    res.status(201).json(newDept);
});

app.put('/api/departments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = departments.findIndex(d => d.id === id);
    if (index !== -1) {
        departments[index] = { ...departments[index], ...req.body };
        res.json(departments[index]);
    } else {
        res.status(404).json({ error: "Department not found" });
    }
});

app.delete('/api/departments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = departments.findIndex(d => d.id === id);
    if (index !== -1) {
        departments.splice(index, 1);
        res.json({ message: "Department deleted" });
    } else {
        res.status(404).json({ error: "Department not found" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:4000`);
});
