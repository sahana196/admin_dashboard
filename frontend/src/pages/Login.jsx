import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('admin');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials (try admin@example.com / admin)');
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5'
        }}>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, width: 400 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
                    Admin Login
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    type="email"
                />
                <TextField
                    fullWidth
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    type="password"
                />

                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, py: 1.5 }}
                >
                    Login
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;
