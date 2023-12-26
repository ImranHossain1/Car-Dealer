import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import {
  Alert,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const VehicleEditModal = ({
  openEdit,
  handleVehicleEditClose,
  vehicle,
  refetch,
}) => {
  //const [vehicles, isLoading, refetch] = useVehicles();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [disabledButton, setDisabledButton] = useState(true);
  const [vehicleCondition, setVehicleCondition] = useState(vehicle.condition);
  const [category, setCategory] = useState(vehicle.catagory);
  const [vehicleCompany, setVehicleCompany] = useState(vehicle.company);
  const [vehicleCost, setVehicleCost] = useState(vehicle.cost);
  const [vehicleQuantity, setVehicleQuantity] = useState(vehicle.quantity);
  const [vehicleModel, setVehicleModel] = useState(vehicle.vehicleModel);
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
  const handleConditionChange = (event) => {
    setVehicleCondition(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setVehicleCompany(event.target.value);
  };

  const onSubmit = (data) => {
    //console.log(data, vehicleCompany, vehicleCondition, category)
    const updatedVehicle = {
      company: vehicleCompany,
      category: category,
      condition: vehicleCondition,
      cost: data.cost,
      vehicleModel: data.vehicleModel,
      quantity: data.quantity,
    };
    //console.log(vehicle)
    fetch(
      `https://car-server-d4s0106ne-imranhossain1.vercel.app/vehicle/${vehicle._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updatedVehicle),
      }
    )
      .then((res) => res.json())
      .then((inserted) => {
        //console.log(inserted)
        if (inserted.result.modifiedCount === 1) {
          toast.success("Vehicle Updated Successfully");
          reset();
          refetch();
          handleVehicleEditClose();
          //navigate('/dashboard');
        } else {
          toast.error("Failed to Update Vehicle");
        }
      });
  };
  return (
    <Modal
      open={openEdit}
      onClose={handleVehicleEditClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
            <Avatar
              alt="Remy Sharp"
              src={vehicle.img}
              sx={{ width: 150, height: 150 }}
            />
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label3">Company</InputLabel>
              <Select
                labelId="demo-simple-select-label3"
                id="demo-simple-select3"
                value={vehicleCompany}
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
              defaultValue={vehicleModel}
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
                defaultValue={category}
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
                defaultValue={vehicleCondition}
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
              defaultValue={vehicleCost}
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
              defaultValue={vehicleQuantity}
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
            {disabledButton ? (
              <Button variant="contained" type="submit" fullWidth>
                Edit Vehicle
              </Button>
            ) : (
              <Button disabled variant="contained" type="submit" fullWidth>
                Edit Vehicle
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default VehicleEditModal;
