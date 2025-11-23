import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Monggle: require("C:/Users/jimmy/myApp/assets/images/fonts/monggle.ttf"),
    Monggle2: require("C:/Users/jimmy/myApp/assets/images/fonts/small_monggle.ttf"),
  });

  useEffect(()=>{
    if(fontsLoaded){
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if(!fontsLoaded) return null;
  
  return (
    //상단바 없애기
    <Stack screenOptions={{animation: "fade", headerShown: false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="home"/>
    </Stack>
  );
}
