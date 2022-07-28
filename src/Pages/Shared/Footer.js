import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import useStyles from '../../hooks/useStyles';
const Footer = () => {
    const classes = useStyles();
    return (
        <footer>
            <Box bgcolor="#0A2357" >
                <Container sx={{pt:8 , pb:2}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} style={{color: "White"}}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
                                <Typography variant='h5'>
                                    Car Dealer
                                </Typography>
                                <Typography style={{color: 'gray'}}>
                                    Copyright © 2022 
                                    <br/> MD IMRAN HOSSAIN
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
    
                                <Typography variant='h5'>
                                    USEFUL LINKS
                                </Typography>
                                <Box style={{display:'flex', flexDirection: 'column' }}>
                                    <Link to='/' className={classes.link} >About us</Link>
                                    <Link to='/' className={classes.link}>Our Services</Link>
                                    <Link to='/' className={classes.link}>Information</Link>
                                    <Link to='/' className={classes.link}>Privacy Policy</Link>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
                                <Typography variant='h5'>
                                    Our Community
                                </Typography>
                                <Box style={{display:'flex', flexDirection: 'column' }}>
                                    <Link to='/' className={classes.link}>Community</Link>
                                    <Link to='/' className={classes.link}>Blog</Link>
                                    <Link to='/' className={classes.link}>Forum</Link>
                                    <Link to='/' className={classes.link}>Meetups</Link>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
                                <Typography variant='h5'>
                                    LEGAL
                                </Typography>
                                <Box style={{display:'flex', flexDirection: 'column' }}>
                                    <Link to='/' className={classes.link}>Terms of use</Link>
                                    <Link to='/' className={classes.link}>Privacy</Link>
                                    <Link to='/' className={classes.link}>Cookie policy</Link>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{mt:4}} style={{display:'flex', justifyContent:'center'}}>
                        <a href='https://www.facebook.com/imran1402/'><FacebookRoundedIcon style={{color: "#03B3FA"}} fontSize="large"></FacebookRoundedIcon></a>
                        <a href="https://github.com/ImranHossain1"><GitHubIcon style={{color: "white"}} sx={{mx: 5}} fontSize="large"></GitHubIcon></a>
                        <a href="https://www.instagram.com/imranhsn14/"><InstagramIcon style={{color: "#F0622D"}} fontSize="large"></InstagramIcon></a>
                    </Box>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;