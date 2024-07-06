import React, { useEffect, useState } from 'react'
import MyCalendar from '../calendar'
import api from '../../config/axios';

function History() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch()
    }, []);

    const fetch = async () => {
        try {
            const response = await api.get("/history");
            console.log(response.data);
            setData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <MyCalendar />
        </div>
    )
}

export default History