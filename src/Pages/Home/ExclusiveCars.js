import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import useStyles from '../../hooks/useStyles';
import Loading from '../Shared/Loading';
import ConditionCars from './ConditionCar';

const ExclusiveCars = () => {
    const classes = useStyles();

    const condition ='Exclusive';
    const {data:vehicles, isLoading, refetch} = useQuery(['ExclusiveVehicles'], ()=>fetch(`https://thawing-ridge-58827.herokuapp.com/vehicles/${condition}`,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        <Loading></Loading>
    }
    return (
        <Box>
            <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                    Our <span style={{color:'orange'}}>{condition} Cars</span>
            </Typography>
            <Container style={{padding: '20px'}}>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                    {
                        vehicles?.slice(0,4).map(vehicle=><ConditionCars
                            key={vehicle._id}
                            vehicle={vehicle}
                            >
                        </ConditionCars>)
                    }
                </Grid>
            </Container>
                <Link to={`/vehicles/${condition}`} style={{textDecoration:'none', color:'white'}}>
                    <Button className={classes.googlebtn}
                    variant='contained' 
                    sx={{mx:"auto"}}
                    style={{display:'flex' ,alignItems: 'center', justifyContent:'center'}}>See All {condition} Cars
                    </Button>
                </Link>
        </Box>
    );
};

export default ExclusiveCars;