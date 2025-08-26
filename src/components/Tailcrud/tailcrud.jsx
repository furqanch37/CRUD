import React, { useState , useEffect} from "react";
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

  const [formData, setFormData] = useState({ id: null, name: "", title: "", email: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
  const handleSubmit = (e) => {
    e.preventDefault();

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
  if (window.confirm("Are you sure you want to delete this user?")) {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted!");
  }
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
  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
  disabled={role !== "admin"} // only admin can add
>
  Add user
</button>

      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
  className="text-indigo-600 hover:text-indigo-800 font-medium mr-3"
  disabled={role !== "admin"} // only admin can edit
>
  Edit
</button>
<button
  onClick={() => handleDelete(user.id)}
  className="text-red-600 hover:text-red-800 font-medium"
  disabled={role !== "admin"} // only admin can delete
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

      {/* Bottom Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
        >
          Go to Ant Design
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

export default UserTable;
