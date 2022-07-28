import React from 'react';
import Navbar from '../Shared/Navbar';
import PageTitle from '../Shared/PageTitle';
import AboutCarDealer from './AboutCarDealer';
import Banner from './Banner';
import Brands from './Brands';
import CarCarousel from './CarCarousel';
import ContactUs from './ContactUs';
import ExclusiveCars from './ExclusiveCars';
import PremiumCars from './PremiumCars';
import SalesTeam from './SalesTeam';
import VehicleTypes from './VehicleTypes';

const Home = () => {
    return (
        <div>
            <PageTitle title="Home"></PageTitle>
            <Navbar></Navbar>
            
            <CarCarousel></CarCarousel>
            
            <ExclusiveCars></ExclusiveCars>
            <PremiumCars></PremiumCars>
            <AboutCarDealer></AboutCarDealer>
            <VehicleTypes></VehicleTypes>
            <SalesTeam></SalesTeam>
            <Brands></Brands>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;