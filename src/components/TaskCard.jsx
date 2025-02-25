import { CalendarMonth, Edit, Delete } from "@mui/icons-material";
import { Card, CardContent, Typography, Chip, Box, IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";

const TaskCard = ({ task, handleOpenEditModal, handleDeleteTask }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "0.4s ease-in-out",
        backdropFilter: "blur(8px)",
        background:
          task.completed
            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))"
            : "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent>
        {/* Task Status Label */}
        <Box mb={2}>
          <Chip
            label={task.completed ? "Completed" : "Pending"}
            color={task.completed ? "success" : "error"}
            sx={{ fontWeight: "bold", fontSize: 12, px: 1.5, py: 0.5 }}
          />
        </Box>

        {/* Task Title */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            color: task.completed ? "#065F46" : "#7F1D1D",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Typography>

        {/* Task Description */}
        <Typography variant="body2" color="text.secondary" mt={1} sx={{ minHeight: 50 }}>
          {task.description}
        </Typography>

        {/* Task Deadline */}
        <Stack direction="row" alignItems="center" mt={2} spacing={1} color="text.secondary">
          <CalendarMonth fontSize="small" sx={{ color: "#4B5563" }} />
          <Typography variant="body2" fontWeight="bold">
            {new Date(task.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        </Stack>

        {/* Action Buttons with Tooltips */}
        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
          <Tooltip title="Edit Task" arrow>
            <IconButton
              onClick={() => handleOpenEditModal(task)}
              sx={{
                color: "#1D4ED8",
                transition: "0.3s",
                "&:hover": { color: "#2563EB", backgroundColor: "rgba(29, 78, 216, 0.1)" },
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Task" arrow>
            <IconButton
              onClick={() => handleDeleteTask(task.id)}
              sx={{
                color: "#DC2626",
                transition: "0.3s",
                "&:hover": { color: "#EF4444", backgroundColor: "rgba(220, 38, 38, 0.1)" },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
