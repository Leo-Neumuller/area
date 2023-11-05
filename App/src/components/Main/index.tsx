import React, {useCallback, useEffect, useState} from 'react';
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
import EncryptedStorage from 'react-native-encrypted-storage';
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";


/**
 * The main component is used to see if the token is saved and if you need to log in again.
 *
 * @returns if he is logged.
 */
export default function Main() {
    const Theme = useTheme();
    const Styles = useThemedStyles(styles);
    const [isLogged, setIsLogged] = useState<boolean | null>(null);

    async function checkLogged() {
        const jwt = await EncryptedStorage.getItem("userToken")
        try {
            const data: {[key: string]: any} = jwt_decode(jwt!);
            if (data.exp * 1000 < Date.now()) {
                await EncryptedStorage.setItem("userToken", "");
                setIsLogged(false);
            }
        } catch (e) {
            await EncryptedStorage.setItem("userToken", "");
            setIsLogged(false);
        }
        setIsLogged(!!(jwt));
    }

    useEffect(() => {
        checkLogged();
    }, [])

    return (
        <SafeAreaView style={Styles.container}>
            <Routes isLogged={isLogged}/>
        </SafeAreaView>
    );
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Theme.colors.Black
    }
})
