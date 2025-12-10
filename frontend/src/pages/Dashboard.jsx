import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, CircularProgress, Container } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BoltIcon from '@mui/icons-material/Bolt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { UserGrowthChart, TicketStatusChart, DepartmentChart } from '../components/Charts';
import RecentActivity from '../components/RecentActivity';
import api from '../api';
import { useTimeRange } from '../context/TimeRangeContext';
import useSSE from '../hooks/useSSE';

const Dashboard = () => {
    const { timeRange } = useTimeRange();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        kpis: null,
        growth: [],
        tickets: [],
        departments: [],
        activity: []
    });

    const { data: sseData } = useSSE('http://localhost:4000/api/realtime/metrics');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Determine range-based query param (mock logic)
                const rangeParam = `?range=${timeRange}`;

                // Parallel fetching
                const [kpisRes, growthRes, ticketsRes, deptsRes, activityRes] = await Promise.all([
                    api.get(`/api/kpis${rangeParam}`),
                    api.get('/api/users/growth'),
                    api.get('/api/tickets/status'),
                    api.get('/api/departments/distribution'),
                    api.get('/api/activity/recent')
                ]);

                setData({
                    kpis: kpisRes.data,
                    growth: growthRes.data,
                    tickets: ticketsRes.data,
                    departments: deptsRes.data,
                    activity: activityRes.data
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    // Use SSE real-time value for Active Now if available, otherwise fallback to static API data
    const activeNowValue = sseData ? sseData.value : data.kpis?.activeNow;


    // Mock sparklines
    const sparklineData = [
        { value: 10 }, { value: 15 }, { value: 12 }, { value: 20 }, { value: 25 }, { value: 22 }, { value: 30 }
    ];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="view">
            <header className="header">
                <div className="left">
                    <h1 className="page-title">Dashboard Overview</h1>
                    <p>Key metrics & activity</p>
                </div>
                <div className="cta">
                    <button className="btn">Create Report</button>
                    <button className="btn secondary">Export</button>
                </div>
            </header>

            <div className="metrics">
                <div className="metric">
                    <div className="label">TOTAL USERS</div>
                    <div className="value">{data.kpis?.users?.toLocaleString() || '0'}</div>
                    <div className="mini">
                        <div style={{ color: 'var(--muted)' }}>+12% vs last month</div>
                        <svg width="80" height="28" viewBox="0 0 80 28"><path d="M2 20 C18 12 32 24 48 8 C60 0 74 16 78 12" stroke="#7c5cff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                    </div>
                </div>

                <div className="metric">
                    <div className="label">ACTIVE NOW</div>
                    <div className="value">{activeNowValue || '0'}</div>
                    <div className="mini">
                        <div style={{ color: 'var(--muted)' }}>+5% in hour</div>
                        <svg width="80" height="28" viewBox="0 0 80 28"><path d="M2 18 C18 16 32 10 48 14 C60 18 74 12 78 10" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                    </div>
                </div>

                <div className="metric">
                    <div className="label">NEW THIS MONTH</div>
                    <div className="value">{data.kpis?.newThisMonth?.toLocaleString() || '0'}</div>
                    <div className="mini">
                        <div style={{ color: 'var(--muted)' }}>▼2% vs prev</div>
                        <svg width="80" height="28" viewBox="0 0 80 28"><path d="M2 14 C18 6 32 18 48 12 C60 8 74 16 78 14" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                    </div>
                </div>

                <div className="metric">
                    <div className="label">OPEN TICKETS</div>
                    <div className="value">{data.kpis?.openTickets?.toLocaleString() || '0'}</div>
                    <div className="mini">
                        <div style={{ color: 'var(--muted)' }}>Resolved 86%</div>
                        <svg width="80" height="28" viewBox="0 0 80 28"><path d="M2 22 C18 18 32 12 48 14 C60 16 74 10 78 12" stroke="#fb7185" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="panel">
                    <h3>User Growth</h3>
                    <div className="chart" style={{ display: 'block', height: '300px' }}>
                        <UserGrowthChart data={data.growth} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                        <div style={{ color: 'var(--muted)' }}>Last 30 days</div>
                        <div style={{ fontWeight: 800 }}>+9.4% growth</div>
                    </div>
                </div>

                <div className="panel">
                    <h3>Ticket Status</h3>
                    <div className="chart" style={{ display: 'block', height: '300px' }}>
                        <TicketStatusChart data={data.tickets} />
                    </div>
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ color: 'var(--muted)' }}>Closed</div><div style={{ fontWeight: 700 }}>86%</div></div>
                    </div>
                </div>

                <div className="panel" style={{ gridColumn: '1 / -1' }}>
                    <h3>Department Distribution</h3>
                    <div className="chart" style={{ display: 'block', height: '300px' }}>
                        <DepartmentChart data={data.departments} />
                    </div>
                </div>
            </div>

            <div className="widgets">
                <div className="widget">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div><strong>Server Health</strong><div style={{ color: 'var(--muted)', fontSize: '13px' }}>Status & uptime</div></div>
                        <div style={{ background: '#ecfdf5', padding: '6px 10px', borderRadius: '8px', color: '#047857', fontWeight: 700 }}>Healthy</div>
                    </div>
                    <div style={{ marginTop: '12px', color: 'var(--muted)' }}>CPU 32% • Memory 58% • Disk 64%</div>
                </div>

                <div className="widget">
                    <strong>Recent Activity</strong>
                    <div style={{ marginTop: '10px' }}>
                        <RecentActivity data={data.activity} />
                    </div>
                </div>

                <div className="widget">
                    <strong>Quick Actions</strong>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button className="btn secondary" style={{ padding: '8px 10px', fontSize: '13px' }}>Create User</button>
                        <button className="btn secondary" style={{ padding: '8px 10px', fontSize: '13px' }}>New Ticket</button>
                        <button className="btn" style={{ padding: '8px 10px', fontSize: '13px' }}>Export</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

