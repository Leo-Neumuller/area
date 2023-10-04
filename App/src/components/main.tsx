import React, {useCallback} from 'react';
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar
}
    from "react-native";

import Home from '../screens/Home';
import HomeLogin from '../screens/LoginScreens/HomeLogin';
import Login from '../screens/LoginScreens/Login';




SplashScreen.preventAutoHideAsync();

export default function Main() {
    const [fontsLoaded] = useFonts({
        'space-grotesk': require('../../assets/fonts/spaceGrotesk.ttf'),
        'zen-tokyo-zoo': require('../../assets/fonts/zenTokyoZoo.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={style.container} onLayout={onLayoutRootView}>
            <Login/>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})