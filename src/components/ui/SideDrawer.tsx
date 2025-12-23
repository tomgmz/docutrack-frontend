"use client";

import React, { useState, ReactElement, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  Toolbar,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Skeleton,
} from "@mui/material";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/api";

export interface MenuItem {
  label: string;
  path: string;
  icon: ReactElement<SvgIconProps>;
}

interface SideDrawerProps {
  isLoading?: boolean;
  user: {
    authId: string;
    email?: string;
    role: string;
    username?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    suffix?: string;
    patientId?: string | null;
  };
  drawerWidth?: number;
  menuItems?: MenuItem[];
  actionButtons?: ReactElement<{ onClick?: () => void; label: string }>[];
  variant?: "permanent" | "temporary";
  open?: boolean;
  onClose?: () => void;
}

export default function SideDrawer({
  isLoading = false,
  user,
  drawerWidth = 300,
  menuItems = [],
  actionButtons = [],
  variant = "permanent",
  open = true,
  onClose,
}: SideDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const handleLogout = async () => {
    try {
      await api.delete(`/api/sessions/userSession`, {
        withCredentials: true,
      });

      // Optional: clear any client-side state here
      localStorage.clear();

      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (firstName?: string, lastName?: string): string => {
    const firstInitial = firstName ? firstName[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: "#F2F6FB" }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "flex-start", py: 2, pl: 2 }}>
        <div className="flex items-center gap-6">
          <Image
            src="/icon/docutrack-logo.png"
            alt="DocuTrack logo"
            width={50}
            height={50}
            priority
          />

          <Image
            src="/icon/docutracker-font-logo.png"
            alt="DocuTrack wordmark"
            width={150}
            height={40}
            priority
          />
        </div>
  
        {/* <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: "Fredoka, sans-serif",
            color: "#C20002",
            fontSize: "2rem",
            pb: 3,
          }}
        >
          OSMUN
        </Typography> */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 6 }}>
          {/* {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar>
              <AvatarFallback className="bg-[#C20002] text-white">
                {getInitials(user?.firstName, user?.lastName)}
              </AvatarFallback>
            </Avatar>
          )}
          <Box>
            {isLoading ? (
              <>
                <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" width={100} sx={{ fontSize: "0.875rem" }} />
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    fontFamily: "Didact Gothic, sans-serif",
                    fontSize: { xs: "1rem", md: "0.9rem" },
                    color: "black",
                    lineHeight: 1.2,
                  }}
                >
                  {user?.firstName || ""} {user?.middleName || ""}{" "}
                  {user?.lastName || ""}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Didact Gothic, sans-serif",
                    fontSize: { xs: "0.875rem", md: "0.75rem" },
                    color: "#8B9AB0",
                  }}
                >
                  {user?.role || ""} • {user?.username || ""}
                </Typography>
              </>
            )}
          </Box> */}
        </Box>
      </Toolbar>

      {/* <Divider sx={{ width: "80%", alignSelf: "center" }} /> */}

      {menuItems.length > 0 && (
        <List className="font-didact" sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.path);

            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                <Link
                  href={item.path}
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <ListItemButton
                    disableRipple
                    selected={isActive}
                    onClick={variant === "temporary" ? onClose : undefined}
                    sx={{
                      borderRadius: "999px",
                      px: 2.5,

                      backgroundColor: "transparent",
                      color: "#7A7A7A",

                      // HOVER
                      "&:hover": {
                        backgroundColor: "#EEEAE2",
                      },

                      // SELECTED
                      "&.Mui-selected": {
                        backgroundColor: "#06103D",
                        color: "#FFFFFF",

                        "&:hover": {
                          backgroundColor: "#06103D",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 50,
                        color: isActive ? "#FFFFFF" : "#7A7A7A",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontFamily: "Didact Gothic",
                        fontSize: "1.2rem",
                        fontWeight: 500,
                        color: isActive ? "#FFFFFF" : "#7A7A7A",
                        p: 0
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      )}

      {actionButtons.length > 0 && (
        <Box sx={{ px: 1, py: 1 }}>
          {actionButtons.map(
            (button, idx) =>
              React.isValidElement(button) &&
              React.cloneElement(button, {
                key: idx,
                onClick: button.props.onClick ?? (() => setModalOpen(true)),
              })
          )}
        </Box>
      )}

      <Box sx={{ mt: "auto", mb: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setLogoutConfirmOpen(true)}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText
                primary="Sign Out"
                primaryTypographyProps={{
                  fontFamily: "Didact Gothic",
                  fontSize: "0.875rem",
                  color: "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
        anchor="left"
      >
        {drawerContent}
      </Drawer>

      <Dialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
      >
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setLogoutConfirmOpen(false);
              handleLogout();
            }}
            color="error"
            variant="contained"
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}