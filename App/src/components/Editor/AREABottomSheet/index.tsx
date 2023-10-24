import {
    Button,
    FlatList, Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View,
    VirtualizedList
} from "react-native"
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import useTheme from "../../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../../constants/Theme";
import {AREAComponent} from "../AREAComponent";
import React, {useEffect} from "react";
import {authorizeUrlGet, servicesAREAGet, serviceSchemaGet, servicesGet} from "../../../api/api";
import {IAREAComponent} from "../../../interfaces/IAREAComponent";
import {IAREAServices} from "../../../interfaces/IAREAServices";
import {Picker} from "@react-native-picker/picker";
import {IServiceSchema} from "../../../interfaces/IServiceSchema";
import ButtonComponents from "../../ButtonLogin";
import EncryptedStorage from "react-native-encrypted-storage";
import {BottomSheetMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import * as fs from "fs";

type AREABottomSheetProps = {
    currentArea?: IAREAComponent,
    bottomSheetRef?:  React.RefObject<BottomSheetMethods> | undefined,
    setSaveSelectedArea?: React.Dispatch<React.SetStateAction<IAREAComponent | undefined>>
};

async function getServices(): Promise<IService> {
    const token = await EncryptedStorage.getItem("userToken");
    return await servicesGet(token as string);
}

async function getAREAServices(area: string, service: string): Promise<[IAREAServices]> {
    const token = await EncryptedStorage.getItem("userToken");
    return await servicesAREAGet(token as string, area, service);
}

async function getServiceSchema(serviceId: string): Promise<IServiceSchema> {
    const token = await EncryptedStorage.getItem("userToken");
    return await serviceSchemaGet(token as string, serviceId);
}

async function getAuthorizeUrlFromApi(serviceId: string): Promise<{ url: string }> {
    const token = await EncryptedStorage.getItem("userToken");
    return await authorizeUrlGet(token as string, serviceId);
}

const AREAParamBottomSheet: React.FC<{
    data: IAREAComponent,
    setAREAParamOpened: React.Dispatch<React.SetStateAction<boolean>>,
    closeBottomSheet: Function
    setSaveSelectedArea?: React.Dispatch<React.SetStateAction<IAREAComponent | undefined>>
    }> = ({data, setAREAParamOpened, closeBottomSheet, setSaveSelectedArea}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [services, setServices] = React.useState<[IAREAServices]>([{"name": "", "id": "", "description": ""}]);
    const [selectedService, setSelectedService] = React.useState<string>("");
    const [schema, setSchema] = React.useState<IServiceSchema>();
    const [authUrl, setAuthUrl] = React.useState<string>("");


    const setSchemaData = (id: string, value: string) => {
        let schemaData: IServiceSchema = schema!;
        let indexItem = 0;

        let item = { ...schemaData?.inputsData.find((element, index) => {
                if (element.id == id) {
                    indexItem = index;
                    return element;
                }
        })};
        if (item) {
            item.data![0] = ({ Items: value });
            // @ts-ignore
            schemaData.inputsData[indexItem] = item;
            setSchema(schemaData!)
        }
    }

    useEffect(() => {
        if (!data.default) {
            getAREAServices(data.type!, data.name!)
                .then((res: [IAREAServices]) => {
                    setServices(res);
                    setSelectedService(res[0].id)
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, []);

    useEffect(() => {
        if (selectedService != "") {
            getServiceSchema(selectedService)
                .then((res: any) => {
                    setSchema(res);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [selectedService]);

    return (
        <ScrollView style={[Styles.container]} persistentScrollbar={true}>
            <Text style={[Theme.Title, {color: Theme.colors.White, paddingLeft: 20}]}>
                Application
            </Text>
            <View style={Styles.areaContainer}>
                <View style={Styles.areaContentContainer}>
                    <AREAComponent data={data} inEditor={false} onPress={(data) => { setAREAParamOpened(false) }}/>
                </View>
            </View>
            <View style={{flex: 1}}>
                <Text style={[Theme.Title, {color: Theme.colors.White, paddingLeft: 20}]}>
                    {data?.type == "action" ? "Action" : "Reaction"}
                </Text>
                <View style={Styles.pickerContainer}>
                    <Picker
                        style={Styles.picker}
                        dropdownIconColor={Theme.colors.Black}
                        onValueChange={(itemValue: string, itemIndex) => setSelectedService(itemValue)}
                        selectedValue={selectedService}
                        mode={"dropdown"}
                    >
                        {services.map((item, index) => {
                            return (
                                <Picker.Item key={index} label={item.name} value={item.id} color={Theme.colors.White} />
                            )
                        })}
                    </Picker>
                    {schema && schema.inputsData.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    backgroundColor: Theme.colors.Gray,
                                    borderRadius: 20,
                                    marginTop: 10,
                                    flex: 1,
                                    width: "90%",
                                    height: item.inputType == "textMultiline" ? 100 : "10%",
                                }}>
                                    {item.inputType == "textMultiline" &&
                                        <TextInput style={[Styles.input, {color: Theme.colors.White, paddingLeft: 20}]} placeholder={item.name} placeholderTextColor={Theme.colors.Gray} onChangeText={
                                            (text: string) => {
                                                setSchemaData(item.id, text);
                                            }} />
                                    }
                                    {item.inputType == "text" &&
                                        <TextInput style={[Styles.input, {color: Theme.colors.White, paddingLeft: 20}]} placeholder={item.name} placeholderTextColor={Theme.colors.Gray} onChangeText={
                                            (text: string) => {
                                                setSchemaData(item.id, text);
                                            }
                                        } />
                                    }
                                </View>
                            )
                        }
                        )}
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[Theme.Title, {color: Theme.colors.White, paddingLeft: 20}]}>
                    Connection
                </Text>
                <View style={{
                    height: "40%",
                    width: "90%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",

                }}>
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: Theme.colors.Gray,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                        onPress={() => {
                            getAuthorizeUrlFromApi(data.name!)
                                .then((res: any) => {
                                    Linking.openURL(res.url)
                                        .catch((res) => {
                                            console.error(res);
                                        })
                                })
                                .catch((err) => {
                                    console.error(err);
                                })
                        }}
                    >
                        <Text style={[Theme.Subtitle, { color: Theme.colors.White }]}>
                            Se connecter
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                height: "40%",
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20
            }}>
                <ButtonComponents onPress={
                    () => {
                        setSaveSelectedArea!({...data, serviceSchema: schema});
                        closeBottomSheet();
                    }
                } text={"Save"} wid={"80%"} hei={"100%"} bgColor={Theme.colors.Primary}/>
            </View>
        </ScrollView>
    )
}

export const AREABottomSheet: React.FC<AREABottomSheetProps> = ({currentArea, bottomSheetRef, setSaveSelectedArea}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [services, setServices] = React.useState<IService>({"action": [""], "reaction": [""]});
    const [actionParamOpened, setAREAParamOpened] = React.useState<boolean>(false);
    const [currentAreaParam, setCurrentAreaParam] = React.useState<IAREAComponent>();

    const closeBottomSheet = () => {
        bottomSheetRef?.current?.close();
    }

    useEffect(() => {
        getServices()
            .then((res: IService) => {
                setServices(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    useEffect(() => {
        setAREAParamOpened(false);
    }, [currentArea]);

    return (
        actionParamOpened ? <AREAParamBottomSheet data={currentAreaParam!} setAREAParamOpened={setAREAParamOpened} closeBottomSheet={closeBottomSheet} setSaveSelectedArea={setSaveSelectedArea} /> :
        <View style={Styles.container}>
            <Text style={[Theme.Title, {color: Theme.colors.White, paddingLeft: 20}]}>
                {currentArea?.type == "action" ? "Action" : "Reaction"}
            </Text>
            <View style={Styles.areaContainer}>
                <VirtualizedList
                    getItemCount={(data) => data.length}
                    keyExtractor={(item: string, index) => item}
                    data={currentArea?.type == "action" ? services["action"] : services["reaction"]}
                    getItem={(data, index) => data[index]}
                    initialNumToRender={1}
                    renderItem={({item}) => {
                        const data: IAREAComponent = {
                            name: item,
                            default: false,
                            type: currentArea?.type == "action" ? "action" : "reaction",
                        };

                        return (
                            <View style={Styles.areaContentContainer}>
                                <AREAComponent data={data} inEditor={false} onPress={(data) => {
                                    setAREAParamOpened(true)
                                    setCurrentAreaParam(data);
                                }}/>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    contentContainer: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    areaContainer: {
        flexDirection: "column",
        alignSelf: "center",

    },
    areaContentContainer: {
        paddingTop: 10,
    },
    pickerContainer: {
        paddingTop: 10,
        flex: 1,
        alignItems: "center",
        flexDirection: "column"
    },
    picker: {
        flex: 1,
        width: "90%",
        height: "5%",
        backgroundColor: Theme.colors.Gray,
        borderRadius: 20,
        justifyContent: "center"
    },
    input: {
        flex: 1
    }
  });