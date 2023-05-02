import {
  Alert,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useStyles from "../../hooks/useStyles";
import loginBg from "../../assets/images/CarouselImage/loginbg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import useToken from "../../hooks/useToken";
import Navbar from "../Shared/Navbar";
import PageTitle from "../Shared/PageTitle";
import { Slide, Zoom } from "react-reveal";
const bannerBg = {
  flexGrow: 1,
  //padding: theme.spacing(3),
  height: "100vh",
  textAlign: "center",
  backgroundImage: `url(${loginBg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundColor: "rgba(10,58,74,0.9)",
  backgroundBlendMode: "hard-light ",
};
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  let signInErrorMessage;
  const [signInWithGoogle, guser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [token] = useToken(user || guser);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  if (loading || gLoading) {
    return <Loading></Loading>;
  }
  if (error || gError) {
    signInErrorMessage = (
      <Typography color="#a93226" sx={{ mb: 1 }}>
        <small>{error?.message || gError?.message}</small>
      </Typography>
    );
  }

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  //console.log(user)
  return (
    <>
      <PageTitle title="Login"></PageTitle>
      <Navbar></Navbar>
      <Box
        sx={bannerBg}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            // borderRadius: '5%',
            backgroundColor: "rgba(245, 227, 237, 0.85)",
          }}
          width={{ xs: "90%", sm: "70%", md: "50%" }}
          borderRadius={{ xs: 2, sm: 3, md: 4 }}
        >
          <Slide top>
            <Typography
              variant="h3"
              sx={{
                my: 4,
                color: "#283747",
                fontWeight: 800,
                textAlign: "center",
              }}
              fontSize={{ xs: 20, sm: 30, lg: 40 }}
            >
              Login
            </Typography>
          </Slide>
          <Zoom>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                paddingX={{ xs: 3, sm: 4, md: 5, lg: 10 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "gray",
                  alignItems: "center",
                  opacity: "1.0",
                }}
              >
                <TextField
                  fullWidth
                  color="success"
                  id="outlined-basic1"
                  label="Email"
                  type="email"
                  variant="outlined"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <Stack sx={{ width: "50%", m: 1 }}>
                  {errors.email?.type === "required" && (
                    <Alert severity="warning">{errors.email.message}</Alert>
                  )}
                  {errors.email?.type === "pattern" && (
                    <Alert severity="warning">{errors.email.message}</Alert>
                  )}
                </Stack>
                <TextField
                  fullWidth
                  color="success"
                  id="outlined-basic2"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 character or longer", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                />
                <Stack sx={{ width: "50%", m: 1 }}>
                  {errors.password?.type === "required" && (
                    <Alert severity="warning">{errors.password.message}</Alert>
                  )}
                  {errors.password?.type === "minLength" && (
                    <Alert severity="warning"> {errors.password.message}</Alert>
                  )}
                </Stack>
                {signInErrorMessage}
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  className={classes.btn}
                >
                  Login
                </Button>
                <Typography sx={{ my: 2 }}>
                  <Link to="/registration" className={classes.link}>
                    Don't have any account? Please Register
                  </Link>
                </Typography>
                <Divider sx={{ width: "50%", mb: 5 }}>OR</Divider>
                <Button
                  variant="contained"
                  onClick={() => signInWithGoogle()}
                  className={classes.googlebtn}
                  fullWidth
                  sx={{ mb: 8 }}
                >
                  Google Sign In
                </Button>
              </Box>
            </form>
          </Zoom>
        </Box>
      </Box>
    </>
  );
};

export default Login;
