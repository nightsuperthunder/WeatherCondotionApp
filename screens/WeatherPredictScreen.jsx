import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {StationDataContext} from "../utils/useStationData";
import {styles} from "../styles";

const WeatherPredictScreen = () => {
    const initCond = {clear: false, partly: false, overcast: false, cloudy: false, rain: false}
    const [selectedCondition, setSelected] = React.useState(initCond)
    const [weatherPredict, setWeatherPredict] = React.useState('')
    const [windPredict, setWindPredict] = React.useState('')
    // noinspection JSCheckFunctionSignatures
    const {data: {predictions}} = React.useContext(StationDataContext)

    const showPredictionByCondition = (condition) => {
        let id;
        switch (condition) {
            case 'clear':
                id = 0;
                setSelected({...initCond, clear: true})
                break;
            case 'partly':
                id = 1;
                setSelected({...initCond, partly: true})
                break;
            case 'overcast':
                id = 2;
                setSelected({...initCond, overcast: true})
                break;
            case 'cloudy':
                id = 3;
                setSelected({...initCond, cloudy: true})
                break;
            case 'rain':
                id = 4;
                setSelected({...initCond, rain: true})
                break;
        }
        for (let prediction of predictions) {
            if (prediction.conditions.includes(id)) {
                setWeatherPredict(prediction.weatherPrediction)
                setWindPredict(prediction.windPrediction)
                break;
            }
        }
    }

    return (
        <View style={styles.main}>
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

            {weatherPredict !== '' ?
                <View style={{flex: 0.6}}>
                    <View>
                        <Text style={stylesLocal.textCaption}>Прогноз погоди</Text>
                        <Text style={stylesLocal.textPrediction}>
                            {weatherPredict}
                        </Text>
                    </View>

                    <View>
                        <Text style={stylesLocal.textCaption}>Прогноз вітру</Text>
                        <Text style={stylesLocal.textPrediction}>
                            {windPredict}
                        </Text>
                    </View>
                </View>
            : null}
        </View>
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