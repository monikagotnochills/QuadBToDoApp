import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // State for form data, loading, and errors
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });

    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword(!showPassword);

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (password.length < 6) setPasswordStrength("Weak");
    else if (password.length < 10) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  // Validate form
  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required!";
    if (!formData.email.includes("@")) tempErrors.email = "Enter a valid email!";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters!";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // 🔗 Simulate API Call 
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("User registered:", formData);
      navigate("/login"); // Redirect on success
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ api: "Registration failed. Please try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          mt: 8,
          borderRadius: 3,
          textAlign: "center",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Join now and start managing your tasks efficiently.
        </Typography>

        {/* API Error Message */}
        {errors.api && <Typography color="error">{errors.api}</Typography>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full Name"
            name="fullName"
            variant="outlined"
            fullWidth
            required
            value={formData.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Password Strength Indicator */}
          {formData.password && (
            <Typography
              sx={{
                color:
                  passwordStrength === "Weak"
                    ? "red"
                    : passwordStrength === "Medium"
                    ? "orange"
                    : "green",
              }}
            >
              {passwordStrength} Password
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.2,
              transition: "all 0.3s",
              "&:hover": { backgroundColor: "#1976d2", transform: "scale(1.03)" },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: "bold",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
