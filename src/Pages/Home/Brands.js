import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import bmw from '../../assets/images/brands/bmw.png'
import ferrari from '../../assets/images/brands/ferrari.png'
import audi from '../../assets/images/brands/audi.png'
import mercedes from '../../assets/images/brands/Mercedes.png'
import porsche from '../../assets/images/brands/porsche.png'
import volvo from '../../assets/images/brands/Volvo.png'
import { Link } from 'react-router-dom';
import { LightSpeed, Zoom } from 'react-reveal';
const Brands = () => {
    return (
        <Box>            
            <Container style={{padding: '20px'}}>
                <LightSpeed>
                <Typography variant ="h3" sx={{mt:4, mb:10, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                    Our <span style={{color:'orange'}}>Brands</span>
                </Typography>
                </LightSpeed>
                <Grid container 
                spacing={{ xs: 3, md: 3 }} 
                columns={{ xs: 12, sm: 12, md: 12 }} 
                style={{alighItems:'center'}} >
                    <Grid item xs={6} sm={4} md={2} className='pics'>
                        <Zoom>
                        <Link to={`/vehicles/BMW`} style={{textDecoration:'none', color:'white'}}>
                            <img src={bmw} alt="" style={{width:'100%',}} />
                        </Link>
                        </Zoom>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2} className='pics'>
                        <Zoom>
                        <Link to={`/vehicles/Audi`} style={{textDecoration:'none', color:'white'}}>
                            <img src={audi} alt="" style={{width:'100%'}} className='pics'/>
                        </Link>
                        </Zoom>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                    <Zoom>
                        <Link to={`/vehicles/Mercedes-Benz`} style={{textDecoration:'none', color:'white'}}>
                        <img src={mercedes} alt="" style={{width:'100%'}} className='pics'/>
                        </Link>
                        </Zoom>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Zoom>
                        <Link to={`/vehicles/Ferrari`} style={{textDecoration:'none', color:'white'}}>
                        <img src={ferrari} alt="" style={{width:'100%'}} className='pics' />
                        </Link>
                        </Zoom>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Zoom>
                        <Link to={`/vehicles/Volvo`} style={{textDecoration:'none', color:'white'}}>
                        <img src={volvo} alt="" style={{width:'100%'}} className='pics'/>
                        </Link>
                        </Zoom>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Zoom>
                        <Link to={`/vehicles/Porsche`} style={{textDecoration:'none', color:'white'}}>
                            <img src={porsche} alt="" style={{width:'100%'}} className='pics'/>
                        </Link>
                        </Zoom>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

export default Brands;