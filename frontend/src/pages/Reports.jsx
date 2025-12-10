import React from 'react';

const Reports = () => {
    return (
        <div className="view">
            <div className="header">
                <div className="left">
                    <h1>Reports & Exports</h1>
                    <p>Download system data and analysis</p>
                </div>
            </div>

            <div className="grid">
                <div className="panel">
                    <h3>Employee Data Export</h3>
                    <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>Export full employee list as CSV for external processing.</p>
                    <button className="btn" onClick={() => alert('Demo: Downloading CSV...')}>
                        Download CSV
                    </button>
                </div>

                <div className="panel">
                    <h3>System Activity Report</h3>
                    <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>Generate PDF summary of recent system activity and audits.</p>
                    <button className="btn" style={{ background: 'linear-gradient(90deg, #ef4444, #f87171)' }} onClick={() => alert('Demo: Generating PDF...')}>
                        Generate PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
