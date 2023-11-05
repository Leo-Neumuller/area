import EditSVG from "../../../assets/formkit_arrowright.svg";
import AddSVG from "../../../assets/AddComponent.svg";
import React, {useEffect, useState} from "react";
import {Button, Dimensions, DimensionValue, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";


interface Props {
    desc?: string;
    onPress?: (e: any) => void;
    name?: string;
}

/**
 * This component display an active flux on the map of the Dashboard page.
 *
 * @param Props.name The name of the flux.
 * @param Props.desc The desc of the flux.
 * @param Props.onPress The action when we press the arrow.
 * @returns a flux overview.
 */
export default function dashboardFluxOverview(Props: Props) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();


    return (
            <View style={{
                height: "100%",
                width: Dimensions.get("window").width *0.6,
                justifyContent: "space-evenly",
                alignItems: "center"

            }}>
                <View style={{
                    height: "95%",
                    width: "90%",
                    borderColor: "#37363733",
                    borderWidth: 1,
                    borderRadius: 30
                }}>
                    <View style={{
                        height: "80%",
                        alignSelf: "center",
                        justifyContent: "center",
                    }}>

                        <Text style={{
                            ...Theme.Text,

                            flexWrap: "wrap",
                            textAlign: "center"
                        }}>
                            {Props.desc}
                        </Text>
                    </View>
                    <View style={{
                        height: "20%",
                        backgroundColor: "#3736371A",
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        flex: 1,
                        flexDirection: "row"
                    }}>
                        <View style={{
                            height: "100%",
                            width: "70%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{
                                ...Theme.Text,
                                fontWeight: "bold"
                            }}>{Props.name}</Text>
                        </View>
                        <View style={{
                            height: "100%",
                            width: "30%",
                            alignItems: "center",
                            justifyContent: "center",

                        }}>
                            <TouchableOpacity onPress={Props.onPress}>
                                <EditSVG style={{color: Theme.colors.Black}}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
    )


}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({});