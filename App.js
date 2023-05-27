import React from "react";
import Navigation from "./components/Navigation";
import {StationDataContext, useStationData} from "./utils/useStationData";

export default function App() {
  const {data, fetchData, isLoading} = useStationData();


  React.useEffect(() => {
      fetchData();
  }, []);


  return (
      <StationDataContext.Provider value={{data, fetchData, isLoading}}>
        <Navigation/>
      </StationDataContext.Provider>
  )
}