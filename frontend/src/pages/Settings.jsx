import React from 'react';

const Settings = () => {
    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>System Settings</h1>
                    <p>Configure application</p>
                </div>
                <div className="cta">
                    <button className="btn">Save Changes</button>
                </div>
            </div>

            <div className="panel">
                <h3>General</h3>
                <div className="form-row">
                    <div style={{ flex: 1 }}>
                        <label>Application Name</label>
                        <input className="input" defaultValue="Admin Dashboard v1" />
                    </div>
                    <div style={{ width: '260px' }}>
                        <label>Support Email</label>
                        <input className="input" defaultValue="support@admin.com" />
                    </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(15,23,42,0.04)', margin: '18px 0', borderRadius: '2px' }}></div>

                <h3>Theme</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                    <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="checkbox" id="darkToggle" /> Enable Dark Mode
                    </label>
                    <small style={{ color: 'var(--muted)' }}>Toggle global theme (demo only)</small>
                </div>
            </div>
        </div>
    );
};

export default Settings;
