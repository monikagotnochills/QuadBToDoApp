import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import UpdateTask from "./UpdateTask";
import InputTask from "./InputTask";
import { deleteTask } from "../redux/Task/taskSlice";

import {
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
  TextField,
  Slide,
  CircularProgress,
} from "@mui/material";
import { Add, Close, Search, Cloud, ErrorOutline } from "@mui/icons-material";
import { motion } from "framer-motion";

// Smooth modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TaskList() {
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});
  const [openAddTask, setOpenAddTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const weatherFetched = useRef(false); // Prevent unnecessary re-fetching
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleOpenEditModal = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleCloseEditModal = () => {
    setTaskToUpdate({});
    setShowModal(false);
  };

  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  // Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if any task is related to outdoor activities
  const isOutdoorTask = filteredTasks.some((task) =>
    /(outdoor|park|walk|run|trip|hiking|cycling|outside)/i.test(task.title)
  );

  // Fetch weather data if there's an outdoor-related task
  useEffect(() => {
    if (isOutdoorTask && !weatherFetched.current) {
      setLoadingWeather(true);
      setWeatherError(null);
      fetch("https://wttr.in/?format=%C+%t")
        .then((response) => response.text())
        .then((data) => {
          setWeather(data);
          setLoadingWeather(false);
          weatherFetched.current = true; // Prevent re-fetching
        })
        .catch(() => {
          setWeatherError("Failed to load weather data.");
          setLoadingWeather(false);
        });
    }
  }, [isOutdoorTask]); // Runs only when `isOutdoorTask` changes

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          📌 All Tasks ({filteredTasks.length})
        </Typography>

        {/* Add Task Button */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAddTask}
          sx={{
            background: "linear-gradient(45deg, #6A11CB, #2575FC)",
            color: "#fff",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": { background: "#2575FC" },
          }}
        >
          Add Task
        </Button>
      </Box>

      {/* Weather Information for Outdoor Tasks */}
      {isOutdoorTask && (
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            mb: 3,
            borderRadius: "10px",
            boxShadow: 2,
            background: "#f1f5f9",
          }}
        >
          <Cloud sx={{ color: "gray", fontSize: 30, mr: 2 }} />
          {loadingWeather ? (
            <CircularProgress size={25} />
          ) : weatherError ? (
            <Typography sx={{ color: "red", display: "flex", alignItems: "center" }}>
              <ErrorOutline sx={{ mr: 1 }} /> {weatherError}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>🌤️ {weather}</Typography>
          )}
        </Paper>
      )}

      {/* Search Bar */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "5px 15px",
          mb: 3,
          borderRadius: "10px",
          boxShadow: 2,
        }}
      >
        <Search sx={{ color: "gray", mr: 1 }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search tasks..."
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ "& .MuiInput-underline:before": { borderBottom: "none" } }}
        />
      </Paper>

      {/* Task List */}
      <Grid container spacing={3}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <TaskCard
                  task={task}
                  handleOpenEditModal={handleOpenEditModal}
                  handleDeleteTask={handleDeleteTask}
                />
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%", mt: 2 }}>
            No tasks found.
          </Typography>
        )}
      </Grid>

      {/* Update Task Modal */}
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        onClose={handleCloseEditModal}
        maxWidth="sm"
        fullWidth
      >
        <UpdateTask taskToUpdate={taskToUpdate} handleCloseEditModal={handleCloseEditModal} />
      </Dialog>

      {/* Add Task Modal */}
      <Dialog open={openAddTask} onClose={handleCloseAddTask} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add New Task
          <IconButton onClick={handleCloseAddTask} sx={{ color: "#777" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <InputTask handleClose={handleCloseAddTask} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default TaskList;
