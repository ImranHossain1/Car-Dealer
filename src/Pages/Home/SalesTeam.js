import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { LightSpeed } from 'react-reveal';
import Team from './Team';
const SalesTeam = () => {
    const [members, setMembers] = useState([])
    useEffect(()=>{
        fetch('team.json')
        .then(res=>res.json())
        .then(data=>{
            //console.log(data)
            setMembers(data)
        })
    },[])
    return (
        <Box>
            <LightSpeed>
            <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                    Our <span style={{color:'orange'}}>Sales Team</span>
            </Typography>
            </LightSpeed>
            <Container style={{padding: '20px'}}>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                    {
                        members.map(member=><Team
                            key={member._id}
                            member={member}
                        />)
                    }
                </Grid>
            </Container>
        </Box >
    );
};

export default SalesTeam;