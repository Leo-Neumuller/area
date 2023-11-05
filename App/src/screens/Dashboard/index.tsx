import React, {useEffect, useState} from "react";
import {Button, Dimensions, Switch, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import theme, {ThemeTypeContext} from "../../constants/Theme";
import EditSVG from "../../../assets/formkit_arrowright.svg";
import AddSVG from "../../../assets/AddComponent.svg";
import FluxOverview from "../../components/fluxOverviewComponent"
import {fluxGet, fluxIdGet} from "../../api/api";
import EncryptedStorage from "react-native-encrypted-storage";
import DashboardFluxOverview from "../../components/dashboardFluxoverview";
import window from "@react-navigation/native/lib/typescript/src/__mocks__/window";
import ActiveComponent from "../../components/activeComponent";
import VectorSVG from "../../../assets/Vector.svg";
import {calculateInputHeight} from "react-native-paper/lib/typescript/components/TextInput/helpers";


type RootStackParamList = {
    Flux: undefined;
    Details: {
        itemId: number
    };
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Flux'>;
};

interface flux {
    id: number
    name: string
    description: string
    active: boolean
}

function sortActiveFlux(data: flux[]): flux[] {
    const res: flux[] = []
    for (let i: number = 0; i < data.length; i += 1) {
        if (data.at(i) != undefined) {
            if (data.at(i)!.active) {
                res.push(data.at(i)!);
            }
        }

    }
    return (res)
}

/**
 * Route for Dashboard page.
 * The Dashboard is the first page when you are connected. There are all your flux.
 *
 * @param navigation the navigation prop.
 * @returns The Dashboard page as jsx.
 */
export const Dashboard: React.FC<Props> = ({navigation}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [userFluxs, setUserFluxs] = useState<flux[]>([])
    const [activeUserFluxs, setActiveUserFluxs] = useState<flux[]>([])
    const [activeFlux, setActiveFlux] = useState(sortActiveFlux(userFluxs))


    function refreshFlux() {
        fluxGet().then((res) => {
            setUserFluxs(res);
            setActiveFlux(sortActiveFlux(res))
        })
    }

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            fluxGet().then((res) => {
                setUserFluxs(res);
                setActiveFlux(sortActiveFlux(res));
            })
        })
        return function clean() {
            onFocus();
        }
    }, [])

    return (
        <ScrollView>

            {activeFlux.length != 0 && <View>
                <View style={{
                    height: Dimensions.get("window").height * 0.10,
                    justifyContent: "space-evenly"

                }}>
                    <View style={{
                        marginLeft: "3%"
                    }}>
                        <Text style={{
                            ...Theme.Title,
                            color: Theme.colors.Black,
                            fontWeight: "bold"
                        }}>
                            Actifs
                        </Text>
                    </View>
                </View>
                <View style={{
                    height: Dimensions.get("window").height * 0.45
                }}>
                    <FlatList style={{
                        alignContent: "space-around"
                    }}
                              horizontal={true}
                              data={activeFlux} renderItem={({item}) => {
                        return (
                            <DashboardFluxOverview name={item.name}
                                                   desc={item.description}
                                                   onPress={() => {
                                                       return (
                                                           EncryptedStorage.getItem("userToken").then((token) => {
                                                               fluxIdGet(token!, item.id).then((res) => {
                                                                   // @ts-ignore
                                                                   navigation.navigate('FluxEditor', {
                                                                       itemId: item.id,
                                                                       otherParam: {flux: res}
                                                                   })
                                                               })
                                                           })
                                                       )
                                                   }}
                            />

                        )
                    }}/>
                </View>
            </View>}

            <View style={{
                height: Dimensions.get("window").height * 0.10,
                justifyContent: "space-evenly"
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
                        Tous les flux
                    </Text>
                </View>
            </View>
            <View style={{
                backgroundColor: Theme.colors.Black,
                width: "90%",
                alignSelf: "center",
                borderRadius: 30
            }}>
                {userFluxs.map((value, index) => {
                    return (
                        <View key={index}>
                            <ActiveComponent
                                key={index}
                                id={value.id}
                                name={value.name}
                                active={value.active}
                                desc={value.description}
                                refresh={refreshFlux}
                            />
                            {index < userFluxs.length - 1 ?
                                <View style={{
                                    alignSelf: "center",
                                    width: "90%",
                                    height: 1,
                                    backgroundColor: Theme.colors.Primary
                                }}>

                                </View> : null}
                        </View>
                    )
                })}


            </View>
            {userFluxs.length == 0 && <View style={{
                height: Dimensions.get("window").height * 0.60,
                alignItems: "center",
                justifyContent: "space-around"
            }}>
                <View style={{
                    height: "50%",
                    alignItems: "center"
                }}>
                    <View style={{
                        height: "50%",
                        width: "100%",

                        alignItems: "center"

                    }}>
                        <TouchableOpacity style={{
                            height: "100%",
                            width: "30%",
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => navigation.navigate('FluxEditor' as never)}>
                            <VectorSVG style={{color: "#37363790"}}/>

                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        ...Theme.Text
                    }}>
                        Ajouter un flux
                    </Text>
                </View>

            </View>}

        </ScrollView>

    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({})

