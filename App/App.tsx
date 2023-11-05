import 'react-native-gesture-handler';
import React, {useCallback} from 'react';

import {
    StyleSheet,
}
    from "react-native";


import Main from './src/components/Main';
import ThemeProvider from "./src/components/themeProvider";
import useThemedStyles from "./src/hooks/Theme/useThemedStyle";
import Theme from "./src/constants/Theme"
import { enableScreens } from 'react-native-screens';
import {GoogleSignin} from "@react-native-google-signin/google-signin";

enableScreens(true);

GoogleSignin.configure({
    webClientId: '630431542437-08rct8rqgqvvtvdr5rtiq0dr0nh5j1cj.apps.googleusercontent.com',
});
export default function App() {
    return (
        <ThemeProvider>
                <Main />
        </ThemeProvider>
    );
}


