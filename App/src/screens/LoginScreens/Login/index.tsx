import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    ScrollView, TouchableOpacity
} from "react-native";
// import {StatusBar} from "expo-status-bar";
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import ButtonCompenents from "../../../components/ButtonLogin"
import useTheme from "../../../hooks/Theme/useTheme";
import {RFValue} from "react-native-responsive-fontsize";
import React, {useState} from "react";

import {loginPost} from "../../../api/api";
import {ThemeTypeContext} from "../../../constants/Theme";
import EncryptedStorage from "react-native-encrypted-storage";



/**
 * Route for login page.
 *
 * @param navigation the navigation prop.
 * @returns The login page as jsx.
 */
// @ts-ignore
export default function Login({navigation}) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState<string>();


    return (
        <ScrollView>
            <View style={{
                height: Dimensions.get("window").height,
                backgroundColor: Theme.colors.White
            }}>
                {/* <StatusBar style="auto"/> */}
                <View style={{
                    height: "30%",
                    justifyContent: "space-evenly",
                }}>
                    <Text style={{
                        fontSize: RFValue(80),
                        fontFamily: 'zen-tokyo-zoo',
                        textAlign: 'center',


                    }}>FLUX</Text>
                </View>
                <View style={{
                    height: "55%",
                    justifyContent: "space-evenly",
                    width: "100%",
                    alignItems: "center"

                }}>
                    <View style={{
                        height: "100%",
                        width: "91%",
                        backgroundColor: Theme.colors.Black,
                        borderRadius: 20,
                    }}>
                        <View style={{
                            height: "60%"
                        }}>
                            <View style={{
                                height: "50%",
                                justifyContent: "space-evenly"
                            }}>
                                <View style={{
                                    marginLeft: "5%",
                                }}>
                                    <Text style={{
                                        ...Theme.Subtitle,
                                        color: Theme.colors.White,
                                    }
                                    }> Email </Text>
                                </View>
                                <View style={{
                                    ...Styles.styleInput,
                                    width: "90%",
                                    alignSelf: "center"
                                }}>
                                    <TextInput
                                        style={{
                                            ...Theme.Text,
                                            marginHorizontal: 20,
                                            marginVertical: 5

                                        }}
                                        placeholder="Email"
                                        placeholderTextColor="#FFFFFF80"
                                        onChangeText={(email) => setData((prev) => ({...prev, email: email}))}

                                    />
                                </View>
                            </View>
                            <View style={{
                                height: "50%"
                            }}>
                                <View style={{
                                    marginLeft: "5%"
                                }}>
                                    <Text style={{
                                        ...Theme.Subtitle,
                                        color: Theme.colors.White,
                                    }
                                    }> Mot de passe </Text>
                                </View>
                                <View style={{...Styles.styleInput,
                                    width: "90%",
                                    alignSelf: "center"}}>
                                    <TextInput
                                        style={{
                                            ...Theme.Text,
                                            marginHorizontal: 20,
                                            marginVertical: 5

                                        }}
                                        placeholder="Mot de passe"
                                        placeholderTextColor="#FFFFFF80"
                                        secureTextEntry={true}
                                        onChangeText={(password) => setData((prev) => ({...prev, password: password}))}

                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            height: "10%",
                            width: "90%",
                            marginHorizontal: "8%"
                        }}>
                            <View>
                                {error ? <Text style={{
                                    color: 'red',
                                    flexWrap: "wrap",
                                    position: "absolute",
                                    textAlign: "center"
                                }}>
                                    {error}
                                </Text> : null}
                            </View>
                        </View>


                        <View>
                            <View style={{
                                height: "30%",
                                justifyContent: "space-evenly",
                                width: "100%",
                                alignItems: "center"

                            }}>
                                <ButtonCompenents
                                    bgColor={Theme.colors.Primary}
                                    hei={"80%"}
                                    wid={"80%"}
                                    text={"SE CONNECTER"}
                                    textColor={Theme.colors.Black}
                                    onPress={() => {
                                        loginPost(data).then((res) => {
                                            EncryptedStorage.setItem('userToken', res["access_token"]).then(() =>
                                                navigation.push("BottomBar"))
                                        }).catch((err) => {
                                            setError(err.toString());
                                        })
                                    }}
                                />
                            </View>

                            <View style={{
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    ...Theme.Text,
                                    color: Theme.colors.White,
                                }}>
                                    Première fois sur Flux ?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.push('Signup')}>
                                    <Text style={{
                                        ...Theme.Text,
                                        color: Theme.colors.White,
                                        textDecorationLine: "underline"
                                    }}>
                                        Créé ton compte !
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>

                    </View>
                </View>

                <View style={{
                    height: "20%"
                }}/>
            </View>
        </ScrollView>
    )
}

const styles = (Theme: ThemeTypeContext) => StyleSheet.create({
    Text: {
        color: Theme.colors.Primary
    },
    container: {
        fontSize: Theme.Button.fontSize,
        color: Theme.colors.Primary,
        backgroundColor: Theme.colors.Black
    },
    styleInput: {
        backgroundColor: "#D9D9D91A",
        width: "100%",
        borderRadius: 10,
    }
})