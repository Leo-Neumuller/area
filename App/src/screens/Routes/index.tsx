import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {BottomBar} from "../../components/BottomBar";
import RoutesList from "../../constants/Routes"
import {ActivityIndicator, View} from "react-native";
import Linking from "../../constants/Linking";
import Oauth from "../Oauth";

const Stack = createStackNavigator()

/**
 * Function to return the routes of the app
 * @param isLogged the state of the user
 * @constructor
 */
export const Routes: React.FC<{isLogged: boolean | null}> = ({isLogged}) => {

    if (isLogged == null) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large"/>
            </View>
        );

    }
    return (
        <NavigationContainer linking={Linking}>
            <Stack.Navigator initialRouteName={isLogged? "BottomBar" : "HomeLogin"} screenOptions={{headerShown: false}}>
                <Stack.Screen name='BottomBar' component={BottomBar} />
                {RoutesList.map((value, index) => {
                    // @ts-ignore
                    return (<Stack.Screen key={index} {...value}/>);
                })
                }
                <Stack.Screen name='Oauth' component={Oauth}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}