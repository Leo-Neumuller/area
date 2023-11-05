import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useState} from "react";
import useThemedStyles from "../../hooks/Theme/useThemedStyle";
import useTheme from "../../hooks/Theme/useTheme";
import ButtonComponents from "../../components/ButtonLogin";
// import * as SecureStore from "expo-secure-store";
import {authorizeUrlGet, getIsConnected, getOauthService, loadUserData, oauthDisconnect} from "../../api/api";
import {RFValue} from "react-native-responsive-fontsize";
import {ThemeTypeContext} from "../../constants/Theme";
import {InAppBrowser} from "react-native-inappbrowser-reborn";


type RootStackParamList = {
    Profile: undefined;
    Details: { itemId: number };
};

type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const oauthAuthorize = async (url: string) => {
    try {
        if (await InAppBrowser.isAvailable()) {
            InAppBrowser.open(url, {
                // iOS Properties
                ephemeralWebSession: false,
                // Android Properties
                showTitle: false,
                enableUrlBarHiding: true,
                enableDefaultShare: false,
                forceCloseOnRedirection: true
            }).then((response) => {
                console.log(response)
            })
        }
    } catch (error) {

    }
}

/**
 * Route for Profile page.
 * In the profile page, you can find the user's information and his connected applications
 *
 * @param navigation the navigation prop.
 * @returns The Profile page as jsx.
 */
export const Profile: React.FC<Props> = ({navigation}) => {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();
    // const token = EncryptedStorage.getItem("userToken");
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        surname: ""
    })

    const [services, setSevices] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        loadUserData().then((res) => {
            setUserData(res);
        });
    }, []);

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            getOauthService().then((res) => {
                for (let i = 0; i < res.length; i++) {
                    getIsConnected(res[i]).then((isConnected) => {

                        setSevices((prevState) => {
                            return {
                                ...prevState,
                                [res[i]]: {
                                    ...isConnected,
                                }
                            }
                        })
                    })
                }
            });
        })
        return function clean() {
            onFocus();
        }
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
            <View style={{
                flex: 1,
                justifyContent: "center",
                width: "90%",
                margin: "5%",
            }}>
                <Text style={{
                    ...Theme.Title,
                    color: Theme.colors.Black,
                    fontWeight: "bold"
                }}>
                    Compte connecté
                </Text>
                {
                    Object.keys(services).map((value, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                if (services[value].is_connected) {
                                    oauthDisconnect(value).then((res) => {
                                        setSevices((prevState) => {
                                            return {
                                                ...prevState,
                                                [value]: {
                                                    ...prevState[value],
                                                    is_connected: false
                                                }
                                            }
                                        })
                                    })
                                } else {
                                    authorizeUrlGet(value).then((urlGet) => {
                                        oauthAuthorize(urlGet.url).then((res) => {

                                        })
                                    })
                                }
                            }}
                                              style={{
                                                  marginTop: "2%",
                                                  width: "100%",
                                                  height: 50,
                                                  padding: 10,
                                                  borderRadius: 10,
                                                  borderColor: Theme.colors.Black,
                                                  borderWidth: 1,
                                                  flex: 1,
                                                  flexDirection: "row",
                                                  justifyContent: "space-between",
                                              }}
                            >
                                <Text style={{
                                    ...Theme.Text,
                                    color: Theme.colors.Black,
                                    fontWeight: "bold"
                                }}>
                                    {value}
                                </Text>
                                {
                                    services[value].is_connected ?
                                        <Text style={{
                                            ...Theme.Text,
                                            color: Theme.colors.Black,
                                            fontWeight: "bold"
                                        }}>
                                            Connecté
                                        </Text>
                                        :
                                        <Text style={{
                                            ...Theme.Text,
                                            color: Theme.colors.Black,
                                            fontWeight: "bold"
                                        }}>
                                            Se connecter
                                        </Text>
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({})
