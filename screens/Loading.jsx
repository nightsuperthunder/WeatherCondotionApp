import React from 'react';
import {StatusBar} from "expo-status-bar";
import {View, StyleSheet} from "react-native";
import LottieView from 'lottie-react-native';

const Loading = () => {
    return (
        <View style={styles.main}>
            <StatusBar style='inverted'/>
            <LottieView autoPlay
                        loop source={require('../assets/animations/Loading.json')}
                        style={{height:220,width:220}}
            />
            {/* <Text style={styles.text}>Loading...</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#101010',
    },
    text:{
        color:'#fff',
        opacity:0.4,
        fontSize:30
    }
})

export default Loading;