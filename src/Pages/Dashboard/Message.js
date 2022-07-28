import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';
import loginBg from '../../assets/images/CarouselImage/bannerCar.jpg'
import { Box, Typography } from '@mui/material';

const bannerBg = {
    flexGrow: 1,
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${loginBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
}


const Message = () => {
    const {id} = useParams();
    const url = `http://localhost:5000/notification/${id}`;
    
    const {data: notification, isLoading} = useQuery(['notification', id], ()=>fetch(url,{
         method: 'GET',
         headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
         }
    }).then(res=> res.json()));
    if(isLoading){
         return <Loading></Loading>
    }
    const {senderEmail, subject, body}= notification;
    return (
        <Box sx={bannerBg} style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'-5% -15px -5% -5%'}} >
            <Box 
            style={{
                // borderRadius: '5%',
                backgroundColor:'rgba(245, 227, 237, 0.85)',
            }} width={{xs:'90%',sm:'70%', md:'50%'}} borderRadius={{xs:2, sm:3, md:4}}>
               <Typography variant="h3" sx={{my:4, color: '#283747', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                   Notification
               </Typography>
               <Typography variant="h6" sx={{my:4, color: '#283747', fontWeight: 600, textAlign: 'center'}} fontSize={{xs:14, sm:16, lg:18}}>
                   Email: {senderEmail}
               </Typography>
               <Typography variant="h6" sx={{my:4, color: '#283747', fontWeight: 600, textAlign: 'center'}} fontSize={{xs:14, sm:16, lg:18}}>
                   Subject: {subject}
               </Typography>
               <Typography variant="h6" sx={{my:4, color: '#283747', fontWeight: 600, textAlign: 'center'}} fontSize={{xs:14, sm:16, lg:18}}>
                   Message: {body}
               </Typography>

            </Box>
        </Box>
    );
};

export default Message;