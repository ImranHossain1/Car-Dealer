import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Alert, Avatar, Rating, Stack, TextField, Typography } from '@mui/material';
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
const AddReview = ({openReview, handleReviewClose, bookedVehicle,vehicle, refetch, setReviewUpdate}) => {
    const {userName, address,phone, _id, cost, carId, userEmail}= bookedVehicle;
    const {img, vehicleModel} = vehicle;
    const { register, formState: { errors }, handleSubmit , reset} = useForm();
    const [disabledButton, setDisabledButton]= useState(true);
    const [rating, setRating] = useState(2);

    
    const onSubmit = data =>{
        setDisabledButton(false)  ;
        const review = {
            carId : carId,
            reviewerName : userName,
            reviewerEmail: userEmail,
            rating: rating,
            comment: data.comment
        }
        fetch('https://car-dealer-server-production.up.railway.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data=>{
                if(data.success){
                    toast(`Thanks for your valuable Review for our product`)
                    refetch();
                    setRating(2)
                    reset();
                    setDisabledButton(true);
                    handleReviewClose();
                    setReviewUpdate(1);
                }
                else{
                    toast.error(`An error has been occured, Please Try Again`)
                    setDisabledButton(true)
                    refetch()
                    reset();
                    setRating(2)
                    handleReviewClose()
                }

            }) 
        
    }
    return (
        <Modal
        open={openReview}
        onClose={handleReviewClose}
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
                    <Box style={{display:'flex', justifyContent:"space-between", width:'100%', marginBottom:'16px'}}>
                        <Typography component="legend">Rate the car</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                            setRating(newValue);
                            }}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        sx={{mb:1}}
                        id="outlined-multiline-static"
                        label="Add Comment"
                        multiline
                        rows={4}
                        {...register("comment", {
                            required:{
                                value: true,
                                message: "Comment is Required"
                            }
                        })}
                    />
                    <Stack sx={{ width: '100%', mb:3}} >
                        {errors.comment?.type === 'required'  && <Alert severity="warning" >{errors.comment.message}</Alert>}                    
                    </Stack>
                    {
                        disabledButton ?
                        <Button variant='contained' type='submit' fullWidth >AddReview</Button>:
                        <Button disabled variant='contained' type='submit' fullWidth >AddReview</Button>
                    }
                </Box>
            </form>
        </Box>
      </Modal>
    );
};

export default AddReview;