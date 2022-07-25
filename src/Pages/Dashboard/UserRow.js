import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const UserRow = ({user, index, refetch}) => {
    const {_id, email, role, name} = user
    const makeAdmin =()=>{
        console.log(email);
        fetch(`http://localhost:5000/user/admin/${email}`,{
            method: 'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })        
        .then(res=>{
            if(res.status === 403){
                toast.error('Failed to make an Admin');
            }
            return res.json();
        })
        .then(data=>{
            if(data.result.modifiedCount > 0){
                refetch();
                toast.success(`Successfully made an admin`);
            }
            
        })
    }
    return (
        <>
           <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                  {index+1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  {user.email}
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  user.role !== 'admin'? <Button onClick={makeAdmin}>Make Admin</Button>:
                  <Typography>Admin</Typography>
                }
                </StyledTableCell>
              <StyledTableCell align="right">delete</StyledTableCell>
            </StyledTableRow> 
        </>
    );
};

export default UserRow;