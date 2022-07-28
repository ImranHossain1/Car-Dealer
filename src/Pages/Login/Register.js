import { Alert, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useStyles from '../../hooks/useStyles';
import loginBg from '../../assets/images/CarouselImage/loginbg.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';
import Navbar from '../Shared/Navbar';
import PageTitle from '../Shared/PageTitle';
import { Slide, Zoom } from 'react-reveal';
const bannerBg = {
    flexGrow: 1,
    //padding: theme.spacing(3),
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${loginBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundColor: 'rgba(10,58,74,0.9)',
    backgroundBlendMode: 'hard-light '
}
const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth , {sendEmailVerification: true});
    let signInErrorMessage;
    let navigate = useNavigate();
    const classes = useStyles();
    const [signInWithGoogle, guser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user || guser)
    if(loading || gLoading || updating){
        return <Loading></Loading>
    }
    if(error || gError|| updateError){
        signInErrorMessage = <p className='text-red-500'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }

    if(token){
        navigate('/');
    }
    const onSubmit =async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };
    return (
        <>
        <PageTitle title="Registration"></PageTitle>
        <Navbar></Navbar>
        <Box sx={bannerBg} style={{display:'flex', alignItems:'center', justifyContent:'center'}} >
                 <Box 
                    style={{
                        // borderRadius: '5%',
                        backgroundColor:'rgba(245, 227, 237, 0.85)',
                    }} width={{xs:'90%',sm:'70%', md:'50%'}} borderRadius={{xs:2, sm:3, md:4}}>
                        <Slide top>
                        <Typography variant="h3" sx={{my:4, color: '#283747', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>
                            Please Register
                        </Typography>
                        </Slide>
                        <Zoom>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box paddingX={{xs:3 , sm:4, md:5, lg:10}} style={{display: 'flex', flexDirection:'column', color: 'gray', alignItems:'center', opacity:'1.0' }}>
                                <TextField 
                                    fullWidth
                                    color="success"
                                    id="outlined-basic3" 
                                    label="Name"
                                    type= 'text'
                                    variant="outlined" 
                                    {...register("name", {
                                        required:{
                                            value: true,
                                            message: "Name is Required"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Name should be atleast 3 character long' // JS only: <p>error message</p> TS only support string
                                        }
                                    })}/>
                                <Stack sx={{ width: '50%',  m: 1 }} >
                                    {errors.name?.type === 'required' &&<Alert severity="warning" >{errors.name.message}</Alert>}
                                    {errors.name?.type === 'minLength' && <Alert severity="warning">{errors.name.message}</Alert>}
                                </Stack>

                                <TextField 
                                    fullWidth
                                    color="success"
                                    id="outlined-basic1" 
                                    label="Email"
                                    type= 'email'
                                    variant="outlined" 
                                    {...register("email", {
                                        required:{
                                            value: true,
                                            message: "Email is Required"
                                        },
                                        pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                        }
                                    })}/>
                                <Stack sx={{ width: '50%',  m: 1 }} >
                                    {errors.email?.type === 'required' && <Alert severity="warning" >{errors.email.message}</Alert>}
                                    {errors.email?.type === 'pattern' && <Alert severity="warning">{errors.email.message}</Alert>}
                                </Stack>
                                <TextField 
                                    fullWidth
                                    color="success"
                                    id="outlined-basic2" 
                                    label="Password"
                                    type="password"
                                    variant="outlined" 
                                    {...register("password", {
                                        required:{
                                            value: true,
                                            message: "Password is Required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 character or longer' // JS only: <p>error message</p> TS only support string
                                        }
                                    })}/>
                                <Stack sx={{ width: '50%',  m: 1 }} >
                                    {errors.password?.type === 'required'  && <Alert severity="warning" >{errors.password.message}</Alert>}
                                    {errors.password?.type === 'minLength' && <Alert severity="warning"> {errors.password.message}</Alert>}
                                </Stack>
                                {signInErrorMessage}
                                <Button variant='contained' type='submit' fullWidth className={classes.btn}>Sign UP</Button>
                                <Typography sx={{my:2}} >
                                    <Link to='/login' className={classes.link} >Already Have an Accoount? Please login</Link>
                               </Typography>
                                <Divider sx={{ width:'50%', mb:5}}>OR</Divider>
                                <Button variant='contained' onClick={()=>signInWithGoogle()} className={classes.googlebtn} fullWidth sx={{mb:8}}>Google Sign In</Button>
                            </Box>
                        </form>
                        </Zoom>
                </Box>
        </Box>
        </>
    );
};

export default Register;