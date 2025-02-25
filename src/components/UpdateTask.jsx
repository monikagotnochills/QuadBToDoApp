import React, { useState, useEffect } from "react";
import { updateTask } from "../redux/Task/taskSlice.js";
import { useDispatch } from "react-redux";
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Checkbox, FormControlLabel, Button,
  Grid, Card, CardContent, Typography, IconButton, Stack, useTheme
} from "@mui/material";
import { Close, Save, EventNote, Star, StarBorder, DarkMode, LightMode } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled Dialog for dynamic light/dark mode
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 18,
    background: theme.palette.mode === "dark" ? "rgba(20, 20, 20, 0.85)" : "rgba(240, 248, 255, 0.75)", 
    backdropFilter: "blur(14px)",
    boxShadow: theme.palette.mode === "dark" ? "0px 10px 25px rgba(0, 0, 0, 0.6)" : "0px 10px 25px rgba(0, 0, 0, 0.12)",
  },
}));

const UpdateTask = ({ taskToUpdate, handleCloseEditModal }) => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Detect current theme
  const [darkMode, setDarkMode] = useState(theme.palette.mode === "dark");

  const [updatedTask, setUpdatedTask] = useState({
    id: taskToUpdate.id,
    title: taskToUpdate.title,
    description: taskToUpdate.description,
    deadline: taskToUpdate.deadline,
    completed: taskToUpdate.completed,
    important: taskToUpdate.important,
  });

  useEffect(() => {
    setDarkMode(theme.palette.mode === "dark");
  }, [theme.palette.mode]);

  const handleSaveChanges = () => {
    dispatch(updateTask({ id: updatedTask.id, updatedTask }));
    handleCloseEditModal();
  };

  return (
    <StyledDialog open onClose={handleCloseEditModal} fullWidth maxWidth="sm">
      {/* Dialog Title */}
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: darkMode ? "#E0E0E0" : "#333" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: darkMode ? "#90CAF9" : "#2A2A72" }}>
          ✍ Edit Task
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: darkMode ? "#FBC02D" : "#555" }}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton onClick={handleCloseEditModal} sx={{ color: "#777", transition: "0.3s", "&:hover": { color: "#FF3D57" } }}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 4,
            boxShadow: 3,
            p: 3,
            background: darkMode ? "#1E1E1E" : "#FAFAFA",
            color: darkMode ? "#E0E0E0" : "#333",
          }}
        >
          <CardContent>
            <Grid container spacing={3}>
              {/* Task Title */}
              <Grid item xs={12}>
                <TextField
                  label="Task Title"
                  fullWidth
                  value={updatedTask.title}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                  margin="dense"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <EventNote sx={{ color: darkMode ? "#BB86FC" : "#7C83FD", marginRight: "8px" }} />,
                  }}
                  InputLabelProps={{ sx: { color: darkMode ? "#BBB" : "#555" } }}
                />
              </Grid>

              {/* Deadline */}
              <Grid item xs={12}>
                <TextField
                  label="Deadline"
                  type="date"
                  fullWidth
                  value={updatedTask.deadline}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, deadline: e.target.value })}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: true, sx: { color: darkMode ? "#BBB" : "#555" } }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={updatedTask.description}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ sx: { color: darkMode ? "#BBB" : "#555" } }}
                />
              </Grid>

              {/* Checkbox Section */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={updatedTask.completed}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, completed: e.target.checked })}
                        sx={{
                          color: "#4CAF50",
                          "&.Mui-checked": { color: "#2E7D32" },
                        }}
                      />
                    }
                    label={<Typography variant="body1" sx={{ color: darkMode ? "#E0E0E0" : "#333" }}>Completed</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={updatedTask.important}
                        icon={<StarBorder sx={{ color: darkMode ? "#BBB" : "#555" }} />}
                        checkedIcon={<Star sx={{ color: "#FFD700" }} />}
                        onChange={(e) => setUpdatedTask({ ...updatedTask, important: e.target.checked })}
                      />
                    }
                    label={<Typography variant="body1" sx={{ color: darkMode ? "#E0E0E0" : "#333" }}>Important</Typography>}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions sx={{ padding: 2, display: "flex", justifyContent: "space-between" }}>
        <Button 
          onClick={handleSaveChanges} 
          variant="contained" 
          sx={{ 
            background: "linear-gradient(45deg, #6A11CB, #2575FC)", 
            color: "#fff", 
            fontWeight: "bold", 
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": { background: "#2575FC" }
          }}
          startIcon={<Save />}
        >
          Save Changes
        </Button>
        <Button 
          onClick={handleCloseEditModal} 
          variant="outlined" 
          sx={{ 
            borderColor: "#D32F2F", 
            color: "#D32F2F", 
            fontWeight: "bold", 
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": { background: "#D32F2F", color: "#fff" }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default UpdateTask
