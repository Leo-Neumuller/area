import React, {useEffect, useRef, useState} from "react";
import Node from "../../../interfaces/NodeInterface";
import Edge from "../../../interfaces/EdgeInterface";
import {GestureResponderEvent, StyleSheet, Text, View} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import useTheme from "../../../hooks/Theme/useTheme";
import IAREAComponent from "../../../interfaces/IAREAComponent";
import {ThemeTypeContext} from "../../../constants/Theme";
import {BottomSheetComponent} from "../../BottomSheetComponent";
import {AREABottomSheet} from "../AREABottomSheet";
import {AREAComponent} from "../AREAComponent";
import ButtonComponents from "../../ButtonLogin";

export const Board: React.FC = () => {
    const [title, setTitle] = useState<string>("Sans nom");
    const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
    const [areaType, setAreaType] = useState<"action" | "reaction">("action");
    const bottomSheetRef = useRef<BottomSheet>(null);
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [selectedArea, setSelectedArea] = useState<IAREAComponent>();
    const [saveSelectedArea, setSaveSelectedArea] = useState<IAREAComponent>();
    const [areaIsDefined, setAreaIsDefined] = useState<{ action: boolean, reaction: boolean }>({action: false, reaction: false});


    let action: IAREAComponent = {
        default: true,
        type: "action",
    }

    let reaction: IAREAComponent = {
        default: true,
        type: "reaction",
    }

    useEffect(() => {
        if (saveSelectedArea) {
            if (saveSelectedArea.type == "action") {
                action = saveSelectedArea;
                setAreaIsDefined({...areaIsDefined, action: true});
            } else if (saveSelectedArea.type == "reaction") {
                reaction = saveSelectedArea;
                setAreaIsDefined({...areaIsDefined, reaction: true});
            }
        }
    }, [saveSelectedArea]);

    useEffect(() => {
        if (areaIsDefined.action && areaIsDefined.reaction) {
        }
    }, [areaIsDefined]);

    return (
        <BottomSheetComponent ref={bottomSheetRef} setOpened={setBottomSheetOpened} opened={bottomSheetOpened} content={<AREABottomSheet currentArea={selectedArea} bottomSheetRef={bottomSheetRef} setSaveSelectedArea={setSaveSelectedArea} />}>
            <View style={Styles.container}>
                <AREAComponent data={action} inEditor={true} onPress={(data) => {
                    bottomSheetRef.current?.expand();
                    setBottomSheetOpened(true);
                    setSelectedArea(data);
                }} />
                <View style={Styles.line} />
                <AREAComponent data={reaction} inEditor={true} onPress={(data) => {
                    bottomSheetRef.current?.expand();
                    setBottomSheetOpened(true);
                    setSelectedArea(data);
                }} />
                {areaIsDefined.action && areaIsDefined.reaction &&
                    <View style={Styles.saveButton}>
                        <ButtonComponents onPress={
                            () => {
                            }
                        } text={"Save"} wid={"100%"} hei={"100%"} bgColor={Theme.colors.Primary}/>
                    </View>
                }
            </View>
        </BottomSheetComponent>
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
    saveButton: {
        width: "40%",
        height: "10%",
        position: "absolute",
        bottom: 10,

    }
});