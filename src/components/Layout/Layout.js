/**
 * Головний компонент розмітки додатку
 * Включає в себе:
 * - Верхню панель з навігацією
 * - Бічне меню з посиланнями
 * - Перемикач теми
 * - Кнопку коментарів на сторінці поста
 */

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
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  List as ListIcon,
  Add as AddIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const theme = useTheme();
  const pathname = usePathname();
  const commentsCount = useSelector((state) => state.posts.commentsCount);

  const menuItems = [
    { text: "Головна", icon: <HomeIcon />, path: "/" },
    { text: "Усі пости", icon: <ListIcon />, path: "/posts" },
    { text: "Створити пост", icon: <AddIcon />, path: "/posts/create" },
  ];

  const getPageTitle = () => {
    if (pathname === "/posts") return "Усі пости";
    if (pathname === "/posts/create") return "Створити пост";
    if (pathname.startsWith("/posts/")) {
      const postId = pathname.split("/").pop();
      return `Пост #${postId}`;
    }
    return "DOiT MVP";
  };

  const isPostDetailsPage = pathname.match(/^\/posts\/\d+$/);

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
            {getPageTitle()}
          </Typography>
          <ThemeToggle
            isDarkMode={isDarkMode}
            onToggle={() => dispatch(toggleTheme())}
          />
          {isPostDetailsPage && (
            <IconButton
              color="inherit"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openComments"))
              }
              className={styles.commentsButton}
              size="large"
            >
              <Badge badgeContent={commentsCount} color="error" max={99}>
                <CommentIcon />
              </Badge>
            </IconButton>
          )}
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
