import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, RefreshControl} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import {humIcon, styles, tempIcon} from "./InsideConditionScreen";
import Loading from "./Loading";
import ChartData from "../components/ChartData";
import {StationDataContext} from "../utils/useStationData";
import {getMeasurementHistory} from "../services/MeasurementService";

const OutsideConditionScreen = () => {
    const [visibleData, setVisibleData] = React.useState({mainView: {icon: tempIcon}, leftView: {icon: humIcon}, rightView: {icon: pressureIcon}})
    // noinspection JSCheckFunctionSignatures
    const {data: {outsideParam, lastUpdate}, fetchData, isLoading} = React.useContext(StationDataContext)
    const [selectedChartData, setSelectedChartData] = React.useState({data: [], period: []})


    React.useEffect(() => {
        setVisibleData({
            mainView: {value: outsideParam.temperature, dataType: '°C', description: 'Температура', icon: tempIcon },
            leftView: {value: outsideParam.humidity, dataType: '%', description: 'Вологість', icon: humIcon },
            rightView: {value: outsideParam.pressure, dataType: 'мм.рт.ст', description: 'Тиск', icon: pressureIcon }
        })

        getMeasurementHistory(6).then(res => {
            setSelectedChartData({
                data: res.map(m => m.temperatureOut),
                period: res.map(m => m.measurementTime.toLocaleTimeString().substring(0, 5))
            })
        })
    }, [outsideParam]);


    const changeLeftView = () => {
        setVisibleData(prevState => {
            return {...prevState, mainView: prevState.leftView, leftView: prevState.mainView}
        })
    }

    const changeRightView = () => {
        setVisibleData(prevState => {
            return {...prevState, mainView: prevState.rightView, rightView: prevState.mainView}
        })
    }

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    // noinspection JSValidateTypes
    return (
        <ScrollView contentContainerStyle={styles.main} refreshControl={<RefreshControl onRefresh={() => {fetchData()}}/>}>
            <StatusBar style='inverted'/>

            {/* Present Date */}
            <View style={styles.lastUpdate}>
                <Text style={styles.lastUpdateText}>Дані станом на {lastUpdate}</Text>
            </View>

            {/*Selected main Icon */}
            <View style={[styles.mainIconView]}>
                {visibleData.mainView.icon({size: 150})}
            </View>

            {/*Main view */}
            <View>
                <Text style={styles.mainDataText}>
                    {visibleData.mainView.value}
                    <Text style={{color: "rgba(256,256,256,0.4)"}}>{visibleData.mainView.dataType}</Text>
                </Text>
            </View>


            {/*Other  Data */}
            <View style={styles.otherData}>
                <TouchableOpacity style={styles.otherDataOption}
                                  onPress={() => changeLeftView()}>
                    {visibleData.leftView.icon({size: 40})}
                    <Text style={styles.otherDataValueText}>
                        {visibleData.leftView.value}<Text style={styles.unitText}>{visibleData.leftView.dataType}</Text>
                    </Text>
                    <Text style={styles.otherDataText}>{visibleData.leftView.description}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherDataOption} onPress={() => changeRightView()}>
                    {visibleData.rightView.icon({size: 40})}
                    <Text style={styles.otherDataValueText}>
                        {visibleData.rightView.value}<Text style={styles.unitText}> {visibleData.rightView.dataType}</Text>
                    </Text>
                    <Text style={styles.otherDataText}>{visibleData.rightView.description}</Text>
                </TouchableOpacity>
            </View>


            {/*Graph */}
            <View style={styles.DailyData} >
                <ChartData
                    dayData={selectedChartData.period}
                    tempData={selectedChartData.data}
                />
            </View>

        </ScrollView>
    );
};

const pressureIcon = ({size}) => <MaterialCommunityIcons name='weather-pouring' size={size} color='rgba(256,256,256,0.9)'/>

export default OutsideConditionScreen;