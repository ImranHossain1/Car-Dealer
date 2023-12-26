import { Grid, Pagination, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import Vehicle from "./Vehicle";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { useParams } from "react-router-dom";

const ConditionalCars = () => {
  const { condition } = useParams();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [vehicles, setVehicles] = useState([]);
  //const condition= 'Premium'
  function handlePagination(event, page) {
    setPage(page - 1);
    window.scroll(0, 0);
  }
  useEffect(() => {
    fetch(
      `https://car-server-d4s0106ne-imranhossain1.vercel.app/vehicles?page=${page}&size=${size}&condition=${condition}`
    )
      .then((res) => res.json())
      .then((data) => setVehicles(data));
  }, [page, size]);

  useEffect(() => {
    fetch(
      `https://car-server-d4s0106ne-imranhossain1.vercel.app/vehicleCount/${condition}`
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.count)
        const count = data.count;
        const pages = Math.ceil(count / 10);
        setPageCount(pages);
      });
  }, []);
  //console.log(vehicles)
  return (
    <>
      <Navbar></Navbar>
      <Box sx={{ mt: 15 }}>
        <Typography
          variant="h3"
          sx={{ my: 5, color: "#1C2833", fontWeight: 800, textAlign: "center" }}
          fontSize={{ xs: 20, sm: 30, lg: 40 }}
        >
          Explore our <span style={{ color: "orange" }}>{condition}</span> Cars
        </Typography>
        <Container style={{ padding: "20px" }}>
          <Grid
            container
            spacing={{ xs: 3, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {vehicles?.map((vehicle) => (
              <Vehicle key={vehicle._id} vehicle={vehicle}></Vehicle>
            ))}
          </Grid>
          {pageCount > 1 && (
            <Pagination
              count={pageCount}
              onChange={handlePagination}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              sx={{ my: 5 }}
              style={{ display: "flex", justifyContent: "center" }}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default ConditionalCars;
