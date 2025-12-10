import React, { useState } from 'react';

// Mock Data matching the HTML sample
const initialEmployees = [
    { id: 1, name: 'First0 Last0', role: 'Admin', dept: 'Engineering', status: 'inactive' },
    { id: 2, name: 'First1 Last1', role: 'User', dept: 'Sales', status: 'active' },
    { id: 3, name: 'First2 Last2', role: 'User', dept: 'Engineering', status: 'active' },
    { id: 4, name: 'First3 Last3', role: 'Admin', dept: 'Sales', status: 'active' },
    { id: 5, name: 'First4 Last4', role: 'User', dept: 'Engineering', status: 'inactive' },
    { id: 6, name: 'First5 Last5', role: 'User', dept: 'Sales', status: 'active' },
    { id: 7, name: 'First6 Last6', role: 'Admin', dept: 'Engineering', status: 'active' },
    { id: 8, name: 'First7 Last7', role: 'User', dept: 'Sales', status: 'active' }
];

const Employees = () => {
    const [employees] = useState(initialEmployees);

    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Employee Management</h1>
                    <p>Manage users and roles</p>
                </div>
                <div className="cta">
                    <button className="btn" onClick={() => alert('Demo: Add Employee modal')}>+ Add Employee</button>
                </div>
            </div>

            <div className="panel" style={{ overflow: 'auto' }}>
                <table aria-label="Employees table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(e => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.role}</td>
                                <td>{e.dept}</td>
                                <td>
                                    <span className={`status ${e.status}`}>
                                        {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className="pill">Edit</button>
                                    <button className="pill" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.08)', color: 'var(--danger)' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '12px', color: 'var(--muted)' }}>Showing {employees.length} entries</div>
            </div>
        </div>
    );
};

export default Employees;
