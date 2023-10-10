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

enableScreens(true);

export default function App() {
    return (
        <ThemeProvider>
                <Main />
        </ThemeProvider>
    );
}


