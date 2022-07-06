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
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
const Users = () => {
    const {data: users, isLoading, refetch} = useQuery('users', ()=>fetch('http://localhost:5000/users',{
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
                        <StyledTableCell >Email</StyledTableCell>
                        <StyledTableCell align="right">Role</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <StyledTableRow key={user._id}>
                          <StyledTableCell component="th" scope="row">
                              {index+1}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                              {user.email}
                          </StyledTableCell>
                          <StyledTableCell align="right">{user.role || "Make Admin"}</StyledTableCell>
                          <StyledTableCell align="right">delete</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
    </TableContainer>
    );
};

export default Users;