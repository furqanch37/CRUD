import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, Input } from "antd";

const CrudAntdTable = () => {
  const [data, setData] = useState([
    { id: 1, name: "Edward 0", age: 32, address: "London Park no. 0" },
    { id: 2, name: "Edward 1", age: 32, address: "London Park no. 1" },
    { id: 3, name: "Edward 2", age: 32, address: "London Park no. 2" },
    { id: 4, name: "Edward 3", age: 32, address: "London Park no. 3" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const role = localStorage.getItem("role"); // "admin" or "user"

const navigate = useNavigate();
  // Open Modal (Add or Edit)
  const openModal = (record = null) => {
    setEditingRow(record);
    setIsModalOpen(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);
  // Save Changes
  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingRow) {
        // Update existing row
        setData((prev) =>
          prev.map((item) =>
            item.id === editingRow.id ? { ...editingRow, ...values } : item
          )
        );
      } else {
        // Add new row
        setData((prev) => [
          ...prev,
          { ...values, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
        ]);
      }
      setIsModalOpen(false);
      setEditingRow(null);
      form.resetFields();
    });
  };

  // Delete row
// Delete row
const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this record?")) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }
};



  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Operation",
     render: (_, record) => (
  <>
    <Button type="link" onClick={() => openModal(record)} disabled={role !== "admin"}>
      Edit
    </Button>
    <Button type="link" danger onClick={() => handleDelete(record.id)} disabled={role !== "admin"}>
      Delete
    </Button>
  </>
)

    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
  <Button type="primary" onClick={() => openModal()} disabled={role !== "admin"}>
  Add New
</Button>

</div>

      <Table dataSource={data} columns={columns} rowKey="id" bordered />

     <Modal
  title={editingRow ? "Edit Record" : "Add Record"}
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  onOk={handleSave}
  okText="Save"
  okButtonProps={{ disabled: role !== "admin" }}
>

        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{message: "Please input age!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ message: "Please input address!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => navigate("/tailwind")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
        >
          Go to tailwind
        </button>
        <button
          onClick={() => navigate("/mui")}
          className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700"
        >
          Go to MUI
        </button>
      </div>
    </div>
  );
};

export default CrudAntdTable;
