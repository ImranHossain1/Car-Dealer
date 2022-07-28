import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { LightSpeed } from 'react-reveal';
import VehicleType from './VehicleType';

const VehicleTypes = () => {
    const [types, setTypes] = useState([])
    useEffect(()=>{
        fetch('type.json')
        .then(res=>res.json())
        .then(data=>{
            //console.log(data)
            setTypes(data)
        })
    },[])
    
    return (
        <Box style={{backgroundColor: '#1d242e', opacity:0.95}}>            
            <Container style={{padding: '20px'}}>
                <LightSpeed>
                <Typography variant ="h3" sx={{mt:4, mb:10, color: 'white', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                    Types of <span style={{color:'orange'}}>Vehicles</span>
                </Typography>
                </LightSpeed>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{mb: 5}}>
                    {
                        types.map(type=><VehicleType
                            key={type._id}
                            t={type}
                        />)
                    }
                </Grid>
            </Container>
        </Box >
    );
};

export default VehicleTypes;