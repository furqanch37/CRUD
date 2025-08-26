// Signup.jsx
import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



// ✅ Validation Schema
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

const onSubmit = (formData) => {
  const userWithRole = { ...formData, role: "user" };
  localStorage.setItem("user", JSON.stringify(userWithRole));
  toast.success("Signup successful! Please login.");
  navigate("/login");
};

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4">Signup</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth margin="normal" label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth margin="normal" label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth margin="normal" type="password" label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
