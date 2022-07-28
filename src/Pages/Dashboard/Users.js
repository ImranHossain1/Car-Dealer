import React from 'react';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

  
  
const Users = () => {
    const {data: users, isLoading, refetch} = useQuery('users', ()=>fetch('https://thawing-ridge-58827.herokuapp.com/users',{
        method: 'GET', 
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res=> res.json()));
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >No</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Role</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <UserRow key={index} user={user} index={index} refetch={refetch}/>
                    ))}
                </TableBody>
            </Table>
    </TableContainer>
    );
};

export default Users;