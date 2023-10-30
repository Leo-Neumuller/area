import React, {useEffect, useRef, useState} from "react";
import Node from "../../../interfaces/NodeInterface";
import Edge from "../../../interfaces/EdgeInterface";
import {GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
import DropdownSVG from "../../../../assets/dropdown.svg";
import AddSVG from "../../../../assets/Vector.svg"


async function postFlux(flux: IFLUX): Promise<any> {
    const token = await EncryptedStorage.getItem("userToken");
    return await fluxPost(token as string, flux);
}

function saveFlux(id: number, title: string, actions: IAREAComponent[], reactions: IAREAComponent[]) {
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
                    prevPosition: {x: 100 + (index * 500), y: 200},
                    currPosition: {x: 100 + (index * 500), y: 200},
                    type: "Action",
                    inputEdgeIds: [],
                    outputEdgeIds: [],//"edge_0_0"],
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
                prevPosition: {x: 100 + (index * 500), y: 400},
                currPosition: {x: 100 + (index * 500), y: 400},
                type: "Reaction",
                inputEdgeIds: [],//"edge_0_0"],
                outputEdgeIds: [],
                title: reaction.name!,
                img: "prout",
            }
        })],
        edges: []
    }
    for (let i = 0; i < actions.length; i++) {
        for (let a = actions.length; a < (reactions.length + actions.length); a++)
        {
            const startpos = {x: flux.nodes[i].currPosition.x + 210 + (-6 * reactions.length) + (24 * (a - actions.length)), y: 318};
            const endpos = {x: flux.nodes[a].currPosition.x + 210 + (-6 * actions.length) + (24 * i), y: 382};

            flux.edges.push({
                id: "edge_" + i + "_" + a,
                nodeStartId: "node_" + i,
                nodeEndId: "node_" + a,
                inputIndex: -1 + i,
                outputIndex: 0 + i,
                prevStartPos: startpos,
                currStartPos: startpos,
                prevEndPos: endpos,
                currEndPos: endpos,
            });
            flux.nodes[i].outputEdgeIds = [...flux.nodes[i].outputEdgeIds, "edge_" + i + "_" + a]
            flux.nodes[a].inputEdgeIds = [...flux.nodes[a].inputEdgeIds, "edge_" + i + "_" + a]
        }
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
    const [actionDropDown, setActionDropDown] = useState<boolean>(false);
    const [reactionDropDown, setReactionDropDown] = useState<boolean>(false);
    const [action, setAction] = useState<IAREAComponent[]>([{
        default: true,
        type: "action",
    }]);
    const [reaction, setReaction] = useState<IAREAComponent[]>([{
        default: true,
        type: "reaction",
    }]);
    const [fluxId, setFluxId] = useState<number>(0);

    const defaultAction: IAREAComponent = {
        default: true,
        type: "action",
    }
    const defaultReaction: IAREAComponent = {
        default: true,
        type: "reaction",
    }

    useEffect(() => {
        if (flux) {
            const arrActions = flux!.nodes.filter((node) => node.type == "Action");
            const arrReactions = flux!.nodes.filter((node) => node.type == "Reaction");

            setFluxId(flux!.id);
            setAreaIsDefined({action: true, reaction: true})
            setTitle!(flux!.name);
            // @ts-ignore
            setAction(arrActions.map((item) => {
                return {
                    default: false,
                    type: "action",
                    name: item.service,
                    subService: {
                        name: item.subService!,
                        id: item.subServiceId!,
                        description: item.subService!,
                    },
                    serviceSchema: {
                        inputsData: item.inputsData as IServiceSchema["inputsData"],
                        id: item.subServiceId!,
                        name: item.subService!,
                        description: item.subService!,
                        type: "action",
                        // @ts-ignore
                        outputData: item.inputsData?.map((input) => {
                            return {
                                id: input.id!,
                                type: input.type!,
                                value: input.value!,
                            }
                        })
                    }
                }
            }));
            // @ts-ignore
            setReaction(arrReactions.map((item) => {
                return {
                    default: false,
                    type: "reaction",
                    name: item.service,
                    subService: {
                        name: item.subService!,
                        id: item.subServiceId!,
                        description: item.subService!,
                    },
                    serviceSchema: {
                        inputsData: item.inputsData as IServiceSchema["inputsData"],
                        id: item.subServiceId!,
                        name: item.subService!,
                        description: item.subService!,
                        type: "reaction",
                        // @ts-ignore
                        outputData: item.inputsData?.map((input) => {
                            return {
                                id: input.id!,
                                type: input.type!,
                                value: input.value!,
                            }
                        })
                    }
                }
            }))
        }
    }, [flux]);

    useEffect(() => {
        if (saveSelectedArea) {
            if (saveSelectedArea.type == "action") {
                const index = action.findIndex((item) => item == selectedArea);

                setAction([...action.slice(0, index), saveSelectedArea, ...action.slice(index + 1)]);
                setAreaIsDefined({...areaIsDefined, action: true});
            } else if (saveSelectedArea.type == "reaction") {
                const index = reaction.findIndex((item) => item == selectedArea);

                setReaction([...reaction.slice(0, index), saveSelectedArea, ...reaction.slice(index + 1)]);
                setAreaIsDefined({...areaIsDefined, reaction: true});
            }
        }
    }, [saveSelectedArea]);

    return (
        <BottomSheetComponent ref={bottomSheetRef} setOpened={setBottomSheetOpened} opened={bottomSheetOpened} content={<AREABottomSheet currentArea={selectedArea} bottomSheetRef={bottomSheetRef} setSaveSelectedArea={setSaveSelectedArea} />}>
            <View style={Styles.container}>
                <AREAComponent data={{...defaultAction, name: "Actions", default: false}} inEditor={true} onPress={(data) => { setActionDropDown(!actionDropDown) }} customSvg={
                    <DropdownSVG style={{color: Theme.colors.White, transform: [{rotate: actionDropDown ? "180deg" : "0deg"}]}} />
                } />
                <ScrollView style={[Styles.dropdownContainer, {backgroundColor: Theme.colors.Black, display: actionDropDown ? "flex" : "none"}]}>
                    {action.map((item, index) => {
                        return (
                            <AREAComponent key={index} data={item} inEditor={true} onPress={(data) => {
                                bottomSheetRef.current?.expand();
                                setBottomSheetOpened(true);
                                setSelectedArea(data);
                            }} />
                        )
                    })}
                    <TouchableOpacity style={{bottom: 10}} onPress={() => {
                        setAction([...action, defaultAction])
                    }}>
                        <AddSVG style={{alignSelf: "center", marginTop: 10, color: Theme.colors.White}} />
                    </TouchableOpacity>
                </ScrollView>
                <View style={Styles.line} />
                <AREAComponent data={{...defaultReaction, name: "Reactions", default: false}} inEditor={true} onPress={(data) => { setReactionDropDown(!reactionDropDown) }} customSvg={
                    <DropdownSVG style={{color: Theme.colors.Black, transform: [{rotate: reactionDropDown ? "180deg" : "0deg"}]}} />
                } />
                <ScrollView style={[Styles.dropdownContainer, {backgroundColor: Theme.colors.Primary, display: reactionDropDown ? "flex" : "none", marginBottom: 40}]}>
                {reaction.map((item, index) => {
                    return (
                        <AREAComponent key={index} data={item} inEditor={true} onPress={(data) => {
                            bottomSheetRef.current?.expand();
                            setBottomSheetOpened(true);
                            setSelectedArea(data);
                        }} />
                    )
                })}
                <TouchableOpacity style={{bottom: 10}} onPress={() => {
                    setReaction([...reaction, defaultReaction])
                }}>
                    <AddSVG style={{alignSelf: "center", marginTop: 10, color: Theme.colors.Black}} />
                </TouchableOpacity>
                </ScrollView>
                {areaIsDefined.action && areaIsDefined.reaction &&
                    <View style={Styles.saveButton}>
                        <ButtonComponents onPress={
                            () => {
                                saveFlux(fluxId, title!, action, reaction);
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
    dropdownContainer: {
        marginTop: 3,
        gap: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        maxHeight: "25%",
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