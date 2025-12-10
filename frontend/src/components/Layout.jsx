import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { TimeRangeProvider } from '../context/TimeRangeContext';
import './DashboardLayout.css';

const Layout = ({ children }) => {
    return (
        <TimeRangeProvider>
            <div className="glass-dashboard-wrapper">
                <div className="app-grid">
                    <Sidebar />
                    <main className="main-content">
                        <Topbar />
                        {children}
                    </main>
                </div>
            </div>
        </TimeRangeProvider>
    );
};

export default Layout;
