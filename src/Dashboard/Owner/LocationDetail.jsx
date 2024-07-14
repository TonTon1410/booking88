import { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Card,
  Row,
  Col,
  Tag,
  Divider,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Image,
} from "antd";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { UploadOutlined } from "@ant-design/icons";
import uploadFile from "../../assets/hook/uploadFile.js";

const LocationDetail = () => {
  const [location, setLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const user = useSelector(selectUser);
  const [imageFileList, setImageFileList] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await api.get(`/location/owner/${user.id}`);
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location:", error);
        message.error("Lỗi khi lấy thông tin địa điểm");
      }
    };

    fetchLocation();
  }, [user.id]);

  const showEditModal = () => {
    form.setFieldsValue({
      id: location.id,
      name: location.name,
      description: location.description,
      address: location.address,
      hotline: location.hotline,
      openingTime: location.openingTime,
      closingTime: location.closingTime,
      photo: location.photo,
      priceSlot: location.priceSlot,
      ownerId: user.id,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = async ({ file, fileList }) => {
    const image = await uploadFile(file);
    setImageFileList(image);
  };

  const updateLocation = async (values) => {
    try {
      await api.put(`/location/${values.id}`, {
        name: values.name,
        description: values.description,
        address: values.address,
        hotline: values.hotline,
        openingTime: values.openingTime,
        closingTime: values.closingTime,
        photo: imageFileList,
        priceSlot: values.priceSlot,
        ownerId: user.id,
      });
      message.success("Cập nhật thông tin địa điểm thành công");
      const response = await api.get(`/location/owner/${user.id}`);
      setLocation(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating location:", error);
      message.error("Lỗi khi cập nhật thông tin địa điểm");
    }
  };

  if (!location) {
    return <div>Chưa có sân! Vui lòng liên hệ Admin</div>;
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
                <strong>Giờ mở cửa:</strong> {location.openTime}
              </p>
              <p>
                <strong>Giờ đóng cửa:</strong> {location.closeTime}
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
                <strong>Chủ sở hữu:</strong> {location.owner.name}
              </p>
              <Button type="primary" onClick={showEditModal}>
                Sửa thông tin địa điểm
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>

      <Modal
        title="Sửa thông tin địa điểm"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={updateLocation}>
          <Form.Item name="id" hidden />
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="hotline"
            label="Hotline"
            rules={[{ required: true, message: "Vui lòng nhập hotline!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="openingTime" label="Giờ mở cửa">
            <InputNumber min={0} max={24} addonAfter="Giờ" />
          </Form.Item>
          <Form.Item name="closingTime" label="Giờ đóng cửa">
            <InputNumber min={0} max={24} addonAfter="Giờ" />
          </Form.Item>
          <Form.Item name="photo" label="Hình ảnh">
            <Upload
              listType="picture"
              onChange={handleImageChange}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="priceSlot" label="Giá mỗi slot">
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>

      <Divider orientation="left">Danh sách sân</Divider>
      <Table
        dataSource={location.courts}
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
            defaultSortOrder: "descend",
            sorter: (a, b) => a.status.localeCompare(b.status),
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
            defaultSortOrder: "descend",
            sorter: (a, b) => a.status.localeCompare(b.status),
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
        dataSource={location.promotions}
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
            defaultSortOrder: "descend",
            sorter: (a, b) => a.status.localeCompare(b.status),
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

export default LocationDetail;
