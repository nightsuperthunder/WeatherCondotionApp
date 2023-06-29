import React from 'react';
import {Image} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import {StationDataContext} from "../utils/useStationData";
import {useMeasurementsHistory} from "../utils/useMeasurementsHistory";
import {DataTypes} from "../utils/DataTypes";
import ConditionView from "../components/ConditionView";

const InsideConditionScreen = () => {
    const [visibleData, setVisibleData] = React.useState({mainView: {icon: tempIcon}, leftView: {icon: humIcon}, rightView: {icon: co2Icon}})
    const {selectedChartData, setChartType, isLoading: isChartLoading} = useMeasurementsHistory()
    // noinspection JSCheckFunctionSignatures
    const {data: {insideParam}} = React.useContext(StationDataContext)

    React.useEffect(() => {
        setVisibleData({
            mainView: {value: insideParam.temperature, dataType: '°C', description: 'Температура', icon: tempIcon, type: DataTypes.TEMPERATURE_INSIDE },
            leftView: {value: insideParam.humidity, dataType: '%', description: 'Вологість', icon: humIcon, type: DataTypes.HUMIDITY_INSIDE },
            rightView: {value: insideParam.ppm, dataType: 'ppm', description: 'Рівень CO₂', icon: co2Icon, type: DataTypes.PPM }
        })

        setChartType(DataTypes.TEMPERATURE_INSIDE)
    }, [insideParam]);

    // noinspection JSValidateTypes
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

const tempIcon = ({size}) => <Image style={{height: size, width: size}} source={require(`../assets/temperature_icon.png`)}/>
const humIcon = ({size}) => <MaterialCommunityIcons name='water-outline' size={size} color='rgba(256,256,256,0.9)'/>
const co2Icon = ({size}) => <MaterialCommunityIcons name='molecule-co2' size={size} color='rgba(256,256,256,0.9)'/>

export default InsideConditionScreen;