import { Button, Form, Input, Modal, Table, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ManageFields = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentField(null);
    };

    const onFinish = async (values) => {
        const isDuplicate = data.some(field => field.courtName === values.courtName && field.id !== (currentField?.id || null));
        if (isDuplicate) {
            message.error('Tên sân đã được sử dụng');
            return;
        }

        try {
            if (isEditMode) {
                const response = await axios.put(`https://6673cebf75872d0e0a93c0c0.mockapi.io/courts/${currentField.id}`, values);
                setData(data.map(item => item.id === currentField.id ? response.data : item));
                message.success('Cập nhật sân thành công');
            } else {
                const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
                const newField = { id: newId, ...values };
                const response = await axios.post("https://6673cebf75872d0e0a93c0c0.mockapi.io/courts", newField);
                setData([...data, response.data]);
                message.success('Thêm sân thành công');
            }
            form.resetFields();
            setIsModalOpen(false);
            setIsEditMode(false);
            setCurrentField(null);
        } catch (error) {
            message.error('Lỗi khi lưu thông tin sân');
            console.error('Error saving field:', error);
        }
    };

    const handleEdit = (field) => {
        setCurrentField(field);
        form.setFieldsValue({
            courtName: field.courtName,
            address: field.address,
            pricePerHour: field.pricePerHour,
            openingTime: field.openingTime,
            closingTime: field.closingTime
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (value) => {
        try {
            await axios.delete(`https://6673cebf75872d0e0a93c0c0.mockapi.io/courts/${value.id}`);
            setData(data.filter(item => item.id !== value.id));
            message.success('Xóa sân thành công');
        } catch (error) {
            message.error('Lỗi khi xóa sân');
            console.error('Error deleting field:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fetchData = async () => {
        const response = await axios.get("https://6673cebf75872d0e0a93c0c0.mockapi.io/courts");
        setData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên sân',
            dataIndex: 'courtName',
            key: 'courtName',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Giá mỗi giờ',
            dataIndex: 'pricePerHour',
            key: 'pricePerHour',
        },
        {
            title: 'Giờ mở cửa',
            dataIndex: 'openingTime',
            key: 'openingTime',
        },
        {
            title: 'Giờ đóng cửa',
            dataIndex: 'closingTime',
            key: 'closingTime',
        },
        {
            title: 'Hành động',
            render: (value) => (
                <div>
                    <Button onClick={() => handleEdit(value)} type='primary' style={{ marginRight: '8px' }}>
                        Sửa
                    </Button>
                    <Button onClick={() => handleDelete(value)} danger type='primary'>
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Thêm sân
            </Button>
            <Modal
                footer={false}
                title={isEditMode ? "Sửa sân" : "Thêm sân"}
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={currentField ? {
                        courtName: currentField.courtName,
                        address: currentField.address,
                        pricePerHour: currentField.pricePerHour,
                        openingTime: currentField.openingTime,
                        closingTime: currentField.closingTime
                    } : {}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sân"
                        name="courtName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sân!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá mỗi giờ"
                        name="pricePerHour"
                        rules={[{ required: true, message: 'Vui lòng nhập giá mỗi giờ!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giờ mở cửa"
                        name="openingTime"
                        rules={[{ required: true, message: 'Vui lòng nhập giờ mở cửa!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giờ đóng cửa"
                        name="closingTime"
                        rules={[{ required: true, message: 'Vui lòng nhập giờ đóng cửa!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={data} columns={columns} rowKey="id" />
        </div>
    );
};

export default ManageFields;
