import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Text, View} from "react-native";
import { BottomBar } from "../components/BottomBar";
import Login from "../screens/LoginScreens/Login"
import { FluxEditor } from "./FluxEditor";

const Stack = createStackNavigator()

export const Routes: React.FC = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name='BottomBar' component={BottomBar} options={{headerShown: false}}/>
                <Stack.Screen name='FluxEditor' component={FluxEditor}/>
                <Stack.Screen name='Login' component={Login}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}