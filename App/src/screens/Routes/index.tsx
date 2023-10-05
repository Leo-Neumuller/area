import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Editor} from "../Flux/Editor";
import {Text, View} from "react-native";
import {BottomBar} from "../../components/BottomBar";
import HomeLogin from "../LoginScreens/HomeLogin";
import Login from "../LoginScreens/Login";
import Signin from "../LoginScreens/Signin";


const Stack = createStackNavigator()

export const Routes: React.FC = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Signin">
                <Stack.Screen name='BottomBar' component={BottomBar} options={{headerShown: false}}/>
                <Stack.Screen name='FluxEditor' component={Editor}/>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='Signin' component={Signin}/>
                <Stack.Screen name='HomeLogin' component={HomeLogin}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}