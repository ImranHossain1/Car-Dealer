import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import UserRoleUpdate from './UserRoleUpdate';
import auth from '../../firebase.init';
import useUser from '../../hooks/useUser';


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
    const [openRoleEdit, setOpenRoleEdit] = useState(false);
    const handleRoleEditOpen = () => setOpenRoleEdit(true);
    const handleRoleEditClose = () => setOpenRoleEdit(false);
    
    return (
        <>
           <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                  {index+1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center" style={{fontSize:16,fontWeight:500}}>
                  {user.name }
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center" style={{fontSize:16,fontWeight:500}}>
                  {user.email}
              </StyledTableCell>
              <StyledTableCell align="center">
                {
                  user.role !== 'admin'? <Button variant='contained' style={{backgroundColor:'green'}} onClick={handleRoleEditOpen}>Make Admin</Button>:
                  <Typography variant='body' style={{fontSize:16,fontWeight:500}}>Admin</Typography>
                }
                </StyledTableCell>
            </StyledTableRow> 
            <UserRoleUpdate 
              user={user}
              openRoleEdit= {openRoleEdit}
              refetch={refetch}
              handleRoleEditClose={handleRoleEditClose}
            ></UserRoleUpdate>
        </>
    );
};

export default UserRow;