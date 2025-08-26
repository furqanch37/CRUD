import { Routes, Route } from "react-router-dom";
import CrudAntdTable from "./components/Antcrud/antcrud";
import CrudTable from "./components/Muicrud/crud";
import UserTable from "./components/Tailcrud/tailcrud";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout"; // ✅ import Layout
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with sidebar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <CrudAntdTable />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mui"
          element={
            <ProtectedRoute>
              <Layout>
                <CrudTable />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tailwind"
          element={
            <ProtectedRoute>
              <Layout>
                <UserTable />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
