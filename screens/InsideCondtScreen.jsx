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


//Screen Height and Width
const { width } = Dimensions.get("window");

const InsideConditionScreen = () => {
    const [mainData, setMainData] = React.useState({type: 'temperature', data: 18, dataType: '°C', description: 'Температура', icon: ''});
    const [leftData, setLeftData] = React.useState({type: 'humidity', data: 42, dataType: '%', description: 'Вологість', icon: ''});
    const [rightData, setRightData] = React.useState({type: 'co2level', data: 501, dataType: 'ppm', description: 'Рівень CO₂', icon: ''});
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);

    }, []);

    React.useEffect(() => {
        onRefresh()

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
                <Text style={styles.lastUpdateText}>Останнє оновлення</Text>
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

            {/*Condition */}
            <View>
                <Text style={styles.conditionState}>Нормально</Text>
            </View>

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
                        name='molecule-co2'
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
                    dayData={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                    tempData={[10, 20, 15, 0, 5, 7, 20]} />
            </View>

        </ScrollView>
    );
};

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