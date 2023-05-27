import {Dimensions, StyleSheet} from "react-native";

const { width } = Dimensions.get("window");

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