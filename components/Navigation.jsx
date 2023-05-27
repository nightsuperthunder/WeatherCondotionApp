import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import InsideConditionScreen from "../screens/InsideConditionScreen";
import OutsideConditionScreen from "../screens/OutsideConditionScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ColorfulTabBar} from 'react-navigation-tabbar-collection';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import WeatherPredictScreen from "../screens/WeatherPredictScreen";

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Inside' screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    position: "absolute",
                    bottom: "2%",
                    left: "3%",
                    right: "3%",
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#202020',
                    backgroundColor: '#252525',
                    borderTopWidth: 2,
                    borderTopColor: '#202020',
                }
            }} tabBar={(props) => <ColorfulTabBar colorPalette={{
                primary: '#252525',
                secondary: "#6c757d",
                success: "#198754",
                danger: "#c9379d",
                warning: "#e6a919",
                info: "#00bcd4",
                light: "rgba(256,256,256,0.9);",
                dark: '#101010',
            }} maxWidth={320} height={65} darkMode={true}  {...props}/>}>
                <Tab.Screen
                    name='Inside'
                    component={InsideConditionScreen}
                    options={{
                        title: 'В кімнаті',
                        tabBarIcon: ({color, size}) => (
                            <Feather name='home' size={size} color={color}/>
                        )
                }}/>
                <Tab.Screen
                    name='Outside'
                    component={OutsideConditionScreen}
                    options={{
                        title: 'На вулиці',
                        tabBarIcon: ({color, size}) => (
                            <FontAwesome name='tree' size={size} color={color}/>
                        )
                }}/>
                <Tab.Screen
                    name='Weather'
                    component={WeatherPredictScreen}
                    options={{
                        title: 'Прогноз',
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons  name='weather-cloudy-clock' size={size} color={color}/>
                        )
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;