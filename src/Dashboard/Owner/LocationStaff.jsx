import { useEffect, useState } from "react";
import { Table, message, Card, Row, Col, Tag, Divider, Result } from "antd";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

const LocationStaff = () => {
  const [location, setLocation] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await api.get(`/location/${user.idLocationStaff}`);
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location:", error);
        message.error("Lỗi khi lấy thông tin địa điểm");
      }
    };

    fetchLocation();
  }, []);

  if (!location) {
    return (
      <Result
        status="warning"
        title="Chưa có thông tin địa điểm!"
        subTitle="Vui lòng kiểm tra lại ID địa điểm."
      />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Card title="Thông tin địa điểm" bordered={false}>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <p>
                <strong>ID:</strong> {location.id}
              </p>
              <p>
                <strong>Tên:</strong> {location.name}
              </p>
              <p>
                <strong>Mô tả:</strong> {location.description}
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <p>
                <strong>Địa chỉ:</strong> {location.address}
              </p>
              <p>
                <strong>Hotline:</strong> {location.hotline}
              </p>
              <p>
                <strong>Giờ mở cửa:</strong> {location.openTime} giờ
              </p>
              <p>
                <strong>Giờ đóng cửa:</strong> {location.closeTime} giờ
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <Tag color={location.status === "ACTIVE" ? "green" : "red"}>
                  {location.status}
                </Tag>
              </p>
              <p>
                <strong>Chủ sở hữu:</strong>{" "}
                {location.owner ? location.owner.name : "N/A"}
              </p>
            </Card>
          </Col>
        </Row>
      </Card>

      <Divider orientation="left">Danh sách sân</Divider>
      <Table
        dataSource={location.courts.filter(court => court.status === "ACTIVE")}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Tên sân",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
              <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
            ),
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Divider orientation="left">Danh sách slots</Divider>
      <Table
        dataSource={location.slots}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
          },
          {
            title: "Giá",
            dataIndex: "price",
            key: "price",
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
              <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
            ),
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Divider orientation="left">Danh sách khuyến mãi</Divider>
      <Table
        dataSource={location.promotions.filter(promotion => promotion.status === "ACTIVE")}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Mã khuyến mãi",
            dataIndex: "code",
            key: "code",
          },
          {
            title: "Giảm giá (%)",
            dataIndex: "discount",
            key: "discount",
          },
          {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            key: "startDate",
          },
          {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            key: "endDate",
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
              <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
            ),
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default LocationStaff;
