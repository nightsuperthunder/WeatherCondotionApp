import {API_URL} from "../config";
import moment from "moment";

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
        measurementTime: moment.utc(json.dateTime).local(),
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
    const measurements = [];

    for (let i = dataJson.length - 1; i > 0; i -= interval) {
        const values = {
            measurementTime: moment.utc(dataJson[i].dateTime).local(), // Use the dateTime of the middle data point in the interval
            temperatureIn:  parseFloat(dataJson[i].temperatureIn.toFixed(1)),
            temperatureOut: parseFloat(dataJson[i].temperatureOut.toFixed(1)),
            humidityIn:     parseFloat(dataJson[i].humidityIn.toFixed(1)),
            humidityOut:    parseFloat(dataJson[i].humidityOut.toFixed(1)),
            pressure:       parseFloat((dataJson[i].pressure / 133.3223684).toFixed(1)),
            ppm:            parseFloat(dataJson[i].ppm.toFixed(1))
        };

        measurements.push(values);
    }

    measurements.reverse()

    return measurements;
}