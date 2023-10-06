import React, {useCallback, useEffect, useState} from 'react';
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
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';






SplashScreen.preventAutoHideAsync();

export default function Main() {

    const [isLogged, setIsLogged] = useState<boolean | null>(null);

    async function checkLogged() {
        const jwt = await SecureStore.getItemAsync("userToken")
        try {
            const data: {[key: string]: any} = jwt_decode(jwt!);
            if (data.exp * 1000 < Date.now()) {
                await SecureStore.setItemAsync("userToken", "");
                setIsLogged(false);
            }
        } catch (e) {
            await SecureStore.setItemAsync("userToken", "");
            setIsLogged(false);
        }
        setIsLogged(!!(jwt));
    }

    const [fontsLoaded] = useFonts({
        'space-grotesk': require('../../../assets/fonts/spaceGrotesk.ttf'),
        'zen-tokyo-zoo': require('../../../assets/fonts/zenTokyoZoo.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
        await checkLogged();
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={style.container} onLayout={onLayoutRootView}>
            <Routes isLogged={isLogged}/>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})
