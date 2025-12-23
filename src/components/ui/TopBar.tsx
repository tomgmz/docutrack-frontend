"use client";

import { Skeleton } from "@mui/material";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

interface User {
  firstName?: string;
  lastName?: string;
}

interface TopBarProps {
  drawerWidth: number;
  user?: User;
  isLoading?: boolean;
  centerContent: React.ReactNode;
}

export default function TopBar({
  drawerWidth,
  user,
  isLoading = false,
  centerContent,
}: TopBarProps) {
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;
  const NOTCH_BG = "#E1E7EF";
  const CURVE_RADIUS = "24px";

  return (
    <div
      className="fixed top-0 right-0 z-[1200] flex h-20 items-end bg-transparent pointer-events-none"
      style={{ left: drawerWidth }}
    >
      <div
        className={`
          relative flex h-15 w-[500px] items-center px-6 pointer-events-auto
          rounded-t-[24px] bg-[#E1E7EF]
          after:absolute after:bottom-0 after:-right-[24px] after:h-[24px] after:w-[24px] after:content-['']
          after:[background:radial-gradient(circle_at_100%_0,transparent_24px,#E1E7EF_24px)]
        `}
      >
        {centerContent}
      </div>

      <div className="flex h-full flex-1 items-center justify-end pb-2 pr-6 pointer-events-auto">
        {isLoading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          user && (
            <Avatar>
              <AvatarFallback className="bg-[#0F172A] text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          )
        )}
      </div>
    </div>
  );
}