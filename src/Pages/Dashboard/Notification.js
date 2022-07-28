import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Button, TableCell, tableCellClasses, TableRow, Tooltip } from '@mui/material';
import EditLocationAltSharpIcon from '@mui/icons-material/EditLocationAltSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import NotificationDeleteModal from './NotificationDeleteModal';
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

const Notification = ({unread, message, handleNotification , index, refetch}) => {
        
    const [openDelete, setOpenDelete] = useState(false);
    const handleNotificationDeleteOpen = () => setOpenDelete(true);
    const handleNotificationDeleteClose = () => setOpenDelete(false);
    return (
        <>
            {
              !unread ? 
                  <StyledTableRow key={message._id}>
                    <StyledTableCell>{message.senderEmail}</StyledTableCell>
                    <StyledTableCell align="center">{message.subject}</StyledTableCell>

                    <StyledTableCell align="center">
                            {
                                message.unread?  
                                <Link to={`/dashboard/notification/${message._id}`} style={{textDecoration:'none'}} onClick={()=>handleNotification(message._id)}><Button variant='contained' style={{backgroundColor:'green'}}>unread</Button></Link>
                                : 
                                <Link to={`/dashboard/notification/${message._id}`}  style={{textDecoration:'none'}}><Button variant='contained'>Read</Button></Link>
                            }
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Tooltip title="Delete">
                            <DeleteIcon  onClick={handleNotificationDeleteOpen} sx={{color:'red', ml:1}} fontSize="large"></DeleteIcon>
                        </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                  :
                  <>
                  {
                    message.unread && 
                    <StyledTableRow key={message._id}>
                    <StyledTableCell>{message.senderEmail}</StyledTableCell>
                    <StyledTableCell align="center">{message.subject}</StyledTableCell>
    
                    <StyledTableCell align="center">
                        <Link to={`/dashboard/notification/${message._id}`} style={{textDecoration:'none'}} onClick={()=>handleNotification(message._id)}><Button variant='contained' style={{backgroundColor:'green'}}>unread</Button></Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Tooltip title="Delete">
                            <DeleteIcon  onClick={handleNotificationDeleteOpen} sx={{color:'red', ml:1}} fontSize="large"></DeleteIcon>
                        </Tooltip>
                    </StyledTableCell>
                    </StyledTableRow>
                  }
                  </>
            }
            <NotificationDeleteModal
            message={message}
            refetch={refetch}
            openDelete={openDelete}
            handleNotificationDeleteClose={handleNotificationDeleteClose}
            />
        </>
    );
};

export default Notification;