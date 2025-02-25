import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/Task/taskSlice.js";
import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  Slide,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

// Slide-in animation for modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function InputTask() {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    deadline: "",
    completed: false,
    important: false,
  });

  const dispatch = useDispatch();

  const handleSaveTask = () => {
    dispatch(addTask(newTask));
    setNewTask({
      id: uuidv4(),
      title: "",
      description: "",
      deadline: "",
      completed: false,
      important: false,
    });
    setShowModal(false);
  };

  return (
    <Box>
      {/* Floating Add Task Button */}
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => setShowModal(true)}
        sx={{
          background: "#4F46E5",
          borderRadius: "10px",
          textTransform: "none",
          fontSize: 16,
          fontWeight: "bold",
          padding: "12px 28px",
          boxShadow: "0px 4px 12px rgba(79, 70, 229, 0.4)",
          "&:hover": {
            background: "#4338CA",
            transform: "scale(1.05)",
            transition: "0.2s ease-in-out",
          },
        }}
      >
        Add Task
      </Button>

      {/* Dialog (Modal) for Adding Task */}
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            padding: "24px",
            background: "#ffffff",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        {/* Modal Header */}
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#1F2937",
            textAlign: "center",
            position: "relative",
          }}
        >
          📝 Add New Task
          <IconButton
            onClick={() => setShowModal(false)}
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Form Content */}
        <DialogContent>
          <Stack spacing={3}>
            {/* Task Title */}
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  background: "#F9FAFB",
                  "&.Mui-focused fieldset": { borderColor: "#6366F1" },
                },
              }}
            />

            {/* Task Description */}
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  background: "#F9FAFB",
                  "&.Mui-focused fieldset": { borderColor: "#6366F1" },
                },
              }}
            />

            {/* Task Deadline */}
            <TextField
              label="Deadline"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  background: "#F9FAFB",
                  "&.Mui-focused fieldset": { borderColor: "#6366F1" },
                },
              }}
            />

            {/* Task Status & Importance */}
            <Box display="flex" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Switch
                    checked={newTask.completed}
                    onChange={(e) => setNewTask({ ...newTask, completed: e.target.checked })}
                    sx={{
                      "& .MuiSwitch-thumb": { backgroundColor: "#10B981" },
                      "&.Mui-checked .MuiSwitch-track": { backgroundColor: "#10B981" },
                    }}
                  />
                }
                label={<Typography fontSize={14}>Completed</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={newTask.important}
                    onChange={(e) => setNewTask({ ...newTask, important: e.target.checked })}
                    sx={{
                      "& .MuiSwitch-thumb": { backgroundColor: "#EF4444" },
                      "&.Mui-checked .MuiSwitch-track": { backgroundColor: "#EF4444" },
                    }}
                  />
                }
                label={<Typography fontSize={14}>Important</Typography>}
              />
            </Box>
          </Stack>
        </DialogContent>

        {/* Modal Action Buttons */}
        <DialogActions sx={{ paddingBottom: "20px", justifyContent: "center" }}>
          <Button
            onClick={() => setShowModal(false)}
            sx={{
              color: "#6B7280",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(107, 114, 128, 0.1)",
                transform: "scale(1.05)",
                transition: "0.2s",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveTask}
            sx={{
              background: "#4F46E5",
              textTransform: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(79, 70, 229, 0.4)",
              "&:hover": {
                background: "#4338CA",
                transform: "scale(1.05)",
                transition: "0.2s ease-in-out",
              },
            }}
          >
            Save Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default InputTask;
