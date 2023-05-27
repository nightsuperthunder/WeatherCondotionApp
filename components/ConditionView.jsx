import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import ChartData from "./ChartData";
import {styles} from "../styles";

const ConditionView = ({visibleData, selectedChartData, setVisibleData, setChartType, isChartLoading}) => {
    const changeLeftView = () => {
        setVisibleData(prevState => {
            setChartType(prevState.leftView.type)
            return {...prevState, mainView: prevState.leftView, leftView: prevState.mainView}
        })
    }

    const changeRightView = () => {
        setVisibleData(prevState => {
            setChartType(prevState.rightView.type)
            return {...prevState, mainView: prevState.rightView, rightView: prevState.mainView}
        })
    }

    // noinspection JSValidateTypes
    return (
        <View style={styles.main}>
            <StatusBar style='inverted'/>

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
                    isChartLoading={isChartLoading}
                />
            </View>

        </View>
    );
};

export default ConditionView;