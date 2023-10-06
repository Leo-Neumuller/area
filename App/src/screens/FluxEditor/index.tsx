import { StackNavigationProp } from '@react-navigation/stack';
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
import { AddComponent } from '../../components/Editor/AddComponent';
import { ThemeTypeContext } from '../../constants/Theme';

type RootStackParamList = {
    FluxEditor: undefined;
    Details: { itemId: number };
};

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
                    style={[Theme.Title, {color: Theme.colors.White, display: "flex", flexDirection: "column", maxWidth: 200}]} 
                    onChangeText={setTitle}
                    onEndEditing={() => { setEditable(false) }}
                >
                        {props.children}
                </TextInput>
            </View>
            <View>
                <TouchableOpacity onPress={() => { setEditable(true) }}>
                    <EditSVG style={{color: Theme.colors.White}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const FluxEditor: React.FC<{navigation: StackNavigationProp<RootStackParamList, 'FluxEditor'>}> = ({ navigation }) => {
    const [title, setTitle] = useState<string>("Sans nom");
    const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
    const [areaType, setAreaType] = useState<"action" | "reaction">("action");
    const [areaData, setAreaData] = useState<{}>({});
    const bottomSheetRef = useRef<BottomSheet>(null);
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    useEffect(() => {
        navigation.setOptions({ title: title, headerStyle: { backgroundColor: Theme.colors.Black }, headerTitle(props) { return <HeaderTitle props={props} setTitle={setTitle} /> }, headerTitleAlign: 'center' });
    }, [title]);


    return (
        <View style={{width: "100%", height: "100%"}}>
            <AddComponent ref={bottomSheetRef} setOpened={setBottomSheetOpened} opened={bottomSheetOpened}>
                <View style={Styles.container}>
                    <AREAComponent type='action' inEditor={true} triggerEdit={() => { bottomSheetRef.current?.expand(); setBottomSheetOpened(true) }} />
                    <View style={Styles.line} />
                    <AREAComponent type='reaction' inEditor={true} triggerEdit={() => { bottomSheetRef.current?.expand(); setBottomSheetOpened(true) }}  />
                </View>
            </AddComponent>
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