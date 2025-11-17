import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function splash(){
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/home");
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.customFont}>☁️ Day Store ☁️</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#48CAE1",
    },
    customFont: {
        fontSize: 32,
        fontFamily: 'Monggle',
        color: '#fff',
        fontWeight: "bold",
    },
})
