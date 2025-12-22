"use client";

import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
  firstName?: string;
  lastName?: string;
}

interface TopBarProps {
  drawerWidth: number;
  rightDrawerWidth?: number;
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  onMobileMenuClick?: () => void;
  user?: User;
  isLoading?: boolean;
}

export default function TopBar({
  drawerWidth,
  rightDrawerWidth = 0,
  leftContent,
  centerContent,
  rightContent,
  onMobileMenuClick,
  user,
  isLoading = false,
}: TopBarProps) {
  const getInitials = (firstName?: string, lastName?: string): string => {
    const firstInitial = firstName ? firstName[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          xs: "100%",
          sm: `calc(100% - ${drawerWidth}px - ${rightDrawerWidth}px)`,
        },
        ml: { xs: 0, sm: `${drawerWidth}px` },
        mr: { xs: 0, sm: `${rightDrawerWidth}px` },
        borderBottom: "1px solid #e0e0e0",
        bgcolor: "#F2F6FB",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pl: 2,
          pr: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="default"
            edge="start"
            sx={{ display: { sm: "none" } }}
            onClick={onMobileMenuClick}
          >
            <MenuIcon />
          </IconButton>
          {leftContent}
        </Box>

        <Box>{centerContent}</Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {rightContent}
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            user && (
              <Avatar>
                <AvatarFallback className="bg-[#C20002] text-white">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}