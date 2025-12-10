import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: 'User',
        department: 'Engineering',
        status: 'Active'
    });
    const [roles, setRoles] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filterDept = queryParams.get('department');
    const filterSearch = queryParams.get('search');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const dept = params.get('department');
        const search = params.get('search');
        fetchEmployees(dept, search);
        fetchRoles();
    }, [location.search]);

    const fetchRoles = async () => {
        try {
            const res = await api.get('/api/roles');
            setRoles(res.data);
        } catch (error) {
            console.error("Failed to fetch roles", error);
        }
    };

    const fetchEmployees = async (dept, search) => {
        try {
            let url = '/api/employees';
            const params = [];
            if (dept) params.push(`department=${encodeURIComponent(dept)}`);
            if (search) params.push(`search=${encodeURIComponent(search)}`);
            if (params.length > 0) url += `?${params.join('&')}`;

            const res = await api.get(url);
            // Backend returns { data: [], total, ... } based on server.js
            // If server structure is just array or wrapped, we handle it.
            // Looking at server.js: res.json({ data: results, ... })
            if (res.data && res.data.data) {
                setEmployees(res.data.data);
            } else if (Array.isArray(res.data)) {
                setEmployees(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.firstName || !formData.lastName) {
            alert("Please fill in required fields");
            return;
        }

        try {
            await api.post('/api/employees', formData);
            // alert('Employee added successfully!');
            setIsModalOpen(false);
            setFormData({ firstName: '', lastName: '', role: 'User', department: 'Engineering', status: 'Active' });
            fetchEmployees();
        } catch (error) {
            console.error("Failed to add employee", error);
            alert("Failed to add employee");
        }
    };

    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Employee Management</h1>
                    <p>
                        {filterDept ? `Viewing ${filterDept} Department` :
                            filterSearch ? `Search results for "${filterSearch}"` :
                                'Manage users and roles'}
                    </p>
                </div>
                <div className="cta" style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        style={{ display: 'none' }}
                        id="fileUpload"
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const formData = new FormData();
                            formData.append('file', file);

                            try {
                                await api.post('/api/employees/upload', formData, {
                                    headers: { 'Content-Type': 'multipart/form-data' }
                                });
                                // alert('Employees imported successfully!');
                                fetchEmployees();
                            } catch (error) {
                                console.error("Upload failed", error);
                                alert("Failed to upload file");
                            }
                            e.target.value = null; // Reset
                        }}
                    />
                    <button className="btn secondary" onClick={() => document.getElementById('fileUpload').click()}>Import Excel</button>
                    <button className="btn" onClick={() => setIsModalOpen(true)}>+ Add Employee</button>
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
                                <td>{e.firstName} {e.lastName}</td>
                                <td>{e.role}</td>
                                <td>{e.department}</td>
                                <td>
                                    <span className={`status ${e.status?.toLowerCase()}`}>
                                        {e.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className="pill">Edit</button>
                                    <button className="pill" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.08)', color: 'var(--danger)' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && !loading && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading && <div style={{ padding: '20px', textAlign: 'center' }}>Loading employees...</div>}
                {!loading && <div style={{ marginTop: '12px', color: 'var(--muted)' }}>Showing {employees.length} entries</div>}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginTop: 0 }}>Add New Employee</h2>

                        <div className="form-row">
                            <input
                                className="input"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            />
                            <input
                                className="input"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>

                        <div className="form-row">
                            <select
                                className="input"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            >
                                {roles.length > 0 ? (
                                    roles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)
                                ) : (
                                    <>
                                        <option>User</option>
                                        <option>Admin</option>
                                        <option>Manager</option>
                                    </>
                                )}
                            </select>

                            <select
                                className="input"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                            >
                                <option>Engineering</option>
                                <option>Sales</option>
                                <option>Marketing</option>
                                <option>HR</option>
                                <option>Design</option>
                                <option>IT</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <select
                                className="input"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button className="btn secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn" onClick={handleSave}>Save Employee</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
