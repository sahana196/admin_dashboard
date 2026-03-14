import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(null);

    const handleOpenReport = (reportType) => setSelectedReport(reportType);
    const handleCloseReport = () => setSelectedReport(null);

    // Mock Data for Charts
    const growthData = [
        { name: 'Jan', employees: 120 }, { name: 'Feb', employees: 125 }, { name: 'Mar', employees: 132 },
        { name: 'Apr', employees: 140 }, { name: 'May', employees: 138 }, { name: 'Jun', employees: 145 },
    ];

    const departmentData = [
        { name: 'Engineering', count: 45 }, { name: 'HR', count: 8 }, { name: 'Sales', count: 22 },
        { name: 'Marketing', count: 12 }, { name: 'Support', count: 18 },
    ];

    const attritionData = [
        { name: 'Retained', value: 88, color: '#10b981' },
        { name: 'Attrited', value: 12, color: '#ef4444' },
    ];

    // Real Data for Logs
    const [logs, setLogs] = useState([]);

    React.useEffect(() => {
        if (['login', 'roles', 'system'].includes(selectedReport)) {
            fetch('http://localhost:4000/api/logs')
                .then(res => res.json())
                .then(data => setLogs(data))
                .catch(err => console.error("Failed to load logs", err));
        }
    }, [selectedReport]);

    const renderModalContent = () => {
        switch (selectedReport) {
            case 'growth':
                return (
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="employees" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'department':
                return (
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={departmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'attrition':
                return (
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={attritionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {attritionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'login':
            case 'roles':
            case 'system':
                const filteredLogs = logs.filter(row => {
                    if (selectedReport === 'login') return row.action.includes('LOGIN');
                    if (selectedReport === 'roles') return row.action.includes('ROLE');
                    if (selectedReport === 'system') return !row.action.includes('LOGIN') && !row.action.includes('ROLE');
                    return true;
                });

                return (
                    <TableContainer component={Paper} style={{ boxShadow: 'none', border: '1px solid var(--border)', maxHeight: 400 }}>
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Action</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Details</TableCell>
                                    <TableCell>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLogs.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell style={{ fontWeight: 600 }}>{row.action}</TableCell>
                                        <TableCell>{row.user}</TableCell>
                                        <TableCell>{row.details}</TableCell>
                                        <TableCell style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{row.time}</TableCell>
                                    </TableRow>
                                ))}
                                {filteredLogs.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" style={{ padding: 20, color: 'var(--muted)' }}>
                                            No logs found for this category.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            default:
                return <p>Details not available for this report type.</p>;
        }
    };

    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Reports & Insights</h1>
                    <p>System analytics and audit logs</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                {/* Section 1: Analytics */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-main)' }}>Analytics & Insights</h2>
                    <div className="grid">
                        <div className="panel">
                            <h3>Employee Growth</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '12px', fontSize: '0.9rem' }}>Track headcount growth and hiring trends over time.</p>
                            <button className="btn secondary" onClick={() => handleOpenReport('growth')}>View Analytics</button>
                        </div>
                        <div className="panel">
                            <h3>Department Stats</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '12px', fontSize: '0.9rem' }}>Headcount distribution and resource allocation.</p>
                            <button className="btn secondary" onClick={() => handleOpenReport('department')}>View Analytics</button>
                        </div>
                        <div className="panel">
                            <h3>Attrition Metrics</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '12px', fontSize: '0.9rem' }}>Retention rates and exit analysis reports.</p>
                            <button className="btn secondary" onClick={() => handleOpenReport('attrition')}>View Analytics</button>
                        </div>
                    </div>
                </div>

                {/* Section 2: Audit Logs */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-main)' }}>Activity & Audit Logs</h2>
                    <div className="grid">
                        <div className="panel">
                            <h3>Login History</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '12px', fontSize: '0.9rem' }}>Recent login attempts and security alerts.</p>
                            <button className="btn" style={{ background: 'var(--surface-hover)', color: 'var(--text-main)', border: '1px solid var(--border)' }} onClick={() => handleOpenReport('login')}>View Logs</button>
                        </div>
                        <div className="panel">
                            <h3>Role Changes</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '12px', fontSize: '0.9rem' }}>Tracking permission updates and role assignments.</p>
                            <button className="btn" style={{ background: 'var(--surface-hover)', color: 'var(--text-main)', border: '1px solid var(--border)' }} onClick={() => handleOpenReport('roles')}>View Logs</button>
                        </div>
                        <div className="panel">
                            <h3>System Actions</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '12px', fontSize: '0.9rem' }}>Admin actions including creating/deleting records.</p>
                            <button className="btn" style={{ background: 'var(--surface-hover)', color: 'var(--text-main)', border: '1px solid var(--border)' }} onClick={() => handleOpenReport('system')}>View Logs</button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Interactive Modal */}
            <Dialog open={!!selectedReport} onClose={handleCloseReport} maxWidth="md" fullWidth>
                <DialogTitle style={{ textTransform: 'capitalize' }}>
                    {selectedReport === 'growth' ? 'Employee Growth Trends' :
                        selectedReport === 'department' ? 'Department Distribution' :
                            selectedReport === 'attrition' ? 'Attrition & Retention' :
                                ['login', 'roles', 'system'].includes(selectedReport) ? 'Activity Logs' : 'Report Details'}
                </DialogTitle>
                <DialogContent dividers>
                    {renderModalContent()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReport} color="primary">Close</Button>
                    <Button variant="contained" color="primary" onClick={() => alert('Exporting specific report...')}>Export Report</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Reports;
