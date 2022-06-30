import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const Team = ({member}) => {
    const {name, position, img} = member;
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ minWidth: 275, border: 0 ,boxShadow: 0}}>
                <CardMedia
                    component="img"
                    style ={{width: 'auto' , margin: '0 auto'}}
                    image={img}
                    alt="green iguana"
                />
                <CardContent style={{color: '#1d242e'}}>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    
                    <Typography variant="body2">
                        {position}
                    </Typography>
                </CardContent>
            </Card>        
        </Grid>
    );
};

export default Team;