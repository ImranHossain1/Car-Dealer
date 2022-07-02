import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const VehicleType = ({t}) => {
    const {type, offer, price, img} = t
    return (
        <Grid item xs={4} sm={4} md={3} className='pics'>
            <Card sx={{ minWidth: 275, border: 0 ,boxShadow: 0, backgroundColor: '#1d242e', opacity:0.95}} >
                <CardMedia
                    component="img"
                    style ={{width: 'auto' ,height: '80px', margin: '0 auto'}}
                    image={img}
                    alt="green iguana"
                />
                <CardContent style={{color: 'white', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Typography variant="h5" component="div">
                        {type}
                    </Typography>
                    
                    <Typography variant="body2">
                        {offer} offers at ${price}
                    </Typography>
                </CardContent>
            </Card>        
        </Grid>
    );
};

export default VehicleType;