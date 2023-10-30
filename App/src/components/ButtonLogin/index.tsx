import {DimensionValue, StyleSheet, Text, TouchableOpacity} from "react-native";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import {ThemeTypeContext} from "../../constants/Theme";

interface Props {
    text?: string;
    onPress?: (e: any) => void;
    bgColor?: string;
    textColor?: string;
    hei?: DimensionValue | undefined;
    wid?: DimensionValue | undefined;

}

export default function ButtonComponents(Props: Props) {
    const Styles = useThemedStyles(styles);
    return (
        <TouchableOpacity style={{
            backgroundColor: Props?.bgColor,
            height: Props?.hei,
            width: Props?.wid,
            ...Styles.container
        }}
                          onPress={(e) => (Props?.onPress) ? Props.onPress(e) : null}>
            <Text style={{
                color: Props?.textColor,
                ...Styles.textStyles
            }}>
                {Props?.text ? Props?.text : ""}
            </Text>
        </TouchableOpacity>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
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
