import { Grid, Pagination, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import Vehicle from './Vehicle';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const Vehicles = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);
    const [vehicles, setVehicles] = useState([]);

    function handlePagination (event) {
        setPage(parseInt(event.target.textContent)-1)
        }
    useEffect( () =>{
        fetch(`http://localhost:5000/vehicles?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(data => setVehicles(data));
    }, [page, size]);

    useEffect( () =>{
        fetch('http://localhost:5000/vehicleCount')
        .then(res => res.json())
        .then(data =>{
            const count = data.count;
            const pages = Math.ceil(count/12);
            setPageCount(pages);
        })
    }, [])
    //console.log(vehicles)
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
                <Pagination count={pageCount} 
                    onChange={handlePagination}
                    variant="outlined" shape="rounded" 
                    showFirstButton showLastButton sx={{my:5}} 
                    style={{display:'flex' ,justifyContent: 'center'}}/>

            </Container>
            </Box>
        </>
    );
};

export default Vehicles;