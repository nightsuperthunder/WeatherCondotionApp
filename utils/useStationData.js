import React from "react";
import {getCurrentMeasurement, getWeatherPredict} from "../services/MeasurementService";

export const useStationData = () => {
    const [insideParam, setInsideParam] = React.useState({temperature: 0, humidity: 0, ppm: 0});
    const [outsideParam, setOutsideParam] = React.useState({temperature: 0, humidity: 0, pressure: 0});
    const [predictions, setPredictions] = React.useState([{conditions: [], weatherPrediction: '', windPrediction: ''}])
    const [lastUpdate, setLastUpdate] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const fetchData = async ()=> {
        console.log('Fetching data...')
        setIsLoading(true);
        setIsError(false)
        try {
            const data = await getCurrentMeasurement();
            setInsideParam({temperature: data.temperatureIn, humidity: data.humidityIn, ppm: data.ppm});
            setOutsideParam({temperature: data.temperatureOut, humidity: data.humidityOut, pressure: data.pressure});
            setLastUpdate(data.measurementTime.format("DD.MM.YYYY HH:mm:ss"));
            setPredictions(await getWeatherPredict())
        } catch (e) {
            setIsError(true);
        }
        setIsLoading(false);
    };

    return {data: {insideParam, outsideParam, predictions, lastUpdate}, fetchData, isLoading, isError};
};

export const StationDataContext= React.createContext(null);
