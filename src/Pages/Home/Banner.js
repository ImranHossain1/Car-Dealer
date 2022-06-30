import React from 'react';
import bannerCar from '../../assets/images/carImages/bannerCar.jpg';
import car1 from '../../assets/images/carImages/car1.jpg' ;
import Grid from '@mui/material/Grid';
import {Typography , Button , Container} from '@mui/material';
import Box from '@mui/material/Box';
import { height } from '@mui/system';

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
    return (
        <Box sx={{ flexGrow: 1}} style={bannerBg} minHeight={{md:'100vh'}}>
            <Grid container spacing={4} direction={{xs: "column", md: "row-reverse"}} sx={{ mt: 0}}>
                <Grid item xs={12} md={6} style={verticalCenter} sx={{justifyContent:"center" }} >
                    <img src={car1} style={{width: '75%', borderRadius: '10%'}}/>
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
                        <Button variant="contained"  style={{backgroundColor:' #5fe4b0 ', color:'black'}} hover={{backgroundColor:"black"}}>Shop Now</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Banner;