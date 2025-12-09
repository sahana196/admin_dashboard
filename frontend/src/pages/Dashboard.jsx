import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, CircularProgress, Container } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BoltIcon from '@mui/icons-material/Bolt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import KPICard from '../components/KPICard';
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
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a202c' }}>
                    Dashboard Overview
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Key metrics and analytics for the last {timeRange}.
                </Typography>
            </Box>

            {/* KPI Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <KPICard
                        title="Total Users"
                        value={data.kpis?.users}
                        data={sparklineData}
                        color="#8884d8"
                        icon={<GroupIcon />}
                        trend={12}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <KPICard
                        title="Active Now"
                        value={activeNowValue}
                        data={sparklineData}
                        color="#82ca9d"
                        icon={<BoltIcon />}
                        trend={5}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <KPICard
                        title="New This Month"
                        value={data.kpis?.newThisMonth}
                        data={sparklineData}
                        color="#ffc658"
                        icon={<PersonAddIcon />}
                        trend={-2}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <KPICard
                        title="Open Tickets"
                        value={data.kpis?.openTickets}
                        data={sparklineData}
                        color="#ff8042"
                        icon={<ConfirmationNumberIcon />}
                        trend={8}
                    />
                </Grid>
            </Grid>

            {/* Analytics Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <UserGrowthChart data={data.growth} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <TicketStatusChart data={data.tickets} />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <DepartmentChart data={data.departments} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <RecentActivity data={data.activity} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;

