import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Brightness4, Brightness7, ChevronLeft, ChevronRight, Person } from "@mui/icons-material";
import { LayoutDashboard, Gauge, ClipboardCheck, NotebookPen } from "lucide-react";

const drawerWidth = 240;
const collapsedWidth = 80;

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("theme") === "dark");
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle Theme Change
  useEffect(() => {
    const root = document.documentElement;
    darkTheme ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle Login Menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) {
      navigate(path);
    }
  };

  // Sidebar Items
  const SidebarItems = [
    { text: "Dashboard", icon: <LayoutDashboard size={24} />, path: "/" },
    { text: "Important", icon: <Gauge size={24} />, path: "/important" },
    { text: "Completed", icon: <ClipboardCheck size={24} />, path: "/completed" },
    { text: "To-Do", icon: <NotebookPen size={24} />, path: "/todo" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)`,
          ml: `${sidebarOpen ? drawerWidth : collapsedWidth}px`,
          backgroundColor: darkTheme ? "#2c2c2c" : "#f5f5f5",
          color: darkTheme ? "#fff" : "#000",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Page Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {SidebarItems.find((item) => item.path === location.pathname)?.text || "Task Manager"}
          </Typography>

          {/* Dark Mode Toggle */}
          <Tooltip title="Toggle Dark Mode">
            <IconButton onClick={() => setDarkTheme(!darkTheme)} color="inherit">
              {darkTheme ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          {/* Login/Register Icon */}
          <Tooltip title="Account">
            <IconButton onClick={handleMenuClick} color="inherit">
              <Avatar sx={{ bgcolor: darkTheme ? "#777" : "#333", width: 32, height: 32 }}>
                <Person />
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Login Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose(null)} sx={{ mt: 1 }}>
            <MenuItem onClick={() => handleMenuClose("/login")}>Login</MenuItem>
            <MenuItem onClick={() => handleMenuClose("/register")}>Register</MenuItem>
            <MenuItem onClick={() => handleMenuClose("/")}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          transition: "all 0.3s ease-in-out",
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
            backgroundColor: darkTheme ? "#1e1e1e" : "#fff",
            color: darkTheme ? "#fff" : "#000",
          },
        }}
        open={sidebarOpen}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
          <Typography variant="h6" sx={{ display: sidebarOpen ? "block" : "none", transition: "all 0.3s ease-in-out" }}>
            📝 Task Manager
          </Typography>
          <IconButton onClick={toggleSidebar}>{sidebarOpen ? <ChevronLeft /> : <ChevronRight />}</IconButton>
        </Box>
        <Divider />

        <List>
          {SidebarItems.map((item, index) => (
            <ListItemButton key={index} href={item.path}>
              <ListItemIcon sx={{ color: darkTheme ? "#fff" : "#333" }}>{item.icon}</ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: darkTheme ? "#121212" : "#fafafa",
          height: "100vh",
          overflowY: "auto",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/important" element={<Important />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
