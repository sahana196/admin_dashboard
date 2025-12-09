import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Grid, Card, CardContent } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import api from '../api';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

const Reports = () => {
    const [loading, setLoading] = useState(false);

    // ... handleDownloadCSV ...

    const handleGeneratePDF = async () => {
        alert("PDF Generation temporarily disabled for debugging.");
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Reports & Exports
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Download system data and generate analysis reports.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <DownloadIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                            <Box>
                                <Typography variant="h6">Employee Data Export</Typography>
                                <Typography variant="body2" color="textSecondary">Export full employee list as CSV.</Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<DownloadIcon />}
                            onClick={handleDownloadCSV}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Download CSV'}
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PictureAsPdfIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
                            <Box>
                                <Typography variant="h6">System Activity Report</Typography>
                                <Typography variant="body2" color="textSecondary">Generate PDF summary of recent activity.</Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            startIcon={<PictureAsPdfIcon />}
                            onClick={handleGeneratePDF}
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate PDF'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Reports;
