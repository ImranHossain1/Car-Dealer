import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import paymentBg from '../../assets/images/CarouselImage/carbg.jpg'
import { Divider, Paper } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const bannerBg = {
    flexGrow: 1,
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${paymentBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
}

const stripePromise = loadStripe('pk_test_51L7ggVFbphkgAKK4OPhZ0A288iRm9B6d1vb4E06DO2TP5RMWKrVWyYkZZKjJWMMl79Ta2ERKd65xeZ96p9PbKhYf00biEstqRp');

const Payment = () => {
    const {id} = useParams();
    const url = `https://thawing-ridge-58827.herokuapp.com/booking/${id}`;
    const {data: bookedVehicle, isLoading} = useQuery(['booking', id], ()=>fetch(url,{
        method: 'GET', 
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json()))
    if(isLoading){
        return <Loading></Loading>
    }
    const {userName, cost, _id, carId} = bookedVehicle;
    return (
        <Box sx={bannerBg} style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'-5% -15px -5% -5%'}} >
                <Card sx={{ minWidth: 300, mb:5 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Hello, {userName}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Please Pay For: {carId}
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Price: {cost}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm bookedVehicle= {bookedVehicle}/>
                        </Elements>
                    </CardContent>
                </Card>
        </Box>
    );
};

export default Payment;