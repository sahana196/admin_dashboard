import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const KPICard = ({ title, value, data, color = "#8884d8", icon, trend }) => {
    const isPositive = trend >= 0;

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 180,
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                    <Typography variant="overline" color="textSecondary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 1 }}>
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: `${color}15`,
                        borderRadius: '50%',
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {icon}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, mt: 1 }}>
                <Chip
                    icon={isPositive ? <ArrowUpwardIcon sx={{ width: 14 }} /> : <ArrowDownwardIcon sx={{ width: 14 }} />}
                    label={`${Math.abs(trend)}%`}
                    size="small"
                    color={isPositive ? "success" : "error"}
                    variant="soft" // Note: variant="soft" might need custom theme or use sx
                    sx={{
                        bgcolor: isPositive ? 'rgba(76, 175, 80, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                        color: isPositive ? 'success.main' : 'error.main',
                        fontWeight: 'bold',
                        borderRadius: 1
                    }}
                />
                <Box sx={{ width: '60%', height: 40 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Paper>
    );
};

export default KPICard;
