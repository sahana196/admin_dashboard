import React from 'react';

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="search" role="search">
                🔎 <input id="quickSearch" placeholder="Search users, reports or tickets..." />
            </div>
            <div className="top-actions">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ background: 'linear-gradient(90deg,var(--accent1),var(--accent2))', padding: '8px 14px', borderRadius: '999px', color: 'white', fontWeight: 800 }}>Last 24h</div>
                    <small style={{ color: 'var(--muted)', marginTop: '6px' }}>Updated just now</small>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
