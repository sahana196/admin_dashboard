import React from 'react';

const roles = [
    { id: 1, name: 'Admin', perms: ['manageUsers', 'viewReports', 'editSettings'], users: 2 },
    { id: 2, name: 'Manager', perms: ['manageUsers', 'viewReports'], users: 5 },
    { id: 3, name: 'User', perms: ['viewReports'], users: 42 }
];

const Roles = () => {
    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Role Management</h1>
                    <p>Permissions & assignments</p>
                </div>
                <div className="cta">
                    <button className="btn">+ Create Role</button>
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
                                    {r.perms.map(p => (
                                        <span key={p} className="pill">{p}</span>
                                    ))}
                                </td>
                                <td style={{ textAlign: 'right' }}>{r.users}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Roles;
