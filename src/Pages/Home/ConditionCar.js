import { Button, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import useStyles from '../../hooks/useStyles';

const ConditionCars = ({vehicle}) => {
    const classes = useStyles();
    const {company, vehicleModel, catagory, condition, cost, img}= vehicle;
    return (
        <Grid item xs={12} sm={6} md={6} className='pics'>
            <Card sx={{ minWidth: 275, border: 0 ,boxShadow: 2,backgroundColor: '#1d242e', opacity:0.95}} className='containers'>
                <CardMedia
                    component="img"
                    style ={{width: '100%' , margin: ' auto', height:'100%'}}
                    image={img}
                    alt="green iguana"
                />
                <CardContent style={{color: '#E5E8E8', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' , textTransform:'uppercase'}} className='overlay'>
                    <Typography variant="h5" component="div" >
                       {company}
                    </Typography>
                    
                    <Typography variant="body2">
                        Model: {vehicleModel}
                    </Typography>
                    <Typography variant="body2">
                        Category: {catagory}
                    </Typography>
                    <Typography variant="body2">
                        Condition: {condition}
                    </Typography>
                    <Typography variant="body2">
                        Cost: {cost}
                    </Typography>
    <Button variant="contained" className={classes.btn} sx={{mt:2, px:5}}>Select</Button>
                </CardContent>
            </Card>        
        </Grid>
    );
};

export default ConditionCars;