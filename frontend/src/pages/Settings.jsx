import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, TextField, Button, Switch, FormControlLabel, Divider, Avatar, Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const Settings = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [themeMode, setThemeMode] = useState('light'); // Mock state, in real app use ThemeContext
    const [generalSettings, setGeneralSettings] = useState({
        appName: 'Admin Dashboard v1',
        supportEmail: 'support@admin.com'
    });

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                System Settings
            </Typography>

            <Paper sx={{ width: '100%', mt: 3 }}>
                <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="General" />
                    <Tab label="Security" />
                    <Tab label="Notifications" />
                    <Tab label="Profile" />
                </Tabs>

                {/* General Settings */}
                <Box role="tabpanel" hidden={currentTab !== 0} sx={{ p: 3 }}>
                    {currentTab === 0 && (
                        <Box sx={{ maxWidth: 600 }}>
                            <Typography variant="h6" gutterBottom>App Configuration</Typography>
                            <TextField
                                label="Application Name"
                                fullWidth margin="normal"
                                value={generalSettings.appName}
                                onChange={(e) => setGeneralSettings({ ...generalSettings, appName: e.target.value })}
                            />
                            <TextField
                                label="Support Email"
                                fullWidth margin="normal"
                                value={generalSettings.supportEmail}
                                onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                            />
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" gutterBottom>Theme</Typography>
                            <FormControlLabel
                                control={<Switch checked={themeMode === 'dark'} onChange={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} />}
                                label="Enable Dark Mode (Global)"
                            />
                        </Box>
                    )}
                </Box>

                {/* Security Settings */}
                <Box role="tabpanel" hidden={currentTab !== 1} sx={{ p: 3 }}>
                    {currentTab === 1 && (
                        <Box sx={{ maxWidth: 600 }}>
                            <Typography variant="h6" gutterBottom>Password</Typography>
                            <TextField label="Current Password" type="password" fullWidth margin="normal" />
                            <TextField label="New Password" type="password" fullWidth margin="normal" />
                            <TextField label="Confirm Password" type="password" fullWidth margin="normal" />
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
                            <FormControlLabel control={<Switch />} label="Enable 2FA (SMS/Authenticator)" />
                        </Box>
                    )}
                </Box>

                {/* Notifications Settings */}
                <Box role="tabpanel" hidden={currentTab !== 2} sx={{ p: 3 }}>
                    {currentTab === 2 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>Email Alerts</Typography>
                            <FormControlLabel control={<Switch defaultChecked />} label="New User Registration" />
                            <FormControlLabel control={<Switch defaultChecked />} label="System Updates" />
                            <FormControlLabel control={<Switch />} label="Weekly Reports" />
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" gutterBottom>System Messages</Typography>
                            <FormControlLabel control={<Switch defaultChecked />} label="Show Toast Notifications" />
                        </Box>
                    )}
                </Box>

                {/* Profile Settings */}
                <Box role="tabpanel" hidden={currentTab !== 3} sx={{ p: 3 }}>
                    {currentTab === 3 && (
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>AD</Avatar>
                                <Button variant="outlined">Change Avatar</Button>
                            </Box>
                            <Grid container spacing={3} maxWidth={800}>
                                <Grid item xs={6}>
                                    <TextField label="First Name" defaultValue="Admin" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Last Name" defaultValue="User" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Email" defaultValue="admin@example.com" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Bio" multiline rows={4} fullWidth placeholder="Short bio..." />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>

                <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider' }}>
                    <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Settings;
