import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import api from '../api';
import EmployeeDrawer from '../components/EmployeeDrawer';

const Employees = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    // Add Dialog State
    const [openAdd, setOpenAdd] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        role: '',
        status: 'Active'
    });

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const { page, pageSize } = paginationModel;
            // API expects 1-based page
            const response = await api.get(`/api/employees?page=${page + 1}&limit=${pageSize}`);
            setRows(response.data.data);
            setRowCount(response.data.total);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [paginationModel]);

    const handleRowClick = (params) => {
        setSelectedEmployeeId(params.id);
        setDrawerOpen(true);
    };

    const handleAddOpen = () => setOpenAdd(true);
    const handleAddClose = () => setOpenAdd(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = async () => {
        try {
            await api.post('/api/employees', formData);
            handleAddClose();
            fetchEmployees(); // Refresh list
            setFormData({ firstName: '', lastName: '', department: '', role: '', status: 'Active' });
        } catch (error) {
            console.error("Failed to create employee", error);
            alert("Failed to create employee. Please try again.");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'fullName',
            headerName: 'Full name',
            width: 200,
            valueGetter: (params, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        { field: 'role', headerName: 'Role', width: 130 },
        { field: 'department', headerName: 'Department', width: 160 },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === 'Active' ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                />
            )
        },
    ];

    return (
        <Box sx={{ height: 600, width: '100%', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Employee Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddOpen}>
                    Add Employee
                </Button>
            </Box>

            <Paper sx={{ height: '100%', width: '100%', p: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={rowCount}
                    loading={loading}
                    pageSizeOptions={[10, 20]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    onRowClick={handleRowClick}
                    sx={{ border: 0 }}
                />
            </Paper>

            <EmployeeDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                employeeId={selectedEmployeeId}
            />

            <Dialog open={openAdd} onClose={handleAddClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} fullWidth />
                        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} fullWidth />
                        <TextField label="Department" name="department" value={formData.department} onChange={handleInputChange} fullWidth />
                        <TextField label="Role" name="role" value={formData.role} onChange={handleInputChange} fullWidth />
                        <TextField select label="Status" name="status" value={formData.status} onChange={handleInputChange} fullWidth>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button onClick={handleAddSubmit} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Employees;
