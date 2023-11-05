import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    SafeAreaView,
    TextInput,
    Image, ImageBackground,
    ScrollView, TouchableOpacity
} from "react-native";
import React, {useState} from "react";
// import {StatusBar} from "expo-status-bar";
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import ButtonCompenents from "../../../components/ButtonLogin"
import useTheme from "../../../hooks/Theme/useTheme";
import absoluteFill = StyleSheet.absoluteFill;
import {RFValue} from "react-native-responsive-fontsize";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

import {signupPost} from "../../../api/api";


import Login from "../Login";
import {ThemeTypeContext} from "../../../constants/Theme";
import EncryptedStorage from "react-native-encrypted-storage";

// @ts-ignore
export default function Signup({navigation}) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState();


    return (
        <ScrollView>
            <SafeAreaView style={{
                backgroundColor: Theme.colors.White,
                width: "100%"
            }}>
                {/* <StatusBar style="auto"/> */}
                <View style={{
                    height: Dimensions.get("window").height * 0.15,
                    justifyContent: "space-evenly"
                }}>
                    <Text style={{
                        fontSize: RFValue(80),
                        fontFamily: 'zen-tokyo-zoo',
                        textAlign: 'center',


                    }}>FLUX</Text>
                </View>
                <View style={{
                    height: Dimensions.get("window").height * 0.95,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    paddingVertical: 10

                }}>
                    <View style={{height: "95%",
                    width: Dimensions.get("window").width,
                    alignItems: "center"}}>
                        <View style={{
                            backgroundColor: Theme.colors.Black,
                            borderRadius: 20,
                            width: "90%"
                        }}>
                            <View style={{
                                height: "65%"
                            }}>
                                <View style={{
                                    height: "25%",
                                    justifyContent: "space-evenly"
                                }}>
                                    <View style={{
                                        marginLeft: "5%",
                                    }}>
                                        <Text style={{
                                            ...Theme.Subtitle,
                                            color: Theme.colors.White,
                                        }
                                        }> Nom </Text>
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
                                            placeholder="Nom"
                                            placeholderTextColor="#FFFFFF80"
                                            onChangeText={(email) => setData((prev) => ({...prev, email: email}))}

                                        />
                                    </View>
                                </View>
                                <View style={{
                                    height: "25%",
                                    justifyContent: "space-evenly"
                                }}>
                                    <View style={{
                                        marginLeft: "5%",
                                    }}>
                                        <Text style={{
                                            ...Theme.Subtitle,
                                            color: Theme.colors.White,
                                        }
                                        }> Prénom </Text>
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
                                            placeholder="Prénom"
                                            placeholderTextColor="#FFFFFF80"
                                            onChangeText={(email) => setData((prev) => ({...prev, email: email}))}

                                        />
                                    </View>
                                </View>
                                <View style={{
                                    height: "25%",
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
                                    height: "25%",
                                    justifyContent: "space-evenly"
                                }}>
                                    <View style={{
                                        marginLeft: "5%",
                                    }}>
                                        <Text style={{
                                            ...Theme.Subtitle,
                                            color: Theme.colors.White,
                                        }
                                        }> Mot de Passe </Text>
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
                                            placeholder="Mot de Passe"
                                            placeholderTextColor="#FFFFFF80"
                                            onChangeText={(email) => setData((prev) => ({...prev, email: email}))}

                                        />
                                    </View>
                                </View>

                            </View>
                            <View style={{
                                height: "5%",
                                width: "90%",
                                justifyContent: "space-evenly"
                            }}>
                                <View style={{
                                    alignItems: "center"
                                }}>
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
                            <View style={{height: "30%",
                            justifyContent: "space-evenly"}}>

                                <View style={{
                                    height: "50%",
                                    justifyContent: "space-evenly",
                                    width: "100%",
                                    alignItems: "center"

                                }}>
                                    <ButtonCompenents
                                        bgColor={Theme.colors.Primary}
                                        hei={"55%"}
                                        wid={"80%"}
                                        text={"S'INSCRIRE"}
                                        textColor={Theme.colors.Black}
                                        onPress={() => {
                                            signupPost(data).then((res) => {
                                                EncryptedStorage.setItem('userToken', res.access_token).then(() =>
                                                    navigation.push("BottomBar"))
                                            }).catch((err) => {
                                                setError(err.toString());
                                            })
                                        }}

                                    />
                                </View>

                                <View style={{
                                    alignItems: "center",
                                    height: "50%"
                                }}>
                                    <Text style={{
                                        ...Theme.Text,
                                        color: Theme.colors.White,
                                    }}>
                                        Déja un compte ?
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.push('Login')}>
                                        <Text style={{
                                            ...Theme.Text,
                                            color: Theme.colors.White,
                                            textDecorationLine: "underline"
                                        }}>
                                            Connectez-vous !
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
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