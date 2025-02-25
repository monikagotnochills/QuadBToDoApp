import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, selectToDoTasks } from "../redux/Task/taskSlice.js";
import TaskCard from "../components/TaskCard.jsx";
import UpdateTask from "../components/UpdateTask.jsx";
import InputTask from "../components/InputTask.jsx";

import { Box, Typography, Grid, Dialog, Slide, TextField, Paper } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

// Smooth modal transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Todo() {
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const tasks = useSelector(selectToDoTasks);
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

  // Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ListIcon color="primary" /> Todo Tasks ({filteredTasks.length})
        </Typography>
        <InputTask />
      </Box>

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
        <SearchIcon sx={{ color: "gray", mr: 1 }} />
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search Todo Tasks..."
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
            No pending tasks.
          </Typography>
        )}
      </Grid>

      {/* Task Modal */}
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        onClose={handleCloseEditModal}
        maxWidth="sm"
        fullWidth
      >
        <UpdateTask taskToUpdate={taskToUpdate} handleCloseEditModal={handleCloseEditModal} />
      </Dialog>
    </Box>
  );
}

export default Todo;
