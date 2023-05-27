import React from "react";
import {getMeasurementHistory} from "../services/MeasurementService";
import {DataTypes} from "./DataTypes";

export const useMeasurementsHistory = () => {
    const [selectedChartData, setSelectedChartData] = React.useState({data: [], period: []})
    const [isLoading, setIsLoading] = React.useState(false)

    const setChartType = (type) => {
        setIsLoading(true)
        getMeasurementHistory(6).then(res => {
            setSelectedChartData({
                data: getRequiredArray(type, res),
                period: res.map(m => m.measurementTime.toLocaleTimeString().substring(0, 5))
            })
            setIsLoading(false)
        })
    }

    return {selectedChartData, setChartType, isLoading}
}

const getRequiredArray = (type, obj) => {
    switch (type) {
        case DataTypes.TEMPERATURE_INSIDE:
            return obj.map(m => m.temperatureIn)
        case DataTypes.HUMIDITY_INSIDE:
            return obj.map(m => m.humidityIn)
        case DataTypes.TEMPERATURE_OUTSIDE:
            return obj.map(m => m.temperatureOut)
        case DataTypes.HUMIDITY_OUTSIDE:
            return obj.map(m => m.humidityOut)
        case DataTypes.PRESSURE:
            return obj.map(m => m.pressure)
        case DataTypes.PPM:
            return obj.map(m => m.ppm)
    }
}