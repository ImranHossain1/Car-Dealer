import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };
const UserRoleUpdate = ({user,openRoleEdit, refetch,handleRoleEditClose}) => {
    const {_id, email, role, name} = user;
    const handleCancel= e=>{
        handleRoleEditClose(false)
    }
    const makeAdmin =()=>{
        //console.log(email);
        fetch(`https://thawing-ridge-58827.herokuapp.com/user/admin/${email}`,{
            method: 'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })        
        .then(res=>{
            if(res.status === 403){
                toast.error('Failed to make an Admin');
                handleRoleEditClose(false)
            }
            return res.json();
        })
        .then(data=>{
            if(data.result.modifiedCount > 0){
                refetch();
                toast.success(`Successfully made an admin`);
                handleRoleEditClose(false)
            }
            
        })
    }
    return (
        <Modal
        open={openRoleEdit}
        onClose={handleRoleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" style={{fontWeight:700, color:'#c0392b'}}>
            Are you sure, you want to make {name} Admin?
          </Typography>
          <Box style={{display:'flex', justifyContent:'end'}}>
            <Button onClick={makeAdmin} variant='contained' style={{marginRight: '15px', backgroundColor:'#a93226'}}>Confirm</Button>
            <Button variant='contained' onClick={handleCancel} style={{backgroundColor:'green'}}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    );
};

export default UserRoleUpdate;