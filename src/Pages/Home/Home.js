import React from 'react';
import Navbar from '../Shared/Navbar';
import AboutCarDealer from './AboutCarDealer';
import Banner from './Banner';
import Brands from './Brands';
import ExclusiveCars from './ExclusiveCars';
import PremiumCars from './PremiumCars';
import SalesTeam from './SalesTeam';
import VehicleTypes from './VehicleTypes';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <ExclusiveCars></ExclusiveCars>
            <PremiumCars></PremiumCars>
            <AboutCarDealer></AboutCarDealer>
            <VehicleTypes></VehicleTypes>
            <SalesTeam></SalesTeam>
            <Brands></Brands>
        </div>
    );
};

export default Home;