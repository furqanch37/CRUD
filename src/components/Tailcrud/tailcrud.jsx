import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
    { id: 2, name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
    { id: 3, name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },
    { id: 4, name: "Whitney Francis", title: "Copywriter", email: "whitney.francis@example.com", role: "Admin" },
  ]);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", title: "", email: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const role = localStorage.getItem("role"); // "admin" or "user"

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update user
  // Add or Update user
const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => { // simulate processing or API call
    if (isEditing) {
      setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      toast.info("User updated successfully!");
      setIsEditing(false);
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
      toast.success("User added successfully!");
    }

    setFormData({ id: null, name: "", title: "", email: "", role: "" });
    setShowForm(false);
    setLoading(false);
  }, 1000);
};

// Final delete after confirmation
const confirmDelete = () => {
  setLoading(true);

  setTimeout(() => {
    setUsers(users.filter((user) => user.id !== deleteUserId));
    toast.success("User deleted!");
    setDeleteUserId(null);
    setLoading(false);
  }, 1000);
};

  // Edit user
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setShowForm(true);
  };

  // Delete user
  // Delete user
 const handleDelete = (id) => {
  setDeleteUserId(id);
};


// Cancel delete
const cancelDelete = () => {
  setDeleteUserId(null);
};

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({ id: null, name: "", title: "", email: "", role: "" });
            setShowForm(true);
          }}
          className={`px-4 py-2 rounded-md shadow ${
  role !== "admin"
    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
    : "text-white"
}`}
style={role === "admin" ? { backgroundColor: "#1976d2" } : {}}
          disabled={role !== "admin"}
        >
          Add user
        </button>

      </div>
{/* Modal */}
{showForm && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {isEditing ? "Edit User" : "Add New User"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700"
          >
            {isEditing ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


{deleteUserId && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center  bg-black/20">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Confirm Deletion
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={cancelDelete}
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

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Title</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Role</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                <td className="py-3 px-4 text-gray-500">{user.title}</td>
                <td className="py-3 px-4 text-gray-500">{user.email}</td>
                <td className="py-3 px-4 text-gray-500">{user.role}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleEdit(user)}
                    className={`font-medium mr-3 ${role !== "admin"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-indigo-600 hover:text-indigo-800"
                      }`}
                    disabled={role  !== "admin"}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className={`font-medium ${role !== "admin"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:text-red-800"
                      }`}
                    disabled={role !== "admin"}
                  >
                    Delete
                  </button>




                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[10000]">
    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
)}

    </div>
  );
};

export default UserTable;
