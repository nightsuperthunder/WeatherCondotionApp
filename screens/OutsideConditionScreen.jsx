import React from 'react';
import {Image} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import {StationDataContext} from "../utils/useStationData";
import {useMeasurementsHistory} from "../utils/useMeasurementsHistory";
import {DataTypes} from "../utils/DataTypes";
import ConditionView from "../components/ConditionView";

const OutsideConditionScreen = () => {
    const [visibleData, setVisibleData] = React.useState({mainView: {icon: tempIcon}, leftView: {icon: humIcon}, rightView: {icon: pressureIcon}})
    const {selectedChartData, setChartType, isLoading: isChartLoading} = useMeasurementsHistory()
    // noinspection JSCheckFunctionSignatures
    const {data: {outsideParam}} = React.useContext(StationDataContext)


    React.useEffect(() => {
        setVisibleData({
            mainView: {value: outsideParam.temperature, dataType: '°C', description: 'Температура', icon: tempIcon, type: DataTypes.TEMPERATURE_OUTSIDE },
            leftView: {value: outsideParam.humidity, dataType: '%', description: 'Вологість', icon: humIcon, type: DataTypes.HUMIDITY_OUTSIDE },
            rightView: {value: outsideParam.pressure, dataType: 'мм.рт.ст', description: 'Тиск', icon: pressureIcon, type: DataTypes.PRESSURE }
        })

        setChartType(DataTypes.TEMPERATURE_OUTSIDE)
    }, [outsideParam]);


    return (
        <ConditionView
            visibleData={visibleData}
            selectedChartData={selectedChartData}
            setVisibleData={setVisibleData}
            setChartType={setChartType}
            isChartLoading={isChartLoading}
        />
    );
};

export const tempIcon = ({size}) => <Image style={{height: size, width: size}} source={require(`../assets/temperature_icon.png`)}/>
export const humIcon = ({size}) => <MaterialCommunityIcons name='water-outline' size={size} color='rgba(256,256,256,0.9)'/>
const pressureIcon = ({size}) => <MaterialCommunityIcons name='weather-pouring' size={size} color='rgba(256,256,256,0.9)'/>

export default OutsideConditionScreen;