import { FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import Vehicle from './Vehicle';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { useParams } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';
import { Fade, LightSpeed, Zoom } from 'react-reveal';

const Vehicles = () => {
    let {cons} = useParams();
    let cond, cat, com;
    if(cons === 'Exclusive'|| cons === 'Premium'  ||cons === 'New' || cons ==='Used'){
        //console.log("condition :" ,cons)  
        cond = cons
    }
    else if( cons === 'Sedan'|| cons ==='Sport'|| cons ==='Super Car'|| cons ==='Luxury'|| cons ==='Pickups'|| cons ==='SUV'|| cons ==='Truck'|| cons ==='Van' ){
        //console.log("Category :" ,cons)
        cat = cons
    }
    else if ( cons === 'BMW'|| cons ==='Audi'||cons === 'Mercedes-Benz'||cons === 'Ferrari'|| cons ==='Volvo'||cons === 'Porsche'){
        //console.log("Company :" ,cons)
        com = cons
    }
    else {
        cond = ''
        cat =''
        com = ''
    }

    //console.log(cond, cat, com) 
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);
    const [vehicles, setVehicles] = useState([]);
    const [condition, setCondition] = useState(cond || '')
    const [category, setCategory] = useState(cat || '')
    const [company, setCompany] = useState(com || '')
    function handlePagination (event, page) {
        setPage (page-1)
        window.scroll(0,0);
    }
    const companies = ['Any','BMW', 'Audi', 'Mercedes-Benz', 'Ferrari', 'Volvo', 'Porsche'];
    const categories= ['Any','Sedan','Sport','Super Car','Luxury','Pickups','SUV','Truck','Van'];
    const conditions = ['Any','Exclusive', 'Premium', 'New', 'Used'];
    const handleConditionChange = (event) => {
        event.target.value === 'Any'? setCondition(''):setCondition(event.target.value)
      };
    const handleCategoryChange = (event) => {
        event.target.value === 'Any'? setCategory(''):
        setCategory(event.target.value)
      };
    const handleCompanyChange = (event) => {
        event.target.value === 'Any'? setCompany(''):
        setCompany(event.target.value)
      };
    useEffect( () =>{
        fetch(`https://thawing-ridge-58827.herokuapp.com/vehicles?page=${page}&size=${size}&condition=${condition}&company=${company}&category=${category}`)
        .then(res => res.json())
        .then(data => setVehicles(data));
    }, [page, size, condition, company, category]);

    useEffect( () =>{
        fetch(`https://thawing-ridge-58827.herokuapp.com/vehicleCount?condition=${condition}&company=${company}&category=${category}`)
        .then(res => res.json())
        .then(data =>{
            const count = data.count;
            const pages = Math.ceil(count/8);
            setPageCount(pages);
        })
    }, [condition, company, category])
    //console.log(vehicles)
    return (
        <>
            <PageTitle title="Vehicles"></PageTitle>
            <Navbar></Navbar>
            <Container sx={{mt:15 , mx:'auto'}}>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} >
                    <Grid item xs={12} sm={12} md={3} >
                        <Fade left>
                        <Typography textAlign='center' variant='h6'>
                            Sort by:
                        </Typography>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Fade right>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label3">Company</InputLabel>
                            <Select
                            labelId="demo-simple-select-label3"
                            id="demo-simple-select3"
                            value={company}
                            label="Company"
                            onChange={handleCompanyChange}
                            >
                                {
                                    companies.map(com=><MenuItem key={com} value={com}>{com}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Fade right>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={category}
                            label="Condition"
                            onChange={handleCategoryChange}
                            >
                                {
                                    categories.map(cat=><MenuItem key={cat} value={cat}>{cat}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} >
                        <Fade right>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">Condition</InputLabel>
                                <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={condition}
                                label="Condition"
                                onChange={handleConditionChange}
                                >
                                    {
                                        conditions.map(con=><MenuItem key={con} value={con}>{con}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Fade>
                    </Grid>
                </Grid>
            
            </Container>
            <Box  sx={{mt:5}}>
                <LightSpeed>
                <Typography variant ="h3" sx={{my:5, color: '#1C2833', fontWeight: 800, textAlign: 'center'}} fontSize={{xs:20, sm:30, lg:40}}>Select Your Favourite Car</Typography>
                </LightSpeed>
                
                <Container style={{padding: '20px'}}>
                
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                    {
                        vehicles?.map(vehicle=><Vehicle
                            key={vehicle._id}
                            vehicle={vehicle}
                            >
                        </Vehicle>)
                    }
                </Grid>
                <Fade left>
                {
                    pageCount>1 && <Pagination count={pageCount} 
                        onChange={handlePagination}
                        variant="outlined" shape="rounded" 
                        sx={{my:5}} 
                        style={{display:'flex' ,justifyContent: 'center'}}/>
                }
                </Fade>

            </Container>
            </Box>
        </>
    );
};

export default Vehicles;
