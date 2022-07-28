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
import useVehicles from '../../hooks/useVehicles';
import VehicleListRow from './VehicleListRow';
import PageTitle from '../Shared/PageTitle';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
 
const VehicleList = () => {
    const [vehicles, isLoading, refetch] = useVehicles()
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <>
        <PageTitle title="Vehicle List"></PageTitle>
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