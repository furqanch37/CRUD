import React from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../SideBar/sidebar"; // make sure Sidebar.jsx is in the same folder or adjust the path
import Navbar from "../Navbar/navbar";
export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            p: 3,
            mt: 8, // spacing to avoid overlap with Navbar
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
