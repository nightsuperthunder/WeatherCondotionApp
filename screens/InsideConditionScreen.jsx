import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    RefreshControl,
    ScrollView
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ChartData from "../components/ChartData";
import Loading from "./Loading";
import {StationDataContext} from "../utils/useStationData";
import {getMeasurementHistory} from "../services/MeasurementService";


//Screen Height and Width
const { width } = Dimensions.get("window");

const InsideConditionScreen = () => {
    const [visibleData, setVisibleData] = React.useState({mainView: {icon: tempIcon}, leftView: {icon: humIcon}, rightView: {icon: co2Icon}})
    const [selectedChartData, setSelectedChartData] = React.useState({data: [], period: []})
    // noinspection JSCheckFunctionSignatures
    const {data: {insideParam, lastUpdate}, fetchData, isLoading} = React.useContext(StationDataContext)

    React.useEffect(() => {
        setVisibleData({
            mainView: {value: insideParam.temperature, dataType: '°C', description: 'Температура', icon: tempIcon },
            leftView: {value: insideParam.humidity, dataType: '%', description: 'Вологість', icon: humIcon },
            rightView: {value: insideParam.ppm, dataType: 'ppm', description: 'Рівень CO₂', icon: co2Icon }
        })

        getMeasurementHistory(6).then(res => {
            setSelectedChartData({
                data: res.map(m => m.temperatureIn),
                period: res.map(m => m.measurementTime.toLocaleTimeString().substring(0, 5))
            })
        })
    }, [insideParam]);

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

            {/*Condition */}
            <View>
                <Text style={styles.conditionState}>Нормально</Text>
            </View>

            {/*Other  Data */}
            <View style={styles.otherData}>
                <TouchableOpacity style={styles.otherDataOption}
                                  onPress={() => {changeLeftView()}}>
                    {visibleData.leftView.icon({size: 40})}
                    <Text style={styles.otherDataValueText}>
                        {visibleData.leftView.value}<Text style={styles.unitText}>{visibleData.leftView.dataType}</Text>
                    </Text>
                    <Text style={styles.otherDataText}>{visibleData.leftView.description}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherDataOption} onPress={() => {changeRightView()}}>
                    {visibleData.rightView.icon({size: 40})}
                    <Text style={styles.otherDataValueText}>
                        {visibleData.rightView.value}<Text style={styles.unitText}>{visibleData.rightView.dataType}</Text>
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

export const tempIcon = ({size}) => <Image style={{height: size, width: size}} source={require(`../assets/temperature_icon.png`)}/>
export const humIcon = ({size}) => <MaterialCommunityIcons name='water-outline' size={size} color='rgba(256,256,256,0.9)'/>
const co2Icon = ({size}) => <MaterialCommunityIcons name='molecule-co2' size={size} color='rgba(256,256,256,0.9)'/>

export const styles= StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#101010',
    },
    lastUpdate: {
        marginTop: "15%",
        marginLeft: "7%",
    },
    lastUpdateText: {
        color: "rgba(256,256,256,0.63)",
        fontSize: 12,
    },
    location: {
        marginTop: 3,
        marginLeft: "6%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    locationText: {
        color: "rgba(256,256,256,0.9)",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 4,
    },
    mainIconView: {
        display: "flex",
        alignItems: "center",
        // backgroundColor:'red',
        marginVertical: 30,
    },
    mainDataText: {
        color: "rgba(256,256,256,0.9)",
        fontSize: 64,
        alignSelf: "center",
    },
    conditionState: {
        color: "rgba(256,256,256,0.55)",
        fontSize: 16,
        alignSelf: "center",
        textTransform: "uppercase",
        fontWeight: "600",
        letterSpacing: 2,
    },
    otherData: {
        flex: 0.8,
        flexDirection: "row",
        width: width - 30,
        // backgroundColor:'#ffffff',
        alignSelf: "center",
        justifyContent: "space-between",
        marginVertical: 20,
        borderRadius: 60
    },
    otherDataOption: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: '#2d2d2d',
        borderRadius: 25,
        marginHorizontal: 5,
    },
    otherDataValueText: {
        fontSize: 22,
        color: "rgba(256,256,256,0.9)",
    },
    otherDataText: {
        fontSize: 16,
        color: "rgba(256,256,256,0.55)",
        marginTop: 10,
        textAlign: "center"
        // textTransform: "capitalize",
    },
    unitText: {
        fontSize: 18,
        color: "rgba(256,256,256,0.55)",
    },
    DailyData: {
        flex: 1,
        width: width - 30,
        // backgroundColor:NAV_BACKGROUND_COLOR,
        alignSelf: "center",
        borderRadius: 30,
    },
});

export default InsideConditionScreen;