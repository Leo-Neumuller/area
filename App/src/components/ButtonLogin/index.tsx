import {StyleSheet, Text, View, Button, Dimensions, SafeAreaView, TouchableOpacity} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";

export default function ButtonComponents(Props) { // compenent bouton
    const Styles = useThemedStyles(styles);
    return (
        <TouchableOpacity style={{
            backgroundColor: Props?.bgColor,
            height: Props?.hei,
            width: Props?.wid,
            ...Styles.container}
            }
        onPress={(e) => (Props?.onPress) ? Props.onPress(e) : null}>
            <Text style={{
                color: Props?.textColor,
                ...Styles.textStyles
            }}>
                { Props?.text ? Props?.text : "" }
            </Text>
        </TouchableOpacity>
    )
}

const styles = Theme => StyleSheet.create({
    container: {
        borderRadius: Theme.Button.borderRadius,
        alignItems: Theme.Button.alignItems,
        justifyContent: Theme.Button.justifyContent,
    },
    textStyles: {
        fontSize: Theme.Button.fontSize,
        fontFamily: Theme.Button.fontFamily,
        fontWeight: Theme.Button.fontWeight,
    }
});
