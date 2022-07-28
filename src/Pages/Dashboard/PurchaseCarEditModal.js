import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Alert, Avatar, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { toast } from 'react-toastify';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const PurchaseCardEditModal = ({openEdit, handlePurchasedCarEditClose, bookedVehicle,vehicle, refetch}) => {
    const {userName, address,phone, _id, cost}= bookedVehicle;
    const {img, vehicleModel} = vehicle;
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const [disabledButton, setDisabledButton]= useState(true);
    

    const onSubmit = data =>{
        setDisabledButton(false)
        const updatedOrder= {
           address: data.address,
           phone: data.phone
        }
        //console.log(vehicle)
        fetch(`https://thawing-ridge-58827.herokuapp.com/bookedVehicle/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(updatedOrder)
                })
                .then(res=>res.json())
                .then(inserted=>{
                     //console.log(inserted)
                     if(inserted.result.modifiedCount === 1){
                       toast.success('Order Detail Updated Successfully');
                       reset();
                       refetch();
                       handlePurchasedCarEditClose();
                       //navigate('/dashboard');
                   }
                   else{
                       toast.error('Failed to Update Order Detail')
                   } 
                   setDisabledButton(true)
                })
        
    }
    return (
        <Modal
        open={openEdit}
        onClose={handlePurchasedCarEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
                <Box  style={{display: 'flex', flexDirection:'column', color: 'gray', alignItems:'center', opacity:'1.0' }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={vehicle.img}
                        sx={{ width: 150, height: 150 , mb:5}}
                    />
                    
                    <TextField 
                        disabled
                        fullWidth
                        sx={{mb:3}}
                        color="success"
                        id="outlined-basic1" 
                        label="User Name"
                        type= 'text'
                        defaultValue={userName}
                        variant="outlined" 
                        />
                    
                    <TextField 
                        disabled
                        fullWidth
                        sx={{mb:3}}
                        color="success"
                        id="outlined-basic1" 
                        label="Model"
                        type= 'text'
                        defaultValue={vehicleModel}
                        variant="outlined" 
                        />
                    
                    
                    <TextField 
                        fullWidth
                        color="success"
                        id="outlined-basic2" 
                        label="Address"
                        defaultValue={address}
                        type="text"
                        variant="outlined" 
                        {...register("address", {
                            required:{
                                value: true,
                                message: "Address is Required"
                            }
                        })}/>
                    <Stack sx={{ width: '50%',  m: 1 }} >
                        {errors.address?.type === 'required'  && <Alert severity="warning" >{errors.address.message}</Alert>}                    
                    </Stack>
                    <TextField 
                        fullWidth
                        color="success"
                        id="outlined-basic2" 
                        label="Address"
                        defaultValue={phone}
                        type="text"
                        variant="outlined" 
                        {...register("phone", {
                            required:{
                                value: true,
                                message: "Phone Number is Required"
                            }
                        })}/>
                    <Stack sx={{ width: '50%',  m: 1 }} >
                        {errors.phone?.type === 'required'  && <Alert severity="warning" >{errors.phone.message}</Alert>}                    
                    </Stack>
                    {
                        disabledButton ?
                        <Button variant='contained' type='submit' fullWidth >Edit Details</Button>:
                        <Button disabled variant='contained' type='submit' fullWidth >Edit Details</Button>
                    }
                </Box>
            </form>
        </Box>
      </Modal>
    );
};

export default PurchaseCardEditModal;