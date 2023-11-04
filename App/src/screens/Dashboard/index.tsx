import React, {useEffect, useState} from "react";
import {Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";
import EditSVG from "../../../assets/formkit_arrowright.svg";
import AddSVG from "../../../assets/AddComponent.svg";
import FluxOverview from "../../components/fluxOverviewComponent"
import {fluxGet, fluxIdGet} from "../../api/api";
import EncryptedStorage from "react-native-encrypted-storage";
import DashboardFluxOverview from "../../components/dashboardFluxoverview";


type RootStackParamList = {
    Flux: undefined;
    Details: { itemId: number };
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
        if (data.at(i) != undefined)
            if (data.at(i)!.active) {
                res.push(data.at(i)!);
                console.log(data.at(i)!.name)
            }

    }
    return (res)
}

export const Dashboard: React.FC<Props> = ({navigation}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [userFluxs, setUserFluxs] = useState<flux[]>([])
    const [activeUserFluxs, setActiveUserFluxs] = useState<flux[]>([])


    useEffect(() => {
        fluxGet().then((res) => {
            setUserFluxs(res);
            console.log(userFluxs);
            setActiveUserFluxs(sortActiveFlux(userFluxs));
        })

    }, [])

    console.log(activeUserFluxs)

    return (
        <ScrollView>

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
                          data={activeUserFluxs} renderItem={({item}) => {
                    return (
                        <DashboardFluxOverview name={item.name}
                                               desc={item.description}
                        />

                    )
                }}/>
            </View>

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

        </ScrollView>

    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({})

