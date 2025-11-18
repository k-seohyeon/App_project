import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";


export default function splash(){
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/home");
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            source={require("../assets/images/background.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.emo}>☁️</Text>
                    <Text style={styles.titlename}> Day Store </Text>
                    <Text style={styles.emo}>☁️</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    row:{
        flexDirection: "row",
        alignItems: "center",
    },
    emo: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFF',
    },
    titlename: {
        fontSize: 42,
        fontWeight: 'bold',
        fontFamily: 'Monggle',
        color: '#FFF',
        textShadowColor: '#58919A',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,

    },
})
