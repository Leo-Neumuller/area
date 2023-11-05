import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import useThemedStyles from '../../../hooks/Theme/useThemedStyle';
import useTheme from '../../../hooks/Theme/useTheme';
import { StyleSheet } from 'react-native';
import EditSVG from "../../../../assets/pepicons-pop_pen.svg";
import FluxSVG from "../../../../assets/logos_flux.svg"
import { ThemeTypeContext } from '../../../constants/Theme';
import IAREAComponent from "../../../interfaces/IAREAComponent";
import getUrlImg from "../../../hooks/getIcon";

type Props = {
    inEditor: boolean,
    onPress: (data?: IAREAComponent) => void,
    data: IAREAComponent,
    customSvg?: React.ReactNode,
}

export const AREAComponent: React.FC<Props> = ({inEditor, onPress, data, customSvg}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [selected, setSelected] = React.useState(false);

    return (
        <View style={inEditor ? (data.type == "action" ? Styles.actionContainer : Styles.reactionContainer) : Styles.editorContainer}>
            <TouchableOpacity onPress={() => {
                onPress(data)
                setSelected(!selected)
            }}>
                <View style={inEditor ? Styles.editorContentContainer : Styles.contentContainer}>
                    {!data.default && data.name != "Actions" && data.name != "Reactions" ?
                        <View style={[Styles.svgBackground]}>
                            <Image source={getUrlImg(data.name)} style={{width: 50, height: 40, alignSelf: "center"}} ></Image>
                        </View>
                        :
                        <View style={[Styles.svgBackground, {backgroundColor: (data.type == 'action' ? Theme.colors.Primary : Theme.colors.Black)}]}>
                            <FluxSVG style={[{color: data.type == 'action' ? Theme.colors.Black : Theme.colors.Primary}, Styles.svgDefault]}/>
                        </View>
                    }
                    <View style={{justifyContent: "center", width: "50%"}}>
                        <Text numberOfLines={1} style={[Theme.Title, inEditor ? Styles.textEditor : Styles.textDefault, {color: data.type ==  'action' || !inEditor ? Theme.colors.White : Theme.colors.Black}]}>
                            {data.default ? (data.type == 'action' ? "Action" : "Reaction") : data.name!}
                        </Text>
                    </View>
                    {inEditor && customSvg == undefined && <EditSVG style={[Styles.svgEdit, {
                        color: data.type == 'action' ? Theme.colors.White : Theme.colors.Black
                    }]}/>}
                    {customSvg &&
                        customSvg
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
    svgDefault: {
        alignSelf: "center",
    },
    textEditor: {
        justifyContent: "center",
        textAlign: "center",
    },
    textDefault: {
        textAlign: "center",
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
        borderRadius: 20
    },
    editorContentContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    contentContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    svgEdit: {
        justifyContent: "flex-end",
    }
});