import React from "react";
import { useQuery } from "react-query";

const useVehicles = () => {
  const {
    data: vehicles,
    isLoading,
    refetch,
  } = useQuery("vehicles", () =>
    fetch(
      "https://car-server-d4s0106ne-imranhossain1.vercel.app/vehicles"
    ).then((res) => res.json())
  );
  return [vehicles, isLoading, refetch];
};

export default useVehicles;
