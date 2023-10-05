import {useContext} from "react";
import {ThemeContext} from "../../../components/themeProvider";

export default function useTheme() {
    return useContext(ThemeContext);
}