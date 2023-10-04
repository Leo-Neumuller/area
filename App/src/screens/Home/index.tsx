import {StyleSheet, Text, View, Button, Dimensions, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";
import { Theme } from "../../components/themeProvider"
import useThemedStyles from "../../hooks/useThemedStyle";
import ButtonCompenents from "../../components/buttonComponents"
import useTheme from "../../hooks/useTheme";




export default function Home() {
    const Styles = useThemedStyles(styles);
    const Theme = useTheme();

    return (
        <SafeAreaView>
            <Text style = {Styles.container}>Hello World Home.tsx</Text>
            <StatusBar style="auto"/>
            <ButtonCompenents bgColor={Theme.colors.Primary}
                              hei={80}
                              wid={300}
                              text={"Testgg"}
                              textColor={Theme.colors.Black}

            />
        </SafeAreaView>
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
})