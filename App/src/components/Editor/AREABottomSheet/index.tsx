import {FlatList, StyleSheet, Text, View} from "react-native"
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import useTheme from "../../../hooks/Theme/useTheme";
import {ThemeTypeContext} from "../../../constants/Theme";
import {AREAComponent} from "../AREAComponent";
import React, {useEffect} from "react";
import {servicesGet} from "../../../api/api";
import * as SecureStore from "expo-secure-store";
import {IAREAComponent} from "../../../interfaces/IAREAComponent";

type AREABottomSheetProps = {
    currentArea?: IAREAComponent,
};

async function getServices(): Promise<IService> {
    const token = await SecureStore.getItemAsync("userToken");
    return await servicesGet(token as string);
}

const AREAParamBottomSheet: React.FC<{data: IAREAComponent}> = ({data}) => {
    return (
        <View>
            <Text>AREAParamBottomSheet</Text>
        </View>
    )
}

export const AREABottomSheet: React.FC<AREABottomSheetProps> = ({currentArea}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    const [services, setServices] = React.useState<IService>({"action": [""], "reaction": [""]});
    const [actionParamOpened, setActionParamOpened] = React.useState<boolean>(false);

    useEffect(() => {
        getServices()
            .then((res: IService) => {
                setServices(res);
            });
    }, []);

    useEffect(() => {
        setActionParamOpened(false);
    }, [currentArea]);

    return (
        actionParamOpened ? <AREAParamBottomSheet data={currentArea!} /> :
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
                            <AREAComponent data={data} inEditor={false} onPress={(data) => {setActionParamOpened(true)}}/>
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
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
    },
  });