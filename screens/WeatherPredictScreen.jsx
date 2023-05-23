import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./InsideCondtScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const WeatherPredictScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const initCond = {clear: false, partly: false, overcast: false, cloudy: false, rain: false};
    const [selectedCondition, setSelected] = React.useState(initCond)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const refreshControl = () => {
        return (<RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>)
    }

    const showPredictionByCondition = (condition) => {
        switch (condition) {
            case 'clear':
                setSelected({...initCond, clear: true})
                break;
            case 'partly':
                setSelected({...initCond, partly: true})
                break;
            case 'overcast':
                setSelected({...initCond, overcast: true})
                break;
            case 'cloudy':
                setSelected({...initCond, cloudy: true})
                break;
            case 'rain':
                setSelected({...initCond, rain: true})
                break;
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.main} refreshControl={refreshControl()}>
            {/* Present Date */}
            <View style={styles.lastUpdate}>
                <Text style={styles.lastUpdateText}>Останнє оновлення</Text>
            </View>

            <View style={{flex: 0.5, marginTop: 10}}>
                <Text style={{...styles.locationText, alignSelf: "center",}}>Виберіть які зараз погодні умови</Text>
                <View style={{...styles.otherData, flex: 1, marginTop: 30}}>
                    <TouchableOpacity style={{...styles.otherDataOption, backgroundColor: selectedCondition.clear ? '#ffffff' : '#2d2d2d'}}
                                      onPress={() => showPredictionByCondition('clear')}>
                        <MaterialCommunityIcons
                            name='weather-sunny'
                            size={40}
                            color='rgba(256,256,256,0.9)'
                        />
                        <Text style={styles.otherDataText}>Ясно</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.otherDataOption, backgroundColor: selectedCondition.partly ? '#ffffff' : '#2d2d2d'}}
                                      onPress={() => showPredictionByCondition('partly')}>
                        <MaterialCommunityIcons
                            name='weather-sunset'
                            size={40}
                            color='rgba(256,256,256,0.9)'
                        />
                        <Text style={styles.otherDataText}>Малохмарно</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.otherDataOption, backgroundColor: selectedCondition.overcast ? '#ffffff' : '#2d2d2d'}}
                                      onPress={() => showPredictionByCondition('overcast')}>
                        <MaterialCommunityIcons
                            name='weather-partly-cloudy'
                            size={40}
                            color='rgba(256,256,256,0.9)'
                        />
                        <Text style={styles.otherDataText}>Переважно хмарно</Text>
                    </TouchableOpacity>
                </View>
                <View style={{...styles.otherData, flex: 1, marginVertical: 0}}>
                    <TouchableOpacity style={{...styles.otherDataOption, backgroundColor: selectedCondition.cloudy ? '#ffffff' : '#2d2d2d'}}
                                      onPress={() => showPredictionByCondition('cloudy')}>
                        <MaterialCommunityIcons
                            name='weather-cloudy'
                            size={40}
                            color='rgba(256,256,256,0.9)'
                        />
                        <Text style={styles.otherDataText}>Хмарно</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.otherDataOption, backgroundColor: selectedCondition.rain ? '#ffffff' : '#2d2d2d'}}
                                      onPress={() => showPredictionByCondition('rain')}>
                        <MaterialCommunityIcons
                            name='weather-pouring'
                            size={40}
                            color='rgba(256,256,256,0.9)'
                        />
                        <Text style={styles.otherDataText}>Опади</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {selectedCondition !== initCond ?
                <View style={{flex: 0.6}}>
                    <View>
                        <Text style={stylesLocal.textCaption}>Прогноз погоди</Text>
                        <Text style={stylesLocal.textPrediction}>
                            ;l'dsfgmoiuasdhfas fgasd gfash dfvhjsadg fkjgas gdf gkasjdhvfask dfgaksjfhbg
                        </Text>
                    </View>

                    <View>
                        <Text style={stylesLocal.textCaption}>Прогноз вітру</Text>
                        <Text style={stylesLocal.textPrediction}>
                            ;l'dsfgmoiuasdhfas fgasd gfash dfvhjsadg fkjgas gdf gkasjdhvfask dfgaksjfhbg
                        </Text>
                    </View>
                </View>
            : null}
        </ScrollView>
    );
};

const stylesLocal = StyleSheet.create({
    textCaption: {
        alignSelf: "center",
        fontSize: 24,
        marginTop: 20,
        color: '#b9b4b4',
        fontWeight: "bold"
    },
    textPrediction: {
        margin: 30,
        marginTop: 10
    }
});

export default WeatherPredictScreen;