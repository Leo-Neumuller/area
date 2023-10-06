import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { HeaderTitleProps } from '@react-navigation/elements/src/types'
import EditSVG from "../../../assets/pepicons-pop_pen.svg";
import { AddComponent } from '../../components/Editor/AddComponent';
import { ScrollView } from 'react-native';
import AddSVG from "../../../assets/AddComponent.svg";
import useThemedStyles from '../../hooks/Theme/useThemedStyle';
import useTheme from '../../hooks/Theme/useTheme';

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
                    <EditSVG />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const FluxEditor: React.FC<{navigation: StackNavigationProp<RootStackParamList, 'FluxEditor'>}> = ({ navigation }) => {
    const [title, setTitle] = useState<string>("Sans nom");
    const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);

    // const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    useEffect(() => {
        navigation.setOptions({ title: title, headerStyle: { backgroundColor: Theme.colors.Black }, headerTitle(props) { return <HeaderTitle props={props} setTitle={setTitle} /> }, headerTitleAlign: 'center' });
    }, [title]);

    return (
        <View style={{width: "100%", height: "100%"}}>
            <View style={bottomSheetOpened ? styles.containerUnfocused : styles.container} onTouchStart={() => { setBottomSheetOpened(false) }}>
                <Text>editor</Text>
                <TouchableOpacity onPress={() => { setBottomSheetOpened(true) }}>
                    <AddSVG />
                </TouchableOpacity>
            </View>
            <AddComponent opened={bottomSheetOpened} setOpened={setBottomSheetOpened} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerUnfocused: {
        flex: 1,
        backgroundColor: 'grey',
    },
    container: {
        flex: 1,
    },
});