import { useEffect, useState } from 'react';

const useSSE = (url) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('disconnected'); // 'connecting', 'connected', 'disconnected'

    useEffect(() => {
        const eventSource = new EventSource(url);
        setStatus('connecting');

        eventSource.onopen = () => {
            setStatus('connected');
            console.log("SSE Connected");
        };

        eventSource.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                setData(parsed);
            } catch (error) {
                console.error("SSE Parse Error", error);
            }
        };

        eventSource.onerror = (err) => {
            console.error("SSE Error", err);
            setStatus('disconnected');
            eventSource.close();
            // Optional: Reconnect logic could go here
        };

        return () => {
            eventSource.close();
        };
    }, [url]);

    return { data, status };
};

export default useSSE;
