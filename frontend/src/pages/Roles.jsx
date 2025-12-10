import React, { useState, useEffect } from 'react';
import api from '../api';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        permissions: []
    });

    const AVAILABLE_PERMISSIONS = ['manageUsers', 'viewReports', 'editSettings', 'manageRoles', 'gitAccess', 'designTools', 'analytics'];

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await api.get('/api/roles');
            setRoles(res.data);
        } catch (error) {
            console.error("Failed to fetch roles", error);
        }
    };

    const handleCheckboxChange = (perm) => {
        setFormData(prev => {
            if (prev.permissions.includes(perm)) {
                return { ...prev, permissions: prev.permissions.filter(p => p !== perm) };
            } else {
                return { ...prev, permissions: [...prev.permissions, perm] };
            }
        });
    };

    const handleSave = async () => {
        if (!formData.name) {
            alert("Role Name is required");
            return;
        }
        try {
            await api.post('/api/roles', formData);
            // alert('Role created successfully!');
            setIsModalOpen(false);
            setFormData({ name: '', permissions: [] });
            fetchRoles();
        } catch (error) {
            console.error("Failed to create role", error);
        }
    };

    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Role Management</h1>
                    <p>Permissions & assignments</p>
                </div>
                <div className="cta">
                    <button className="btn" onClick={() => setIsModalOpen(true)}>+ Create Role</button>
                </div>
            </div>

            <div className="panel">
                <table aria-label="Roles table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Role Name</th>
                            <th>Permissions</th>
                            <th style={{ textAlign: 'right' }}>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(r => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>
                                    {(r.permissions || []).map(p => (
                                        <span key={p} className="pill">{p}</span>
                                    ))}
                                </td>
                                <td style={{ textAlign: 'right' }}>{r.usersCount || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginTop: 0 }}>Create New Role</h2>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>Role Name</label>
                            <input
                                className="input"
                                placeholder="e.g. Super Admin"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>Permissions</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {AVAILABLE_PERMISSIONS.map(perm => (
                                    <label key={perm} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions.includes(perm)}
                                            onChange={() => handleCheckboxChange(perm)}
                                        />
                                        {perm}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button className="btn secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn" onClick={handleSave}>Save Role</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roles;
