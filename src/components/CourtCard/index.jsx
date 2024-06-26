import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Card, Rate, Button, Tag } from 'antd';
import "../../components/CourtCard/Card.css";

const { Meta } = Card;

const CourtCard = ({ court }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/court-details", { state: { court } });
  };

  return (
    <Card
      hoverable
      className="m-4 transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
      cover={<img alt={`Hình ảnh ${court.name}`} src={court.image} className="w-full h-48 object-cover" />}
      actions={[
        <Button type="primary" onClick={handleViewDetails}>Đặt sân</Button>,
      ]}
    >
      <Meta
        title={<span className="font-bold text-xl text-blue-600">{court.name}</span>}
        description={
          <>
            <p>Khu vực: {court.location}</p>
            <p>Số sân: {court.courts}</p>
            {/* <div className="flex items-center mb-2">
              <Rate disabled defaultValue={court.rating} />
              <span className="ml-2 text-gray-600">({court.rating} sao)</span>
            </div> */}
            <div className="mb-2">
              <span className="text-lg font-semibold">Giờ mở cửa:</span>
              <p>{court.openTime || "empty"}</p>
            </div>
            <div className="mb-2">
              <span className="text-lg font-semibold">Giờ hoạt động:</span>
              <p>{court.openTime || "empty"} - {court.closeTime || "empty"}</p>
            </div>
          </>
        }
      />
    </Card>
  );
};

CourtCard.propTypes = {
  court: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    courts: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    operatingHours: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
    availableTimes: PropTypes.arrayOf(PropTypes.shape({
      time: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
};

export default CourtCard;
