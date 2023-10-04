import React, {useCallback} from 'react';
import * as SplashScreen from "expo-splash-screen";
import {
    StyleSheet,
}
    from "react-native";


import Main from './src/components/main';
import ThemeProvider from "./src/components/themeProvider";
import useThemedStyles from "./src/hooks/useThemedStyle";
import Theme from "./src/constants/Theme"

export default function App() {
    return (
        <ThemeProvider>
            <Main />
        </ThemeProvider>
    );
}






