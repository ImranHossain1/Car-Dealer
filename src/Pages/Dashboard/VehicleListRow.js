import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, TableCell, tableCellClasses, TableRow, Tooltip } from '@mui/material';
import EditLocationAltSharpIcon from '@mui/icons-material/EditLocationAltSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import VehicleEditModal from './VehicleEditModal';
import VehicleDeleteModal from './VehicleDeleteModal';
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
  
const VehicleListRow = ({vehicle, index, refetch}) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleVehicleEditOpen = () => setOpenEdit(true);
    const handleVehicleEditClose = () => setOpenEdit(false);
    const handleVehicleDeleteOpen = () => setOpenDelete(true);
    const handleVehicleDeleteClose = () => setOpenDelete(false);
    return (
        <>
            <StyledTableRow key={vehicle._id}>
                          <StyledTableCell component="th" scope="row">
                              {index+1}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                              <Avatar alt="Remy Sharp" src={vehicle.img} />
                          </StyledTableCell>
                          <StyledTableCell align="right">{vehicle.company}</StyledTableCell>
                          <StyledTableCell align="right">{vehicle.vehicleModel}</StyledTableCell>
                          <StyledTableCell align="right">{vehicle.catagory}</StyledTableCell>
                          <StyledTableCell align="right">{vehicle.condition}</StyledTableCell>
                          <StyledTableCell align="right">{vehicle.cost}</StyledTableCell>
                          <StyledTableCell align="right">{vehicle.quantity || '0'}</StyledTableCell>
                          <StyledTableCell align="right">
                          <Tooltip title="Edit">
                            <EditLocationAltSharpIcon onClick={handleVehicleEditOpen} sx={{color:'green'}} fontSize="large"></EditLocationAltSharpIcon> 
                           </Tooltip>
                           <Tooltip title="Delete">
                            <DeleteIcon onClick={handleVehicleDeleteOpen} sx={{color:'red', ml:1}} fontSize="large"></DeleteIcon>
                           </Tooltip>
                          </StyledTableCell>
            </StyledTableRow>
            <VehicleEditModal
                vehicle={vehicle}
                openEdit= {openEdit}
                refetch={refetch}
                handleVehicleEditClose={handleVehicleEditClose}
            />
            <VehicleDeleteModal
            vehicle={vehicle}
            refetch={refetch}
            openDelete={openDelete}
            handleVehicleDeleteClose={handleVehicleDeleteClose}
            />
        </>
    );
};

export default VehicleListRow;