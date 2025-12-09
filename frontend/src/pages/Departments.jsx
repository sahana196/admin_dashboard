import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Grid, Card, CardContent, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import api from '../api';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]); // For selecting Head
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        head: '',
        location: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [deptRes, empRes] = await Promise.all([
                api.get('/api/departments'),
                api.get('/api/employees?limit=100') // Fetch potential heads
            ]);
            setDepartments(deptRes.data);
            setEmployees(empRes.data.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleEdit = (dept) => {
        setFormData({ name: dept.name, head: dept.head || '', location: dept.location || '', id: dept.id });
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await api.delete(`/api/departments/${id}`);
                fetchData();
            } catch (error) {
                console.error("Failed to delete department", error);
                alert("Failed to delete department");
            }
        }
    };

    const handleSave = async () => {
        try {
            if (formData.id) {
                await api.put(`/api/departments/${formData.id}`, formData);
            } else {
                await api.post('/api/departments', formData);
            }
            handleClose();
            fetchData();
            setFormData({ name: '', head: '', location: '' });
        } catch (error) {
            console.error("Failed to save department", error);
            alert("Failed to save department");
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Departments</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                    Add Department
                </Button>
            </Box>

            <Grid container spacing={3}>
                {departments.map((dept) => (
                    <Grid item xs={12} md={6} lg={4} key={dept.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                                        <BusinessIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6">{dept.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">{dept.location}</Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="textSecondary">Head of Dept</Typography>
                                    <Typography variant="body2" fontWeight="bold">{dept.head || 'Unassigned'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="textSecondary">Employees</Typography>
                                    <Typography variant="body2" fontWeight="bold">{dept.employeeCount || 0}</Typography>
                                </Box>
                            </CardContent>
                            <Divider />
                            <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton size="small" color="primary" onClick={() => handleEdit(dept)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton size="small" color="error" onClick={() => handleDelete(dept.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{formData.id ? 'Edit Department' : 'Add New Department'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Department Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                        <TextField
                            select
                            label="Head of Department"
                            fullWidth
                            value={formData.head}
                            onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                        >
                            {employees.map((emp) => (
                                <MenuItem key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>
                                    {emp.firstName} {emp.lastName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">{formData.id ? 'Save' : 'Create'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Departments;
