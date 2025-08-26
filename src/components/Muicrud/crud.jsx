import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Fab,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

export default function CrudTable() {
  const [rows, setRows] = useState([
    { id: 1, name: "Zachary Jordan", age: 25, joinDate: "2024-09-28", department: "Development" },
    { id: 2, name: "Callie Caldwell", age: 36, joinDate: "2025-04-09", department: "Development" },
    { id: 3, name: "Alma Hoffman", age: 19, joinDate: "2024-12-23", department: "Finance" },
    { id: 4, name: "Bobby Nash", age: 28, joinDate: "2025-05-25", department: "Market" },
    { id: 5, name: "Mable Huff", age: 23, joinDate: "2025-01-22", department: "Market" },
  ]);

  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
const [confirmOpen, setConfirmOpen] = useState(false);
const role = localStorage.getItem("role"); // "admin" or "user"

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);
  // Open Modal
  const handleOpen = (row = null) => {
    setEditRow(row);
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
    setEditRow(null);
  };

  // Save Changes (Edit / Add)
  const handleSave = () => {
    if (editRow.id) {
      setRows(rows.map((r) => (r.id === editRow.id ? editRow : r)));
    } else {
      setRows([...rows, { ...editRow, id: rows.length + 1 }]);
    }
    handleClose();
  };

  // Delete Row
 // Ask before deleting
const confirmDelete = (id) => {
  setDeleteId(id);
  setConfirmOpen(true);
};

// Final delete after confirmation
const handleDelete = () => {
  setRows(rows.filter((row) => row.id !== deleteId));
  setConfirmOpen(false);
  setDeleteId(null);
};

  return (
  <div style={{ width: "100%", maxWidth: "1300px",  minHeight: "100vh", padding: 20, boxSizing: "border-box" }}>
    <div style={{ display:"flex", justifyContent: "flex-end", marginBottom: 10 }}>
     <Button
  variant="contained"
  startIcon={<Add />}
  onClick={() =>
    handleOpen({ name: "", age: "", joinDate: "", department: "" })
  }
  disabled={role !== "admin"} // only admin can add
>
  Add New
</Button>

    </div>

    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Age</b></TableCell>
            <TableCell><b>Join Date</b></TableCell>
            <TableCell><b>Department</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.joinDate}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>
               <IconButton onClick={() => handleOpen(row)} disabled={role !== "admin"}>
  <Edit />
</IconButton>
<IconButton
  color="error"
  onClick={() => confirmDelete(row.id)}
  disabled={role !== "admin"}
>
  <Delete />
</IconButton>


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 

      {/* Add New Row Button
      <Fab
        color="primary"
        onClick={() => handleOpen({ name: "", age: "", joinDate: "", department: "" })}
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <Add />
      </Fab> */}

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editRow?.id ? "Edit Empolyee" : "Add Empolyee"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editRow?.name || ""}
            onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={editRow?.age || ""}
            onChange={(e) => setEditRow({ ...editRow, age: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Join Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editRow?.joinDate || ""}
            onChange={(e) => setEditRow({ ...editRow, joinDate: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department"
            fullWidth
            value={editRow?.department || ""}
            onChange={(e) => setEditRow({ ...editRow, department: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary" disabled={role !== "admin"}>
  Save
</Button>

        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
<Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    Are you sure you want to delete this employee?
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmOpen(false)} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleDelete} color="error" variant="contained">
      Delete
    </Button>
  </DialogActions>
</Dialog>

       <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
        >
          Go to Ant-Design
        </button>
        <button
          onClick={() => navigate("/tailwind")}
          className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700"
        >
          Go to Tailwind
        </button>
      </div>
    </div>
  );
}
