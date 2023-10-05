import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { MaterialTopTabDescriptorMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import FluxEditorSVG from "../../../assets/Vector.svg";
import { StackNavigationProp } from '@react-navigation/stack';
import { bottomBarList } from '../../constants/BottomBarList';

const Tab = createMaterialTopTabNavigator();

type RootStackParamList = {
    BottomBar: undefined;
    Details: { itemId: number };
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'BottomBar'>;
};

const TabItem: React.FC<{icon: any, label: string, focused: boolean}> = ({icon, label, focused}) => {
    return (
        focused ? 
        <View style={Style.itemFocused}>
            <View style={Style.boxFocused}>
                {React.createElement(icon, {style: Style.iconFocused})}
                <Text style={Style.text}>{label}</Text>
            </View>
        </View>
        :
        <View style={Style.item}>
            {React.createElement(icon, {style: Style.icon})}
        </View>
    )
}

const FluxEditor: React.FC<{stackNavigation: StackNavigationProp<RootStackParamList, 'BottomBar'>}> = ({stackNavigation}) => {

    const onPress = () => {
          stackNavigation.navigate('FluxEditor' as never);
      };

    return (
        <View style={Style.itemFocused}>
            <TouchableOpacity onPress={onPress}>
                <FluxEditorSVG />
            </TouchableOpacity>
        </View>
    )
}

export const MyTabBar: React.FC<{ state: TabNavigationState<ParamListBase>, navigation: NavigationHelpers<any>,
    descriptors: MaterialTopTabDescriptorMap, stackNavigation: StackNavigationProp<RootStackParamList, 'BottomBar'> }>
    = ({state, navigation, descriptors, stackNavigation}) => {

    return (
        <View style={Style.tabBar}>
            {state.routes.map((route, index, array) => {
                const {options} = descriptors[route.key];

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                      type: 'tabPress' as never,
                      target: route.key,
                      canPreventDefault: true,
                      data: "" as never
                    });
          
                    if (!isFocused) {
                      navigation.navigate(route.name, {merge: true});
                    }
                };

                return (
                    <View key={index} style={{flex: array.length / 2 == index ? 2 : 1, flexDirection: "row"}}>
                        {array.length / 2 == index && <View style={{flex: 1}}>
                            <FluxEditor stackNavigation={stackNavigation} />
                        </View>}
                        <TouchableOpacity
                            style={{flex: 1}}
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? {selected: true} : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                        >
                            <TabItem key={index} icon={options.tabBarIcon} label={route.name} focused={isFocused} />
                        </TouchableOpacity>
                </View>
                )
            })}
        </View>
    )
}

export const BottomBar: React.FC<Props> = ({ navigation }) => {
    const routes = bottomBarList;

    return (
        <View style={Style.container}>
            <Tab.Navigator
                initialRouteName={routes[0].name}
                tabBar={props => <MyTabBar {...{...props, stackNavigation: navigation}} />}
                tabBarPosition='bottom'
            >
                {routes.map((route, index) => {
                    return (
                        <Tab.Screen
                            key={index}
                            name={route.name}
                            component={route.navigationComponent}
                            options={{tabBarIcon: route.iconSVG, tabBarContentContainerStyle: {flex: 1}}}
                        />
                    )
                })}
            </Tab.Navigator>
        </View>
    )
} 

const Style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    text: {
        color: "#F3F3F3",
        fontSize: 17,
        textAlign: "center"
    },
    tabBar: {
        backgroundColor: "#373637",
        width: "100%",
        height: "14%",
        display: "flex",
        flexDirection: "row"
    },
    icon: { 
        color: "#F3F3F3"
    },
    iconFocused: {
        color: "#D9C6F4",
        width: "100%"
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flex: 1,
    },
    itemFocused: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flex: 1
    },
    boxFocused: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: 'auto',
        height: '80%',
        paddingHorizontal: 5,
        borderCurve: 'circular',
        borderRadius: 10,
        backgroundColor: "#D9C6F41A"
    }
});