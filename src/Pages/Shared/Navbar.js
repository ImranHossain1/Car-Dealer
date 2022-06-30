import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import useStyles from '../../hooks/useStyles';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
const pages = ['home', 'shop', 'gallery'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);
    
  const handleSignOut = ()=>{
    signOut(auth)
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" color="primary" enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
                      <Link style={{textDecoration: 'none', color:'white'}} to={`/${page}`}>{page}</Link>
                    </Button>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <DirectionsCarIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
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

            <Box sx={{ flexGrow: 0 }}>
              { user? 
              <Box style={{display:'flex'}}>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link style={{textDecoration: 'none', color:'white'}} to='/dashboard'>Dashboard</Link>
                  </Button>
                <Button
                  onClick={handleSignOut}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Logout
              </Button>
              </Box>
              :
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link style={{textDecoration: 'none', color:'white'}} to='/login'>Login</Link>
                  </Button>
                }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Navbar;
