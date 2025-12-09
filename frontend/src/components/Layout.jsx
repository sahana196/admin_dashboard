import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

import { TimeRangeProvider } from '../context/TimeRangeContext';

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerWidth = 240;

    return (
        <TimeRangeProvider>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header handleDrawerToggle={handleDrawerToggle} />
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar /> {/* Spacer for AppBar */}
                    {children}
                </Box>
            </Box>
        </TimeRangeProvider>
    );
};

export default Layout;
