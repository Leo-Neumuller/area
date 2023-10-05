import {StyleSheet, Text, View, Button, Dimensions, SafeAreaView, TouchableOpacity} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";

export default function ButtonComponents({bgColor, hei, wid, text, textColor}) { // compenant bouton
    const Styles = useThemedStyles(styles);

    return (
        <TouchableOpacity style={{
            backgroundColor: bgColor,
            height: hei,
            width: wid,
            ...Styles.container}
            }>
            <Text style={{
                color: textColor,
                ...Styles.textStyles
            }}>
                {text}
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
