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
                height: Dimensions.get("window").height * 0.97,
                width: "100%"
            }}>
                {/* <StatusBar style="auto"/> */}
                <View style={{
                    height: "20%",
                }}>
                    <Text style={{
                        fontSize: RFValue(80),
                        fontFamily: 'zen-tokyo-zoo',
                        textAlign: 'center',


                    }}>FLUX</Text>
                </View>
                <View style={{
                    height: "72%",
                    justifyContent: "space-evenly",
                    alignItems: "center"

                }}>
                    <View style={{
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                    }}>
                        <View style={{
                            backgroundColor: Theme.colors.Black,
                            borderRadius: 20,
                            width: "90%"
                        }}>
                            <View style={{
                                margin: "7%",
                                height: "57%"
                            }}>
                                <View style={{margin: "2%"}}>
                                    <Text style={{
                                        ...Theme.Subtitle,
                                        color: Theme.colors.White,
                                    }
                                    }> Nom </Text>
                                    <View style={{...Styles.styleInput}}>
                                        <TextInput

                                            style={{
                                                ...Theme.Text,
                                                marginHorizontal: 20,
                                                marginVertical: 5,


                                            }}
                                            placeholder="Nom"
                                            placeholderTextColor="#FFFFFF80"
                                            onChangeText={(surname) => setData((prev) => ({...prev, surname: surname}))}
                                        />
                                    </View>
                                </View>
                                <View style={{margin: 5}}>
                                    <Text style={{
                                        ...Theme.Subtitle,
                                        color: Theme.colors.White,
                                    }
                                    }> Prénom </Text>
                                    <View style={{...Styles.styleInput}}>
                                        <TextInput
                                            style={{
                                                ...Theme.Text,
                                                marginHorizontal: 20,
                                                marginVertical: 5

                                            }}
                                            placeholder="Prénom"
                                            placeholderTextColor="#FFFFFF80"
                                            onChangeText={(name) => setData((prev) => ({...prev, name: name}))}
                                        />
                                    </View>
                                </View>
                                <View style={{margin: 5}}>
                                    <Text style={{
                                        ...Theme.Subtitle,
                                        color: Theme.colors.White,
                                    }
                                    }> Email </Text>
                                    <View style={{...Styles.styleInput}}>
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
                                <View style={{margin: 5}}>
                                    <Text style={{
                                        ...Theme.Subtitle,
                                        color: Theme.colors.White,
                                    }
                                    }> Mot de passe </Text>
                                    <View style={{...Styles.styleInput}}>
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
                            <View style={{ height: "8%",
                            width: "90%",
                                marginHorizontal: "8%"
                            }}>
                                <View>
                                    {error ? <Text style={{
                                        color: 'red',
                                        flexWrap: "wrap",
                                        position:"absolute",
                                        textAlign: "center"
                                    }}>
                                        {error}
                                    </Text> : null}
                                </View>
                            </View>
                            <View style={{height: "28%"}}>

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
                                    height: "30%"
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