import React, { createContext, useContext, useState } from 'react';

const TimeRangeContext = createContext();

export const TimeRangeProvider = ({ children }) => {
    const [timeRange, setTimeRange] = useState('24h');

    return (
        <TimeRangeContext.Provider value={{ timeRange, setTimeRange }}>
            {children}
        </TimeRangeContext.Provider>
    );
};

export const useTimeRange = () => useContext(TimeRangeContext);
