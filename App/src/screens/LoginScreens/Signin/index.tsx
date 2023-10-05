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
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import ButtonCompenents from "../../../components/ButtonLogin"
import useTheme from "../../../hooks/Theme/useTheme";
import {BlurView} from 'expo-blur';
import absoluteFill = StyleSheet.absoluteFill;
import {RFValue} from "react-native-responsive-fontsize";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Signin() {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();


    return (
        <ScrollView>
            <View style={{
                backgroundColor: Theme.colors.White,
                height: Dimensions.get("window").height * 0.97,
                width: "100%"
            }}>
                <StatusBar style="auto"/>
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
                    marginVertical: "8  %",
                    justifyContent: "1space-evenly",
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
                                height: "53%"
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
                                                marginVertical: 5

                                            }}
                                            placeholder="Nom"
                                            placeholderTextColor="#FFFFFF80"
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
                                        />
                                    </View>
                                </View>

                            </View>
                            <View style={{height: "35%",
                            margin: "5%"}}>
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

                                    />
                                </View>

                                <View style={{
                                    margin: "5%",
                                    alignItems: "center",
                                    height: "50%"
                                }}>
                                    <Text style={{
                                        ...Theme.Text,
                                        color: Theme.colors.White,
                                    }}>
                                        Déja un compte ?
                                    </Text>
                                    <TouchableOpacity>
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