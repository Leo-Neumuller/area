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
import IFLUX from "../../../interfaces/IFLUX";
import EncryptedStorage from "react-native-encrypted-storage";
import {fluxPost, servicesGet} from "../../../api/api";
import {IServiceSchema} from "../../../interfaces/IServiceSchema";

async function postFlux(flux: IFLUX): Promise<any> {
    const token = await EncryptedStorage.getItem("userToken");
    return await fluxPost(token as string, flux);
}

function saveFlux(id: number, title: string, actions: [IAREAComponent], reactions: [IAREAComponent]) {
    let flux: IFLUX = {
        id: id,
        name: title,
        description: title,
        nodes: [...actions.map((action, index) => {
                return {
                    id: "node_" + index,
                    numberInputs: 0,
                    numberOutputs: reactions.length,
                    service: action.name,
                    subService: action.subService?.name,
                    subServiceId: action.subService?.id,
                    inputDataFromSubServiceId: action.subService?.id,
                    inputsData: action.serviceSchema?.inputsData,
                    prevPosition: {x: 300, y: 200},
                    currPosition: {x: 300, y: 200},
                    type: "Action",
                    inputEdgeIds: [],
                    outputEdgeIds: ["edge_0_0"],
                    title: action.name!,
                    img: "prout",
                }
            }),
            ...reactions.map((reaction, index) => {
            return {
                id: "node_" + (actions.length + index),
                numberInputs: actions.length,
                numberOutputs: 0,
                service: reaction.name,
                subService: reaction.subService?.name,
                subServiceId: reaction.subService?.id,
                inputDataFromSubServiceId: reaction.subService?.id,
                inputsData: reaction.serviceSchema?.inputsData,
                prevPosition: {x: 300, y: 400},
                currPosition: {x: 300, y: 400},
                type: "Reaction",
                inputEdgeIds: ["edge_0_0"],
                outputEdgeIds: [],
                title: reaction.name!,
                img: "prout",
            }
        })],
        edges: [
            {
                id: "edge_0_0",
                nodeStartId: "node_0",
                nodeEndId: "node_" + actions.length,
                inputIndex: -1,
                outputIndex: 0,
                prevStartPos: {x: 510, y: 318},
                currStartPos: {x: 510, y: 318},
                prevEndPos: {x: 510, y: 382},
                currEndPos: {x: 510, y: 382},
            }
        ]
    }
    postFlux(flux).then((res) => {
      console.log(res);
    })
    .catch((err) => {
        console.error(err);
    })
}
export const Board: React.FC<{title?: string, setTitle?: React.Dispatch<React.SetStateAction<string>>, flux?: IFLUX, goBack?: Function}> = ({title, setTitle, flux, goBack}) => {
    const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [selectedArea, setSelectedArea] = useState<IAREAComponent>();
    const [saveSelectedArea, setSaveSelectedArea] = useState<IAREAComponent>();
    const [areaIsDefined, setAreaIsDefined] = useState<{ action: boolean, reaction: boolean }>({action: false, reaction: false});
    const [action, setAction] = useState<IAREAComponent>({
        default: true,
        type: "action",
    });
    const [reaction, setReaction] = useState<IAREAComponent>({
        default: true,
        type: "reaction",
    });
    const [fluxId, setFluxId] = useState<number>(0);

    useEffect(() => {
        if (flux) {
            const tmpaction = flux!.nodes.filter((node) => node.type == "Action")[0];
            const tmpreaction = flux!.nodes.filter((node) => node.type == "Reaction")[0];

            setFluxId(flux!.id);
            setAreaIsDefined({action: true, reaction: true})
            setTitle!(flux!.name);
            setAction({
                default: false,
                type: "action",
                name: tmpaction.service,
                subService: {
                    name: tmpaction.subService!,
                    id: tmpaction.subServiceId!,
                    description: tmpaction.subService!,
                },
                serviceSchema: {
                    inputsData: tmpaction.inputsData as IServiceSchema["inputsData"],
                    id: tmpaction.subServiceId!,
                    name: tmpaction.subService!,
                    description: tmpaction.subService!,
                    type: "action",
                    // @ts-ignore
                    outputData: tmpaction.inputsData?.map((input) => {
                        return {
                            id: input.id!,
                            type: input.type!,
                            value: input.value!,
                        }
                    })
                }
            })
            setReaction({
                default: false,
                type: "reaction",
                name: tmpreaction.service,
                subService: {
                    name: tmpreaction.subService!,
                    id: tmpreaction.subServiceId!,
                    description: tmpreaction.subService!,
                },
                serviceSchema: {
                    inputsData: tmpreaction.inputsData as IServiceSchema["inputsData"],
                    id: tmpreaction.subServiceId!,
                    name: tmpreaction.subService!,
                    description: tmpreaction.subService!,
                    type: "reaction",
                    // @ts-ignore
                    outputData: tmpreaction.inputsData?.map((input) => {
                        return {
                            id: input.id!,
                            type: input.type!,
                            value: input.value!,
                        }
                    })
                }
            })
        }
    }, [flux]);

    useEffect(() => {
        if (saveSelectedArea) {
            if (saveSelectedArea.type == "action") {
                setAction(saveSelectedArea);
                console.log(action);
                setAreaIsDefined({...areaIsDefined, action: true});
            } else if (saveSelectedArea.type == "reaction") {
                setReaction(saveSelectedArea);
                setAreaIsDefined({...areaIsDefined, reaction: true});
            }
        }
    }, [saveSelectedArea]);

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
                                saveFlux(fluxId, title!, [action], [reaction]);
                                if (goBack) {
                                    goBack!();
                                }
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