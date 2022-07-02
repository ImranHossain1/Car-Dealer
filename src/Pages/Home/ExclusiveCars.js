import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ExclusiveCar from './ExclusiveCar';

const ExclusiveCars = () => {
    const condition ='Exclusive';
    const {data:vehicles, isLoading, refetch} = useQuery(['ExclusiveVehicles'], ()=>fetch(`http://localhost:5000/vehicleExClusive/${condition}`,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        <Loading></Loading>
    }
    return (
        <Box>
            <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                    Our <span style={{color:'orange'}}>Exclusive Cars</span>
            </Typography>
            <Container style={{padding: '20px'}}>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                    {
                        vehicles?.slice(0,4).map(vehicle=><ExclusiveCar
                            key={vehicle._id}
                            vehicle={vehicle}
                            >
                        </ExclusiveCar>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default ExclusiveCars;