import EditSVG from "../../../assets/formkit_arrowright.svg";
import AddSVG from "../../../assets/AddComponent.svg";
import React, {useEffect, useState} from "react";
import {
    Button,
    Dimensions,
    DimensionValue,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../constants/Theme";
import {changeActive} from "../../api/api";


interface Props {
    desc?: string;
    name?: string;
    active: boolean;
    id: number;
    refresh: Function;
}

export default function ActiveComponent(Props: Props) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [error, setError] = useState()


    return (
        <View style={{
            height: Dimensions.get("window").height * 0.15,
            justifyContent: "space-evenly",
            flexDirection: "row"

        }}>
            <View style={{
                width: "70%",
                height: "100%",
            }}>
                <View style={{
                    width: "100%",
                    height: "30%",
                    alignItems: "center"
                }}>
                    <Text style={{
                        ...Theme.Subtitle,
                        color: Theme.colors.White,
                        marginLeft: "7%"
                    }}>
                        {Props.name}
                    </Text>
                </View>
                <View style={{
                    width: "100%",
                    height: "70%",
                    justifyContent: "space-evenly",
                }}>
                    <Text style={{
                        ...Theme.Text,
                        color: Theme.colors.White,
                        marginLeft: "7%"
                    }}>
                        {Props.desc}
                    </Text>
                </View>
            </View>
            <View style={{
                width: "30%",
                height: "100%",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
                <Switch
                    trackColor={{false: '#767577', true: '#767577'}}
                    thumbColor={Props.active ? Theme.colors.Primary : Theme.colors.White}
                    ios_backgroundColor="#3e3e3e"
                    onTouchEnd={() => {


                    }}
                    onChange={() => {
                        changeActive(Props.id).then(() => {
                            Props.refresh();
                        });
                    }}
                    onValueChange={() => {

                    }}
                    value={Props.active}
                />

            </View>

        </View>
    )


}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({});