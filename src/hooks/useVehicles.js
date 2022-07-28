import React from 'react';
import { useQuery } from 'react-query';

const useVehicles = () => {
    const {data: vehicles, isLoading, refetch} = useQuery('vehicles', ()=>fetch('https://thawing-ridge-58827.herokuapp.com/vehicles').then(res=> res.json()));
    return [vehicles, isLoading, refetch]
};

export default useVehicles;