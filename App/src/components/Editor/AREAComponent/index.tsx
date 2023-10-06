import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useThemedStyles from '../../../hooks/Theme/useThemedStyle';
import useTheme from '../../../hooks/Theme/useTheme';
import { StyleSheet } from 'react-native';
import EditSVG from "../../../../assets/pepicons-pop_pen.svg";
import FluxSVG from "../../../../assets/logos_flux.svg"

type Props = {
    type: "reaction" | "action",
    inEditor: boolean,
    triggerEdit: () => void,
    data?: {} | undefined,
}

export const AREAComponent: React.FC<Props> = ({type, inEditor, triggerEdit, data}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    return (
        <View style={type == "action" ? Styles.actionContainer : Styles.reactionContainer}>
            <TouchableOpacity onPress={triggerEdit}>
                <View style={Styles.contentContainer}>
                    <View style={[Styles.svgBackground, {backgroundColor: type == 'action' ? Theme.colors.Primary : Theme.colors.Black}]}>
                        <FluxSVG style={[{color: type == 'action' ? Theme.colors.Black : Theme.colors.Primary}, Styles.svgDefault]} />
                    </View>
                    <Text style={[Theme.Title, {color: type ==  'action' ? Theme.colors.White : Theme.colors.Black}]}>
                        {data == undefined ? (type == 'action' ? "Action" : "Reaction") : null}
                    </Text>
                    <EditSVG style={{color: type == 'action' ? Theme.colors.White : Theme.colors.Black, marginRight: 10}} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = (Theme) => StyleSheet.create({
    svgDefault: {
        alignSelf: "center",
    },
    svgBackground: {
        height: "85%",
        width: "20%",
        borderRadius: 20,
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "center"
    },
    actionContainer: {
        height: "10%",
        width: "70%",
        backgroundColor: Theme.colors.Black,
        borderRadius: 20,
    },
    reactionContainer: {
        height: "10%",
        width: "70%",
        backgroundColor: Theme.colors.Primary,
        borderRadius: 20,
    },
    contentContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});