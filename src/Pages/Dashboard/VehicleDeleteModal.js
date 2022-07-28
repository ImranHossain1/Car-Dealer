import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };
const VehicleDeleteModal = ({openDelete, handleVehicleDeleteClose, vehicle, refetch}) => {
    const {vehicleModel, _id} = vehicle;
    const handleDelete = ()=>{
        fetch(`https://thawing-ridge-58827.herokuapp.com/vehicle/${_id}`,{
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            if(data.deletedCount){
                toast.success(`Vehicle: ${vehicleModel} is deleted successfully`)
                handleVehicleDeleteClose(false)
                refetch();
            }
        })
        //console.log(_id)
    }
    const handleCancel= e=>{
      handleVehicleDeleteClose(false)
    }
    return (
        <Modal
        open={openDelete}
        onClose={handleVehicleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style} width={{xs:380, sm:500, md:600}}>
          <Typography id="modal-modal-title" variant="h5" component="h2" style={{fontWeight:700, color:'#c0392b'}}>
            Are you sure that you want to Delete {vehicleModel}?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please enter confirm if you want to delete the car. Be careful, if you delete this car might cause some issue on the app.
          </Typography>
          <Box  display='flex' justifyContent={{xs:'center', md:'end'}} sx={{mt:2}}>
            <Button onClick={()=>handleDelete()} variant='contained' style={{marginRight: '15px', backgroundColor:'#a93226'}}>Confirm</Button>
            <Button variant='contained' onClick={handleCancel} style={{backgroundColor:'green'}}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    );
};

export default VehicleDeleteModal;