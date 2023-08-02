import { useEffect, useState } from 'react';

export default function TimePicker() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateTime(new Date()), 1000);
    }, []);

    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    return (
        <div>
            <div style={{ display: 'block' }}>
                <p style={{ margin: '0 0.5rem 0 0.5rem', padding: '0', color: 'white', fontSize:'12px' }}>{dateTime.toLocaleDateString(undefined, dateOptions)}</p>
            </div>
            <div style={{ display: 'block' }}>
                <p style={{ margin: '0 0.5rem 0 0.5rem', padding: '0', color: 'white',fontSize:'12px' }}>{dateTime.toLocaleTimeString(undefined, timeOptions)}</p>
            </div>
        </div>
    );
}
