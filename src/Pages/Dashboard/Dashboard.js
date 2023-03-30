import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Button, Container, Menu, MenuItem } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import useAdmin from "../../hooks/useAdmin";

const drawerWidth = 240;
const pages = ["home", "vehicles"];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"]),
  ...(open && {
    width: `100%`,
    transition: theme.transitions.create(["margin", "width"]),
    marginRight: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [userData, setUserData] = React.useState([]);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#0A2357",
      },
    },
  });

  React.useEffect(() => {
    if (user) {
      fetch(
        `https://car-dealer-server-production.up.railway.app/user/${user.email}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          //console.log('res',res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);
        });
    }
  }, [user]);

  return (
    <div sx={{ display: "flex" }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed" color="primary" enableColorOnDark>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <DirectionsCarIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Car Dealer
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ visibility: { md: "hidden" } }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`/${page}`}
                        >
                          <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ color: "white", display: "block" }}
                          >
                            {page}
                          </Button>
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <DirectionsCarIcon
                sx={{
                  display: { xs: "flex", md: "none" },
                  visibility: { xs: "hidden", md: "block" },
                  mr: 1,
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  visibility: { xs: "hidden", md: "block" },
                }}
              >
                Car Dealer
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Link
                    key={page}
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/${page}`}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
              </Box>

              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <Main open={open}>
        <DrawerHeader />
        <Outlet></Outlet>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItem style={{ display: "block" }} disablePadding>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton sx={{ p: 2 }}>
                <ListItemIcon>
                  <AddShoppingCartIcon />
                </ListItemIcon>
                My Purchased Car
              </ListItemButton>
            </Link>
          </ListItem>
          {admin && (
            <>
              <ListItem style={{ display: "block" }} disablePadding>
                <Link
                  to="/dashboard/users"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemButton sx={{ p: 2 }}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    Users
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem style={{ display: "block" }} disablePadding>
                <Link
                  to="/dashboard/addvhicle"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemButton sx={{ p: 2 }}>
                    <ListItemIcon>
                      <NoCrashIcon />
                    </ListItemIcon>
                    Add vehicle
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem style={{ display: "block" }} disablePadding>
                <Link
                  to="/dashboard/vehicleList"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemButton sx={{ p: 2 }}>
                    <ListItemIcon>
                      <LocalCarWashIcon />
                    </ListItemIcon>
                    Vehicle List
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem style={{ display: "block" }} disablePadding>
                <Link
                  to="/dashboard/notifications"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemButton sx={{ p: 2 }}>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    Notifications
                  </ListItemButton>
                </Link>
              </ListItem>
            </>
          )}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Button
                onClick={handleSignOut}
                sx={{ color: "black", display: "block" }}
              >
                Logout
              </Button>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
