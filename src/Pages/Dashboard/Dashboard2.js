import { AppBar, Button, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: "visible"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4)
  }
}));
const Dashboard2 = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ zIndex: 1251 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={true}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List  style={{display:'block'}} disablePadding>          
              <ListItemButton >
                <ListItemIcon>
                   <MailIcon />
                </ListItemIcon>
                <Link to='/dashboard2' style={{textDecoration:"none", color: 'black'}}>
                        <Button color="inherit">Profile</Button>
                </Link>
              </ListItemButton> 
            <ListItemButton>
                <ListItemIcon>
                   <MailIcon />
                </ListItemIcon>
                <Link to='/dashboard2/users' style={{textDecoration:"none", color: 'black'}}>
                        <Button color="inherit">Users</Button>
                </Link>
              </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                   <MailIcon />
                </ListItemIcon>
                <Link to='/dashboard2/addvhicle' style={{textDecoration:"none", color: 'black'}}>
                        <Button color="inherit">Add vehicle</Button>
                </Link>
              </ListItemButton>
              
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Outlet></Outlet>
      </main>
    </div>
    );
};

export default Dashboard2;