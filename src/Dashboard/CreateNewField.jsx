import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../config/axios";
import uploadFile from "../assets/hook/uploadFile.js";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice.js";
import { Option } from "antd/es/mentions/index.js";
import { toast } from "react-toastify";

const CreateNewField = ({setShowForm,setFields}) => {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);
  const user = useSelector(selectUser);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const fetch = async () => {
      try {
        const response = await api.get("/admin/owner");
        setData(response.data)
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      fetch()
    }, []);
    console.log(data)

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };



  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true)
      const img = await uploadFile(values.photo.file);
      values.photo = img;
      const response = await api.post("/location",values)
      toast.success("Thêm sân thành công")
      setFields((prev) => [...prev,response.data])
      setShowForm(false)
      form.resetFields();
      console.log(response.data)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data)
    }
    finally{
      setLoading(false)
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
      >
      <InputNumber  addonAfter="Giờ"  />
      </Form.Item>
      <Form.Item
        label="Giờ đóng cửa"
        name="closingTime"
      >
       <InputNumber  addonAfter="Giờ"  />
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
        rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Chọn chủ sân"
        name="ownerId"
        // rules={[{ required: true, message: "Vui lòng chọn!" }]}  
      >
 <Select
      defaultValue=""
      style={{ width: 120 }}
      onChange={handleChange}
      options={data?.map((item) =>({
        value: item.id,
        label: item.name
      }))}
    >
    </Select>
      </Form.Item>

      <Form.Item label="Hình ảnh" name="photo">
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
