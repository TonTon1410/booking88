import { Button, Form, Input, Modal, Table, message, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const STAFF_API_URL = 'https://6673cebf75872d0e0a93c0c0.mockapi.io/staffs';
const FIELDS_API_URL = 'https://6673cebf75872d0e0a93c0c0.mockapi.io/courts';

const QuanLyNhanVien = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
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

    const generateId = () => Math.floor(1000 + Math.random() * 9000); // Tạo ID ngẫu nhiên với ít nhất 4 chữ số

    const onFinish = async (values) => {
        const isDuplicate = data.some(staff => staff.username === values.username && staff.id !== (currentStaff?.id || null));
        if (isDuplicate) {
            message.error('Tên đăng nhập đã được sử dụng');
            return;
        }

        try {
            if (isEditMode) {
                const response = await axios.put(`${STAFF_API_URL}/${currentStaff.id}`, values);
                setData(data.map(item => item.id === currentStaff.id ? response.data : item));
                message.success('Cập nhật nhân viên thành công');
            } else {
                const newStaff = { id: generateId(), ...values };
                const response = await axios.post(STAFF_API_URL, newStaff);
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
            fieldIds: staff.fieldIds,
            username: staff.username,
            password: staff.password
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (value) => {
        try {
            await axios.delete(`${STAFF_API_URL}/${value.id}`);
            setData(data.filter(item => item.id !== value.id));
            message.success('Xóa nhân viên thành công');
        } catch (error) {
            message.error('Lỗi khi xóa nhân viên');
            console.error('Error deleting staff:', error);
        }
    };

    const fetchData = async () => {
        const staffResponse = await axios.get(STAFF_API_URL);
        setData(staffResponse.data);
        const fieldResponse = await axios.get(FIELDS_API_URL);
        setFields(fieldResponse.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', },
        { title: 'Tên nhân viên', dataIndex: 'name', key: 'name', },
        { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username', },
        { title: 'Mật khẩu', dataIndex: 'password', key: 'password', },
        {
            title: 'Sân quản lý', dataIndex: 'fieldIds', key: 'fieldIds',
            render: (fieldIds) => Array.isArray(fieldIds) ? fieldIds.map(id => {
                const field = fields.find(f => f.id === id);
                return field ? field.courtName : 'Không rõ';
            }).join(', ') : 'Không có sân nào được phân công',
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
                        fieldIds: currentStaff.fieldIds,
                        username: currentStaff.username,
                        password: currentStaff.password
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
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Sân quản lý"
                        name="fieldIds"
                        rules={[{ required: true, message: 'Vui lòng chọn sân!' }]}
                    >
                        <Select mode="multiple" placeholder="Chọn sân">
                            {fields.map(field => (
                                <Select.Option key={field.id} value={field.id}>
                                    {field.courtName}
                                </Select.Option>
                            ))}
                        </Select>
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
