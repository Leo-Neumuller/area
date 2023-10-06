import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
} from "react-native";
import {StatusBar} from "expo-status-bar";
import useThemedStyles from "../../../hooks/Theme/useThemedStyle";
import ButtonCompenents from "../../../components/ButtonLogin"
import useTheme from "../../../hooks/Theme/useTheme";
import {RFValue} from "react-native-responsive-fontsize";
import {ThemeTypeContext} from "../../../constants/Theme";



export default function HomeLogin({navigation}) {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();


    return (
        <SafeAreaView style={{height: "100%",
        backgroundColor: Theme.colors.White}}>
            <StatusBar style="auto"/>
            <View style={{
                height: "65%",
                justifyContent: "space-evenly",
            }}>
                <Text style={{
                    fontSize: RFValue(80),
                    fontFamily: 'zen-tokyo-zoo',
                    textAlign: 'center',


                }}>FLUX</Text>
            </View>
            <View style={{
                height: "10%",
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center"

            }}>
                <ButtonCompenents
                    bgColor={Theme.colors.Black}
                    hei={"80%"}
                    wid={"70%"}
                    text={"S'INSCRIRE"}
                    textColor={Theme.colors.White}
                    onPress={() => navigation.push('Signup')}

                />
            </View>
            <View style={{
                height: "10%",
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center"

            }}>
                <ButtonCompenents
                    bgColor={Theme.colors.Black}
                    hei={"80%"}
                    wid={"70%"}
                    text={"SE CONNECTER"}
                    textColor={Theme.colors.White}
                    onPress={() => navigation.push('Login')}

                />
            </View>
            <View style={{
                height: "35%"
            }} />
        </SafeAreaView>
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
    Blur: {
        zIndex: -1,
        position: "relative"
    },
})
