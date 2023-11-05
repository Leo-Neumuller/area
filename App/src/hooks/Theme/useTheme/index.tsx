import {useContext} from "react";
import {ThemeContext} from "../../../components/themeProvider";
import {ThemeTypeContext} from "../../../constants/Theme";

/**
 * Function to return the current theme
 *
 * @returns {ThemeTypeContext} The current theme
 */
export default function useTheme() : ThemeTypeContext {
    return useContext(ThemeContext);
}