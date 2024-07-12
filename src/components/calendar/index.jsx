import { Badge, Button, Calendar, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { QRComponent } from "../qr";

function MyCalendar({ message = [] }) {
  const isMatchDate = (currentDate, date) => {
    // console.log(date)
    // console.log(currentDate.month(), date.month())
    // console.log(currentDate.date(), date.date())
    return (
      currentDate.month() === date.month() && currentDate.date() === date.date()
    );
  };
  const [show, setShow] = useState(false);
  const [qrData, setQrData] = useState(0);
  console.log(message);
  const getListData = (value) => {
    const list = [];

    message.forEach((mess) => {
      if (isMatchDate(moment(value.$d), moment(mess.date))) {
        list.push({
          type: "success",
          content: mess.message,
          courtName: mess.courtName,
          id: mess.id,
        });
      }
    });

    return list;
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

  const handleShowQr = (value) => {
    setShow(true);
    console.log(value);
    // navigate(`/booking/${value.id}`);
    // setShowQrCode(true);
    // setQrCodeId(value.id);
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    console.log(listData);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li
            onClick={() => {
              setShow(true);
              setQrData(item.id);
            }}
            key={item.content}
          >
            <Badge status={item.type} text={item.content} />
            <p>Sân: {item.courtName}</p>
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <>
      <Calendar cellRender={cellRender} />
      <Modal
        footer={[
          <Button key="cancel" onClick={() => setShow(false)}>
            Cancel
          </Button>,
        ]}
        onCancel={() => setShow(false)}
        open={show}
      >
        <QRComponent data={qrData} />
      </Modal>
    </>
  );
}

export default MyCalendar;
