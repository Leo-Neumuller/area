import {useContext} from "react";
import {ThemeContext} from "../../../components/themeProvider";
import {ThemeTypeContext} from "../../../constants/Theme";

export default function useTheme() : ThemeTypeContext {
    return useContext(ThemeContext);
}