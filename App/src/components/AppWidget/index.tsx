import React, {useEffect, useState} from "react";
import {Button, Dimensions, DimensionValue, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";


interface Props {
    desc?: string;
    data?: string[];
}

export default function AppWidget(Props: Props) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();


    return (
        <View>
            <View style={{
                height: Dimensions.get("window").height * 0.58 * 0.4,
                width: Dimensions.get("window").height * 0.58 * 0.4,
            }}>
                <View style={{
                    height: "90%",
                    width: "90%",
                    backgroundColor: "#37363733",
                    alignSelf: "center",
                    alignItems: "center",
                    borderRadius: 20

                }}>
                    <View style={{
                        height: '70%',
                        justifyContent: "space-evenly"
                    }}>
                        {/* mettre l'img*/}

                    </View>
                    <View style={{
                        height: '30%',
                        justifyContent: "space-evenly"
                    }}>
                        <Text style={{
                            ...Theme.Text,
                            fontWeight: "bold"
                        }}> {Props.data?.at(0)}</Text>

                    </View>

                </View>
            </View>
            <View style={{
                height: Dimensions.get("window").height * 0.58 * 0.4,
                width: Dimensions.get("window").height * 0.58 * 0.4,
            }}>
                {Props.data?.length == 2 ? <View style={{
                    height: "90%",
                    width: "90%",
                    backgroundColor: "#37363733",
                    alignSelf: "center",
                    alignItems: "center",
                    borderRadius: 20

                }}>
                    <View style={{
                        height: '70%',
                        justifyContent: "space-evenly"
                    }}>
                        {/* mettre zzzl'img*/}

                    </View>
                    <View style={{
                        height: '30%',
                        justifyContent: "space-evenly"
                    }}>
                        <Text style={{
                            ...Theme.Text,
                            fontWeight: "bold"
                        }}> {Props.data?.at(1)}</Text>

                    </View>

                </View> : null}
            </View>
        </View>

    )


}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({});