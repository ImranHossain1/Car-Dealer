import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/images/CarouselImage/notFound.png'
import useStyles from '../../hooks/useStyles';
import Navbar from './Navbar';
import HomeIcon from '@mui/icons-material/Home';
const bannerBg = {
    flexGrow: 1,
    //padding: theme.spacing(3),
    height: '70vh',
    textAlign: 'center',
    backgroundImage: `url(${notFound})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",

}
const buttonPos={
    position: 'absolute',
    right: '35%',
    bottom: '40%',
    top: "55%",
    left:"35%"
}
const NotFound = () => {
    const classes = useStyles();
    return (
        <>
        <Navbar></Navbar>
        <Box style={bannerBg} minHeight={{md:'80vh'}} sx={{mb:-5}}>
          <Box style={buttonPos} >
                <Link to='/' style={{textDecoration:'none', color:'white'}}>
                    <Button className={classes.btn} variant='contained'>
                        <HomeIcon></HomeIcon>
                        <Typography variant='body2' sx={{ml:1}}>Go Home</Typography>
                    </Button>
                </Link>
            </Box>
        </Box>
        </>
    );
};

export default NotFound;