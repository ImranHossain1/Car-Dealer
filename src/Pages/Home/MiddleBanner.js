import { Box, Grid} from '@mui/material';
import { minHeight } from '@mui/system';
import React from 'react';
import reverseImg from '../../assets/images/carImages/01.png'
import frongImg from '../../assets/images/carImages/02.png';
import background from '../../assets/images/carImages/background.png'
const MiddleBanner = () => {
    const bannerBg = {
        backgroundImage: `url(${background})`,
        minHeight: 400
    }
    const verticalCenter = {
        display: 'flex',
        alignItems: 'flex-end',
        height: 400
    }
    return (
        <Box style={bannerBg} mt='30px'>
            <Grid container spacing={2} style={verticalCenter} mb='200px'>
                <Grid item xs={6}>
                   <img src={frongImg} alt="" /> 
                </Grid>
                <Grid item xs={6}>
                <img src={reverseImg} alt="" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MiddleBanner;