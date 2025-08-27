import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Modal, Form, Layout, Spin } from "antd";
import "antd/dist/reset.css";
import "./styles.css";
const CrudAntdTable = () => {
  const [data, setData] = useState([
    { id: 1, name: "Edward 0", age: 32, address: "London Park no. 0" },
    { id: 2, name: "Edward 1", age: 32, address: "London Park no. 1" },
    { id: 3, name: "Edward 2", age: 32, address: "London Park no. 2" },
    { id: 4, name: "Edward 3", age: 32, address: "London Park no. 3" },
  ]);

  const [loading, setLoading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const role = localStorage.getItem("role"); // "admin" or "user"
  const [deleteId, setDeleteId] = useState(null); // ID of row to delete
const [confirmOpen, setConfirmOpen] = useState(false); // controls visibility of confirmation


const handleDelete = (id) => {
  setDeleteId(id);
  setConfirmOpen(true); // open delete confirmation modal
};

const confirmDelete = () => {
  setLoading(true);
  setTimeout(() => {   // simulate async
    setData((prev) => prev.filter((item) => item.id !== deleteId));
    setConfirmOpen(false);
    setDeleteId(null);
    setLoading(false); // ✅ stop spinner
  }, 1000);
};

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
    setLoading(true);
    setTimeout(() => {   // simulate async
      if (editingRow) {
        setData((prev) =>
          prev.map((item) =>
            item.id === editingRow.id ? { ...editingRow, ...values } : item
          )
        );
      } else {
        setData((prev) => [
          ...prev,
          { ...values, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
        ]);
      }
      setIsModalOpen(false);
      setEditingRow(null);
      form.resetFields();
      setLoading(false); // ✅ stop spinner
    }, 1000);
  });
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
  <div>
  {loading && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    }}
  >
    <Spin size="large" tip="Processing..." />
  </div>
)}

    <Layout isBlurred={isModalOpen || confirmOpen}  className="all">
      {/* Navbar, Sidebar, Table, Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button type="primary" onClick={() => openModal()} disabled={role !== "admin"}>
          Add New
        </Button>
      </div>

      <Table dataSource={data} columns={columns} rowKey="id" bordered />
    

    {/* Modals OUTSIDE Layout so they stay clear */}
 {isModalOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        {editingRow ? "Edit Record" : "Add Record"}
      </h2>

      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please input age!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input address!" }]}
        >
          <Input />
        </Form.Item>
      </Form>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{confirmOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Confirm Deletion
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this record? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirmOpen(false)}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </Layout>
  </div>
);

}
export default CrudAntdTable;
