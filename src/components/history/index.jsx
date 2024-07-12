import React, { useEffect, useState } from "react";
import MyCalendar from "../calendar";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function History() {
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await api.get(`/courtSlot/customer/${user.id}`);
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <MyCalendar
        message={data.map((item) => ({
          date: item.date,
          message: item.slot.time,
          courtName: item.court.name,
          id: item.id,
        }))}
      />
    </div>
  );
}

export default History;
