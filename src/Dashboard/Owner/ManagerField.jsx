import { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  message,
  Form,
  Modal,
  Popconfirm,
  Tag,
} from "antd";
import PropTypes from "prop-types";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

const ManagerField = () => {
  const [fields, setFields] = useState([]);
  const [setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await api.get(`/location/owner/${user.id}`);
        const sortedData = response.data.courts.sort((a, b) => {
          if (a.status === "ACTIVE" && b.status !== "ACTIVE") {
            return -1;
          } else if (a.status !== "ACTIVE" && b.status === "ACTIVE") {
            return 1;
          } else {
            return 0;
          }
        });
        setFields(sortedData);
      } catch (error) {
        console.error("Error fetching fields:", error);
        setFields([]);
      }
    };

    fetchFields();
  }, [user.id]);

  const edit = (record) => {
    form.setFieldsValue({
      id: record.id,
      name: record.name,
    });
    setIsModalOpen(true);
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
    setIsModalOpen(false);
    form.resetFields();
  };

  const createField = async (values) => {
    try {
      const response = await api.post("/court", {
        name: values.name,
      });
      setFields([...fields, response.data]);
      setShowForm(false);
      form.resetFields();
      message.success("Tạo sân thành công");
    } catch (error) {
      console.error("Error creating field:", error);
      message.error("Lỗi khi tạo sân");
    }
  };

  const save = async (values) => {
    try {
      const res = await api.put(`/court/${values.id}`, {
        name: values.name,
      });

      setFields((oldItems) =>
        oldItems.map((oldItem) =>
          oldItem.id === res.data.id ? res.data : oldItem
        )
      );

      setIsModalOpen(false);
      message.success("Cập nhật sân thành công");
    } catch (error) {
      console.log(error);
      message.error("Lỗi khi cập nhật sân");
    }
  };

  const deleteField = async (courtId) => {
    try {
      await api.delete(`/court/${courtId}`);
      setFields(fields.filter((item) => item.id !== courtId));
      message.success("Xóa sân thành công");
    } catch (err) {
      console.error("Error deleting field:", err);
      message.error("Lỗi khi xóa sân");
    }
  };

  const columns = [
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (e) => <Tag color={e === "ACTIVE" ? "green" : "red"}>{e}</Tag>,
      sorter: (a, b) => {
        if (a.status === "ACTIVE" && b.status !== "ACTIVE") {
          return -1;
        } else if (a.status !== "ACTIVE" && b.status === "ACTIVE") {
          return 1;
        } else {
          return 0;
        }
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sân này không?"
            onConfirm={() => deleteField(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Button type="primary" onClick={() => edit(record)}>
            Sửa
          </Button>
        </>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
    };
  });

  return (
    <>
      <Button
        onClick={() => {
          setShowForm(true);
          form.resetFields(); // Reset form khi thêm mới
        }}
        style={{ width: "fit-content", marginBottom: "20px" }}
      >
        Tạo sân mới
      </Button>

      <Modal
        title="Tạo sân mới"
        onCancel={() => {
          setShowForm(false);
          form.resetFields();
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setShowForm(false);
              form.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button key="create" type="primary" onClick={() => form.submit()}>
            Tạo
          </Button>,
        ]}
        open={showForm}
      >
        <Form form={form} layout="vertical" onFinish={createField}>
          <Form.Item
            name="name"
            label="Tên sân"
            rules={[{ required: true, message: "Vui lòng nhập tên sân!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={fields}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey="id" // Ensure rowKey matches your data
          pagination={{ onChange: cancel }}
        />
      </Form>

      <Modal
        title="Sửa thông tin sân"
        visible={isModalOpen}
        onCancel={cancel}
        footer={[
          <Button key="cancel" onClick={cancel}>
            Hủy
          </Button>,
          <Button key="save" onClick={() => form.submit()}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={save}>
          <Form.Item name="id" hidden />
          <Form.Item
            name="name"
            label="Tên sân"
            rules={[{ required: true, message: "Vui lòng nhập tên sân!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <Input type="number" /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Vui lòng nhập ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

EditableCell.propTypes = {
  editing: PropTypes.bool.isRequired,
  dataIndex: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default ManagerField;
