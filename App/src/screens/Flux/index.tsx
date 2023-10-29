import React, {useEffect, useState} from "react";
import {Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";
import EditSVG from "../../../assets/formkit_arrowright.svg";
import AddSVG from "../../../assets/AddComponent.svg";
import FluxOverview from "../../components/fluxOverviewComponent"
import {fluxGet, fluxIdGet} from "../../api/api";
import EncryptedStorage from "react-native-encrypted-storage";


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

export const Flux: React.FC<Props> = ({navigation}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [userFluxs, setUserFluxs] = useState<flux[]>([])

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            fluxGet().then((res) => {
                setUserFluxs(res);
            })
        })
        fluxGet().then((res) => {
            setUserFluxs(res);
        })
        return function clean() {
            onFocus();
        }
    }, [])

    return (
        <ScrollView>
            <View style={{
                height: Dimensions.get("window").height * 0.1,
            }}>
                <View style={{
                    marginTop: "5%",
                    marginLeft: "5%"
                }}>
                    <Text style={{
                        ...Theme.Title,
                        color: Theme.colors.Black,
                        fontWeight: "bold"
                    }}>
                        Vos Flux
                    </Text>
                </View>
            </View>
            {userFluxs.map((value, index) => {
                return (
                    <FluxOverview key={index}
                                  desc={value.description}
                                  name={value.name}
                                  onPress={() => {
                                      return(
                                          EncryptedStorage.getItem("userToken").then((token) => {
                                                  fluxIdGet(token!, value.id).then((res) => {
                                                        // @ts-ignore
                                                      navigation.navigate('FluxEditor', {
                                                          itemId: value.id,
                                                          otherParam: {flux: res}
                                                      })
                                                  })
                                          })
                                      )
                              }}
                    />
                )
            })}
        </ScrollView>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({})

