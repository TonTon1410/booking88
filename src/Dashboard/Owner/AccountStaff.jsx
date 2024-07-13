import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm, Modal, Form, Input, Tag } from 'antd';
import api from '../../config/axios';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';

const AccountStaff = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [form] = useForm();
    const [editingAccount, setEditingAccount] = useState(null);
    const user = useSelector(selectUser);
    console.log(user);

    const fetchAccounts = async () => {
        try {
            const response = await api.get(`/owner/accountss/${user.id}`);
            setAccounts(response.data);
            console.log(response.data);
        } catch (error) {
            message.error('Lỗi khi lấy danh sách tài khoản');
            console.error('Error fetching accounts:', error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const onFinish = async (value) => {
        console.log(value);
        if (!editingAccount) {
            // Thêm mới tài khoản
            try {
                const response = await api.post('/owner/account', value);
                console.log(response.data);
                setAccounts([...accounts, response.data]);
                setIsOpen(false); // Đóng Modal sau khi hoàn thành
                form.resetFields(); // Reset form sau khi hoàn thành
                message.success('Thêm tài khoản thành công');
            } catch (e) {
                console.log(e);
                message.error(e.response.data);
            }
        } else {
            // Cập nhật tài khoản
            try {
                const res = await api.put(`/owner/account/${editingAccount.id}`, value);
                console.log("res: ", res.data);
                setAccounts((oldData) => (
                    oldData.map((oldItem) => {
                        if (oldItem.id === editingAccount.id) {
                            return { ...oldItem, ...value }; // Chỉ cập nhật các trường name, phone, email
                        } else {
                            return oldItem;
                        }
                    })
                ));
                setIsOpen(false); // Đóng Modal sau khi hoàn thành
                form.resetFields(); // Reset form sau khi hoàn thành
                setEditingAccount(null); // Đặt lại editingAccount
                message.success('Cập nhật tài khoản thành công');
            } catch (error) {
                console.log(error.message);
                message.error('Lỗi khi cập nhật tài khoản');
            }
        }
    };

    const handleDelete = async (values) => {
        try {
            const response = await api.delete(`/owner/${values.id}`);
            console.log(response.data)
            setAccounts(accounts.map(account => {
                if (account == values) {
                    return response.data
                } else {
                    return account
                }
            }))

            message.success('Xóa tài khoản thành công');
        } catch (error) {
            message.error('Lỗi khi xóa tài khoản');
            console.error('Error deleting account:', error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Location ID',
            dataIndex: 'locationId',
            key: 'locationId',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (e) => {
                if (e === "DELETED") {
                    return <Tag color='red'>{e}</Tag>
                }
                else {
                    return <Tag color='green'>{e}</Tag>
                }
            },
            defaultSortOrder: 'ACTIVE',
            sorter: (a) => {
                console.log(a.status)
                if (a.status === "ACTIVE") return true;
            },
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa tài khoản này không?"
                        onConfirm={() => handleDelete(record)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                    <Button type="primary" onClick={() => {
                        form.setFieldsValue({ name: record.name, phone: record.phone, email: record.email }); // Set giá trị cho form để sửa
                        setIsOpen(true); // Mở Modal
                        setEditingAccount(record); // Đặt tài khoản đang chỉnh sửa
                    }}>
                        Sửa
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button
                style={{ width: "fit-content", marginBottom: "20px", background: '', }}
                onClick={() => {
                    form.resetFields(); // Reset form khi thêm mới
                    setIsOpen(true);
                    setEditingAccount(null); // Đặt lại giá trị chỉnh sửa khi thêm mới
                }}>Thêm nhân viên mới</Button>
            <Modal open={isOpen} onCancel={() => setIsOpen(false)} title={editingAccount ? 'Sửa tài khoản' : 'Thêm tài khoản nhân viên'} footer={null}>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={onFinish}>
                    <Form.Item name="locationId" label="Location ID" rules={[
                        {
                            required: true,
                            message: "Please input the location ID!",
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="Tên tài khoản" rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại" rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    {!editingAccount && (
                        <Form.Item name="password" label="Mật khẩu" rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}>
                            <Input.Password />
                        </Form.Item>
                    )}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                dataSource={accounts}
                columns={columns}
                rowKey="id"
                bordered
            />
        </>
    );
};

export default AccountStaff;
