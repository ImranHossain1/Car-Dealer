import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Zoom } from 'react-reveal';
import { Link } from 'react-router-dom';
import useStyles from '../../hooks/useStyles';
import Loading from '../Shared/Loading';
import ConditionCars from './ConditionCar';


const PremiumCars = () => {
    const classes = useStyles();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(4);
    const [vehicles, setVehicles] = useState([]);
    const condition ='Premium';
    /* const {data:vehicles, isLoading, refetch} = useQuery(['PremiumVehicles'], ()=>fetch(`https://car-dealer-server-production.up.railway.app/vehicles/${condition}`,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        <Loading></Loading>
    } */
    useEffect( () =>{
        fetch(`https://car-dealer-server-production.up.railway.app/vehicles?page=${page}&size=${size}&condition=${condition}`)
        .then(res => res.json())
        .then(data => setVehicles(data));
    }, [page, size, condition]);

    useEffect( () =>{
        fetch(`https://car-dealer-server-production.up.railway.app/vehicleCount?condition=${condition}`)
        .then(res => res.json())
        .then(data =>{
            const count = data.count;
            const pages = Math.ceil(count/4);
            setPageCount(pages);
        })
    }, [condition])
    return (
        <Box>
            <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                    Our <span style={{color:'orange'}}>{condition} Cars</span>
            </Typography>
            <Zoom top>
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
            </Zoom>
            <Zoom>
            <Link to={`/vehicles/${condition}`} style={{textDecoration:'none', color:'white'}}>
                    <Button className={classes.googlebtn}
                    variant='contained' 
                    sx={{mx:"auto"}}
                    style={{display:'flex' ,alignItems: 'center', justifyContent:'center'}}>See All {condition} Cars
                    </Button>
            </Link>
            </Zoom>
        </Box>
    );
};

export default PremiumCars;