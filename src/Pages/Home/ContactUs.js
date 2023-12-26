import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Bounce, LightSpeed, Slide, Zoom } from "react-reveal";
mapboxgl.accessToken =
  "pk.eyJ1IjoiaW1yYW4xNDAyIiwiYSI6ImNsMXhhdjJ5bTAxMWUza25yaGZhM2FwZTMifQ.CJwentHAqRKYbjzMhr7L9w";
const CoontactUs = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [disabledButton, setDisabledButton] = useState(true);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [8.64508, 50.13053],
      zoom: 8,
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ color: "red" })
      .setLngLat([8.64508, 50.13053])
      .addTo(map);
  }, []);
  const onSubmit = async (data) => {
    const mail = {
      senderEmail: data.senderEmail,
      subject: data.subject,
      body: data.body,
      unread: true,
    };
    console.log(mail);
    fetch(
      "https://car-server-d4s0106ne-imranhossain1.vercel.app/notification",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(mail),
      }
    )
      .then((res) => res.json())
      .then((inserted) => {
        if (inserted.insertedId) {
          toast.success("Email send Successfully");
          reset();
        } else {
          toast.error("Failed to send email");
        }
      });
  };
  return (
    <Box sx={{ flexGrow: 1, mt: 3, my: 8 }}>
      <Box>
        <LightSpeed>
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
            About <span style={{ color: "orange" }}>Contact Us</span>
          </Typography>
        </LightSpeed>
        <Grid
          container
          spacing={{ md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          <Grid
            item
            xs={12}
            md={6}
            className="map-frame"
            height="600px"
            mr={{ xs: 0, md: 10 }}
          >
            <Zoom>
              <div id="map"></div>
            </Zoom>
          </Grid>
          <Grid item xs={12} md={5} height="650px" className="map-frame">
            <Zoom>
              <Card sx={{ minWidth: 275, border: 0, boxShadow: 0, p: 3 }}>
                <CardContent style={{ textAlign: "center" }}>
                  <Slide left>
                    <Typography
                      variant="h5"
                      style={{ fontWeight: 500, color: "gray" }}
                      component="div"
                      sx={{ mb: "15px" }}
                    >
                      If you have any query, Feel free to contact us.
                    </Typography>
                  </Slide>
                  <Bounce right>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box
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
                          sx={{ my: 3 }}
                          color="success"
                          id="outlined-basic1"
                          label="Email"
                          type="email"
                          variant="outlined"
                          {...register("senderEmail", {
                            required: {
                              value: true,
                              message: "Email is Required",
                            },
                            pattern: {
                              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                              message: "Provide a valid Email", // JS only: <p>error message</p> TS only support string
                            },
                          })}
                        />
                        <Stack sx={{ width: "100%" }}>
                          {errors.emailAddress?.type === "required" && (
                            <Alert severity="warning">
                              {errors.emailAddress.message}
                            </Alert>
                          )}
                          {errors.emailAddress?.type === "pattern" && (
                            <Alert severity="warning">
                              {errors.emailAddress.message}
                            </Alert>
                          )}
                        </Stack>
                        <TextField
                          fullWidth
                          sx={{ mb: 3 }}
                          color="success"
                          id="outlined-basic1"
                          label="Subject"
                          type="text"
                          variant="outlined"
                          {...register("subject", {
                            required: {
                              value: true,
                              message: "Subject is Required",
                            },
                          })}
                        />
                        <Stack sx={{ width: "100%", mb: 3 }}>
                          {errors.subject?.type === "required" && (
                            <Alert severity="warning">
                              {errors.subject.message}
                            </Alert>
                          )}
                        </Stack>
                        <TextField
                          fullWidth
                          sx={{ mb: 1 }}
                          id="outlined-multiline-static"
                          label="Your Message"
                          multiline
                          rows={6}
                          {...register("body", {
                            required: {
                              value: true,
                              message: "Message is Required",
                            },
                          })}
                        />
                        <Stack sx={{ width: "100%", mb: 3 }}>
                          {errors.body?.type === "required" && (
                            <Alert severity="warning">
                              {errors.body.message}
                            </Alert>
                          )}
                        </Stack>
                        {disabledButton ? (
                          <Button variant="contained" type="submit" fullWidth>
                            Send Now
                          </Button>
                        ) : (
                          <Button
                            disabled
                            variant="contained"
                            type="submit"
                            fullWidth
                          >
                            Send Now
                          </Button>
                        )}
                      </Box>
                    </form>
                  </Bounce>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CoontactUs;
