import { Button, Checkbox, Form, Input, Modal, Table } from 'antd'
import axios from 'axios';
import { useEffect, useState } from 'react'

function Category() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const onFinish = async (values) => {
        console.log('Success:', values);
        const respoms = await axios.post("https://665d6f09e88051d604068e77.mockapi.io/category", values);
        console.log(respoms);
        setData([...data, respoms.data]);
        setIsModalOpen(false);

    }
    const handleDelete = async (value) => {
        const Delete = await axios.delete(`https://665d6f09e88051d604068e77.mockapi.io/category/${value.id}`);
        setData(data.filter((data) => data.id != value.id));
        console.log(value);
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const [data, setData] = useState([]);
    const fetchdata = async () => {
        const respon = await axios.get("https://665d6f09e88051d604068e77.mockapi.io/category");
        console.log(respon.data);
        setData(respon.data);


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
            render: (value) =>
                <Button onClick={() => handleDelete(value)} danger type='primary'>
                    Delete
                </Button>
            ,
            // key: 'id',
        },
    ];
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                footer={false}
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="categoryName"
                        name="categoryName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={data} columns={columns} />;
        </div>
    )
}
export default Category;