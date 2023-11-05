import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { HeaderTitleProps } from '@react-navigation/elements/src/types'
import EditSVG from "../../../assets/pepicons-pop_pen.svg";
import { ScrollView } from 'react-native';
import AddSVG from "../../../assets/AddComponent.svg";
import useThemedStyles from '../../hooks/Theme/useThemedStyle';
import useTheme from '../../hooks/Theme/useTheme';
import {AREAComponent} from "../../components/Editor/AREAComponent";
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetComponent } from '../../components/BottomSheetComponent';
import { ThemeTypeContext } from '../../constants/Theme';
import { AREABottomSheet } from '../../components/Editor/AREABottomSheet';
import IAREAComponent from "../../interfaces/IAREAComponent";
import {Board} from "../../components/Editor/Board";
import IFLUX from "../../interfaces/IFLUX";

/**
 * Navigation Props for the FluxEditor route.
 * @type RootStackParamList
 * @property FluxEditor the FluxEditor route.
 * @property Details the Details route.
 * @property params the params of the route.
 * @property params.flux the flux of the route.
 */
type RootStackParamList = {
    FluxEditor: undefined;
    Details: { itemId: number };
    params: { flux?: IFLUX };
};

/**
 * Props for the HeaderTitle component.
 * @param props the props of the component.
 * @param setTitle the function to set the title.
 * @constructor
 */
const HeaderTitle: React.FC<{props: HeaderTitleProps, setTitle: React.Dispatch<React.SetStateAction<string>> }> = ({ props, setTitle }) => {
    const refInput: React.LegacyRef<TextInput> = React.useRef(null)
    const [editable, setEditable] = useState<boolean>(false);

    const Theme = useTheme();
    useEffect(() => {
        if (editable) {
            refInput.current?.focus()
        }
    }, [editable])

    return (
        <View style={{display: "flex", flexDirection: "row"}}>
            <View>
                <TextInput
                    editable={editable}
                    ref={refInput}
                    onChangeText={setTitle}
                    onEndEditing={() => { setEditable(false) }}
                    style={{maxWidth: 250, display: editable ? "flex" : "none"}}
                >
                    {editable &&
                        <Text
                            style={[Theme.Title, {color: Theme.colors.White, textAlign: "left"}]}
                            numberOfLines={1}
                        >
                            {props.children}
                        </Text>
                    }
                </TextInput>
                    {!editable &&
                        <Text
                            style={[Theme.Title, {color: Theme.colors.White, textAlign: "left", maxWidth: 250}]}
                            numberOfLines={1}
                        >
                            {props.children}
                        </Text>
                    }
            </View>
            <View>
                <TouchableOpacity onPress={() => { setEditable(true) }}>
                    <EditSVG style={{color: Theme.colors.White}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

/**
 * The FluxEditor screen.
 * @param navigation the navigation props.
 * @param route the route props.
 * @constructor
 */
export const FluxEditor: React.FC<StackScreenProps<RootStackParamList, 'FluxEditor'>> = ({navigation, route }) => {
    const [title, setTitle] = useState<string>("Sans nom");
    const Theme = useTheme();

    useEffect(() => {
        navigation.setOptions({ title: title, headerStyle: { backgroundColor: Theme.colors.Black }, headerTitle(props) { return <HeaderTitle props={props} setTitle={setTitle} /> }, headerTitleAlign: 'center', headerBackTitleVisible: false });
    }, [title]);

    return (
        <View style={{width: "100%", height: "100%"}}>
            {
                route.params ?
                <Board title={title} flux={route.params!["otherParam"]["flux"]} setTitle={setTitle} goBack={navigation.goBack}/>
                :
                <Board title={title} setTitle={setTitle} goBack={navigation.goBack}/>
            }
        </View>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    line: {
        width: 1,
        height: 50,
        backgroundColor: Theme.colors.Black,
    },
});