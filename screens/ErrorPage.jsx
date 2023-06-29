import React from 'react';
import {StatusBar} from "expo-status-bar";
import {View, StyleSheet, Button} from "react-native";
import LottieView from 'lottie-react-native';

const ErrorPage = ({refresh}) => {
  return (
    <View style={styles.main}>
        <StatusBar style='inverted'/>
        <LottieView autoPlay
          loop source={require('../assets/animations/ErrorAnimation.json')} 
          style={{height:250,width:250}}
      />
        <Button title='refresh' onPress={refresh}/>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#101010',
    },
    text:{
        color:'#fff'
    }
})

export default ErrorPage;
