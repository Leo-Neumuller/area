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
import {Theme} from "../../components/themeProvider"
import useThemedStyles from "../../hooks/useThemedStyle";
import ButtonCompenents from "../../components/buttonComponents"
import useTheme from "../../hooks/useTheme";
import {BlurView} from 'expo-blur';
import absoluteFill = StyleSheet.absoluteFill;
import {RFValue} from "react-native-responsive-fontsize";

export default function Login() {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();


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
                    height: "50%",
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
                                    />
                                </View>
                            </View>
                            <View style={{margin: 5}}>
                                <Text style={{
                                    ...Theme.Subtitle,
                                    color: Theme.colors.White,
                                }
                                }> Password </Text>
                                <View style={{...Styles.styleInput}}>
                                    <TextInput
                                        style={{
                                            ...Theme.Text,
                                            marginHorizontal: 20,
                                            marginVertical: 5

                                        }}
                                        placeholder="Password"
                                        placeholderTextColor="#FFFFFF80"
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{
                                height: "35%",
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

                                />
                            </View>

                            <View style={{margin: "5%",
                            alignItems: "center"}}>
                                <TouchableOpacity>
                                    <Text style={{...Theme.Text,
                                        color: Theme.colors.White,
                                        textDecorationLine: "underline"
                                    }}>
                                        Créer un compte
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