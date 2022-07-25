import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import EditLocationAltSharpIcon from '@mui/icons-material/EditLocationAltSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import VehicleEditModal from './VehicleEditModal';
import VehicleDeleteModal from './VehicleDeleteModal';
import useVehicles from '../../hooks/useVehicles';
import VehicleListRow from './VehicleListRow';
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
 
const VehicleList = () => {
    const [editVehicle, setEditVehicle] = useState(null)
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleVehicleEditOpen = () => setOpenEdit(true);
    const handleVihicleEditClose = () => setOpenEdit(false);
    const handleVehicleDeleteOpen = () => setOpenDelete(true);
    const handleVihicleDeleteClose = () => setOpenDelete(false);

    const [vehicles, isLoading, refetch] = useVehicles()
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <>
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >No</StyledTableCell>
                        <StyledTableCell >
                          Vehicle
                        </StyledTableCell>
                        <StyledTableCell align="right">Company</StyledTableCell>
                        <StyledTableCell align="right">Model</StyledTableCell>
                        <StyledTableCell align="right">Category</StyledTableCell>
                        <StyledTableCell align="right">Condition</StyledTableCell>
                        <StyledTableCell align="right">Cost</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle, index) => (
                       <VehicleListRow key={vehicle._id} vehicle={vehicle} index={index} refetch={refetch}></VehicleListRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        

        </>
    );
};

export default VehicleList;