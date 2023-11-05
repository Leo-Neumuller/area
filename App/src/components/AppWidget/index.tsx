import React, {useEffect, useState} from "react";
import {
    Button,
    Dimensions,
    DimensionValue,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";
import {RFValue} from "react-native-responsive-fontsize";
import getUrlImg from "../../hooks/getIcon";



interface Props {
    data?: string[];
}

/**
 * The widgets component in the flat list of the App page.
 * There are 2 widgets on this component, splited in two rows.
 *
 * @param Props.data The name of the action/reaction.
 * @returns 2 widgets with an image and a text.
 */
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
                        {Props.data?.at(0) != undefined &&  <Image style={{width: RFValue(80),
                            height: RFValue(60),
                        }}
                            source={
                                getUrlImg(Props.data?.at(0))
                            } />}

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
                        {Props.data.at(1) != undefined &&  <Image style={{width: RFValue(80),
                            height: RFValue(60),
                        }}
                                                  source={getUrlImg(Props.data.at(1))} />}

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