import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PageTitle from "../Shared/PageTitle";

const AddViechels = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [disabledButton, setDisabledButton] = useState(true);
  const [condition, setCondition] = useState("Exclusive");
  const [category, setCategory] = useState("Sedan");
  const [company, setCompany] = useState("Audi");
  const categories = [
    "Sedan",
    "Sport",
    "Super Car",
    "Luxury",
    "Pickups",
    "SUV",
    "Truck",
    "Van",
  ];
  const conditions = ["Exclusive", "Premium", "New", "Used"];
  const companies = [
    "BMW",
    "Audi",
    "Mercedes-Benz",
    "Ferrari",
    "Volvo",
    "Porsche",
  ];
  const imgStrorageKey = "634b89a1202c978f0b0218c7ddea37ca";
  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };
  const onSubmit = (data) => {
    setDisabledButton(false);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStrorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const vehicle = {
            company: company,
            vehicleModel: data.vehicleModel,
            catagory: category,
            condition: condition,
            cost: data.cost,
            quantity: data.quantity,
            img: img,
          };
          //send data to db
          fetch("https://car-dealer-server-production.up.railway.app/vehicle", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(vehicle),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("New Travel Destination Added Successfully");
                reset();
                setCondition("Exclusive");
                setCompany("BMW");
                setCategory("Sedan");
                setDisabledButton(true);
              } else {
                toast.error("Failed to add this Destination");
                setCondition("Exclusive");
                setCompany("BMW");
                setCategory("Sedan");
                setDisabledButton(true);
              }
            });
        }
        //console.log('imgBB', result)
      });
    //console.log(location)
  };
  return (
    <>
      <PageTitle title="Add Vehicle"></PageTitle>
      <Box sx={{ mb: 12 }}>
        <Typography
          variant="h3"
          sx={{ my: 4, color: "#283747", fontWeight: 800, textAlign: "center" }}
          fontSize={{ xs: 20, sm: 25, lg: 30 }}
        >
          Add a new Vehicle
        </Typography>
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
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label3">Company</InputLabel>
              <Select
                labelId="demo-simple-select-label3"
                id="demo-simple-select3"
                value={company}
                label="Company"
                onChange={handleCompanyChange}
              >
                {companies.map((com) => (
                  <MenuItem key={com} value={com}>
                    {com}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              color="success"
              id="outlined-basic1"
              label="Model"
              type="text"
              variant="outlined"
              {...register("vehicleModel", {
                required: {
                  value: true,
                  message: "Model is Required",
                },
              })}
            />
            <Stack sx={{ width: "50%", m: 1 }}>
              {errors.vehicleModel?.type === "required" && (
                <Alert severity="warning">{errors.vehicleModel.message}</Alert>
              )}
            </Stack>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">Condition</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={condition}
                label="Condition"
                onChange={handleConditionChange}
              >
                {conditions.map((con) => (
                  <MenuItem key={con} value={con}>
                    {con}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              color="success"
              id="outlined-basic2"
              label="Price"
              type="number"
              variant="outlined"
              {...register("cost", {
                required: {
                  value: true,
                  message: "Cost is Required",
                },
              })}
            />
            <Stack sx={{ width: "50%", m: 1 }}>
              {errors.cost?.type === "required" && (
                <Alert severity="warning">{errors.cost.message}</Alert>
              )}
            </Stack>
            <TextField
              fullWidth
              color="success"
              id="outlined-basic2"
              label="Quantity"
              type="number"
              variant="outlined"
              {...register("quantity", {
                required: {
                  value: true,
                  message: "Quantity is Required",
                },
              })}
            />
            <Stack sx={{ width: "50%", m: 1 }}>
              {errors.quantity?.type === "required" && (
                <Alert severity="warning">{errors.quantity.message}</Alert>
              )}
            </Stack>
            <TextField
              fullWidth
              color="success"
              id="outlined-basic2"
              type="file"
              variant="outlined"
              {...register("image", {
                required: {
                  value: true,
                  message: "image is Required",
                },
              })}
            />
            <Stack sx={{ width: "50%", m: 1 }}>
              {errors.image?.type === "required" && (
                <Alert severity="warning">{errors.image.message}</Alert>
              )}
            </Stack>
            {disabledButton ? (
              <Button variant="contained" type="submit" fullWidth>
                Add a new Vehicle
              </Button>
            ) : (
              <Button disabled variant="contained" type="submit" fullWidth>
                Add a new Vehicle
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddViechels;
