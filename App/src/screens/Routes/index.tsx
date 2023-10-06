import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {BottomBar} from "../../components/BottomBar";
import RoutesList from "../../constants/Routes"
import {ActivityIndicator, View} from "react-native";

const Stack = createStackNavigator()

export const Routes: React.FC<{isLogged: boolean}> = ({isLogged}) => {

    if (isLogged == null) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large"/>
            </View>
        );

    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLogged? "BottomBar" : "HomeLogin"} screenOptions={{headerShown: false}}>
                <Stack.Screen name='BottomBar' component={BottomBar} />
                {RoutesList.map((value, index) => {
                    return (<Stack.Screen key={index} {...value}/>);
                })
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}