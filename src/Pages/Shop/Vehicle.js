import { Button, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Bounce } from 'react-reveal';
import { Link } from 'react-router-dom';
import useStyles from '../../hooks/useStyles';

const Vehicle = ({vehicle}) => {
    const classes = useStyles();
    const {_id, company, vehicleModel, catagory, condition, cost, img}= vehicle;
    return (
        <Grid item xs={12} sm={6} md={3} className='pics'>
            <Card sx={{ minWidth: 275, border: 0 ,boxShadow: 2,backgroundColor: '#1d242e', opacity:0.95}}>
                <Bounce top cascade>
                <CardMedia
                    component="img"
                    style ={{width: '100%' ,height: '180px', margin: ' auto'}}
                    image={img}
                    alt="green iguana"
                />
                </Bounce>
                <CardContent style={{color: '#E5E8E8', display:'flex', flexDirection:'column', alignItems:'center' , textTransform:'uppercase'}}>
                    <Bounce bottom>
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
                    </Bounce>
                    <Link to={`/vehicle/${_id}`} className={classes.btn} style={{textDecoration:"none", color: 'white', marginTop:'5%', paddingTop:'10px'}}>
                        <Button color="inherit">Select</Button>
                    </Link>
                    
                    {/* <Button as Link fullWidth variant="contained" className={classes.btn} sx={{mt:2}}>Select</Button> */}
                </CardContent>
            </Card>        
        </Grid>
    );
};

export default Vehicle;