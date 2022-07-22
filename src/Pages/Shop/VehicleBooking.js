import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import g01 from '../../assets/images/g01.jpg'
import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import Navbar from '../Shared/Navbar';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import useStyles from '../../hooks/useStyles';
const VehicleBooking = () => {
    const classes = useStyles();
    const {id} = useParams();
    const url = `http://localhost:5000/vehicle/${id}`
    const {data:vehicle, isLoading, refetch} = useQuery(['vehicle', id], ()=>fetch(url,{
        method: 'GET'
    }).then(res=>res.json()));
    if(isLoading){
        return <Loading></Loading>
    }
    console.log(vehicle)
    
    return (
        <>
            <Navbar></Navbar>
            <Box sx={{flexGrow: 1 , my : 3 }}  style={{marginTop: '5%'}}>
                <Container disableGutters >
                    <Box >
                    <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                                {vehicle.catagory} Car from <span style={{color:'orange'}}>{vehicle.company}</span>
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={12} md={8} className='pics'>
                            <img src={vehicle.img} alt="" style={{width:'100%' , height:'100%'}} />    
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Card sx={{ minWidth: 275,minHeight:'100%', border: 0 ,boxShadow: 0}} style={{display:'flex' , alignItems:'center', justifyContent:'center'}}>
                                <CardContent style={{textAlign: 'justify'}} >
                                    <Typography variant="h4" component="div" sx={{mb:'15px'}}>
                                        <span style={{color:'green', fontWeight:'700'}}> {vehicle.catagory} </span>
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{mb:'15px'}}>
                                        Classic <span style={{color:'#5535f9', fontWeight:'800'}}> {vehicle.company} </span> Design
                                    </Typography>
                                    
                                    <Typography variant="h6" sx={{mb:'10px'}}>
                                        Cost: <span style={{color:'red'}}>${vehicle.cost}</span>
                                    </Typography>
                                    <Typography variant="body2" sx={{mb:'15px'}} color='green' style={{fontWeight:500}}>
                                        In Stock
                                    </Typography>
                                    <Typography variant="h6" sx={{mb:'15px'}}>
                                        Model: <span style={{color:'green', fontWeight:'700'}}> {vehicle.vehicleModel} </span>
                                    </Typography>
                                    <Divider></Divider> <br />
                                    <Link to={`/confirmVehicle/${vehicle._id}`} className={classes.btn} style={{textDecoration:"none", padding:'10px 40px'}}>
                                        <Button color="inherit">Buy Now</Button>
                                    </Link>
                                </CardContent>
                            </Card>        
                        </Grid>
                        

                    </Grid>
                    </Box>
                    <Divider sx={{mt:5}}></Divider>
                    <Typography variant='h6' sx={{mt:2}}>
                        {vehicle.vehicleModel} {vehicle.catagory}
                    </Typography>
                    <Typography variant='body2' color=' #566573' sx={{mb:2}}>
                        This is a configurator. Industry-wide supply issues impacting automotive manufacturing around the 
                        world may cause delays or non-availability of certain components, features and models. 
                        Please see your dealer for additional information about your chosen {vehicle.company}. 
                    </Typography>
                    <Link to={`/confirmVehicle/${vehicle._id}`} className={classes.btn} style={{textDecoration:"none", padding:'10px 40px'}}>
                        <Button color="inherit">Order Now</Button>
                    </Link>
                    <Divider sx={{mt:5, mb:2}}></Divider>
                    <Typography variant='h6'>
                        Base MsRP
                    </Typography>
                    <Divider></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between',fontSize: 20, mt:2}}>
                        <Typography variant='body' color='green'>{vehicle.vehicleModel} </Typography>
                        <Typography variant='body' color='red' style={{fontWeight: 700}}>${vehicle.cost}</Typography>
                    </Box>
                    <Typography variant='h6' sx={{mt:5}}>
                        Design
                    </Typography>
                    <Divider></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between' ,fontSize: 20, mt:2}}>
                        <Typography variant='body' color='green'>{vehicle.catagory}</Typography>
                        <Typography variant='body' style={{fontWeight: 700, fontSize: 24}}>-</Typography>
                    </Box>


                    <Typography variant='h6' sx={{mt:5}}>
                        Exterior
                    </Typography>
                    <Divider></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between' ,fontSize: 20, mt:2}}>
                        <Typography variant='body'>Melbourne Red Metallic</Typography>
                        <Typography variant='body' style={{fontWeight: 700, fontSize: 24}}>-</Typography>
                    </Box>
                    <Box sx={{display:'flex', justifyContent: 'space-between' ,fontSize: 20, mt:2}}>
                        <Typography variant='body'>18" Double-spoke Wheels, Style 796 with All-season Run-flat Tires</Typography>
                        <Typography variant='body' style={{fontWeight: 700, fontSize: 24}}>-</Typography>
                    </Box>

                    
                    <Typography variant='h6' sx={{mt:5}}>
                        Interior
                    </Typography>
                    <Divider></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between' ,fontSize: 20, mt:2}}>
                        <Typography variant='body'>Black Perforated SensaTec</Typography>
                        <Typography variant='body' style={{fontWeight: 700, fontSize: 24}}>-</Typography>
                    </Box>
                    <Box sx={{display:'flex', justifyContent: 'space-between' ,fontSize: 20, mt:2}}>
                        <Typography variant='body'>Open Pore Fine Wood Oak Grain trim</Typography>
                        <Typography variant='body' style={{fontWeight: 700, fontSize: 24}}>-</Typography>
                    </Box>


                    <Typography variant='h6' sx={{mt:5}}>
                        Additional Costs
                    </Typography>
                    <Divider></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between' ,fontSize: 20, mt:2}}>
                        <Typography variant='body'>Destination & Handling </Typography>
                        <Typography variant='body'>Free</Typography>
                    </Box>
                    <Divider sx={{mt:5}} style={{fontWeight:700}}></Divider>
                    <Box sx={{display:'flex', justifyContent: 'space-between' ,fontSize: 20, mt:2}}>
                        <Typography variant='body'>Total Price (MSRP)</Typography>
                        <Typography variant='body' color='red' style={{fontWeight: 700}}>${vehicle.cost}</Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default VehicleBooking;