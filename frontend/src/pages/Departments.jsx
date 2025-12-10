import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        head: '',
        location: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/api/departments');
            setDepartments(res.data);
        } catch (error) {
            console.error("Failed to fetch departments", error);
        }
    };

    const handleSave = async () => {
        if (!formData.name) {
            alert("Department Name is required");
            return;
        }
        try {
            await api.post('/api/departments', formData);
            // alert('Department created successfully!');
            setIsModalOpen(false);
            setFormData({ name: '', head: '', location: '' });
            fetchDepartments();
        } catch (error) {
            console.error("Failed to create department", error);
        }
    };

    const viewEmployees = (deptName) => {
        navigate(`/employees?department=${encodeURIComponent(deptName)}`);
    };

    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Departments</h1>
                    <p>Overview of teams</p>
                </div>
                <div className="cta">
                    <button className="btn" onClick={() => setIsModalOpen(true)}>+ Add Department</button>
                </div>
            </div>

            <div className="cards">
                {departments.map((d) => (
                    <div className="dept" key={d.id}>
                        <div className="head">
                            <div className="badge">🏢</div>
                            <div>
                                <strong style={{ fontSize: '16px' }}>{d.name}</strong>
                                <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{d.location}</div>
                            </div>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(15,23,42,0.04)', paddingTop: '8px', color: 'var(--muted)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Head of Dept</div>
                                <div style={{ fontWeight: 700 }}>{d.head || 'N/A'}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', cursor: 'pointer' }} onClick={() => viewEmployees(d.name)}>
                                <div>Employees</div>
                                <div style={{ fontWeight: 800, color: 'var(--accent1)', textDecoration: 'underline' }}>{d.employeeCount}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button className="pill" onClick={() => viewEmployees(d.name)}>View Users</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginTop: 0 }}>Add New Department</h2>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>Department Name</label>
                            <input
                                className="input"
                                placeholder="e.g. Quality Assurance"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>Location</label>
                            <input
                                className="input"
                                placeholder="e.g. Floor 4, Block B"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700 }}>Head of Dept</label>
                            <input
                                className="input"
                                placeholder="e.g. John Manager"
                                value={formData.head}
                                onChange={e => setFormData({ ...formData, head: e.target.value })}
                            />
                        </div>

                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button className="btn secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn" onClick={handleSave}>Save Department</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Departments;
