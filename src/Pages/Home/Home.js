import React from 'react';
import Navbar from '../Shared/Navbar';
import AboutCarDealer from './AboutCarDealer';
import Banner from './Banner';
import Brands from './Brands';
import ExclusiveCars from './ExclusiveCars';
import SalesTeam from './SalesTeam';
import VehicleTypes from './VehicleTypes';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <ExclusiveCars></ExclusiveCars>
            <AboutCarDealer></AboutCarDealer>
            <VehicleTypes></VehicleTypes>
            <SalesTeam></SalesTeam>
            <Brands></Brands>
        </div>
    );
};

export default Home;