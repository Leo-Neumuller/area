import React, {useEffect} from "react";
import {Text, View} from "react-native";
import {oauthAuthorize} from "../../api/api";


export default function Oauth(props: any) {
    useEffect(() => {
        oauthAuthorize(props.route.params["service"], props.route.path.split("?")[1]).then((res) => {
            props.navigation.pop(2);
        }).catch((err) => {
            props.navigation.pop(2);
        });
    }, [])
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text
                style={{fontFamily: 'space-grotesk', fontSize: 30, fontWeight: "bold"}}
            >
                Loading...
            </Text>
        </View>
    )
}