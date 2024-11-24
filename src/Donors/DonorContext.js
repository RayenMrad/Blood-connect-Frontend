import React, { createContext, useContext, useState } from "react";

const DonorContext = createContext();

export function DonorProvider({ children }) {
  const [donorsData, setDonorsData] = useState([]);

  const addDonor = (newDonor) => {
    setDonorsData((prevDonors) => [...prevDonors, newDonor]);
  };

  return (
    <DonorContext.Provider value={{ donorsData, addDonor }}>
      {children}
    </DonorContext.Provider>
  );
}

export function useDonorContext() {
  return useContext(DonorContext);
}
