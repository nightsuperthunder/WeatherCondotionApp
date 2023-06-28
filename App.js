import React from "react";
import Navigation from "./components/Navigation";
import {StationDataContext, useStationData} from "./utils/useStationData";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import Loading from "./screens/Loading";
import {styles} from "./styles";
import ErrorPage from "./screens/ErrorPage";

export default function App() {
    const {data, fetchData, isLoading, isError} = useStationData();

    React.useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    if (isError) {
        return (
            <ErrorPage refresh={fetchData}/>
        )
    }

    // noinspection JSValidateTypes
    return (
        <StationDataContext.Provider value={{data, isLoading}}>
            <ScrollView contentContainerStyle={styles.main} refreshControl={<RefreshControl onRefresh={() => { fetchData() }}/>}>
                {/* Present Date */}
                <View style={styles.lastUpdate}>
                    <Text style={styles.lastUpdateText}>Дані станом на {data.lastUpdate}</Text>
                </View>
                <Navigation/>
            </ScrollView>
        </StationDataContext.Provider>
    )
}