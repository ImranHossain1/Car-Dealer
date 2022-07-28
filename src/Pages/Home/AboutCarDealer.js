import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import contactimage from '../../assets/images/CarouselImage/contactimage.gif'
import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
const AboutCarDealer = () => {
    return (
        <Box sx={{ flexGrow: 1 , my : 3 }} >
            <Container disableGutters >
                <Box >
                <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                            About <span style={{color:'orange'}}>Car Dealer</span>
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} md={6} className='pics'>
                        <img src={contactimage} alt="" style={{width:'100%'}} />    
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ minWidth: 275, border: 0 ,boxShadow: 0}}>
                            <CardContent style={{textAlign: 'justify'}}>
                                <Typography variant="h5" component="div" sx={{mb:'15px'}}>
                                    We offer high quality vehicles at unbelievable prices & creates pleasant buying experience.
                                </Typography>
                                
                                <Typography variant="body2" sx={{mb:'10px'}}>
                                AutoImage is nisi aliquip consequat duis velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat. Lorem ipsum dolor sit amt consectetur adipisicing elit sed eiusmod tempor incididuntu labore et dolore magna aliqua enimad minim veniam quis nostrud area exercitation ullamco laboris nisi aliquip. Freebet Slot Duis aute irure dolor in reprehenderitn voluptate velit ese cillum dolore fugiat free chip nulla pariatur excepteur sint occaecat cupidatat non proident.
                                </Typography>
                                <Typography variant="body2" sx={{mb:'15px'}}>
                                Duis aute irure dolor in reprehenderitn voluptate velit ese cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.
                                </Typography>
                                <Box style={{display: 'flex', alignItems: 'center'}}>
                                    <LocalOfferIcon sx={{color:'#DC7633', mr:5}} fontSize="large"></LocalOfferIcon>
                                    <Box>
                                        <Typography variant='h6'>Affordable Auto Prices</Typography>
                                        <Typography>AutoDrive is nisi aliquip consequat duis velit esse</Typography>
                                    </Box>
                                </Box>
                                <Box style={{display: 'flex', alignItems: 'center'}} sx={{ my:'15px'}}>
                                    <EmojiEventsRoundedIcon sx={{color:'#DC7633', mr:5}} fontSize="large"></EmojiEventsRoundedIcon>
                                    <Box>
                                        <Typography variant='h6'>20 Years in Business</Typography>
                                        <Typography>Vehicles is nisi aliquip consequat duis velit</Typography>
                                    </Box>
                                </Box>
                                <Box style={{display: 'flex', alignItems: 'center'}}>
                                    <ThumbUpRoundedIcon sx={{color:'#DC7633', mr:5}} fontSize="large"></ThumbUpRoundedIcon>
                                    <Box>
                                        <Typography variant='h6'>Trusted & Genuine Parts</Typography>
                                        <Typography>Autos Drive is nisi aliquip consequat duis ted</Typography>
                                    </Box>
                                </Box>

                            </CardContent>
                        </Card>        
                    </Grid>
                    

                </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutCarDealer;