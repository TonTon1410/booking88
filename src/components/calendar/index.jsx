import { Badge, Calendar } from 'antd'
import moment from 'moment';
import React from 'react'

function MyCalendar({ message = [] }) {


    const isMatchDate = (currentDate, date) => {
        // console.log(date)
        // console.log(currentDate.month(), date.month())
        // console.log(currentDate.date(), date.date())
        return currentDate.month() === date.month() && currentDate.date() === date.date()
    }

    const getListData = (value) => {
        const list = []

        message.forEach(mess => {
            if (isMatchDate(moment(value.$d), moment(mess.date))) {
                list.push({
                    type: 'success',
                    content: mess.message,
                })
            }
        })

        return list
    };
    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return (
        <>
            <Calendar cellRender={cellRender} />
        </>
    )
}

export default MyCalendar