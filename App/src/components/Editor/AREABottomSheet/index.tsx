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
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

type AREABottomSheetProps = {
    currentArea?: IAREAComponent,
    bottomSheetRef?:  React.RefObject<BottomSheetMethods> | undefined,
    setSaveSelectedArea?: React.Dispatch<React.SetStateAction<IAREAComponent | undefined>>
    deleteArea: () => void;
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

async function authService(url: string, serviceId: string): Promise<void> {
    const newUrl = url.replace(/redirect_uri=.*services/, "redirect_uri=" + encodeURIComponent(process.env.API_URL!) + "%2Fservices");

    console.log(newUrl)
    try {
        if (await InAppBrowser.isAvailable()) {
            InAppBrowser.open(newUrl, {
                // iOS Properties
                ephemeralWebSession: false,
                // Android Properties
                showTitle: false,
                enableUrlBarHiding: true,
                enableDefaultShare: false,
                forceCloseOnRedirection: true
            })
                .then((response) => {
                    console.log(response)
                })
            // InAppBrowser.openAuth(url, "localhost:8000", {
            //     // iOS Properties
            //     ephemeralWebSession: false,
            //     // Android Properties
            //     showTitle: false,
            //     enableUrlBarHiding: true,
            //     enableDefaultShare: false,
            //
            // }).then((response) => {
            //     console.log(response)
            //     if (
            //         response.type === 'success' &&
            //         response.url
            //     ) {
            //         Linking.openURL(response.url)
            //     }
            // })
        } else {
            Linking.openURL(url)
        }
    } catch (error) {
        Linking.openURL(url)
    }
}
const AREAParamBottomSheet: React.FC<{
    data: IAREAComponent,
    setAREAParamOpened: React.Dispatch<React.SetStateAction<boolean>>,
    closeBottomSheet: Function,
    setSaveSelectedArea?: React.Dispatch<React.SetStateAction<IAREAComponent | undefined>>,
    refetchSchema?: boolean,
    setRefetchSchema?: React.Dispatch<React.SetStateAction<boolean>>,
    deleteArea: () => void;
    }> = ({data, setAREAParamOpened, closeBottomSheet, setSaveSelectedArea, refetchSchema, setRefetchSchema, deleteArea}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [services, setServices] = React.useState<[IAREAServices]>([{"name": "", "id": "", "description": ""}]);
    const [selectedService, setSelectedService] = React.useState<IAREAServices>();
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
            item.value = value;
            // @ts-ignore
            schemaData.inputsData[indexItem] = item;
            setSchema(schemaData!)
        }
    }

    useEffect(() => {
        if ((!data.default && data.serviceSchema == undefined)) {
            getAREAServices(data.type!, data.name!)
                .then((res: [IAREAServices]) => {
                    setServices(res);
                    setSelectedService(res[0])
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, []);

    useEffect(() => {
        if (!data.default && data.serviceSchema) {
            setSchema(data.serviceSchema);
            getAREAServices(data.type!, data.name!)
                .then((res: [IAREAServices]) => {
                    setServices(res);
                    setSelectedService(data.subService)
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [data]);

    useEffect(() => {
        if (selectedService != undefined && selectedService.id && (data.serviceSchema == undefined || refetchSchema)) {
            getServiceSchema(selectedService!.id)
                .then((res: IServiceSchema) => {
                    setSchema(res);
                    data.serviceSchema = res;
                    setRefetchSchema!(false);
                })
                .catch((err) => {
                    console.error(err);
                })
        }

    }, [selectedService, refetchSchema]);

    return (
        <ScrollView style={[Styles.container]} persistentScrollbar={true}>
            <View style={{paddingLeft: 20, paddingRight: 20, width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={[Theme.Title, {color: Theme.colors.White, justifyContent: "center"}]}>
                    Application
                </Text>
                <TouchableOpacity onPress={() => {
                    deleteArea()
                    closeBottomSheet()
                }} style={{backgroundColor: Theme.colors.Red, justifyContent: "center", borderRadius: 20, paddingHorizontal: 15}}>
                    <Text style={[Theme.Subtitle, {color: Theme.colors.Black}]}>Supprimer</Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.areaContainer}>
                <View style={Styles.areaContentContainer}>
                    <AREAComponent data={data} inEditor={false} onPress={(data) => {
                        setAREAParamOpened(false);
                        setRefetchSchema!(true);
                    }}/>
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
                        onValueChange={(itemValue: string, itemIndex) => {
                            if (services[0].id != "") {
                                setSelectedService(services.find((element) => {
                                    if (element.id == itemValue) {
                                        return element;
                                    }
                                }))
                            }
                            setRefetchSchema!(true)
                        }}
                        selectedValue={selectedService?.id}
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
                                            }}
                                            defaultValue={item.value}
                                        />
                                    }
                                    {item.inputType == "text" &&
                                        <TextInput style={[Styles.input, {color: Theme.colors.White, paddingLeft: 20}]} placeholder={item.name} placeholderTextColor={Theme.colors.Gray} onChangeText={
                                            (text: string) => {
                                                setSchemaData(item.id, text);
                                            }}
                                            defaultValue={item.value}
                                        />
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
                                    authService(res.url, selectedService!.id!)
                                        .then((res) => {
                                            console.log(res);
                                        })
                                        .catch((err) => {
                                            console.error(err);
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
                        setSaveSelectedArea!({...data, serviceSchema: schema, subService: selectedService});
                        closeBottomSheet();
                    }
                } text={"Save"} wid={"80%"} hei={"100%"} bgColor={Theme.colors.Primary}/>
            </View>
        </ScrollView>
    )
}

export const AREABottomSheet: React.FC<AREABottomSheetProps> = ({currentArea, bottomSheetRef, setSaveSelectedArea, deleteArea}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [services, setServices] = React.useState<IService>({"action": [""], "reaction": [""]});
    const [actionParamOpened, setAREAParamOpened] = React.useState<boolean>(false);
    const [currentAreaParam, setCurrentAreaParam] = React.useState<IAREAComponent>();
    const [refetchSchema, setRefetchSchema] = React.useState<boolean>(false);

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
        if (currentArea)
            if (!currentArea!.default) {
                setAREAParamOpened(true);
                setCurrentAreaParam(currentArea);
            } else {
                setAREAParamOpened(false);
            }
    }, [currentArea]);

    return (
        actionParamOpened ? <AREAParamBottomSheet data={currentAreaParam!} setAREAParamOpened={setAREAParamOpened} closeBottomSheet={closeBottomSheet} setSaveSelectedArea={setSaveSelectedArea} refetchSchema={refetchSchema} setRefetchSchema={setRefetchSchema} deleteArea={deleteArea} /> :
        <View style={Styles.container}>
            <View style={{paddingLeft: 20, paddingRight: 20, width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={[Theme.Title, {color: Theme.colors.White, justifyContent: "center"}]}>
                    {currentArea?.type == "action" ? "Action" : "Reaction"}
                </Text>
                <TouchableOpacity onPress={() => {
                    deleteArea()
                    closeBottomSheet()
                }} style={{backgroundColor: Theme.colors.Red, justifyContent: "center", borderRadius: 20, paddingHorizontal: 15}}>
                    <Text style={[Theme.Subtitle, {color: Theme.colors.Black}]}>Supprimer</Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.areaContainer}>
                <VirtualizedList
                    getItemCount={(data) => data.length}
                    keyExtractor={(item: string, index) => item}
                    data={currentArea?.type == "action" ? services["action"] : services["reaction"]}
                    getItem={(data, index) => data[index]}
                    initialNumToRender={1}
                    renderItem={({item}) => {
                        let data: IAREAComponent = {
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