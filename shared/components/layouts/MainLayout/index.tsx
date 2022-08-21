import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { supabase } from "supabase/config";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useAppSelector } from "redux/store/hooks";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode | React.ReactFragment;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const user = useAppSelector((state) => state.user.value);
  return (
    <>
      <Box
        sx={{
          height: "100%",
          px: 0,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Rave Clud
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box sx={{ p: 4, display: "grid", height: "100%" }}>
            <Stack>
              <Typography variant="h4" fontWeight="bold" textAlign="center">
                👽Hola raver👽!
              </Typography>
              <Typography variant="h6" textAlign="center">
                {user?.nombre}
              </Typography>
            </Stack>
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Button
              color="secondary"
              variant="outlined"
              sx={{ alignSelf: "end" }}
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) {
                  router.push("/auth/login");
                }
              }}
            >
              Cerrar sesión
            </Button>
          </Box>
        </SwipeableDrawer>
        <Box width="100%">{children}</Box>
      </Box>
    </>
  );
};

export default MainLayout;
