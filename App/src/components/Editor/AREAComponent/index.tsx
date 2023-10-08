import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useThemedStyles from '../../../hooks/Theme/useThemedStyle';
import useTheme from '../../../hooks/Theme/useTheme';
import { StyleSheet } from 'react-native';
import EditSVG from "../../../../assets/pepicons-pop_pen.svg";
import FluxSVG from "../../../../assets/logos_flux.svg"
import { ThemeTypeContext } from '../../../constants/Theme';
import IAREAComponent from "../../../interfaces/IAREAComponent";

type Props = {
    inEditor: boolean,
    onPress: (data?: IAREAComponent) => void,
    data: IAREAComponent,
}

export const AREAComponent: React.FC<Props> = ({inEditor, onPress, data}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    return (
        <View style={inEditor ? (data.type == "action" ? Styles.actionContainer : Styles.reactionContainer) : Styles.editorContainer}>
            <TouchableOpacity onPress={() => onPress(data)}>
                <View style={Styles.contentContainer}>
                    <View style={[Styles.svgBackground, {backgroundColor: (data.type == 'action' ? Theme.colors.Primary : Theme.colors.Black)}]}>
                        <FluxSVG style={[{color: data.type == 'action' ? Theme.colors.Black : Theme.colors.Primary}, Styles.svgDefault]} />
                    </View>
                    <Text style={[Theme.Title, {color: data.type ==  'action' ? Theme.colors.White : Theme.colors.Black, justifyContent: "center"}]}>
                        {data.default ? (data.type == 'action' ? "Action" : "Reaction") : data.name!}
                    </Text>
                    {inEditor && <EditSVG style={[Styles.svgEdit, {
                        color: data.type == 'action' ? Theme.colors.White : Theme.colors.Black
                    }]}/>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
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
        height: 70,
        width: 300,
        backgroundColor: Theme.colors.Black,
        borderRadius: 20,
    },
    reactionContainer: {
        height: 70,
        width: 300,
        backgroundColor: Theme.colors.Primary,
        borderRadius: 20,
    },
    editorContainer: {
        height: 70,
        width: 300,
        backgroundColor: Theme.colors.Gray,
        borderRadius: 20,
    },
    contentContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    svgEdit: {
        justifyContent: "flex-end",
    }
});