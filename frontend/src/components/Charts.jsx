import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    BarChart, Bar
} from 'recharts';

export const UserGrowthChart = ({ data }) => (
    <Paper sx={{ p: 3, height: 400, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>User Growth</Typography>
        <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="active" stroke="#82ca9d" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
        </ResponsiveContainer>
    </Paper>
);

export const TicketStatusChart = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Paper sx={{ p: 3, height: 400, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Ticket Status</Typography>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export const DepartmentChart = ({ data }) => (
    <Paper sx={{ p: 3, height: 400, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>Department Distribution</Typography>
        <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="count" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    </Paper>
);
