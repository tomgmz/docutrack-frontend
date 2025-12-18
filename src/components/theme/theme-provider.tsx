"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getMuiTheme } from "./MUITheme";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MuiWrapper>{children}</MuiWrapper>
    </NextThemesProvider>
  );
}

function MuiWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useNextTheme();

  const resolvedTheme =
    theme === "system"
      ? typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const muiTheme = React.useMemo(() => getMuiTheme(resolvedTheme as "light" | "dark"), [resolvedTheme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
