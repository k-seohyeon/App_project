import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      initialRouteName="index" screenOptions={{headerShown: false}}> // 상단 바 없애기
        <Stack.Screen name="index"/>
        <Stack.Screen name="home"/>
    </Stack>
  );
}
