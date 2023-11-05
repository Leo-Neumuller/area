import {Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import HomeLogin from "../LoginScreens/HomeLogin"
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import ButtonComponents from "../../components/ButtonLogin";
import {loadUserData, servicesGet} from "../../api/api";
import {createOnShouldStartLoadWithRequest} from "react-native-webview/lib/WebViewShared";
import {RFValue} from "react-native-responsive-fontsize";
import AppWidget from "../../components/AppWidget"
import {ThemeTypeContext} from "../../constants/Theme";
import EncryptedStorage from "react-native-encrypted-storage";
import {IAREAServices} from "../../interfaces/IAREAServices";
import IService from "../../interfaces/IService";


type RootStackParamList = {
    Profile: undefined;
    Details: { itemId: number };
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

function splitDataForFlatlist(data: string[]): string [][] {
    const res: string [][] = [[]]
    const size: number = 2
    res.shift();
    for (let i: number = 0; i < data.length; i += size) {
        res.push(data.slice(i, i + size));
    }
    return (res)
}

async function getServices(): Promise<IService> {
    const token = await EncryptedStorage.getItem("userToken");
    return await servicesGet(token as string);
}

/**
 * Route for the App page.
 * The App page is the page that shows you all the usable applications.
 *
 * @param navigation The navigation prop.
 * @returns The App page as jsx.
 */
export const App: React.FC<Props> = ({navigation}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    const [services, setServicies] = React.useState<IService>({"action": [""], "reaction": [""]});


    const action: string[][] = splitDataForFlatlist(services.action);
    const reaction: string[][] = splitDataForFlatlist(services.reaction);


    useEffect(() => {
        getServices().then((res) => {
            setServicies(res);
        });

    }, []);


    return (
        <ScrollView>
            <View style={{
                height: Dimensions.get("window").height * 0.55,
                backgroundColor: Theme.colors.White
            }}>
                <View style={{
                    height: "17%",
                }}>
                    <View style={{
                        marginTop: "2%",
                        marginLeft: "3%"
                    }}>
                        <Text style={{
                            ...Theme.Title,
                            color: Theme.colors.Black,
                            fontWeight: "bold"
                        }}>
                            Action
                        </Text>
                    </View>
                </View>
                <View style={{
                    height: "80%",
                }}>
                    <FlatList style={{
                        alignContent: "space-around"
                    }}
                              horizontal={true}
                              data={action} renderItem={({item}) => {
                        return (
                            <AppWidget data={item}/>

                        )
                    }}/>
                </View>
            </View>
            <View style={{
                height: Dimensions.get("window").height * 0.55,
                backgroundColor: Theme.colors.White
            }}>
                <View style={{
                    height: "17%",
                }}>
                    <View style={{
                        marginTop: "2%",
                        marginLeft: "3%"
                    }}>
                        <Text style={{
                            ...Theme.Title,
                            color: Theme.colors.Black,
                            fontWeight: "bold"
                        }}>
                            Réaction
                        </Text>
                    </View>
                </View>
                <View style={{
                    height: "80%",
                }}>
                    <FlatList style={{
                        alignContent: "space-around"
                    }}
                              horizontal={true}
                              data={reaction} renderItem={({item}) => {
                        return (
                            <AppWidget data={item}/>

                        )
                    }}/>
                </View>
                <View style={{
                    height: "3%",
                }}>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({})
