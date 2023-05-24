import React from 'react';
import {Text, View, ScrollView, RefreshControl, Image, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import {styles} from "./InsideCondtScreen";
import {getCurrentMeasurement, getMeasurementHistory} from "../services/MeasurementService";
import Loading from "./Loading";
import ChartData from "../components/ChartData";

const OutsideConditionScreen = () => {
    const [lastUpdate, setLastUpdate] = React.useState('');
    const [mainData, setMainData] = React.useState({type: 'temperature', data: 18, dataType: '°C', description: 'Температура', icon: ''});
    const [leftData, setLeftData] = React.useState({type: 'humidity', data: 42, dataType: '%', description: 'Вологість', icon: ''});
    const [rightData, setRightData] = React.useState({type: 'pressure', data: 760, dataType: ' мм.рт.ст', description: 'Тиск', icon: ''});
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedChartData, setSelectedChartData] = React.useState({data: [], period: []})


    React.useEffect(() => {
        onRefresh()
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        const data = await getCurrentMeasurement()
        mainData.data = data.temperatureOut
        leftData.data = data.humidityOut
        rightData.data = data.pressure
        setLastUpdate(data.measurementTime.toLocaleString())

        const chartData = await getMeasurementHistory(6);

        const tempIn = chartData.map((m) => m.pressure);
        const mTime = chartData.map((m) => m.measurementTime);
        setSelectedChartData({data: tempIn, period: mTime.map(t => t.toLocaleTimeString().substring(0, 5))})
        setRefreshing(false)

    }, []);



    const changeMainView = (callback) => {
    }

    const refreshControl = () => {
        return (<RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>)
    }

    if (refreshing) {
        return (
            <Loading/>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.main} refreshControl={refreshControl()}>
            <StatusBar style='inverted'/>

            {/* Present Date */}
            <View style={styles.lastUpdate}>
                <Text style={styles.lastUpdateText}>Останнє оновлення: {lastUpdate}</Text>
            </View>

            {/*/!* Current Location *!/*/}
            {/*<View style={styles.location}>*/}
            {/*    <Text style={styles.locationText}>Connected</Text>*/}
            {/*</View>*/}

            {/*Selected main Icon */}
            <View style={[styles.mainIconView]}>
                <Image
                    style={{height: 150, width: 150}}
                    source={require(`../assets/temperature_icon.png`)}
                />
            </View>

            {/*Main view */}
            <View>
                <Text style={styles.mainDataText}>
                    {mainData.data}
                    <Text style={{color: "rgba(256,256,256,0.4)"}}>{mainData.dataType}</Text>
                </Text>
            </View>

            {/*/!*Condition *!/*/}
            {/*<View>*/}
            {/*    <Text style={styles.weatherState}>Нормально</Text>*/}
            {/*</View>*/}

            {/*Other  Data */}
            <View style={styles.otherData}>
                <TouchableOpacity style={styles.otherDataOption}
                                  onPress={() => changeMainView(setLeftData)}>
                    <MaterialCommunityIcons
                        name='water-outline'
                        size={40}
                        color='rgba(256,256,256,0.9)'
                    />
                    <Text style={styles.otherDataValueText}>
                        {leftData.data}<Text style={styles.unitText}>{leftData.dataType}</Text>
                    </Text>
                    <Text style={styles.otherDataText}>{leftData.description}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherDataOption} onPress={() => changeMainView(setRightData)}>
                    <MaterialCommunityIcons
                        name='weather-pouring'
                        size={40}
                        color='rgba(256,256,256,0.9)'
                    />
                    <Text style={styles.otherDataValueText}>
                        {rightData.data}<Text style={styles.unitText}>{rightData.dataType}</Text>
                    </Text>
                    <Text style={styles.otherDataText}>{rightData.description}</Text>
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

export default OutsideConditionScreen;