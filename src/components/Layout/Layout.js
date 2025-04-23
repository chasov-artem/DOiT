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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  List as ListIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import Link from "next/link";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: "Головна", icon: <HomeIcon />, path: "/" },
    { text: "Усі пости", icon: <ListIcon />, path: "/posts" },
    { text: "Створити пост", icon: <AddIcon />, path: "/posts/create" },
  ];

  return (
    <div className={styles.layout}>
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
            DOiT Test
          </Typography>
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
