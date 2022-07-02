import { Grid, Pagination, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import Navbar from '../Shared/Navbar';
import Vehicle from './Vehicle';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const Vehicles = () => {
    const {data: vehicles, isLoading} = useQuery(["vehicles"], ()=>fetch('http://localhost:5000/vehicles').then(res=>res.json()));
    if(isLoading){
        <Loading></Loading>
    }
    console.log(vehicles)
    return (
        <>
            <Navbar></Navbar>
            <Box  sx={{mt:15}}>
                <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>Select Your Favourite Car</Typography>
                <Container style={{padding: '20px'}}>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                    {
                        vehicles?.map(vehicle=><Vehicle
                            key={vehicle._id}
                            vehicle={vehicle}
                            >
                        </Vehicle>)
                    }
                </Grid>
                <Pagination count={10} variant="outlined" shape="rounded" showFirstButton showLastButton sx={{my:5}} style={{display:'flex' ,justifyContent: 'center'}}/>

            </Container>
            </Box>
        </>
    );
};

export default Vehicles;