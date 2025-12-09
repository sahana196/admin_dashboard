import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, Divider, Avatar, Grid, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api';

const EmployeeDrawer = ({ open, onClose, employeeId }) => {
    const [employee, setEmployee] = useState(null);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && employeeId) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [empRes, actRes] = await Promise.all([
                        api.get(`/api/employees/${employeeId}`),
                        api.get(`/api/employees/${employeeId}/activity`)
                    ]);
                    setEmployee(empRes.data);
                    // Transform activity for chart if needed, or use as is
                    // Mock chart data generation based on activity dates
                    const chartData = [
                        { name: 'Mon', tasks: 4 }, { name: 'Tue', tasks: 7 },
                        { name: 'Wed', tasks: 5 }, { name: 'Thu', tasks: 8 },
                        { name: 'Fri', tasks: 6 }
                    ];
                    setActivity(chartData);
                } catch (error) {
                    console.error("Failed to fetch employee details", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [open, employeeId]);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 400, p: 3, role: 'presentation' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Employee Profile</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 3 }} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : employee ? (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                            <Avatar
                                sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}
                            >
                                {employee.firstName[0]}{employee.lastName[0]}
                            </Avatar>
                            <Typography variant="h5">{employee.firstName} {employee.lastName}</Typography>
                            <Typography variant="body1" color="textSecondary">{employee.role}</Typography>
                            <Typography variant="body2" color="textSecondary">{employee.department} • {employee.status}</Typography>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Weekly Activity
                            </Typography>
                            <Box sx={{ height: 200, width: '100%' }}>
                                <ResponsiveContainer>
                                    <LineChart data={activity}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="tasks" stroke="#1976d2" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Contact Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary">Email</Typography>
                                    <Typography variant="body1">{employee.firstName.toLowerCase()}.{employee.lastName.toLowerCase()}@example.com</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary">Phone</Typography>
                                    <Typography variant="body1">+1 555-0123</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                ) : (
                    <Typography>No data found</Typography>
                )}
            </Box>
        </Drawer>
    );
};

export default EmployeeDrawer;
