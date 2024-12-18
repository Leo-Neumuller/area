import EditSVG from "../../../assets/formkit_arrowright.svg";
import CrossSVG from "../../../assets/cross-23.svg";

import AddSVG from "../../../assets/AddComponent.svg";
import React, {useEffect, useState} from "react";
import {Button, Dimensions, DimensionValue, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";
import {deleteFlux} from "../../api/api";


interface Props {
    desc?: string;
    onPress?: (e: any) => void;
    name?: string;
    refresh: Function;
    id: number;
}

/**
 * This component display an active flux on the map of the Flux page.
 * With this component we can edit and delete the flux.
 *
 * @param Props.name The name of the flux.
 * @param Props.desc The desc of the flux.
 * @param Props.onPress The action when we press the arrow.
 * @param Props.refresh The function to refresh the list after deleting a flux.
 * @param Props.id The flux id.
 *
 *
 * @returns a flux overview.
 */
export default function FluxOverview(Props: Props) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();


    return (
        <View style={{
            height: Dimensions.get("window").height * 0.45,
        }}>
            <View style={{
                height: "85%",
                width: "90%",
                alignSelf: "center",
                borderRadius: 22,
                borderColor: "#37363733",
                borderWidth: 1,

            }}>
                <View style={{
                    height: "18%",
                }}>
                    <View style={{
                        width: "15%",
                        marginTop: 5,
                        marginRight: 5,
                        alignSelf: "flex-end",
                    }}>
                        <TouchableOpacity onPress={() => {
                            deleteFlux(Props.id).then(() => {
                                Props.refresh();
                            })
                        }}>
                            <CrossSVG style={{color: Theme.colors.Grey}}/>
                        </TouchableOpacity>


                    </View>

                </View>
                <View style={{
                    height: "57%",
                    justifyContent: "center",
                }}>
                    <View style={{
                        height: "80%",
                        width: "80%",
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
                </View>
                <View style={{
                    height: "25%",
                    backgroundColor: "#3736371A",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    justifyContent: "center",
                    alignContent: "space-around",
                    flex: 1,
                    flexDirection: "row"
                }}>
                    <View style={{
                        height: "100%",
                        width: "80%",
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
                        width: "20%",
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