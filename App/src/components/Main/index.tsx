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

import {NavigationContainer} from '@react-navigation/native';
import { Routes } from '../../screens/Routes';




SplashScreen.preventAutoHideAsync();

export default function Main() {
    const [fontsLoaded] = useFonts({
        'space-grotesk': require('../../../assets/fonts/spaceGrotesk.ttf'),
        'zen-tokyo-zoo': require('../../../assets/fonts/zenTokyoZoo.ttf'),
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
            <Routes />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})