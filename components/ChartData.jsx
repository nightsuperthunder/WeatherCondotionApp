import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";

const { width } = Dimensions.get("window");

const ChartData = ({dayData, tempData}) => {
    return (
        <View style={styles.main}>
            <LineChart
                data={{
                    labels: dayData,
                    datasets: [
                        {
                            data: tempData,
                        },
                    ],
                }}
                width={width - 40} // from react-native
                height={115}
                withInnerLines={false}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: '#252525',
                    backgroundGradientFrom: '#252525',
                    backgroundGradientTo: '#252525',
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
                    style: {
                        borderRadius: 25,
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: '#252525',
                    },
                }}
                bezier
                style={{
                    borderRadius: 25,
                    alignSelf: 'center',
                    paddingBottom: 50,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginHorizontal: 'auto'
    }
});


export default ChartData;