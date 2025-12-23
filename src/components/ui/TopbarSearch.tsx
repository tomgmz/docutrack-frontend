"use client";

import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function FolderSearch() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 3,
        height: 44,
        width: 420,
        borderRadius: "999px",
        bgcolor: "transparent",
      }}
    >
      <SearchIcon sx={{ color: "#6B7280" }} />
      <InputBase
        placeholder="Search"
        sx={{
          flex: 1,
          fontSize: 15,
          color: "#111827",
          "& input::placeholder": {
            color: "#9CA3AF",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}
