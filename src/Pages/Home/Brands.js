import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import bmw from '../../assets/images/brands/bmw.png'
import ferrari from '../../assets/images/brands/ferrari.png'
import audi from '../../assets/images/brands/audi.png'
import mercedes from '../../assets/images/brands/Mercedes.png'
import porsche from '../../assets/images/brands/porsche.png'
import volvo from '../../assets/images/brands/Volvo.png'
const Brands = () => {
    return (
        <Box>            
            <Container style={{padding: '20px'}}>
                <Typography variant ="h3" sx={{mt:4, mb:10, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                    Our <span style={{color:'orange'}}>Brands</span>
                </Typography>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} style={{alighItems:'center'}}>
                    <Grid item xs={6} sm={4} md={2}>
                        <img src={bmw} alt="" style={{width:'60%',}} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <img src={audi} alt="" style={{width:'100%'}} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <img src={mercedes} alt="" style={{width:'100%'}} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <img src={ferrari} alt="" style={{width:'60%'}} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <img src={volvo} alt="" style={{width:'100%'}} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <img src={porsche} alt="" style={{width:'100%'}} />
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

export default Brands;