import {FlatList, StyleSheet, Text, View} from "react-native"
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import useTheme from "../../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../../constants/Theme";
import {AREAComponent} from "../AREAComponent";
import React, {useEffect} from "react";
import {servicesAREAGet, servicesGet} from "../../../api/api";
import * as SecureStore from "expo-secure-store";
import {IAREAComponent} from "../../../interfaces/IAREAComponent";
import {IAREAServices} from "../../../interfaces/IAREAServices";
import {Picker} from "@react-native-picker/picker";

type AREABottomSheetProps = {
    currentArea?: IAREAComponent,
};

async function getServices(): Promise<IService> {
    const token = await SecureStore.getItemAsync("userToken");
    return await servicesGet(token as string);
}

async function getAREAServices(area: string, service: string): Promise<[IAREAServices]> {
    const token = await SecureStore.getItemAsync("userToken");
    return await servicesAREAGet(token as string, area, service);
}

const AREAParamBottomSheet: React.FC<{data: IAREAComponent}> = ({data}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [services, setServices] = React.useState<[IAREAServices]>([{"name": "", "id": "", "description": ""}]);
    const [selectedService, setSelectedService] = React.useState<string>("");

    useEffect(() => {
        console.log(data)
        if (!data.default) {
            getAREAServices(data.type!, data.name!)
                .then((res: [IAREAServices]) => {
                    setServices(res);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, []);

    return (
        <View style={Styles.container}>
            <Text style={[Theme.Title, {color: Theme.colors.White, paddingLeft: 20}]}>
                Application
            </Text>
            <View style={Styles.areaContainer}>
                <View style={Styles.areaContentContainer}>
                    <AREAComponent data={data} inEditor={false} onPress={(data) => {}}/>
                </View>
            </View>
            <View style={[{paddingTop: 20}]}>
                <Text style={[Theme.Title, {color: Theme.colors.White, paddingLeft: 20}]}>
                    {data?.type == "action" ? "Action" : "Reaction"}
                </Text>
                <View style={Styles.pickerContainer}>
                    <Picker
                        style={Styles.picker}
                        dropdownIconColor={Theme.colors.Black}
                        selectionColor={Theme.colors.Black}
                        onValueChange={(itemValue: string, itemIndex) => setSelectedService(itemValue)}
                        selectedValue={selectedService}
                    >
                        {services.map((item) => {
                            return (
                                <Picker.Item label={item.name} value={item.id} />
                            )
                        })}
                    </Picker>
                </View>
            </View>
        </View>
    )
}

export const AREABottomSheet: React.FC<AREABottomSheetProps> = ({currentArea}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [services, setServices] = React.useState<IService>({"action": [""], "reaction": [""]});
    const [actionParamOpened, setActionParamOpened] = React.useState<boolean>(false);
    const [currentAreaParam, setCurrentAreaParam] = React.useState<IAREAComponent>();

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
        setActionParamOpened(false);
    }, [currentArea]);

    return (
        actionParamOpened ? <AREAParamBottomSheet data={currentAreaParam!} /> :
        <View style={Styles.container}>
            <Text style={[Theme.Title, {color: Theme.colors.White, paddingLeft: 20}]}>
                {currentArea?.type == "action" ? "Action" : "Reaction"}
            </Text>
            <View style={Styles.areaContainer}>
                <FlatList
                    keyExtractor={(item) => item} data={currentArea?.type == "action" ? services["action"] : services["reaction"]}
                    renderItem={({item}) => {
                        const data: IAREAComponent = {
                            name: item,
                            default: false,
                            type: currentArea?.type == "action" ? "action" : "reaction",
                        };

                        return (
                            <View style={Styles.areaContentContainer}>
                                <AREAComponent data={data} inEditor={false} onPress={(data) => {
                                    setActionParamOpened(true)
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
        flex: 1
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
        alignItems: "center",
        flexDirection: "column"
    },
    picker: {
        width: "90%",
        height: "5%",
        backgroundColor: Theme.colors.Gray,
        borderRadius: 20,
        justifyContent: "center"
    }
  });