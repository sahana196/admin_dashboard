import React from 'react';

const departments = [
    { name: 'Engineering', floor: 'Floor 3', head: 'Alice Smith', employees: 45 },
    { name: 'Sales', floor: 'Floor 2', head: 'Bob Jones', employees: 32 },
    { name: 'Marketing', floor: 'Floor 2', head: 'Charlie Day', employees: 28 },
    { name: 'HR', floor: 'Floor 1', head: 'Diana Prince', employees: 12 }
];

const Departments = () => {
    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Departments</h1>
                    <p>Overview of teams</p>
                </div>
                <div className="cta">
                    <button className="btn">+ Add Department</button>
                </div>
            </div>

            <div className="cards">
                {departments.map((d) => (
                    <div className="dept" key={d.name}>
                        <div className="head">
                            <div className="badge">🏢</div>
                            <div>
                                <strong style={{ fontSize: '16px' }}>{d.name}</strong>
                                <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{d.floor}</div>
                            </div>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(15,23,42,0.04)', paddingTop: '8px', color: 'var(--muted)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Head of Dept</div>
                                <div style={{ fontWeight: 700 }}>{d.head}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                <div>Employees</div>
                                <div style={{ fontWeight: 800 }}>{d.employees}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button className="pill">✏️</button>
                            <button className="pill" style={{ background: 'rgba(239,68,68,0.06)', color: 'var(--danger)' }}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Departments;
