import React, { useState } from 'react';
import { ListRenderItem, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export type Props = {
    list: { name: string, navigationComponent: React.ComponentType, bottomBarComponent: React.JSX.Element }[];
  };

export const BottomBar: React.FC<Props> = ({ list }) => {

    return (
        <View style={Style.container}>
            <Tab.Navigator
                initialRouteName={list[0].name}
                screenOptions={{ tabBarStyle: Style.bottombar }}
            >
                {list.map((item) => {
                    return(
                        <Tab.Screen
                            key={item.name}
                            name={item.name} 
                            component={item.navigationComponent}
                            options={{ tabBarLabel: item.name,
                                tabBarIcon: ({ color }) => (
                                    <Text>{item.name}</Text>
                                  ),
                            }}
                        />
                    )
                })}
            </Tab.Navigator>
        </View>
    )
} 

const Style = StyleSheet.create({
    bottombar: {
        position: "absolute",
        height: "10%"
    },
    container: {
        width: "100%",
        height: "100%"
    }
});