"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  List as ListIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = useTheme();

  const menuItems = [
    { text: "Головна", icon: <HomeIcon />, path: "/" },
    { text: "Усі пости", icon: <ListIcon />, path: "/posts" },
    { text: "Створити пост", icon: <AddIcon />, path: "/posts/create" },
  ];

  return (
    <div
      className={styles.layout}
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            DOiT MVP
          </Typography>
          <ThemeToggle
            isDarkMode={isDarkMode}
            onToggle={() => dispatch(toggleTheme())}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              href={item.path}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
