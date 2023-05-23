import {API_URL} from "../config";

export async function getCurrentMeasurement() {
    const response = await fetch(API_URL + '/getMeasurement/current')
    const json = await response.json();

    return {
        temperatureIn: json.temperatureIn,
        humidityIn: json.humidityIn,
        ppm: json.ppm,
        pressure: json.pressure,
        temperatureOut: json.temperatureOut,
        humidityOut: json.humidityOut,
        measurementTime: json.dateTime
    }
}

export async function getWeatherPredict() {
    const response = await fetch(API_URL + '/getMeasurement/weather')
    return await response.json();
}