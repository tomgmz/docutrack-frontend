"use client"

import { useState } from 'react';
import TopBar from '@/components/ui/TopBar'
import { useMediaQuery, useTheme } from '@mui/material';
import SideDrawer from '@/components/ui/SideDrawer';
import { userMenu } from './components/menu';
import { Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import FolderSearch from '@/components/ui/TopbarSearch';

const drawerWidth = 300;

export default function HomeLayout({ 
  children,
} : { 
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState<any>(null);

  const activeMenuItem = userMenu.find((item) =>
    pathname.startsWith(item.path)
  );

  return (
    <div className="flex min-h-screen bg-[#F2F6FB]">
    <TopBar
      user={user}
      drawerWidth={isMobile ? 0 : drawerWidth}
      // leftContent={
      //       <Typography
      //         variant="h6"
      //         sx={{
      //           fontFamily: "'Poppins', sans-serif",
      //           fontWeight: 500,
      //           fontSize: { xs: "1rem", sm: "1rem", md: "1.2rem" },
      //           color: "#333333",
      //         }}
      //       >
      //         {activeMenuItem ? activeMenuItem.label : "Dashboard"}
      //       </Typography>
      //     }
      centerContent={<FolderSearch/>}
    />

    <SideDrawer
      user={user}
      menuItems={userMenu}
      variant="permanent"
    />

    <main className="flex-1 pt-[80px] h-screen overflow-hidden">
      {children}
    </main>
  </div>
  );
}