import {API_URL} from "../config";

export async function getCurrentMeasurement() {
    const response = await fetch(API_URL + '/getMeasurement/current')
    const json = await response.json();

    return {
        temperatureIn: json.temperatureIn,
        humidityIn: json.humidityIn,
        ppm: json.ppm,
        pressure: (json.pressure / 133.3223684).toFixed(1),
        temperatureOut: json.temperatureOut,
        humidityOut: json.humidityOut,
        measurementTime: new Date(json.dateTime),
    }
}

export async function getWeatherPredict() {
    const response = await fetch(API_URL + '/getMeasurement/weather')
    if (response.status === 503) {
        console.log(await response.json())
    }
    return await response.json();
}

export async function getMeasurementHistory(hours) {
    const timeNow = Math.floor(Date.now() / 1000);
    const timeStart = timeNow - hours * 60 * 60;

    const response = await fetch(API_URL +
        `/getMeasurement/by/timestampStart=${timeStart}&timestampEnd=${timeNow}`)

    const dataJson = await response.json();

    const interval = Math.floor(dataJson.length / 6); // Interval between data points
    const aggregatedData = [];

    for (let i = 0; i < dataJson.length; i += interval) {
        const start = i;
        const end = i + interval;

        // Extract the relevant properties for aggregation
        const dataSubset = dataJson.slice(start, end);
        const averageValues = {
            measurementTime: new Date(dataSubset[Math.floor(dataSubset.length / 2)].dateTime), // Use the dateTime of the middle data point in the interval
            temperatureIn:  parseFloat((dataSubset.reduce((sum, measurement) => sum + measurement.temperatureIn, 0) / dataSubset.length).toFixed(1)),
            temperatureOut: parseFloat((dataSubset.reduce((sum, measurement) => sum + measurement.temperatureOut, 0) / dataSubset.length).toFixed(1)),
            humidityIn:     parseFloat((dataSubset.reduce((sum, measurement) => sum + measurement.humidityIn, 0) / dataSubset.length).toFixed(1)),
            humidityOut:    parseFloat((dataSubset.reduce((sum, measurement) => sum + measurement.humidityOut, 0) / dataSubset.length).toFixed(1)),
            pressure:       parseFloat((dataSubset.reduce((sum, measurement) => sum + measurement.pressure, 0) / dataSubset.length / 133.3223684).toFixed(1)),
            ppm:            parseFloat((dataSubset.reduce((sum, measurement) => sum + measurement.ppm, 0) / dataSubset.length).toFixed(1))
        };

        // Add the average value to the aggregated data array
        aggregatedData.push(averageValues);
    }

    return aggregatedData;
}