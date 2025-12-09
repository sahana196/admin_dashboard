import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Checkbox, FormControlLabel, FormGroup, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import api from '../api';

const Roles = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        permissions: {
            manageUsers: false,
            viewReports: false,
            editSettings: false,
            manageRoles: false
        }
    });

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/roles');
            setRows(response.data);
        } catch (error) {
            console.error("Failed to fetch roles", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePermissionChange = (event) => {
        setFormData({
            ...formData,
            permissions: {
                ...formData.permissions,
                [event.target.name]: event.target.checked
            }
        });
    };

    const handleSubmit = async () => {
        try {
            await api.post('/api/roles', {
                ...formData,
                permissions: Object.keys(formData.permissions).filter(k => formData.permissions[k])
            });
            handleClose();
            fetchRoles();
            setFormData({ name: '', permissions: { manageUsers: false, viewReports: false, editSettings: false, manageRoles: false } });
        } catch (error) {
            console.error("Failed to create role", error);
            alert("Failed to create role");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Role Name', width: 200 },
        {
            field: 'permissions',
            headerName: 'Permissions',
            width: 400,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', my: 1 }}>
                    {params.value.map((perm) => (
                        <Chip key={perm} label={perm} size="small" variant="outlined" />
                    ))}
                </Box>
            )
        },
        {
            field: 'usersCount',
            headerName: 'Users',
            width: 100,
            valueGetter: (params, row) => row.usersCount || 0
        }
    ];

    return (
        <Box sx={{ height: 600, width: '100%', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Role Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                    Create Role
                </Button>
            </Box>

            <Paper sx={{ height: '100%', width: '100%', p: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    sx={{ border: 0 }}
                />
            </Paper>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Role Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="subtitle1" gutterBottom>Permissions</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={formData.permissions.manageUsers} onChange={handlePermissionChange} name="manageUsers" />} label="Manage Users" />
                        <FormControlLabel control={<Checkbox checked={formData.permissions.viewReports} onChange={handlePermissionChange} name="viewReports" />} label="View Reports" />
                        <FormControlLabel control={<Checkbox checked={formData.permissions.editSettings} onChange={handlePermissionChange} name="editSettings" />} label="Edit Settings" />
                        <FormControlLabel control={<Checkbox checked={formData.permissions.manageRoles} onChange={handlePermissionChange} name="manageRoles" />} label="Manage Roles" />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Roles;
