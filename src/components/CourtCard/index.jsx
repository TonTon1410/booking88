import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'antd';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import "../../components/CourtCard/Card.css";

const { Meta } = Card;

const CourtCard = ({ court }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/court-details/${court.id}`);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, court.image); // court.image là tên file trên Firebase Storage
        const imageUrl = await getDownloadURL(imageRef);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching image from Firebase Storage:", error);
      }
    };

    if (court.image) {
      fetchImage();
    }
  }, [court.image]);

  return (
    <Card
      hoverable
      className="m-4 transition-transform transform hover:scale-105 hover:shadow-xl bg-white"
      cover={<img alt={`Hình ảnh ${court.name}`} src={court.photo} className="w-full h-48 object-cover" />}
      actions={[
        <Button key="book" type="primary" onClick={handleViewDetails}>Đặt sân</Button>,
      ]}
    >
      <Meta
        title={<span className="font-bold text-xl text-blue-600">{court.name}</span>}
        description={
          <>
            <p>Khu vực: {court.address}</p>
            <p>Miêu Tả: {court.description}</p>
            <p>Hotline: {court.hotline}</p>
            <p>Giá tiền: {court.price}</p>
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hotline: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    courts: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    closeTime: PropTypes.string.isRequired,
    openTime: PropTypes.string.isRequired,
    availableTimes: PropTypes.arrayOf(PropTypes.shape({
      time: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
};

export default CourtCard;
