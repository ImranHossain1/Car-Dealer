import {
  Alert,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Navbar from "../Shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import PageTitle from "../Shared/PageTitle";
const ConfirmVehicle = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const url = `https://car-dealer-server-production-4828.up.railway.app/vehicle/${id}`;
  const {
    data: vehicle,
    isLoading,
    refetch,
  } = useQuery(["vehicle", id], () =>
    fetch(url, {
      method: "GET",
    }).then((res) => res.json())
  );
  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  //console.log(vehicle)
  const { _id, company, catagory, cost, img, quantity } = vehicle;
  const onSubmit = (e) => {
    const confirmBooking = {
      carId: _id,
      cost: cost,
      userName: user.displayName,
      userEmail: user.email,
      phone: e.phone,
      address: e.address,
    };
    const SubQuantity = {
      quantity: quantity - 1,
    };
    fetch(
      `https://car-dealer-server-production-4828.up.railway.app/vehicle/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(SubQuantity),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetch(
            "https://car-dealer-server-production-4828.up.railway.app/bookedVehicle",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(confirmBooking),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                toast(`You have confirm a ${catagory}, from ${company}`);
                navigate("/dashboard");
              } else {
                toast.error(
                  `Already have brought a ${catagory} from ${company}`
                );
              }
              reset();
            });
        } else {
          toast.error(`This car is Temporarily Unavailable from our stock`);
        }
      });
  };
  //console.log(user.displayName)
  return (
    <>
      <PageTitle title="Confirm Vehicle"></PageTitle>
      <Navbar></Navbar>
      <Box sx={{ flexGrow: 1, my: 15 }}>
        <Container disableGutters>
          <Box>
            <Typography
              variant="h3"
              sx={{
                my: 5,
                color: "#1C2833",
                fontWeight: 800,
                textAlign: "center",
              }}
              fontSize={{ xs: 20, sm: 30, lg: 40 }}
            >
              Please Confirm your Favourite Car
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={6} className="pics">
                <img
                  src={vehicle.img}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    disabled
                    fullWidth
                    color="success"
                    id="outlined-basic3"
                    value={user.displayName}
                    label="Name"
                    {...register("name")}
                  ></TextField>
                  <TextField
                    sx={{ my: 2 }}
                    disabled
                    fullWidth
                    color="success"
                    id="outlined-basic3"
                    value={user.email}
                    label="email"
                    {...register("email")}
                  ></TextField>
                  <TextField
                    fullWidth
                    color="success"
                    id="outlined-basic2"
                    label="Address"
                    type="text"
                    variant="outlined"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Address is Required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 10 character or longer", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />
                  <Stack sx={{ width: "50%", m: 1 }}>
                    {errors.address?.type === "required" && (
                      <Alert severity="warning">{errors.address.message}</Alert>
                    )}
                    {errors.address?.type === "minLength" && (
                      <Alert severity="warning">
                        {" "}
                        {errors.address.message}
                      </Alert>
                    )}
                  </Stack>

                  <TextField
                    fullWidth
                    color="success"
                    id="outlined-basic2"
                    label="Phone Number"
                    type="number"
                    variant="outlined"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Phone number is Required",
                      },
                      minLength: {
                        value: 11,
                        message: "Must be 11 character or longer", // JS only: <p>error message</p> TS only support string
                      },
                      maxLength: {
                        value: 14,
                        message: "Invalid Phone Number", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />
                  <Stack sx={{ width: "50%", m: 1 }}>
                    {errors.phone?.type === "required" && (
                      <Alert severity="warning">{errors.phone.message}</Alert>
                    )}
                    {errors.phone?.type === "minLength" && (
                      <Alert severity="warning"> {errors.phone.message}</Alert>
                    )}
                    {errors.phone?.type === "maxLength" && (
                      <Alert severity="warning"> {errors.phone.message}</Alert>
                    )}
                  </Stack>
                  <TextField
                    disabled
                    fullWidth
                    sx={{ mb: 3 }}
                    color="success"
                    id="outlined-basic3"
                    value={vehicle.cost}
                    label="Price"
                    {...register("name")}
                  ></TextField>

                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    className={classes.btn}
                  >
                    Confirm Now
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ConfirmVehicle;
