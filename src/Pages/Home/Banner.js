import React from 'react';
import bannerCar from '../../assets/images/CarouselImage/bannerCar.jpg';
import car1 from '../../assets/images/CarouselImage/car1.jpg' ;
import Grid from '@mui/material/Grid';
import {Typography , Button , Container} from '@mui/material';
import Box from '@mui/material/Box';
import { height } from '@mui/system';
import useStyles from '../../hooks/useStyles';
import { Link } from 'react-router-dom';

const bannerBg = {
    backgroundImage: `url(${bannerCar})`,
    minHeight: '70vh',
    backgroundColor: 'rgba(45,58,74,0.9)',
    backgroundBlendMode: 'darken , luminosity'
}

const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 800
}

const Banner = () => {
    const classes = useStyles();
    return (
        <Box sx={{ flexGrow: 1, mt:8}} style={bannerBg} minHeight={{md:'100vh'}}>
            <Grid container spacing={4} direction={{xs: "column", md: "row-reverse"}} sx={{ mt: 0}}>
                <Grid item xs={12} md={6} style={verticalCenter} sx={{justifyContent:"center" }} >
                    <img src={car1} style={{width: '75%', borderRadius: '10%', height:'40%'}} className='pics'/>
                </Grid>
                <Grid item xs={12} md={6} style={{ ...verticalCenter,textAlign: 'left'}}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"

                        >
                        <Typography variant ="h3" sx={{color: '#f39c12', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                            Find the latest Car
                        </Typography>
                        <Typography variant='h4' 
                            sx={{my:5, color: ' #f2f4f4', fontWeight: 300, textAlign: 'center'}} 
                            mx={{xs:'10px'}}
                            fontSize={{xs:20, sm:30, lg:30}}>
                            When you have a great car, you want people to see the car
                        </Typography>
                        <Link to='/vehicles' style={{textDecoration:'none'}}><Button variant="contained" className={classes.googlebtn} sx={{px:8}}>Explore Vehicles</Button></Link>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Banner;