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
import UserRow from './UserRow';
import PurchasedCar from './PurchasedCar';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
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
  

  
  
const PurchasedCars = () => {
    const [deleteBooking, setDeleteBooking]= useState(null)
    const [user, loading] = useAuthState(auth);
    //console.log(user.email)
    //const navigate = useNavigate();
    const {data: bookedVehicles, isLoading, refetch} = useQuery(["bookedVehicles"], ()=>fetch(`https://thawing-ridge-58827.herokuapp.com/booking?user=${user.email}`,{
        method: 'GET', 
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res=>res.json()));

    if(loading || isLoading){
        return <Loading></Loading>
    }
    return (
        <TableContainer component={Paper}>
            <PageTitle title="My Cars"></PageTitle>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >No</StyledTableCell>
                        <StyledTableCell >Vehicle Image</StyledTableCell>
                        <StyledTableCell >Name</StyledTableCell>
                        <StyledTableCell >Vehicle Company</StyledTableCell>
                        <StyledTableCell >Vehicle Model</StyledTableCell>
                        <StyledTableCell >Address</StyledTableCell>
                        <StyledTableCell >Phone</StyledTableCell>
                        <StyledTableCell >cost</StyledTableCell>
                        <StyledTableCell align="center">Payment</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookedVehicles?.map((bookedVehicle, index) => (
                        <PurchasedCar key={index} bookedVehicle={bookedVehicle} index={index} refetch={refetch}/>
                    ))}
                </TableBody>
            </Table>
    </TableContainer>
    );
};

export default PurchasedCars;