import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, Rating, Tooltip, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';
import EditLocationAltSharpIcon from '@mui/icons-material/EditLocationAltSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import PurchaseCarEditModal from './PurchaseCarEditModal';
import PurchaseCarDeleteModal from './PurchaseCarDeleteModal';
import AddReview from './AddReview';
import { useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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

  
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });
const PurchasedCar = ({bookedVehicle, index, refetch}) => {
    const {userName, userEmail, cost, _id, address,carId, phone, paid, transactionId} = bookedVehicle;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [review, setReview]= useState([])
    const [reviewUpdate, setReviewUpdate]= useState(0)
    const handlePurchasedCarEditOpen = () => setOpenEdit(true);
    const handlePurchasedCarEditClose = () => setOpenEdit(false);
    
    const handleReviewOpen = () => setOpenReview(true);
    const handleReviewClose = () => setOpenReview(false);
    
    const handlePurchasedCarDeleteOpen = () => setOpenDelete(true);
    const handlePurchasedCarDeleteClose = () => setOpenDelete(false);
    useEffect(()=>{
            fetch(`https://thawing-ridge-58827.herokuapp.com/review?carId=${carId}&userEmail=${userEmail}`)
            .then(res=>res.json())
            .then(data=>{
                if(data){
                    setReview(data)
                }
                else{
                    setReview([])
                }
            })
    },[carId, userEmail, reviewUpdate])    

    const url = `https://thawing-ridge-58827.herokuapp.com/vehicle/${carId}`
    const {data:vehicle, isLoading} = useQuery(['vehicle', carId], ()=>fetch(url,{
        method: 'GET'
    }).then(res=>res.json()));

    if(isLoading){
        return <Loading></Loading>
    }
    const {company, vehicleModel, img} = vehicle
    return (
        <>
           <StyledTableRow key={_id}>
              <StyledTableCell component="th" scope="row">
                  {index+1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  <Avatar alt="Remy Sharp" src={img} />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  {userName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  {company}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  {vehicleModel}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  {address}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  {phone}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                  {cost}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{textAlign:'center'}}>
                    {(cost && !paid) && <Link style={{textDecoration:'none'}} to={`/dashboard/payment/${_id}`}><Button variant="contained">Pay Now</Button></Link>}
                    {(cost && paid) && <div >
                            <Typography>Paid</Typography>
                            <Typography variant='body2'>Transaction id: <span>{transactionId}</span></Typography>
                    </div>}
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                    paid ? review?.rating ? <StyledRating
                    name="customized-color"
                    defaultValue={review.rating}
                    readOnly
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />: <Button onClick={handleReviewOpen} variant='contained' style={{backgroundColor:'#d4ac0d'}}>Review</Button>
                    :
                    <>
                            <Tooltip title="Edit">
                            <EditLocationAltSharpIcon onClick={handlePurchasedCarEditOpen} sx={{color:'green'}} fontSize="large"></EditLocationAltSharpIcon> 
                           </Tooltip>
                           <Tooltip title="Delete">
                            <DeleteIcon onClick={handlePurchasedCarDeleteOpen} sx={{color:'red', ml:1}} fontSize="large"></DeleteIcon>
                           </Tooltip>
                    </>
                }
              </StyledTableCell>
            </StyledTableRow>
            <AddReview
                setReviewUpdate= {setReviewUpdate}
                bookedVehicle={bookedVehicle}
                vehicle={vehicle}
                openReview= {openReview}
                refetch={refetch}
                handleReviewClose={handleReviewClose}
            ></AddReview>
             <PurchaseCarEditModal
                bookedVehicle={bookedVehicle}
                vehicle={vehicle}
                openEdit= {openEdit}
                refetch={refetch}
                handlePurchasedCarEditClose={handlePurchasedCarEditClose}
            />
            <PurchaseCarDeleteModal
            bookedVehicle={bookedVehicle}
            refetch={refetch}
            openDelete={openDelete}
            handlePurchasedCarDeleteClose={handlePurchasedCarDeleteClose}
            /> 
        </>
    );
};

export default PurchasedCar;