import { Box } from "@mui/material";
import Sidebar from "../SideBar/sidebar";
import Navbar from "../Navbar/navbar";

export default function Layout({ children, isBlurred }) {
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      {/* Full-page blur overlay */}
      {isBlurred && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.1)",
            zIndex: 0, // below modal
          }}
        />
      )}

      <Box className="sidebar">
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Box className="navbar">
          <Navbar />
        </Box>

        <Box component="main" sx={{ flexGrow: 1, minHeight: "100vh", p: 3, mt: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
