import { Button, Form, Input, Modal, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import api from '../config/axios';  // Adjust the import path as needed

const QuanLyNhanVien = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
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
        setCurrentStaff(null);
    };

    const onFinish = async (values) => {
        const isDuplicate = data.some(staff => staff.name === values.name && staff.id !== (currentStaff?.id || null));
        if (isDuplicate) {
            message.error('Tên đăng nhập đã được sử dụng');
            return;
        }

        try {
            if (isEditMode) {
                const response = await api.put(`/update-account/${currentStaff.id}`, {
                    phone: values.phone,
                    email: values.email,
                    name: values.name,
                });
                setData(data.map(item => item.id === currentStaff.id ? response.data : item));
                message.success('Cập nhật nhân viên thành công');
            } else {
                const newStaff = {
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                };
                const response = await api.post('/add-staff', newStaff);
                setData([...data, response.data]);
                message.success('Thêm nhân viên thành công');
            }
            form.resetFields();
            setIsModalOpen(false);
            setIsEditMode(false);
            setCurrentStaff(null);
        } catch (error) {
            message.error('Lỗi khi lưu thông tin nhân viên');
            console.error('Error saving staff:', error);
        }
    };

    const handleEdit = (staff) => {
        setCurrentStaff(staff);
        form.setFieldsValue({
            name: staff.name,
            phone: staff.phone,
            email: staff.email
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (value) => {
        try {
            await api.delete(`/delete-account/${value.id}`);
            setData(data.filter(item => item.id !== value.id));
            message.success('Xóa nhân viên thành công');
        } catch (error) {
            message.error('Lỗi khi xóa nhân viên');
            console.error('Error deleting staff:', error);
        }
    };

    const fetchData = async () => {
        try {
            const staffResponse = await api.get('/get-all-staff');
            setData(staffResponse.data);
        } catch (error) {
            message.error('Lỗi khi lấy danh sách nhân viên');
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
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
                Thêm nhân viên
            </Button>
            <Modal
                footer={false}
                title={isEditMode ? "Sửa nhân viên" : "Thêm nhân viên"}
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={currentStaff ? {
                        name: currentStaff.name,
                        phone: currentStaff.phone,
                        email: currentStaff.email
                    } : {}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên nhân viên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {!isEditMode && (
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password autoComplete="current-password" />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
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
}

export default QuanLyNhanVien;
