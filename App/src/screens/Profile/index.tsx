import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import HomeLogin from "../LoginScreens/HomeLogin"
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import ButtonComponents from "../../components/ButtonLogin";
// import * as SecureStore from "expo-secure-store";
import {loadUserData, servicesGet} from "../../api/api";
import {createOnShouldStartLoadWithRequest} from "react-native-webview/lib/WebViewShared";
import {RFValue} from "react-native-responsive-fontsize";
import {ThemeTypeContext} from "../../constants/Theme";


type RootStackParamList = {
    Profile: undefined;
    Details: { itemId: number };
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

export const Profile: React.FC<Props> = ({navigation}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    // const token = EncryptedStorage.getItem("userToken");
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        surname: ""
    })

    useEffect(() => {
        loadUserData().then((res) => {
            setUserData(res);
        });
    }, []);

    return (
        <ScrollView>
            <View style={{
                height: Dimensions.get("window").height * 0.6
            }}>
                <View style={{
                    height: "10%",
                    marginTop: "5%",
                    marginLeft: "5%"

                }}>
                    <Text style={{
                        ...Theme.Title,
                        color: Theme.colors.Black,
                        fontWeight: "bold"
                    }}>
                        Informations
                    </Text>
                </View>
                <View style={{
                    backgroundColor: Theme.colors.Black,
                    height: "85%",
                    width: "91%",
                    alignSelf: "center",
                    borderRadius: 20
                }}>
                    <View style={{
                        marginTop: "5%",
                        height: "70%",
                        width: "90%",
                        alignSelf: "center",

                    }}>
                        <View style={{
                            height: "33%",
                        }}>
                            <View style={{height: "40%"}}>
                                <Text style={{
                                    ...Theme.Subtitle,
                                    color: Theme.colors.White
                                }}>
                                    Prénom
                                </Text>
                            </View>
                            <View style={{
                                height: "50%",
                                backgroundColor: "#D9D9D91A",
                                borderRadius: 10
                            }}>
                                <Text style={{
                                    ...Theme.Subtitle,
                                    color: Theme.colors.White,
                                    marginLeft: "5%"
                                }}>
                                    {userData.name}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            height: "33%",
                        }}>
                            <View style={{height: "40%"}}>
                                <Text style={{
                                    ...Theme.Subtitle,
                                    color: Theme.colors.White
                                }}>
                                    Nom
                                </Text>
                            </View>
                            <View style={{
                                height: "50%",
                                backgroundColor: "#D9D9D91A",
                                borderRadius: 10
                            }}>
                                <Text style={{
                                    ...Theme.Subtitle,
                                    color: Theme.colors.White,
                                    marginLeft: "5%"
                                }}>
                                    {userData.surname}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            height: "33%",
                        }}>
                            <View style={{height: "40%"}}>
                                <Text style={{
                                    ...Theme.Subtitle,
                                    color: Theme.colors.White
                                }}>
                                    Email
                                </Text>
                            </View>
                            <View style={{
                                height: "50%",
                                backgroundColor: "#D9D9D91A",
                                borderRadius: 10,
                            }}>
                                <Text style={{
                                    ...Theme.Subtitle,
                                    color: Theme.colors.White,
                                    fontSize: RFValue(20),
                                    marginLeft: "5%",
                                    marginTop: "2%"

                                }}>
                                    {userData.email}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={{
                        marginTop: "5%",
                        height: "20%",
                        width: "90%",
                        alignSelf: "center",
                        alignItems: "center",
                    }}>
                        <ButtonComponents
                            bgColor={Theme.colors.Primary}
                            hei={"80%"}
                            wid={"80%"}
                            text={"SE DECONNECTER"}
                            textColor={Theme.colors.Black}
                            onPress={() => {
                                // EncryptedStorage.setItem("userToken", "");
                                navigation.reset(
                                    {
                                        index: 0,
                                        routes: [{name: "HomeLogin" as never}],
                                    }
                                )
                            }}
                        />
                    </View>

                </View>

            </View>
        </ScrollView>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({})
