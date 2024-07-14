import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../config/axios";
import uploadFile from "../assets/hook/uploadFile.js";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice.js";
import { toast } from "react-toastify";

const CreateNewField = ({ setShowForm, setFields }) => {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/admin/owner");
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const img = await uploadFile(values.photo.file);
      const requestPayload = {
        name: values.name,
        description: values.description,
        address: values.address,
        hotline: values.hotline,
        openingTime: values.openingTime,
        closingTime: values.closingTime,
        photo: img,
        priceSlot: values.priceSlot,
        ownerId: user.role === 'ADMIN' ? values.ownerId : user.id,
        timeSlot: values.timeSlot,
      };
      const response = await api.post("/location", requestPayload);
      toast.success("Thêm sân thành công");
      setFields((prev) => [...prev, response.data]);
      setShowForm(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi tạo sân mới. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleImageChange = async ({ fileList }) => {
    const updatedFileList = await Promise.all(
      fileList.map(async (item) => {
        if (item.originFileObj && !item.url) {
          const imageUrl = await uploadFile(item.originFileObj);
          return {
            ...item,
            url: imageUrl,
            thumbUrl: imageUrl,
            status: "done",
          };
        }
        return item;
      })
    );
    setImageFileList(updatedFileList);
  };

  // Lọc các tài khoản có trạng thái "ACTIVE"
  const activeAccounts = data?.filter((account) => account.status === "ACTIVE");

  return (
    <Form
      form={form}
      name="createNewField"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên sân"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên sân!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Giờ mở cửa"
        name="openingTime"
        rules={[{ required: true, message: "Vui lòng nhập giờ mở cửa!" }]}
      >
        <InputNumber min={0} max={24} addonAfter="Giờ" />
      </Form.Item>
      <Form.Item
        label="Giờ đóng cửa"
        name="closingTime"
        rules={[{ required: true, message: "Vui lòng nhập giờ đóng cửa!" }]}
      >
        <InputNumber min={0} max={24} addonAfter="Giờ" />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Hotline"
        name="hotline"
        rules={[{ required: true, message: "Vui lòng nhập hotline!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Giá Slot"
        name="priceSlot"
        rules={[{ required: true, message: "Vui lòng nhập giá mỗi slot!" }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        label="Thời gian mỗi slot"
        name="timeSlot"
        rules={[{ required: true, message: "Vui lòng nhập thời gian mỗi slot!" }]}
      >
        <InputNumber min={0} addonAfter="Phút" />
      </Form.Item>
      {user.role === 'ADMIN' ? (
        <Form.Item
          label="Chọn chủ sân"
          name="ownerId"
          rules={[{ required: true, message: "Vui lòng chọn!" }]}
        >
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={handleChange}
            options={activeAccounts?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          >
          </Select>
        </Form.Item>
      ) : (
        <Form.Item
          label="Chủ sân"
          name="ownerName"
          initialValue={user.name}
        >
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item label="Hình ảnh" name="photo" valuePropName="file">
        <Upload
          listType="picture"
          fileList={imageFileList}
          onChange={handleImageChange}
          beforeUpload={() => false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Tạo Sân
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNewField;
