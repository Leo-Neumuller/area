import {RFValue} from "react-native-responsive-fontsize";
import { TextStyle } from "react-native";

type ColorType = {
    [key: string]: string;
}

type TextType = {
    size?: {
        sm?: number;
        md?: number;
        lg?: number;
    }
    fontFamily?: string;
}

export type ThemeType = {
    "Light" : {
        "colors": ColorType;
        "Button": TextStyle;
        "Title": TextStyle;
        "Subtitle": TextStyle;
        "Text": TextStyle;
    },
    "Default" : {
        "typography": TextType;
        "colors": ColorType;
    }
}

export type ThemeContextType = {
    colors: ColorType;
    default: ThemeType["Default"];
}

export type ThemeName = "Light";

const Theme : ThemeType = {
    "Light" : {
        "colors": {
            "Primary": '#D9C6F4',
            "White" : "#f3f3f3",
            "Black" : "#373637"
        },
        "Button": {
            fontSize: RFValue(25),
            fontFamily: 'space-grotesk',
            fontWeight: "bold",
            borderRadius: 45,
            alignItems: "center",
            justifyContent: "center",
        },
        "Title": {
            fontSize: RFValue(30    ),
            fontFamily: 'space-grotesk',
        },
        "Subtitle": {
            fontSize: RFValue(24),
            fontFamily: 'space-grotesk',
        },
        "Text": {
            fontSize: RFValue(18),
            fontFamily: 'space-grotesk',
        }
    },
    "Default" : {
        "typography": {
            "size": {
                "sm": RFValue(20),
                "md": RFValue(24),
                "lg": RFValue(40),
            },
            "fontFamily": 'space-grotesk',
        },
        "colors": {}
    }
}

export default Theme;