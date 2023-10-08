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
import {StatusBar} from "expo-status-bar";
import {Theme} from "../../../components/themeProvider"
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import ButtonCompenents from "../../../components/ButtonLogin"
import useTheme from "../../../hooks/Theme/useTheme";
import {BlurView} from 'expo-blur';
import absoluteFill = StyleSheet.absoluteFill;
import {RFValue} from "react-native-responsive-fontsize";

import Signup from "../Signup";
import HomeLogin from "../HomeLogin";

import React, {useState} from "react";
import * as SecureStore from "expo-secure-store";

import {loginPost} from "../../../api/api";


export default function Login({navigation}) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState();



    return (
        <ScrollView>
            <View style={{
                height: Dimensions.get("window").height,
                backgroundColor: Theme.colors.White
            }}>
                <StatusBar style="auto"/>
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
                        <View style={{margin: "7%"}}>
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
                        <View style={{ height: "10%",
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
                                            SecureStore.setItemAsync('userToken', res.access_token).then(() =>
                                                navigation.push("BottomBar"))
                                        }).catch((err) => {
                                            setError(err.toString());
                                        })
                                    }}
                                />
                            </View>

                            <View style={{margin: "5%",
                            alignItems: "center"}}>
                                <Text style={{
                                    ...Theme.Text,
                                    color: Theme.colors.White,
                                }}>
                                    Première fois sur Flux ?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.push('Signup')}>
                                    <Text style={{...Theme.Text,
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

const styles = Theme => StyleSheet.create({
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