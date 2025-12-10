import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();

    return (
        <aside className="sidebar" aria-label="Sidebar">
            <div className="brand">
                <div className="logo">AD</div>
                <div>
                    <h3>Admin Dashboard</h3>
                    <p>Insights & control</p>
                </div>
            </div>

            <nav className="nav" aria-label="Main navigation">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    <span className="ico">🏠</span><span className="label">Dashboard</span>
                </NavLink>
                <NavLink to="/employees" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    <span className="ico">👥</span><span className="label">Employees</span>
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    <span className="ico">📊</span><span className="label">Reports</span>
                </NavLink>
                <NavLink to="/departments" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    <span className="ico">🏢</span><span className="label">Departments</span>
                </NavLink>
                <NavLink to="/roles" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    <span className="ico">🔐</span><span className="label">Roles</span>
                </NavLink>
                <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    <span className="ico">⚙️</span><span className="label">Settings</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div style={{ flex: 1, color: 'var(--muted)', fontSize: '13px' }}>
                    Signed in as <strong>{user?.role || 'Admin'}</strong>
                </div>
                <div className="logout-btn" role="button" onClick={logout} tabIndex="0">
                    ⎋ Logout
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
