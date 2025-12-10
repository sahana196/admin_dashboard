import React from 'react';

const RecentActivity = ({ data }) => {
    if (!data || data.length === 0) {
        return <div style={{ color: 'var(--muted)', fontSize: '13px' }}>No recent activity</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.map((item, index) => (
                <div key={item.id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px' }}>
                        <span style={{ fontWeight: 600 }}>{item.user}</span> {item.action}
                    </div>
                    <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{item.time}</small>
                </div>
            ))}
        </div>
    );
};

export default RecentActivity;
