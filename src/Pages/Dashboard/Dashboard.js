import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import Profile from './Profile';
import Users from './Users';
const drawerWidth = 240;
const pages = ['home', 'shop', 'gallery'];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user] = useAuthState(auth);
    
  const handleSignOut = ()=>{
    signOut(auth)
  }
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
      mode: 'dark',
      primary: {
        main: '#0A2357'
      },
    },
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed"sx={{px:2}} color="primary" enableColorOnDark>
            <Toolbar>
            <Box variant="h6" noWrap sx={{ flexGrow: 1 }} style={{display:'flex', justifyContent:'center', alignItems:'center'}} component="div">
            <DirectionsCarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>

            <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    Car Dealer
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    sx={{visibility:{md:'hidden'}}}
                    >
                    <MenuIcon />
                    </IconButton>
                
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ color: 'white', display: 'block' }}
                        >
                            <Link style={{textDecoration: 'none', color:'black'}} to={`/${page}`}>{page}</Link>
                        </Button>
                        </Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <DirectionsCarIcon sx={{ display: { xs: 'flex', md: 'none' },visibility:{xs:'hidden', md:'block'}, mr: 1 }}/>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    visibility:{xs:'hidden', md:'block'}
                    }}
                >
                    Car Dealer
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        <Link style={{textDecoration: 'none', color:'white'}} to={`/${page}`}>{page}</Link>
                    </Button>
                    ))}
                    
                </Box>
            </Box>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            </Toolbar>
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
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
            <ListItem  style={{display:'block'}} disablePadding>
              <ListItemButton >
                <ListItemIcon>
                   <MailIcon />
                </ListItemIcon>
                <Link to='/dashboard' style={{textDecoration:"none", color: 'black'}}>
                        <Button color="inherit">Profile</Button>
                </Link>
              </ListItemButton> 
            <ListItemButton>
                <ListItemIcon>
                   <MailIcon />
                </ListItemIcon>
                <Link to='/dashboard/users' style={{textDecoration:"none", color: 'black'}}>
                        <Button color="inherit">Users</Button>
                </Link>
              </ListItemButton>
            </ListItem>

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
                      sx={{ color: 'black', display: 'block' }}
                  >
                  Logout
                </Button>
              </ListItemButton>
              
            </ListItem>
        </List>

      </Drawer>
    </Box>
  );
}
