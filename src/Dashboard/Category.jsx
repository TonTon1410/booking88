import { Button, Form, Input, Modal, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Category() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [data, setData] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentCategory(null);
    };

    const onFinish = async (values) => {
        if (isEditMode) {
            const response = await axios.put(`https://665d6f09e88051d604068e77.mockapi.io/category/${currentCategory.id}`, values);
            setData(data.map(item => item.id === currentCategory.id ? response.data : item));
        } else {
            const response = await axios.post("https://665d6f09e88051d604068e77.mockapi.io/category", values);
            setData([...data, response.data]);
        }
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentCategory(null);
    };

    const handleEdit = (category) => {
        setCurrentCategory(category);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (value) => {
        await axios.delete(`https://665d6f09e88051d604068e77.mockapi.io/category/${value.id}`);
        setData(data.filter(item => item.id !== value.id));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fetchdata = async () => {
        const response = await axios.get("https://665d6f09e88051d604068e77.mockapi.io/category");
        setData(response.data);
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'categoryName',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Action',
            render: (value) => (
                <div>
                    <Button onClick={() => handleEdit(value)} type='primary' style={{ marginRight: '8px' }}>
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(value)} danger type='primary'>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Add Category
            </Button>
            <Modal
                footer={false}
                title={isEditMode ? "Edit Category" : "Add Category"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={currentCategory ? { categoryName: currentCategory.categoryName } : {}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Category Name"
                        name="categoryName"
                        rules={[{ required: true, message: 'Please input the category name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={data} columns={columns} />
        </div>
    );
}

export default Category;
