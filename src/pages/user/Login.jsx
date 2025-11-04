import { Container, Paper, Typography, Box, ToggleButtonGroup, ToggleButton, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [loginType, setLoginType] = useState("user");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginType === "admin") {
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("id", userId)
          .eq("password", password)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          login(data, "admin");
          navigate("/");
        } else {
          console.log("Invalid admin credentials");
        }
      } else {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .eq("password", password)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          login(data, "user");
          navigate("/");
        } else {
          console.log("User not found");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
  
   <Box
  sx={{
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg, #f4f6f8 0%, #e8ecf1 100%)",
    boxSizing: "border-box",
  }}
>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={loginType}
            exclusive
            onChange={(e, newType) => setLoginType(newType)}
            color="primary"
          >
            <ToggleButton value="user">User</ToggleButton>
            <ToggleButton value="admin">Admin</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={loginType === "admin" ? "Admin ID" : "User ID"}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
   
  );
  
}
