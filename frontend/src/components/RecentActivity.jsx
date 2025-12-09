import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import ErrorIcon from '@mui/icons-material/Error';

const RecentActivity = ({ data }) => {
    return (
        <Paper sx={{ p: 3, height: '100%', borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {data.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: item.status === 'error' ? 'error.light' : 'primary.light' }}>
                                    {item.status === 'error' ? <ErrorIcon /> : <PersonIcon />}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
                                            {item.user}
                                        </Typography>
                                        &nbsp;—&nbsp;{item.action}
                                    </React.Fragment>
                                }
                                secondary={
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item.time}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {index < data.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default RecentActivity;
